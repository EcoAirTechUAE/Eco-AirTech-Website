import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Button, ButtonAnchor } from "@/components/ui/Button";
import { SelectField, TextArea, TextField } from "@/components/ui/Field";
import { Bloom } from "@/components/ui/Bloom";
import { site, whatsappLink } from "@/config/site";
import {
  interestOptions,
  submitContact,
  validate,
  type ContactPayload,
  type FieldErrors,
} from "@/lib/contact";

const EMPTY: ContactPayload = {
  name: "",
  email: "",
  phone: "",
  organisation: "",
  interest: interestOptions[0],
  message: "",
  website: "",
};

const steps = [
  "We review what you've told us and come back within one working day.",
  "A site assessment to understand the space and what's driving the problem. Where testing would add real insight, we test — in a home, the answer is usually assessment and design instead.",
  "A written specification and a fixed price, including the ongoing service interval.",
];

export function ContactSection() {
  const [data, setData] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [formError, setFormError] = useState<string | null>(null);

  const set = (key: keyof ContactPayload) => (value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    // Clear a field's error as soon as the visitor starts correcting it.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    const found = validate(data);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setStatus("sending");
    try {
      await submitContact(data);
      setStatus("sent");
      setData(EMPTY);
    } catch (err) {
      setStatus("idle");
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <Section id="contact" className="relative overflow-hidden">
      <Bloom intensity="sm" animate={false} className="top-0" />

      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-accent/50" />
              Get in touch
            </p>
            <h2 className="mt-6 text-display-md font-medium">
              Start with the building, not a quote.
            </h2>
            <p className="mt-6 max-w-prose leading-relaxed text-muted">
              We begin by understanding the environment and what's driving the problem. Where
              air-quality testing adds meaningful insight, we use it to establish the evidence.
              Elsewhere — particularly in homes — the right approach starts with assessment,
              consultation and solution design. And if it turns out you don't need us, we'll tell
              you that.
            </p>

            <ol className="mt-10 space-y-5">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="tnum mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-accent/30 font-mono text-[11px] text-accent">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-muted">{step}</p>
                </li>
              ))}
            </ol>

            <div className="mt-12 space-y-4 border-t border-line pt-8">
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-accent"
              >
                <Mail aria-hidden className="h-4 w-4 shrink-0 text-faint" />
                {site.contact.email}
              </a>
              <a
                href={`tel:${site.contact.phoneHref}`}
                className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-accent"
              >
                <Phone aria-hidden className="h-4 w-4 shrink-0 text-faint" />
                {site.contact.phoneDisplay}
              </a>
              <p className="flex items-center gap-3 text-sm text-muted">
                <MapPin aria-hidden className="h-4 w-4 shrink-0 text-faint" />
                {site.contact.address.line1}, {site.contact.address.line2}
              </p>
            </div>

            <ButtonAnchor
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              className="mt-8"
            >
              <MessageCircle aria-hidden className="h-4 w-4" />
              Or message us on WhatsApp
            </ButtonAnchor>
          </Reveal>

          <Reveal i={1}>
            <div className="card p-6 sm:p-9">
              {status === "sent" ? (
                <div className="flex min-h-[26rem] flex-col items-center justify-center text-center">
                  <CheckCircle2 aria-hidden className="h-10 w-10 text-accent" />
                  <h3 className="mt-6 text-2xl font-medium">Thank you — that's with us.</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                    We'll come back to you within one working day. If it's urgent, WhatsApp is the
                    fastest way to reach the team.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8"
                    onClick={() => setStatus("idle")}
                    type="button"
                  >
                    Send another enquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField
                      label="Your name"
                      required
                      autoComplete="name"
                      value={data.name}
                      error={errors.name}
                      onChange={(e) => set("name")(e.target.value)}
                    />
                    <TextField
                      label="Email"
                      type="email"
                      required
                      autoComplete="email"
                      value={data.email}
                      error={errors.email}
                      onChange={(e) => set("email")(e.target.value)}
                    />
                    <TextField
                      label="Phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+971 …"
                      value={data.phone}
                      error={errors.phone}
                      onChange={(e) => set("phone")(e.target.value)}
                    />
                    <TextField
                      label="Company or property"
                      autoComplete="organization"
                      value={data.organisation}
                      onChange={(e) => set("organisation")(e.target.value)}
                    />
                    <SelectField
                      label="What's the space?"
                      required
                      className="sm:col-span-2"
                      options={interestOptions}
                      value={data.interest}
                      onChange={(e) => set("interest")(e.target.value)}
                    />
                    <TextArea
                      label="Tell us about it"
                      required
                      className="sm:col-span-2"
                      placeholder="Approximate size, type of air conditioning, and anything you've noticed — smell, allergies, visible growth."
                      value={data.message}
                      error={errors.message}
                      onChange={(e) => set("message")(e.target.value)}
                    />
                  </div>

                  {/* Honeypot — hidden from people, tempting to bots. */}
                  <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
                    <label htmlFor="website-hp">Website</label>
                    <input
                      id="website-hp"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={data.website}
                      onChange={(e) => set("website")(e.target.value)}
                    />
                  </div>

                  {formError && (
                    <p
                      role="alert"
                      className="mt-6 flex items-start gap-2.5 rounded-lg border border-warn/30 bg-warn/[0.07] p-4 text-sm leading-relaxed text-ink"
                    >
                      <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-warn" />
                      {formError}
                    </p>
                  )}

                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <Button type="submit" size="lg" disabled={status === "sending"}>
                      {status === "sending" && (
                        <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
                      )}
                      {status === "sending" ? "Sending…" : "Request an assessment"}
                    </Button>
                    <p className="text-xs text-faint">
                      We'll only use your details to respond to this enquiry.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
