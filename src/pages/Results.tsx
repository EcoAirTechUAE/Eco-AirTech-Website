import { useMemo, useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Stat } from "@/components/ui/Stat";
import { StudyCard } from "@/components/ui/StudyCard";
import { PartnerRow } from "@/components/ui/PartnerRow";
import { ContactSection } from "@/components/sections/ContactSection";
import { headlineResults, studies } from "@/content/testResults";
import { devices } from "@/content/devices";
import { testingMethod, testingPartners } from "@/content/technology";
import { useMeta } from "@/lib/useMeta";
import { cn } from "@/lib/utils";

type Filter = "all" | "live" | "lab" | "field" | string;

const kindFilters = [
  { id: "all", label: "All studies" },
  { id: "live", label: "Live environment" },
  { id: "field", label: "Field tests" },
  { id: "lab", label: "Laboratory" },
];

export default function Results() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    if (filter === "all") return studies;
    if (["live", "lab", "field"].includes(filter)) return studies.filter((s) => s.kind === filter);
    return studies.filter((s) => s.device === filter);
  }, [filter]);

  useMeta(
    "Test results",
    "Independent laboratory and live-environment testing from IAQS, MRIGlobal, Microchem, Pace Labs and Aerosol Research & Engineering Laboratories — published with full protocols.",
  );

  return (
    <>
      <PageHero
        eyebrow="The evidence"
        title="Every result we have, with the conditions that produced it."
        lead="Including the weaker ones. A range you can interrogate is worth considerably more than a headline percentage you cannot."
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

      <Section>
        <div className="container">
          {/* Filters */}
          <Reveal>
            <div className="flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
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

              <div
                role="group"
                aria-label="Filter by device"
                className="flex flex-wrap items-center gap-2"
              >
                {devices.map((d) => (
                  <FilterChip
                    key={d.slug}
                    active={filter === d.slug}
                    onClick={() => setFilter(d.slug)}
                    label={d.article}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          <p aria-live="polite" className="mt-6 font-mono text-xs text-faint">
            Showing {visible.length} of {studies.length} studies
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {visible.map((study, i) => (
              <Reveal key={study.id} i={i % 2} className="h-full">
                <StudyCard study={study} className="h-full" />
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
        <div className="container grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{testingMethod.eyebrow}</p>
            <h2 className="mt-5 text-display-sm font-medium">{testingMethod.headline}</h2>
            <p className="mt-5 max-w-prose leading-relaxed text-muted">{testingMethod.body}</p>

            <div className="mt-9 rounded-xl border border-line bg-surface/60 p-6">
              <h3 className="text-base font-medium">{testingMethod.sampling.title}</h3>
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
              <p className="mt-5 text-xs leading-relaxed text-faint">
                {testingMethod.sampling.detects}
              </p>
            </div>
          </Reveal>

          <Reveal i={1} className="space-y-4">
            <div className="rounded-xl border border-accent/30 bg-accent/[0.06] p-6 sm:p-7">
              <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                {testingMethod.comparison.live.subtitle}
              </p>
              <h3 className="mt-3 text-lg font-medium">{testingMethod.comparison.live.title}</h3>
              <ul className="mt-5 space-y-3.5">
                {testingMethod.comparison.live.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-line bg-surface/60 p-6 sm:p-7">
              <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
                {testingMethod.comparison.lab.subtitle}
              </p>
              <h3 className="mt-3 text-lg font-medium text-muted">
                {testingMethod.comparison.lab.title}
              </h3>
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

        <div className="container mt-16">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
              Our testing partners
            </p>
            <PartnerRow partners={testingPartners} className="mt-6" />
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
        "rounded-full border px-3.5 py-1.5 text-xs transition-colors duration-200",
        active
          ? "border-accent/50 bg-accent/10 text-accent"
          : "border-line-strong text-muted hover:border-accent/30 hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}
