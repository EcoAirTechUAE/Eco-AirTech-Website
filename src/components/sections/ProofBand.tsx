import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Stat } from "@/components/ui/Stat";
import { ButtonLink } from "@/components/ui/Button";
import { headlineResults } from "@/content/testResults";
import { testingMethod, testingPartners } from "@/content/technology";
import { PartnerRow } from "@/components/ui/PartnerRow";

export function ProofBand() {
  return (
    <Section id="results" surface>
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-accent/50" />
            The evidence
          </p>
          <h2 className="mt-6 text-display-md font-medium">
            Every number here comes with the conditions that produced it.
          </h2>
          <p className="mt-6 max-w-prose leading-relaxed text-muted">
            Air technology is full of unqualified percentages. Ours are published with the product,
            the technologies fitted, the duration, the space and the laboratory — including the
            results that are less flattering, because a range you can interrogate is worth more than
            a headline you cannot.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 border-y border-line py-12 sm:grid-cols-2 lg:grid-cols-4">
          {headlineResults.map((result, i) => (
            <Reveal key={result.studyId} i={i}>
              <Stat
                value={result.value}
                prefix={result.prefix}
                suffix={result.suffix}
                label={result.label}
                context={result.context}
              />
            </Reveal>
          ))}
        </div>

        {/* Live vs lab — the methodology argument */}
        <div className="mt-20 grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{testingMethod.eyebrow}</p>
            <h3 className="mt-5 text-display-sm font-medium">{testingMethod.headline}</h3>
            <p className="mt-5 max-w-prose leading-relaxed text-muted">{testingMethod.body}</p>

            <div className="mt-9 rounded-xl border border-line bg-surface/60 p-6">
              <h4 className="text-sm font-medium text-ink">{testingMethod.sampling.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {testingMethod.sampling.body}
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5 sm:grid-cols-3">
                {testingMethod.sampling.specs.map((spec) => (
                  <div key={spec.label}>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">
                      {spec.label}
                    </dt>
                    <dd className="tnum mt-1 text-sm font-medium text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal i={1} className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-accent/30 bg-accent/[0.06] p-6">
              <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                {testingMethod.comparison.live.subtitle}
              </p>
              <h4 className="mt-3 text-lg font-medium">{testingMethod.comparison.live.title}</h4>
              <ul className="mt-5 space-y-3.5">
                {testingMethod.comparison.live.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-line bg-surface/60 p-6">
              <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
                {testingMethod.comparison.lab.subtitle}
              </p>
              <h4 className="mt-3 text-lg font-medium text-muted">
                {testingMethod.comparison.lab.title}
              </h4>
              <ul className="mt-5 space-y-3.5">
                {testingMethod.comparison.lab.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-faint" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal i={2} className="mt-16">
          <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
            Our testing partners
          </p>
          <PartnerRow partners={testingPartners} className="mt-6" />
        </Reveal>

        <Reveal i={3} className="mt-14">
          <ButtonLink to="/results" size="lg">
            Read the full test results
            <ArrowRight aria-hidden className="h-4 w-4" />
          </ButtonLink>
        </Reveal>
      </div>
    </Section>
  );
}
