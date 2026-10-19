import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { reviewsPage, testimonials } from "@/content/testimonials";

/**
 * Three short quotes on the homepage, pointing to /reviews.
 *
 * Most visitors never open a reviews page, so the best few meet them on the
 * way to the contact form. Featured stories first, then the shortest of the
 * rest: a long quote in a three-up row makes the whole band uneven.
 */
export function ReviewsStrip() {
  const picks = [...testimonials]
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || a.quote.length - b.quote.length)
    .slice(0, 3);

  if (picks.length === 0) return null;

  return (
    <Section>
      <div className="container">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">{reviewsPage.strip.eyebrow}</p>
            <h2 className="mt-5 text-display-md font-medium">{reviewsPage.strip.headline}</h2>
          </div>
          <ButtonLink to="/reviews" variant="outline">
            {reviewsPage.strip.cta}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </ButtonLink>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-5 md:grid-cols-3">
          {picks.map((t, i) => (
            <Reveal key={t.id} i={i} className="flex">
              <ReviewCard t={t} className="w-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
