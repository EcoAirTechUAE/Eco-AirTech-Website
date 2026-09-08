import { Link } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { ContactSection } from "@/components/sections/ContactSection";
import { industries } from "@/content/industries";
import { useMeta } from "@/lib/useMeta";
import { cn } from "@/lib/utils";

export default function Industries() {
  useMeta(
    "Industries",
    "Air purification for residential, hotels, palaces and places of worship, healthcare, schools, gyms, hospitality and transportation across the UAE and GCC.",
  );

  return (
    <>
      <PageHero
        eyebrow="Who we work with"
        title="Every sector has a different reason for caring about the air."
        lead="A parent, a hotel general manager, a school principal and a fleet operator are solving genuinely different problems. Each sector below sets out what drives the decision there, and what the evidence looks like."
        crumbs={[{ label: "Industries" }]}
      />

      <Section>
        <div className="container">
          <ul className="grid gap-5 md:grid-cols-2">
            {industries.map((industry, i) => (
              <Reveal as="li" key={industry.slug} i={i % 2} className="h-full">
                <Link
                  to={`/industries/${industry.slug}`}
                  className="group card flex h-full flex-col overflow-hidden transition-colors duration-500 hover:border-accent/40"
                >
                  <div className="relative h-60 overflow-hidden">
                    <SmartImage
                      src={industry.image}
                      alt=""
                      label={industry.name}
                      ratio="h-60"
                      className={cn(
                        "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                        industry.focal,
                      )}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent"
                    />
                    {industry.video && (
                      <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-bg/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent backdrop-blur-sm">
                        <Play aria-hidden className="h-2.5 w-2.5 fill-current" />
                        Film
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                      {industry.kicker}
                    </p>
                    <h2 className="mt-3 flex items-start justify-between gap-3 text-2xl font-medium">
                      {industry.name}
                      <ArrowUpRight
                        aria-hidden
                        className="mt-1 h-5 w-5 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </h2>
                    <p className="mt-4 flex-1 leading-relaxed text-muted">{industry.summary}</p>

                    {industry.proof && (
                      <p className="tnum mt-7 border-t border-line pt-5 font-mono text-xs text-faint">
                        <span className="text-accent">{industry.proof.value}</span>{" "}
                        {industry.proof.label}
                        <span className="mt-1 block normal-case text-faint/70">
                          {industry.proof.context}
                        </span>
                      </p>
                    )}
                  </div>
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
