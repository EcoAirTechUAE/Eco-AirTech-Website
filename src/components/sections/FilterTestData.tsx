import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ashrae } from "@/content/filters";

const pct = (s: string) => parseFloat(s);

export function FilterTestData() {
  return (
    <Section surface>
      <div className="container">
        <SectionHeading eyebrow={ashrae.eyebrow} title={ashrae.headline} lead={ashrae.body} />

        {/* Test conditions — a percentage without these is not evidence. */}
        <Reveal className="mt-10">
          <dl className="grid gap-6 border-y border-line py-6 sm:grid-cols-2 lg:grid-cols-4">
            {ashrae.conditions.map((c) => (
              <div key={c.label}>
                <dt className="font-mono text-[0.8125rem] uppercase tracking-wider text-faint">
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
                <p className="font-mono text-[0.8125rem] uppercase tracking-wider text-faint">
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
          <p className="mt-8 max-w-2xl border-l-2 border-accent/40 pl-5 body-text">
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
                  className="py-3 pr-6 text-left font-mono text-[0.8125rem] uppercase tracking-wider text-faint"
                >
                  Particle size (μm)
                </th>
                <th
                  scope="col"
                  className="py-3 pr-6 text-right font-mono text-[0.8125rem] uppercase tracking-wider text-faint"
                >
                  MERV 11A
                </th>
                <th
                  scope="col"
                  className="py-3 text-right font-mono text-[0.8125rem] uppercase tracking-wider text-accent"
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
      </div>
    </Section>
  );
}
