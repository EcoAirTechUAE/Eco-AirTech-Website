/**
 * Enquiry endpoint: takes the website contact form and delivers it to the
 * team, as a row in Airtable, an email, or both.
 *
 * Runs as a Vercel Edge Function, which is why it uses the Web Request and
 * Response types and talks to the mail provider over plain fetch. That keeps
 * the whole thing dependency-free — nothing to install, nothing to keep
 * patched — and the site stays a static build with one function beside it.
 *
 * Configuration, all via Vercel environment variables. At least one of the
 * two destinations must be set up. With neither, the endpoint returns 503 and
 * the form tells the visitor to use WhatsApp, rather than accepting an
 * enquiry it cannot actually deliver.
 *
 * Airtable (the enquiry list the team works from):
 *   AIRTABLE_TOKEN     personal access token with data.records:write on the base.
 *   AIRTABLE_BASE_ID   the base id, starting "app".
 *   AIRTABLE_TABLE     table name. Defaults to "Enquiries".
 *
 * Email (optional, via resend.com):
 *   RESEND_API_KEY   from resend.com.
 *   ENQUIRY_TO       where enquiries land. One address, or several separated
 *                    by commas. Defaults to hello@eco-airtech.com.
 *   ENQUIRY_FROM     the From address. Must be on a domain verified in
 *                    Resend. Defaults to the eco-airtech.com sender below.
 *
 * The enquiry counts as delivered if any configured destination accepts it.
 * A failure at one is logged; the visitor only sees an error if all fail.
 *
 * Deliberately never returns the enquiry body in an error, and never logs the
 * visitor's message: it is personal data and this runs on shared infra.
 */

export const config = { runtime: "edge" };

const TO = "hello@eco-airtech.com";
const FROM = "Eco AirTech website <enquiries@eco-airtech.com>";

