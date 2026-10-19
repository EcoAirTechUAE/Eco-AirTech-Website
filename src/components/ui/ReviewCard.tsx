import { Quote } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { sectorLabel, type Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/utils";

/**
 * Who said it, in one line: "Name, Role, Organisation" for named clients,
 * "Role, Property" for confidential ones. Location is shown separately.
 */
export function attribution(t: Testimonial): { who: string; where: string } {
  const who = [t.name, t.role].filter(Boolean).join(", ");
  const where = [t.organisation ?? t.property, t.location].filter(Boolean).join(" · ");
  return { who, where };
}

/** The quote with its highlight phrase picked out, if it has one. */
export function QuoteText({ t, className }: { t: Testimonial; className?: string }) {
  const at = t.highlight ? t.quote.indexOf(t.highlight) : -1;
  return (
    <blockquote className={className}>
      <p>
        {at < 0 ? (
          t.quote
        ) : (
          <>
            {t.quote.slice(0, at)}
            <mark className="rounded-sm bg-accent/15 px-0.5 text-ink">{t.highlight}</mark>
            {t.quote.slice(at + t.highlight!.length)}
          </>
        )}
      </p>
    </blockquote>
  );
}

export function SampleBadge() {
  return (
    <span className="rounded-full border border-warn/40 px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-wider text-warn">
      Sample
    </span>
  );
}

/** Headshot, else logo, else initials, so a card never has an empty slot. */
export function Avatar({ t, size = "md" }: { t: Testimonial; size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-14 w-14" : "h-10 w-10";
  if (t.photo) {
    return (
      <SmartImage
        src={t.photo}
        alt=""
        ratio=""
        className={cn(box, "shrink-0 rounded-full object-cover p-0")}
      />
    );
  }
  const initials = (t.name ?? t.role)
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
  return (
    <span
      aria-hidden
      className={cn(
        box,
        "grid shrink-0 place-items-center rounded-full border border-accent/25 bg-accent/10 font-medium text-accent",
        size === "lg" ? "text-base" : "text-[0.8125rem]",
      )}
    >
      {initials}
    </span>
  );
}

/** A quote card for the grid and the homepage strip. */
export function ReviewCard({ t, className }: { t: Testimonial; className?: string }) {
  const { who, where } = attribution(t);
  return (
    <figure className={cn("card flex flex-col p-6 sm:p-7", className)}>
      <div className="flex items-center justify-between gap-3">
        <Quote aria-hidden className="h-5 w-5 text-accent/70" />
        <div className="flex items-center gap-2">
          {t.sample && <SampleBadge />}
          <span className="font-mono text-[0.75rem] uppercase tracking-wider text-faint">
            {sectorLabel[t.sector]}
          </span>
        </div>
      </div>

      <QuoteText t={t} className="mt-5 flex-1 leading-relaxed text-ink/90" />

      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <Avatar t={t} />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">{who}</p>
          <p className="truncate text-[0.8125rem] text-faint">{where}</p>
        </div>
        {t.source && (
          <span className="ms-auto shrink-0 text-[0.75rem] text-faint">via {t.source}</span>
        )}
      </figcaption>
    </figure>
  );
}
