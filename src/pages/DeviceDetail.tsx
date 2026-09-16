import { Navigate, Link, useParams } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { StudyCard } from "@/components/ui/StudyCard";
import { DeviceCard } from "@/components/ui/DeviceCard";
import { ContactSection } from "@/components/sections/ContactSection";
import { devices, deviceBySlug } from "@/content/devices";
import { studiesFor } from "@/content/testResults";

export default function DeviceDetail() {
  const { slug } = useParams();
  const device = deviceBySlug(slug);

  if (!device) return <Navigate to="/devices" replace />;

  const studies = studiesFor(device.slug);
  const others = devices.filter((d) => d.slug !== device.slug);

  return (
    <>
      <PageHero
        eyebrow={device.kicker}
        title={device.article}
        lead={device.summary}
        crumbs={[{ label: "Devices", to: "/devices" }, { label: device.article }]}
      >
        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal i={2}>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4 lg:grid-cols-2">
              {device.stats.map((stat) => (
                <div key={`${stat.label}-${stat.value}`}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="tnum block text-3xl font-medium leading-none text-gradient sm:text-4xl">
                      {stat.value}
                    </span>
                    <span className="mt-3 block text-sm leading-snug text-ink">{stat.label}</span>
                    <span className="mt-1 block font-mono text-[0.8125rem] uppercase tracking-wider text-faint">
                      {stat.condition}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-2">
              {device.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line-strong px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal i={3} className="relative">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-black">
              <SmartImage
                src={device.image}
                alt={`${device.article} unit`}
                label={`${device.name} product render`}
                ratio="aspect-square"
                className="h-full w-full object-contain p-6"
              />
            </div>
          </Reveal>
        </div>
      </PageHero>

      {/* Positioning */}
      <Section>
        <div className="container grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <h2 className="text-display-sm font-medium">Why this unit</h2>
            <dl className="mt-8 space-y-5 border-t border-line pt-7 text-sm">
              <div>
                <dt className="font-mono text-[0.8125rem] uppercase tracking-wider text-faint">
                  Coverage
                </dt>
                <dd className="tnum mt-1 text-ink">
                  {device.coverage} {device.coverageNote}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.8125rem] uppercase tracking-wider text-faint">
                  Mounting
                </dt>
                <dd className="mt-1 text-ink">{device.mount}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.8125rem] uppercase tracking-wider text-faint">
                  Best suited to
                </dt>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-x-4 gap-y-2 text-muted">
                    {device.bestFor.map((use) => (
                      <li key={use} className="flex items-center gap-1.5">
                        <Check aria-hidden className="h-3.5 w-3.5 shrink-0 text-accent" />
                        {use}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal i={1} className="space-y-5">
            {device.body.map((para) => (
              <p key={para.slice(0, 32)} className="max-w-prose text-lg leading-relaxed text-muted">
                {para}
              </p>
            ))}

            {device.quote && (
              <blockquote className="!mt-10 border-l-2 border-accent/40 pl-6">
                <p className="text-2xl italic leading-snug text-ink sm:text-[1.75rem]">
                  “{device.quote.text}”
                </p>
                <footer className="mt-3 text-[0.8125rem] text-faint">
                  <span className="text-muted">{device.quote.author}</span> · {device.quote.role}
                </footer>
              </blockquote>
            )}
          </Reveal>
        </div>
      </Section>

      {/* Features */}
      <Section surface tight>
        <div className="container">
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {device.features.map((feature, i) => (
              <Reveal as="li" key={feature.title} i={i}>
                <h3 className="text-base font-medium leading-snug">{feature.title}</h3>
                <p className="mt-2.5 body-text">{feature.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* Variants, where the unit has them */}
      {device.variants && (
        <Section>
          <div className="container">
            <Reveal>
              <h2 className="text-display-sm font-medium">Casing options</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {device.variants.map((variant, i) => (
                <Reveal key={variant.title} i={i}>
                  <article className="card h-full p-7">
                    <h3 className="font-mono text-[0.8125rem] uppercase tracking-wider text-accent">
                      {variant.title}
                    </h3>
                    <p className="mt-4 body-text">{variant.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Evidence */}
      {studies.length > 0 && (
        <Section surface>
          <div className="container">
            <Reveal className="max-w-2xl">
              <p className="eyebrow">
                Test results
              </p>
              <h2 className="mt-6 text-display-md font-medium">
                {studies.length} published {studies.length === 1 ? "study" : "studies"} on this unit.
              </h2>
              <p className="mt-6 leading-relaxed text-muted">
                Each is shown with the exact configuration, technologies, duration and administrator
                that produced it.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 lg:grid-cols-2">
              {studies.map((study, i) => (
                <Reveal key={study.id} i={i % 2} className="h-full">
                  <StudyCard study={study} className="h-full" />
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Other units */}
      <Section>
        <div className="container">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-display-sm font-medium">The rest of the range</h2>
            <Link
              to="/devices"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
            >
              Compare all five
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other, i) => (
              <Reveal key={other.slug} i={i} className="h-full">
                <DeviceCard device={other} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <ContactSection />
    </>
  );
}
