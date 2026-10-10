import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { industries } from "@/content/industries";
import { cn } from "@/lib/utils";

export function IndustriesGrid() {
  return (
    <Section id="industries">
      <div className="container">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">
              Who we work with
            </p>
            <h2 className="mt-6 text-display-md font-medium">
              The same technology. Very different reasons for wanting it.
            </h2>
            <p className="mt-6 max-w-prose leading-relaxed text-muted">
              Homes, hotels, schools and hospitals each have their own reasons. Pick yours.
            </p>
          </Reveal>

          <Reveal i={1} className="shrink-0">
            <ButtonLink to="/industries" variant="outline" size="lg">
              All sectors
              <ArrowRight aria-hidden className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>

        {/* Eight sectors divides evenly by both 2 and 4, so the grid always
            fills — no ragged empty cells at the bottom. */}
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, i) => (
            <Reveal as="li" key={industry.slug} i={i}>
              <Link
                to={`/industries/${industry.slug}`}
                className="group relative flex h-full min-h-[18rem] flex-col justify-end overflow-hidden rounded-xl border border-line p-6 transition-colors duration-500 hover:border-accent/40"
              >
                <SmartImage
                  src={industry.image}
                  alt=""
                  label={industry.name}
                  ratio="absolute inset-0"
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                    industry.focal,
                  )}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-bg via-bg/45 to-transparent transition-opacity duration-500 group-hover:via-bg/30"
                />

                {industry.video && (
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-bg/70 px-2.5 py-1 font-mono text-[0.8125rem] uppercase tracking-wider text-accent backdrop-blur-sm">
                    <Play aria-hidden className="h-2.5 w-2.5 fill-current" />
                    Film
                  </span>
                )}

                <div className="relative">
                  <h3 className="text-lg font-medium leading-snug">{industry.name}</h3>
                  <p className="mt-1 text-xs text-muted">{industry.kicker}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
