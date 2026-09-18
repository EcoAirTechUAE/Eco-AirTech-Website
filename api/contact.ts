/**
 * Enquiry endpoint: takes the website contact form and emails it to the team.
 *
 * Runs as a Vercel Edge Function, which is why it uses the Web Request and
 * Response types and talks to the mail provider over plain fetch. That keeps
 * the whole thing dependency-free — nothing to install, nothing to keep
 * patched — and the site stays a static build with one function beside it.
 *
 * Configuration, all via Vercel environment variables:
 *
 *   RESEND_API_KEY   required. From resend.com. Without it the endpoint
 *                    returns 503 and the form tells the visitor to use
 *                    WhatsApp, rather than accepting an enquiry it cannot
 *                    actually deliver.
 *   ENQUIRY_TO       where enquiries land. Defaults to hello@eco-airtech.com.
 *   ENQUIRY_FROM     the From address. Must be on a domain verified in
 *                    Resend. Defaults to the eco-airtech.com sender below.
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
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Payload {
  name?: string;
  email?: string;
  phone?: string;
  organisation?: string;
  interest?: string;
  message?: string;
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Configuration is missing. Say so plainly rather than pretending the
    // enquiry was received: a lost enquiry is worse than a visible failure.
    return json(503, {
      error: "The enquiry form is not connected yet. Please message us on WhatsApp or by email.",
    });
  }

  const to = process.env.ENQUIRY_TO || TO;
  const from = process.env.ENQUIRY_FROM || FROM;

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "Not given"],
    ["Company or property", organisation || "Not given"],
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

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // So hitting reply in the inbox goes straight to the enquirer.
        reply_to: email,
        subject: `Enquiry: ${headerSafe(interest || "General")} · ${headerSafe(name)}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      // Log the provider's reason for us, but never echo it to the visitor:
      // it can contain account and domain detail.
      console.error("[contact] provider rejected send", res.status, await res.text());
      return json(502, {
        error: "We could not send that just now. Please message us on WhatsApp and we will pick it up.",
      });
    }
  } catch (err) {
    console.error("[contact] send failed", err instanceof Error ? err.message : err);
    return json(502, {
      error: "We could not send that just now. Please message us on WhatsApp and we will pick it up.",
    });
  }

  return json(200, { ok: true });
}
