import { useMemo, useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Stat } from "@/components/ui/Stat";
import { StudyCard } from "@/components/ui/StudyCard";
import { PartnerRow } from "@/components/ui/PartnerRow";
import { ContactSection } from "@/components/sections/ContactSection";
import { headlineResults, resultsPage, studies } from "@/content/testResults";
import { testingPartners } from "@/content/technology";
import { cn } from "@/lib/utils";

type Filter = "all" | "live" | "lab" | "field";

const kindFilters = [
  { id: "all", label: "All studies" } as const,
  { id: "live", label: "Live environment" } as const,
  { id: "field", label: "Field tests" } as const,
  { id: "lab", label: "Laboratory" } as const,
];

export default function Results() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    if (filter === "all") return studies;
    return studies.filter((s) => s.kind === filter);
  }, [filter]);

  return (
    <>
      <PageHero
        eyebrow={resultsPage.eyebrow}
        title={resultsPage.title}
        lead={resultsPage.lead}
        crumbs={[{ label: "Results" }]}
      >
        <div className="mt-14 grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
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
      </PageHero>

      <Section tight surface>
        <div className="container">
          <Reveal>
            <p className="font-mono text-[0.8125rem] uppercase tracking-wider text-faint">
              {resultsPage.partnersLabel}
            </p>
            <PartnerRow partners={testingPartners} className="mt-6" />
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="container">
          {/* Filters */}
          <Reveal>
            <div className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-display-sm font-medium">{resultsPage.studiesHeadline}</h2>
              <div
                role="group"
                aria-label="Filter by test type"
                className="flex flex-wrap items-center gap-2"
              >
                {kindFilters.map((f) => (
                  <FilterChip
                    key={f.id}
                    active={filter === f.id}
                    onClick={() => setFilter(f.id)}
                    label={f.label}
                  />
                ))}
              </div>

            </div>
          </Reveal>

          <p aria-live="polite" className="mt-6 font-mono text-[0.8125rem] text-faint">
            Showing {visible.length} of {studies.length} studies
          </p>

          <div className="mt-8 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((study, i) => (
              <Reveal key={study.id} i={i % 3}>
                <StudyCard study={study} compact />
              </Reveal>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="py-20 text-center text-muted">
              No published studies match that filter yet.
            </p>
          )}
        </div>
      </Section>

      {/* Methodology */}
      <Section surface>
        <div className="container">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">{resultsPage.method.eyebrow}</p>
            <h2 className="mt-5 text-display-md font-medium">{resultsPage.method.headline}</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">{resultsPage.method.body}</p>
            <p className="mt-6 border-l-2 border-accent/40 pl-5 body-text">
              {resultsPage.method.sampling}
            </p>
          </Reveal>
        </div>
      </Section>

      <ContactSection />
    </>
  );
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
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
      {label}
    </button>
  );
}