/** Caps that stop a bot pasting a novel into the inbox. */
const LIMITS: Record<string, number> = {
  name: 120,
  email: 200,
  phone: 60,
  organisation: 160,
  interest: 80,
  message: 4000,
  page: 200,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Payload {
  name?: string;
  email?: string;
  phone?: string;
  organisation?: string;
  interest?: string;
  message?: string;
  page?: string;
  website?: string;
}

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

/** Neutralises any HTML in visitor input before it goes in the email body. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Strips CR/LF from anything that goes into a header.
 *
 * Without this, a newline in the name field would let someone inject extra
 * headers and use the form to send mail to third parties.
 */
function headerSafe(s: string): string {
  return s.replace(/[\r\n]+/g, " ").trim();
}

/**
 * Pulls the actual key out of an environment variable as pasted.
 *
 * Values copied from a browser often bring a line break, quotes or invisible
 * characters with them, and any of those in an Authorization header makes
 * fetch throw before the request leaves, so the provider never sees it. The
 * base id is also often pasted as the whole Airtable URL. Matching the known
 * shape of the key copes with all of these; anything else is used trimmed.
 */
function cleanSecret(value: string | undefined, shape: RegExp): string | undefined {
  // Keys never contain spaces or non-ASCII, so anything outside printable
  // ASCII is paste debris, including a line break in the middle.
  const visible = (value ?? "").replace(/[^\x21-\x7E]/g, "");
  return visible.match(shape)?.[0] ?? (visible || undefined);
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return json(400, { error: "Malformed request." });
  }

  // Honeypot. Report success so the bot learns nothing and does not retry.
  if (data.website) return json(200, { ok: true });

  const field = (key: keyof typeof LIMITS) =>
    String(data[key as keyof Payload] ?? "")
      .slice(0, LIMITS[key])
      .trim();

  const name = field("name");
  const email = field("email");
  const phone = field("phone");
  const organisation = field("organisation");
  const interest = field("interest");
  const message = field("message");
  const page = field("page");

  // Validated again here. The client checks too, but a public endpoint cannot
  // assume the request came from our form.
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(email)) errors.email = "That doesn't look like a valid email address.";
  if (phone && phone.replace(/[^\d]/g, "").length < 7) {
    errors.phone = "Please enter a complete phone number.";
  }
  if (message.length < 10) errors.message = "A sentence or two would help us respond properly.";
  if (Object.keys(errors).length > 0) return json(422, { errors });

  const airtableToken = cleanSecret(process.env.AIRTABLE_TOKEN, /pat[A-Za-z0-9]+\.[A-Za-z0-9]+/);
  const airtableBase = cleanSecret(process.env.AIRTABLE_BASE_ID, /app[A-Za-z0-9]{14}/);
  const resendKey = cleanSecret(process.env.RESEND_API_KEY, /re_[A-Za-z0-9_]+/);

  const useAirtable = Boolean(airtableToken && airtableBase);
  const useEmail = Boolean(resendKey);

  if (!useAirtable && !useEmail) {
    // Configuration is missing. Say so plainly rather than pretending the
    // enquiry was received: a lost enquiry is worse than a visible failure.
    return json(503, {
      error: "The enquiry form is not connected yet. Please message us on WhatsApp or by email.",
    });
  }

  const deliveries: Promise<boolean>[] = [];

  if (useAirtable) {
    deliveries.push(
      saveToAirtable(airtableToken!, airtableBase!, process.env.AIRTABLE_TABLE || "Enquiries", {
        Name: name,
        Email: email,
        Phone: phone,
        Company: organisation,
        Space: interest,
        Message: message,
        Page: page,
        Status: "New",
      }),
    );
  }

  if (useEmail) {
    const rows: [string, string][] = [
      ["Name", name],
      ["Email", email],
      ["Phone", phone || "Not given"],
      ["Company or residential", organisation || "Not given"],
      ["Space", interest || "Not given"],
    ];

    const html = `
      <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:640px">
        <h2 style="margin:0 0 4px">New enquiry from the website</h2>
        <p style="margin:0 0 20px;color:#667">${esc(interest || "No space selected")}</p>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">
          ${rows
            .map(
              ([k, v]) =>
                `<tr>
                   <td style="padding:7px 14px 7px 0;color:#667;vertical-align:top;white-space:nowrap">${esc(k)}</td>
                   <td style="padding:7px 0"><strong>${esc(v)}</strong></td>
                 </tr>`,
            )
            .join("")}
        </table>
        <h3 style="margin:26px 0 6px">Message</h3>
        <div style="white-space:pre-wrap;line-height:1.55">${esc(message)}</div>
        <hr style="margin:28px 0;border:0;border-top:1px solid #e3e6e3" />
        <p style="margin:0;color:#889;font-size:13px">
          Sent from the enquiry form at ecoairtech.ae. Reply directly to reach ${esc(name)}.
        </p>
      </div>
    `;

    const text = [
      "New enquiry from the website",
      "",
      ...rows.map(([k, v]) => `${k}: ${v}`),
      "",
      "Message:",
      message,
    ].join("\n");
    deliveries.push(
      sendEmail(resendKey!, {
        from: process.env.ENQUIRY_FROM || FROM,
        to: (process.env.ENQUIRY_TO || TO)
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        // So hitting reply in the inbox goes straight to the enquirer.
        reply_to: email,
        subject: `Enquiry: ${headerSafe(interest || "General")} · ${headerSafe(name)}`,
        html,
        text,
      }),
    );
  }

  const results = await Promise.all(deliveries);
  if (!results.some(Boolean)) {
    return json(502, {
      error: "We could not send that just now. Please message us on WhatsApp and we will pick it up.",
    });
  }

  return json(200, { ok: true });
}

/**
 * Adds the enquiry as a row. Empty optional fields are left out so the row
 * shows a blank cell rather than an empty string. `typecast` lets Airtable
 * add a new option to a single-select column (Space, Status) the first time
 * a value appears, instead of rejecting the whole row.
 */
async function saveToAirtable(
  token: string,
  base: string,
  table: string,
  fields: Record<string, string>,
): Promise<boolean> {
  const present = Object.fromEntries(Object.entries(fields).filter(([, v]) => v));
  try {
    const res = await fetch(`https://api.airtable.com/v0/${encodeURIComponent(base)}/${encodeURIComponent(table)}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ records: [{ fields: present }], typecast: true }),
    });
    if (!res.ok) {
      // The provider's reason names the field or permission at fault. Logged
      // for us, never shown to the visitor.
      console.error("[contact] Airtable rejected the row", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[contact] Airtable request failed", err instanceof Error ? err.message : err);
    return false;
  }
}

async function sendEmail(apiKey: string, payload: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("[contact] email provider rejected send", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[contact] email send failed", err instanceof Error ? err.message : err);
    return false;
  }
}
