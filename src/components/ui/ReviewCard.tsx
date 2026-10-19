import { Quote } from "lucide-react";
import { sectorLabel, type Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/utils";

/** The quote with its highlight phrase picked out, if it has one. */
export function QuoteText({
  quote,
  highlight,
  className,
}: {
  quote: string;
  highlight?: string;
  className?: string;
}) {
  const at = highlight ? quote.indexOf(highlight) : -1;
  return (
    <blockquote className={className}>
      <p>
        “
        {at < 0 ? (
          quote
        ) : (
          <>
            {quote.slice(0, at)}
            <mark className="rounded-sm bg-accent/15 px-0.5 text-ink">{highlight}</mark>
            {quote.slice(at + highlight!.length)}
          </>
        )}
        ”
      </p>
    </blockquote>
  );
}

/**
 * Marks a review that is awaiting approval. Only ever seen on preview
 * builds, since pending reviews are left out of the live site.
 */
export function PendingBadge({ note }: { note: string }) {
  return (
    <span
      title={note}
      className="inline-flex max-w-full items-center rounded-md border border-warn/40 px-2.5 py-1 text-[0.75rem] leading-snug text-warn"
    >
      Awaiting approval · {note}
    </span>
  );
}

/**
 * A text-led quote card for the grid and the homepage strip. Deliberately no
 * portrait, rating or platform badge.
 */
export function ReviewCard({ t, className }: { t: Testimonial; className?: string }) {
  return (
    <figure className={cn("card flex flex-col p-6 sm:p-7", className)}>
      <div className="flex items-center justify-between gap-3">
        <Quote aria-hidden className="h-5 w-5 text-accent/70" />
        <span className="font-mono text-[0.75rem] uppercase tracking-wider text-faint">
          {sectorLabel[t.sector]}
        </span>
      </div>

      <QuoteText
        quote={t.quote}
        highlight={t.highlight}
        className="mt-5 flex-1 text-lg leading-relaxed text-ink"
      />

      <figcaption className="mt-6 border-t border-line pt-5 text-sm text-muted">
        {t.attribution}
      </figcaption>

      {t.pending && (
        <div className="mt-4">
          <PendingBadge note={t.pending} />
        </div>
      )}
    </figure>
  );
}
