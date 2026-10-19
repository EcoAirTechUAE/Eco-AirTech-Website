import { useMemo, useState, type ReactNode } from "react";
import { ArrowRight, Quote } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { VideoFacade } from "@/components/ui/VideoFacade";
import {
  Avatar,
  QuoteText,
  ReviewCard,
  SampleBadge,
  attribution,
} from "@/components/ui/ReviewCard";
import { ContactSection } from "@/components/sections/ContactSection";
import {
  featuredTestimonials,
  reviewsPage,
  sectorLabel,
  wallTestimonials,
  type Sector,
  type Testimonial,
} from "@/content/testimonials";
import { cn } from "@/lib/utils";

/**
 * /reviews
 *
 * Two layouts on purpose. Featured stories alternate media and quote so a
 * few in-depth accounts carry weight; the rest sit in a masonry grid that is
 * quick to skim and can be narrowed to the visitor's own sector. No carousel:
 * hidden slides are rarely seen and carry less weight with search engines.
 */
export default function Reviews() {
  const [sector, setSector] = useState<Sector | "all">("all");

  // Only offer filters for sectors that actually have reviews.
  const sectors = useMemo(
    () => [...new Set(wallTestimonials.map((t) => t.sector))],
    [],
  );
  const visible = useMemo(
    () => (sector === "all" ? wallTestimonials : wallTestimonials.filter((t) => t.sector === sector)),
    [sector],
  );

  return (
    <>
      <PageHero
        eyebrow={reviewsPage.eyebrow}
        title={reviewsPage.title}
        lead={reviewsPage.lead}
        crumbs={[{ label: "Reviews" }]}
      />

      {featuredTestimonials.length > 0 && (
        <Section>
          <div className="container">
            <Reveal>
              <p className="eyebrow">{reviewsPage.featuredHeadline}</p>
            </Reveal>
            <div className="mt-10 space-y-20 sm:space-y-28">
              {featuredTestimonials.map((t, i) => (
                <FeaturedStory key={t.id} t={t} flip={i % 2 === 1} />
              ))}
            </div>
          </div>
        </Section>
      )}

      {wallTestimonials.length > 0 && (
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
              Showing {visible.length} of {wallTestimonials.length} reviews
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
              <p className="mt-3 text-muted">{reviewsPage.cta.body}</p>
            </div>
            <ButtonLink to="/contact" size="lg">
              Book an assessment
              <ArrowRight aria-hidden className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      <ContactSection />
    </>
  );
}

function FeaturedStory({ t, flip }: { t: Testimonial; flip: boolean }) {
  const { who, where } = attribution(t);

  return (
    <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={cn(flip && "lg:order-2")}>
        <StoryMedia t={t} />
      </Reveal>

      <Reveal i={1}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.75rem] uppercase tracking-wider text-accent">
            {sectorLabel[t.sector]}
          </span>
          {t.sample && <SampleBadge />}
        </div>

        <QuoteText
          t={t}
          className="mt-5 text-xl leading-relaxed text-ink sm:text-[1.4rem] sm:leading-[1.55]"
        />

        <div className="mt-7 flex items-center gap-4">
          <Avatar t={t} size="lg" />
          <div>
            <p className="font-medium text-ink">{who}</p>
            <p className="text-sm text-faint">{where}</p>
          </div>
        </div>

        {t.metrics && t.metrics.length > 0 && (
          <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-7 sm:grid-cols-3">
            {t.metrics.slice(0, 3).map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="tnum block text-3xl font-medium text-accent">{m.value}</span>
                  <span className="mt-1 block text-[0.8125rem] leading-snug text-muted">
                    {m.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}

        {t.studyId && (
          <ButtonLink to="/results" variant="ghost" className="mt-6 px-0">
            See the test data
            <ArrowRight aria-hidden className="h-4 w-4" />
          </ButtonLink>
        )}
      </Reveal>
    </article>
  );
}

/** Video, else a photo of the space, else the logo, else a large quote mark. */
function StoryMedia({ t }: { t: Testimonial }) {
  const { who, where } = attribution(t);

  if (t.video) return <VideoFacade video={t.video} />;
  if (t.image) {
    return (
      <SmartImage
        src={t.image}
        alt={`${where}`}
        label={`Photo for ${who}`}
        className="rounded-2xl"
      />
    );
  }
  return (
    <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl border border-line bg-surface">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.12),transparent_65%)]"
      />
      {t.logo ? (
        <SmartImage
          src={t.logo}
          alt={t.organisation ?? ""}
          label={`Logo for ${t.organisation ?? who}`}
          ratio=""
          className="relative h-20 w-auto max-w-[60%] object-contain"
        />
      ) : (
        <Quote aria-hidden className="relative h-16 w-16 text-accent/40" />
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
