import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Stat } from "@/components/ui/Stat";
import { ButtonLink } from "@/components/ui/Button";
import { headlineResults } from "@/content/testResults";
import { testingPartners } from "@/content/technology";
import { PartnerRow } from "@/components/ui/PartnerRow";

export function ProofBand() {
  return (
    <Section id="results" surface>
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">
            The evidence
          </p>
          <h2 className="mt-6 text-display-md font-medium">
            Independently tested, in real buildings.
          </h2>
          <p className="mt-6 max-w-prose leading-relaxed text-muted">
            Every figure is published with the conditions that produced it: the product, the
            duration, the space and the laboratory.
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

        <Reveal i={2} className="mt-14">
          <p className="font-mono text-[0.8125rem] uppercase tracking-wider text-faint">
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
