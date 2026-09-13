import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { Bloom } from "@/components/ui/Bloom";
import { nanofiber, odogardProcess, vsCarbon } from "@/content/filters";

export function FiltersTeaser() {
  return (
    <Section surface>
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-accent/50" />
              Filtration
            </p>
            <h2 className="mt-6 text-display-md font-medium">
              The active system breaks contaminants down. The filter catches what is left.
            </h2>
            <p className="mt-6 max-w-prose leading-relaxed text-muted">
              {nanofiber.body}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/filters" size="lg">
                About our filters
                <ArrowRight aria-hidden className="h-4 w-4" />
              </ButtonLink>
            </div>

            <div className="relative mt-12 hidden h-48 lg:block">
              <Bloom intensity="sm" animate={false} />
              <SmartImage
                src="/assets/filters/merv13a.png"
                alt="MERV 13A nanofiber filter with ODOGard coating"
                label="Filter render"
                ratio="h-48"
                className="h-full w-full object-contain"
              />
            </div>
          </Reveal>

          {/* Three figures against the incumbent, rather than the old
              active-vs-filter table: that compared two separate studies and
              read as though the filter made things marginally worse. */}
          <Reveal i={1}>
            <div className="card p-6 sm:p-8">
              <h3 className="text-lg font-medium">{vsCarbon.headline}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{vsCarbon.body}</p>

              <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
                {vsCarbon.stats.map((s) => (
                  <div key={s.label} className="bg-surface p-5">
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <p className="tnum text-2xl font-medium text-accent">{s.value}</p>
                      <p className="mt-2 text-sm font-medium text-ink">{s.label}</p>
                      <p className="mt-1 text-xs text-muted">{s.context}</p>
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                {odogardProcess.body}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
