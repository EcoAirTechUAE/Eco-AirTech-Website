import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { aRating, ashrae, pressureDrop } from "@/content/filters";
import { cn } from "@/lib/utils";

const pct = (s: string) => parseFloat(s);

export function FilterTestData() {
  // 2" is the common specification, so it opens on that rather than the first tab.
  const [depth, setDepth] = useState(1);
  const active = pressureDrop.sizes[depth];

  return (
    <Section surface>
      <div className="container">
        <SectionHeading eyebrow={ashrae.eyebrow} title={ashrae.headline} lead={ashrae.body} />

        {/* Test conditions — a percentage without these is not evidence. */}
        <Reveal className="mt-10">
          <dl className="grid gap-6 border-y border-line py-6 sm:grid-cols-2 lg:grid-cols-4">
            {ashrae.conditions.map((c) => (
              <div key={c.label}>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-faint">
                  {c.label}
                </dt>
                <dd className="tnum mt-1.5 text-sm font-medium text-ink">{c.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* The three composite bands the MERV rating is derived from */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {ashrae.composites.map((c, i) => (
            <Reveal key={c.band} i={i}>
              <div className="card h-full p-6">
                <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
                  {c.band}
                  <span className="tnum ml-2 normal-case tracking-normal">{c.range}</span>
                </p>
                <p className="tnum mt-5 text-display-sm font-medium text-accent">{c.merv13}</p>
                <p className="mt-1 text-xs text-muted">MERV 13A</p>
                <p className="tnum mt-5 border-t border-line pt-4 text-sm text-muted">
                  {c.merv11}
                  <span className="ml-2 text-faint">MERV 11A</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal i={1}>
          <p className="mt-8 max-w-2xl border-l-2 border-accent/40 pl-5 text-sm leading-relaxed text-muted">
            {ashrae.note}
          </p>
        </Reveal>

        {/* Full fractional efficiency curve */}
        <Reveal className="scroll-x mt-16">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <caption className="sr-only">
              ASHRAE 52.2 initial fractional efficiency by particle size, MERV 11A against MERV 13A
            </caption>
            <thead>
              <tr className="border-b border-line-strong">
                <th
                  scope="col"
                  className="py-3 pr-6 text-left font-mono text-[11px] uppercase tracking-wider text-faint"
                >
                  Particle size (μm)
                </th>
                <th
                  scope="col"
                  className="py-3 pr-6 text-right font-mono text-[11px] uppercase tracking-wider text-faint"
                >
                  MERV 11A
                </th>
                <th
                  scope="col"
                  className="py-3 text-right font-mono text-[11px] uppercase tracking-wider text-accent"
                >
                  MERV 13A
                </th>
                <th scope="col" className="w-[38%] py-3 pl-6">
                  <span className="sr-only">Relative capture</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {ashrae.rows.map((row) => (
                <tr key={row.range}>
                  <th scope="row" className="tnum py-3.5 pr-6 text-left font-normal text-ink">
                    {row.range}
                  </th>
                  <td className="tnum py-3.5 pr-6 text-right text-muted">{row.merv11}</td>
                  <td className="tnum py-3.5 text-right font-medium text-accent">{row.merv13}</td>
                  <td className="py-3.5 pl-6">
                    {/* Paired bars: the gap between them is the argument. */}
                    <span aria-hidden className="block space-y-1">
                      <span className="block h-1.5 w-full overflow-hidden rounded-full bg-surface2">
                        <span
                          className="block h-full rounded-full bg-muted/40"
                          style={{ width: `${pct(row.merv11)}%` }}
                        />
                      </span>
                      <span className="block h-1.5 w-full overflow-hidden rounded-full bg-surface2">
                        <span
                          className="block h-full rounded-full bg-accent"
                          style={{ width: `${pct(row.merv13)}%` }}
                        />
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Pressure drop */}
        <div className="mt-24">
          <Reveal>
            <h3 className="text-display-sm font-medium">{pressureDrop.headline}</h3>
            <p className="mt-5 max-w-prose leading-relaxed text-muted">{pressureDrop.body}</p>
          </Reveal>

          <Reveal i={1} className="mt-8">
            <div
              role="tablist"
              aria-label="Filter depth"
              className="inline-flex rounded-full border border-line p-1"
            >
              {pressureDrop.sizes.map((s, i) => (
                <button
                  key={s.depth}
                  type="button"
                  role="tab"
                  aria-selected={depth === i}
                  onClick={() => setDepth(i)}
                  className={cn(
                    "rounded-full px-5 py-2 font-mono text-xs uppercase tracking-wider transition-colors",
                    depth === i
                      ? "bg-accent text-[#04140A]"
                      : "text-muted hover:text-ink",
                  )}
                >
                  {s.depth}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal i={2} className="scroll-x mt-8">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <caption className="sr-only">
                Pressure drop in inches water column for the {active.depth} filter
              </caption>
              <thead>
                <tr className="border-b border-line-strong">
                  <th
                    scope="col"
                    className="py-3 pr-6 text-left font-mono text-[11px] uppercase tracking-wider text-faint"
                  >
                    Flow rate (CFM)
                  </th>
                  <th
                    scope="col"
                    className="py-3 pr-6 text-left font-mono text-[11px] uppercase tracking-wider text-faint"
                  >
                    Velocity (FPM)
                  </th>
                  <th
                    scope="col"
                    className="py-3 pr-6 text-right font-mono text-[11px] uppercase tracking-wider text-faint"
                  >
                    MERV 11A
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-right font-mono text-[11px] uppercase tracking-wider text-accent"
                  >
                    MERV 13A
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {active.rows.map((row) => (
                  <tr key={row.cfm}>
                    <th scope="row" className="tnum py-3.5 pr-6 text-left font-normal text-ink">
                      {row.cfm}
                    </th>
                    <td className="tnum py-3.5 pr-6 text-muted">{row.fpm}</td>
                    <td className="tnum py-3.5 pr-6 text-right text-muted">{row.merv11}</td>
                    <td className="tnum py-3.5 text-right font-medium text-accent">{row.merv13}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal i={3}>
            <p className="mt-6 font-mono text-[11px] leading-relaxed text-faint">
              Measured in {pressureDrop.unit}. {pressureDrop.note}
            </p>
          </Reveal>
        </div>

        {/* Why the rating carries an "A" */}
        <Reveal className="mt-20">
          <div className="card max-w-3xl p-7 sm:p-9">
            <h3 className="text-xl font-medium sm:text-2xl">{aRating.title}</h3>
            <p className="mt-5 leading-relaxed text-muted">{aRating.body}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
