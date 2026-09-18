/**
 * The single network touch point for enquiries.
 *
 * Nothing else in the app makes a request. The form posts to /api/contact,
 * which emails the enquiry to the team; see api/contact.ts for the endpoint
 * and the environment variables it needs.
 *
 * The validation below is duplicated on the server. That is deliberate: this
 * copy exists to give the visitor an answer without a round trip, and the
 * server copy exists because a public endpoint cannot trust its caller.
 */

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  interest: string;
  message: string;
  /** Anti-spam honeypot — must be empty. Never shown to real users. */
  website?: string;
}

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

export const interestOptions = [
  "Residential, my home",
  "Hotel or resort",
  "Palace or place of worship",
  "Healthcare",
  "School or nursery",
  "Gym or wellness facility",
  "Hospitality or venue",
  "Transportation or fleet",
  "Something else",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(data: ContactPayload): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name.trim()) errors.name = "Please tell us your name.";
  else if (data.name.trim().length < 2) errors.name = "That name looks too short.";

  if (!data.email.trim()) errors.email = "We need an email address to reply to.";
  else if (!EMAIL_RE.test(data.email.trim())) errors.email = "That doesn't look like a valid email address.";

  // Optional, but if given it should be plausible.
  if (data.phone.trim() && data.phone.replace(/[^\d]/g, "").length < 7) {
    errors.phone = "Please enter a complete phone number.";
  }

  if (!data.message.trim()) errors.message = "Please tell us a little about your space.";
  else if (data.message.trim().length < 10) errors.message = "A sentence or two would help us respond properly.";

  return errors;
}

const FALLBACK_ERROR =
  "We could not send that just now. Please message us on WhatsApp and we will pick it up.";

export async function submitContact(data: ContactPayload): Promise<void> {
  // Honeypot: a bot filled the hidden field. Resolve silently so it learns nothing.
  if (data.website) return;

  let res: Response;
  try {
    res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    // Offline, or the request never left the device.
    throw new Error(FALLBACK_ERROR);
  }

  if (res.ok) return;

  // The endpoint returns a plain-English `error` for anything the visitor can
  // act on — not configured yet, provider down — so prefer it to a generic
  // message. Anything else means the response was not the shape we expect.
  let body: { error?: string; errors?: Record<string, string> } = {};
  try {
    body = await res.json();
  } catch {
    throw new Error(FALLBACK_ERROR);
  }

  if (body.errors) {
    // Server-side validation disagreed with the client's. Surface the first
    // message rather than a generic failure, so the visitor can fix it.
    const first = Object.values(body.errors)[0];
    throw new Error(first || FALLBACK_ERROR);
  }

  throw new Error(body.error || FALLBACK_ERROR);
}
