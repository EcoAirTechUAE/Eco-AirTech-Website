/**
 * The single network touch point for enquiries.
 *
 * Nothing else in the app makes a request. To go live, replace the body of
 * `submitContact` with a real call — a Supabase insert, a Formspree endpoint,
 * an edge function — and everything upstream keeps working unchanged.
 *
 *   Supabase example:
 *     const { error } = await supabase.from('enquiries').insert(data)
 *     if (error) throw new Error(error.message)
 *
 *   Formspree example:
 *     const res = await fetch('https://formspree.io/f/XXXXXXX', {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify(data),
 *     })
 *     if (!res.ok) throw new Error('Submission failed')
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

export async function submitContact(data: ContactPayload): Promise<void> {
  // Honeypot: a bot filled the hidden field. Resolve silently so it learns nothing.
  if (data.website) return;

  // TODO: replace with a real submission target before launch.
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info("[contact] submitContact() is still a stub. Payload:", data);
  }

  await new Promise((resolve) => setTimeout(resolve, 700));

  throw new Error(
    "This form isn't connected yet. Please reach us on WhatsApp or by email in the meantime.",
  );
}
