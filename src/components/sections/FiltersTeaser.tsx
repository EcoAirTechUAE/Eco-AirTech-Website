import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { Bloom } from "@/components/ui/Bloom";
import { filterProof, nanofiber } from "@/content/filters";

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

          {/* The clearest argument we have for specifying both halves together. */}
          <Reveal i={1}>
            <div className="card p-6 sm:p-8">
              <h3 className="text-lg font-medium">{filterProof.headline}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{filterProof.body}</p>

              <div className="scroll-x mt-7">
                <table className="w-full min-w-[440px] border-collapse text-sm">
                  <caption className="sr-only">
                    Reduction with and without a treated filter fitted
                  </caption>
                  <thead>
                    <tr className="border-b border-line-strong text-left">
                      <th
                        scope="col"
                        className="py-2.5 pr-4 font-mono text-[11px] uppercase tracking-wider text-faint"
                      >
                        Contaminant
                      </th>
                      <th
                        scope="col"
                        className="py-2.5 pr-4 text-right font-mono text-[11px] uppercase tracking-wider text-faint"
                      >
                        Active only
                      </th>
                      <th
                        scope="col"
                        className="py-2.5 text-right font-mono text-[11px] uppercase tracking-wider text-accent"
                      >
                        + treated filter
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {filterProof.rows.map((row) => (
                      <tr key={row.name}>
                        <td className="py-3 pr-4 text-ink">{row.name}</td>
                        <td className="tnum py-3 pr-4 text-right text-muted">{row.without}</td>
                        <td className="tnum py-3 text-right font-medium text-accent">{row.with}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-6 border-t border-line pt-5 font-mono text-[11px] leading-relaxed text-faint">
                {filterProof.note}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
