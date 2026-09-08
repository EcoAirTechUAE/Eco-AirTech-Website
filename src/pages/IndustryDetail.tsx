import { Navigate, Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { VideoFacade } from "@/components/ui/VideoFacade";
import { SmartImage } from "@/components/ui/SmartImage";
import { DeviceCard } from "@/components/ui/DeviceCard";
import { Stat } from "@/components/ui/Stat";
import { ContactSection } from "@/components/sections/ContactSection";
import { industries, industryBySlug } from "@/content/industries";
import { deviceBySlug } from "@/content/devices";
import { site } from "@/config/site";
import { useMeta } from "@/lib/useMeta";
import { cn } from "@/lib/utils";

export default function IndustryDetail() {
  const { slug } = useParams();
  const industry = industryBySlug(slug);

  useMeta(industry?.name ?? "Industries", industry?.summary);

  if (!industry) return <Navigate to="/industries" replace />;

  const recommended = industry.devices
    .map((deviceSlug) => deviceBySlug(deviceSlug))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  const others = industries.filter((i) => i.slug !== industry.slug).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow={industry.kicker}
        title={industry.name}
        lead={industry.summary}
        crumbs={[{ label: "Industries", to: "/industries" }, { label: industry.name }]}
      >
        {industry.proof && (
          <Reveal i={2} className="mt-12 border-t border-line pt-10">
            <Stat
              value={industry.proof.value}
              label={industry.proof.label}
              context={industry.proof.context}
            />
          </Reveal>
        )}
      </PageHero>

      {/* Film where we have one; otherwise the sector photograph, so every
          detail page carries an image rather than going straight to body copy. */}
      <Section tight>
        <div className="container">
          <Reveal>
            {industry.video ? (
              <VideoFacade video={site.videos[industry.video]} />
            ) : (
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line sm:aspect-[21/9]">
                <SmartImage
                  src={industry.image}
                  alt=""
                  label={industry.name}
                  ratio="absolute inset-0"
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover",
                    industry.focal,
                  )}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent"
                />
              </div>
            )}
          </Reveal>
        </div>
      </Section>

      {/* The argument for this sector */}
      <Section tight={Boolean(industry.video)}>
        <div className="container grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal className="space-y-5">
            {industry.body.map((para) => (
              <p key={para.slice(0, 32)} className="max-w-prose text-lg leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </Reveal>

          <Reveal i={1}>
            <div className="card p-7 sm:p-8">
              <h2 className="font-mono text-[11px] uppercase tracking-wider text-accent">
                What matters here
              </h2>
              <ul className="mt-7 space-y-7">
                {industry.concerns.map((concern) => (
                  <li key={concern.title}>
                    <h3 className="text-base font-medium leading-snug">{concern.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{concern.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Recommended specification */}
      <Section surface>
        <div className="container">
          <Reveal className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-accent/50" />
              Typical specification
            </p>
            <h2 className="mt-6 text-display-sm font-medium">
              Where we'd usually start for {industry.name.toLowerCase()}.
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              Indicative only — the final specification follows the site assessment and baseline air
              test, and depends on served volume and how the space is actually used.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((device, i) => (
              <Reveal key={device.slug} i={i} className="h-full">
                <DeviceCard device={device} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Other sectors */}
      <Section tight>
        <div className="container">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-display-sm font-medium">Other sectors</h2>
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
            >
              See all
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </Reveal>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other, i) => (
              <Reveal as="li" key={other.slug} i={i}>
                <Link
                  to={`/industries/${other.slug}`}
                  className="group flex h-full flex-col justify-between rounded-xl border border-line bg-surface/50 p-5 transition-colors hover:border-accent/40 hover:bg-surface"
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-faint">
                    {other.kicker}
                  </span>
                  <span className="mt-6 flex items-center justify-between gap-2 text-base font-medium">
                    {other.name}
                    <ArrowRight
                      aria-hidden
                      className="h-4 w-4 text-faint transition-all group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <ContactSection />
    </>
  );
}
