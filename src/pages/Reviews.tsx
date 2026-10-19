import { Fragment, useMemo, useState, type ReactNode } from "react";
import { ArrowDown } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonAnchor } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { PendingBadge, QuoteText, ReviewCard } from "@/components/ui/ReviewCard";
import { ContactSection } from "@/components/sections/ContactSection";
import {
  gridTestimonials,
  leadTestimonial,
  publishedStories,
  secondLeadTestimonial,
  reviewsPage,
  sectorLabel,
  type FeaturedStory,
  type Sector,
  type Testimonial,
} from "@/content/testimonials";
import { cn } from "@/lib/utils";

/**
 * /reviews
 *
 * Featured stories alternate image and text so a few accounts carry weight;
 * shorter quotes sit in a text-led masonry grid that can be narrowed by
 * sector. No carousel: hidden slides are rarely seen and carry less weight
 * with search engines. Sections with nothing approved simply don't render.
 */
export default function Reviews() {
  const [sector, setSector] = useState<Sector | "all">("all");

  // Filters only for sectors that actually have quotes.
  const sectors = useMemo(
    () => [...new Set(gridTestimonials.map((t) => t.sector))],
    [],
  );
  const visible = useMemo(
    () =>
      sector === "all"
        ? gridTestimonials
        : gridTestimonials.filter((t) => t.sector === sector),
    [sector],
  );

  return (
    <>
      <PageHero
        eyebrow={reviewsPage.eyebrow}
        title={reviewsPage.title}
        lead={reviewsPage.lead}
        crumbs={[{ label: "Reviews" }]}
      >
        <p className="mt-8 max-w-prose border-l-2 border-accent/40 pl-5 text-sm leading-relaxed text-faint">
          {reviewsPage.confidentiality}
        </p>
      </PageHero>

      {leadTestimonial && (
        <section className="relative overflow-hidden border-b border-line">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,hsl(var(--accent)/0.10),transparent_60%)]"
          />
          <div className="container relative py-20 sm:py-28">
            <LeadQuote t={leadTestimonial} />
          </div>
        </section>
      )}

      {publishedStories.length > 0 && (
        <Section>
          <div className="container space-y-24 sm:space-y-32">
            {publishedStories.map((story, i) => (
              <Fragment key={story.id}>
                <Story story={story} flip={i % 2 === 1} />
                {/* The second lead quote follows the home stories and turns the
                    page towards hospitality; after the last story if fewer. */}
                {i === Math.min(1, publishedStories.length - 1) && secondLeadTestimonial && (
                  <div className="border-y border-line py-16 sm:py-24">
                    <LeadQuote t={secondLeadTestimonial} />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </Section>
      )}

      {publishedStories.length === 0 && secondLeadTestimonial && (
        <Section>
          <div className="container">
            <LeadQuote t={secondLeadTestimonial} />
          </div>
        </Section>
      )}

      {gridTestimonials.length > 0 && (
        <Section surface>
          <div className="container">
            <Reveal>
              <div className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-display-sm font-medium">{reviewsPage.wallHeadline}</h2>
                {sectors.length > 1 && (
                  <div role="group" aria-label="Filter by sector" className="flex flex-wrap gap-2">
                    <Chip active={sector === "all"} onClick={() => setSector("all")}>
                      All
                    </Chip>
                    {sectors.map((s) => (
                      <Chip key={s} active={sector === s} onClick={() => setSector(s)}>
                        {sectorLabel[s]}
                      </Chip>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>

            <p aria-live="polite" className="sr-only">
              Showing {visible.length} of {gridTestimonials.length} quotes
            </p>

            {/* CSS columns give the masonry stagger without a library; each
                card refuses to split across a column break. */}
            <div className="mt-10 gap-5 sm:columns-2 lg:columns-3">
              {visible.map((t) => (
                <ReviewCard key={t.id} t={t} className="mb-5 break-inside-avoid" />
              ))}
            </div>
          </div>
        </Section>
      )}

      <Section tight>
        <div className="container">
          <Reveal className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-surface/60 p-8 sm:p-10 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-display-sm font-medium">{reviewsPage.cta.headline}</h2>
              <p className="mt-3 leading-relaxed text-muted">{reviewsPage.cta.body}</p>
            </div>
            {/* The form is the next section down, so take them straight to it. */}
            <ButtonAnchor href="#contact" size="lg">
              {reviewsPage.cta.button}
              <ArrowDown aria-hidden className="h-4 w-4" />
            </ButtonAnchor>
          </Reveal>
        </div>
      </Section>

      <ContactSection />
    </>
  );
}

/** A quotation set at headline size, for the page's lead quotes. */
function LeadQuote({ t }: { t: Testimonial }) {
  return (
    <Reveal className="max-w-5xl">
      <QuoteText
        quote={t.quote}
        highlight={t.highlight}
        className="text-display-lg font-medium text-ink"
      />
      <p className="mt-8 font-mono text-[0.8125rem] uppercase tracking-wider text-accent">
        {t.attribution}
      </p>
      {t.pending && (
        <div className="mt-5">
          <PendingBadge note={t.pending} />
        </div>
      )}
    </Reveal>
  );
}

function Story({ story, flip }: { story: FeaturedStory; flip: boolean }) {
  const illustrative = Boolean(story.label);

  return (
    <article
      className={cn(
        illustrative && "rounded-2xl border border-dashed border-warn/40 p-6 sm:p-10",
      )}
    >
      {story.label && (
        <p className="mb-8 inline-block rounded-full border border-warn/40 px-3 py-1 text-[0.8125rem] text-warn">
          {story.label}
        </p>
      )}

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className={cn(flip && "lg:order-2")}>
          <StoryMedia story={story} />
        </Reveal>

        <Reveal i={1}>
          <p className="font-mono text-[0.75rem] uppercase tracking-wider text-accent">
            {sectorLabel[story.sector]}
          </p>
          <h2 className="mt-4 text-display-sm font-medium">{story.headline}</h2>
          <p className="mt-4 leading-relaxed text-muted">{story.context}</p>

          {story.quote && (
            <QuoteText
              quote={story.quote}
              highlight={story.highlight}
              className="mt-7 border-l-2 border-accent/50 pl-5 text-xl leading-relaxed text-ink sm:text-[1.35rem] sm:leading-[1.55]"
            />
          )}

          {story.body && (
            <div className="mt-7 space-y-4 leading-relaxed text-ink/90">
              {story.body.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          )}

          <p className="mt-6 text-sm text-faint">{story.attribution}</p>

          {story.pending && (
            <div className="mt-5">
              <PendingBadge note={story.pending} />
            </div>
          )}
        </Reveal>
      </div>
    </article>
  );
}

/**
 * The supplied images, a main one with an optional smaller inset overlapping
 * its corner, captioned as illustrative where stock or generated. Otherwise
 * an oversized quotation mark on a dark ground, as the brief asks, rather
 * than an empty frame.
 */
function StoryMedia({ story }: { story: FeaturedStory }) {
  const images = story.images;
  if (images) {
    const illustrative = images.main.illustrative || images.inset?.illustrative;
    const caption = [images.caption, illustrative && "Illustrative image", images.credit && `Image: ${images.credit}`]
      .filter(Boolean)
      .join(" · ");
    return (
      <figure>
        <div className={cn("relative", images.inset && "mb-10 sm:mb-14")}>
          <SmartImage
            src={images.main.src}
            alt={images.main.alt}
            className="w-full rounded-2xl object-cover"
          />
          {images.inset && (
            <div className="absolute -bottom-10 end-4 w-[42%] overflow-hidden rounded-xl border-4 border-bg shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)] sm:-bottom-14 sm:end-6">
              <SmartImage
                src={images.inset.src}
                alt={images.inset.alt}
                className="w-full object-cover"
              />
            </div>
          )}
        </div>
        {caption && <figcaption className="mt-3 text-[0.75rem] text-faint">{caption}</figcaption>}
      </figure>
    );
  }

  return (
    <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl border border-line bg-surface">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,hsl(var(--accent)/0.14),transparent_60%)]"
      />
      <span
        aria-hidden
        className="relative select-none font-serif text-[10rem] leading-none text-accent/35 sm:text-[14rem]"
      >
        “
      </span>
      {__SHOW_PENDING_REVIEWS__ && story.imageBrief && (
        <p className="absolute inset-x-5 bottom-4 text-center text-[0.75rem] text-faint">
          Image wanted: {story.imageBrief}
        </p>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-[0.8125rem] transition-colors duration-200",
        active
          ? "border-accent/50 bg-accent/10 text-accent"
          : "border-line-strong text-muted hover:border-accent/30 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
