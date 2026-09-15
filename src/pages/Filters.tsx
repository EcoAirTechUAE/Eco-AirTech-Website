import { Award, Check, Minus } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Bloom } from "@/components/ui/Bloom";
import { ContactSection } from "@/components/sections/ContactSection";
import { FilterMyth } from "@/components/sections/FilterMyth";
import { FilterTestData } from "@/components/sections/FilterTestData";
import { FilterProcess } from "@/components/sections/FilterProcess";
import {
  award,
  efficacyMatrix,
  filterFeatures,
  filterIntro,
  filterComparison,
  hvacBenefits,
  nanofiber,
  odogard,
} from "@/content/filters";
import { useMeta } from "@/lib/useMeta";
import { cn } from "@/lib/utils";

export default function Filters() {
  useMeta(
    "Filters",
    "Recyclable MERV 13A nanofiber filtration with ODOGard® coating — a true mechanical rating that holds for the life of the filter, capturing particulates and destroying gas-phase VOCs and odours.",
  );

  return (
    <>
      <PageHero
        eyebrow={filterIntro.eyebrow}
        title={filterIntro.headline}
        lead={filterIntro.subhead}
        crumbs={[{ label: "Filters" }]}
      >
        <Reveal i={2}>
          <p className="mt-8 max-w-2xl leading-relaxed text-muted">{filterIntro.body}</p>
        </Reveal>

        <Reveal i={3}>
          <div className="mt-10 flex max-w-2xl items-start gap-4 border-l-2 border-accent/40 pl-5">
            <Award aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <p className="text-sm leading-relaxed text-muted">
              <span className="text-ink">{award.name}</span>, {award.org}. {award.body}
            </p>
          </div>
        </Reveal>
      </PageHero>

      {/* The two technologies in the media */}
      <Section>
        <div className="container grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-20">
          <div className="space-y-6">
            <Reveal>
              <article className="card p-7 sm:p-9">
                {/* The ring is drawn in CSS with the site's accent rather than
                    baked into the artwork, so it matches the palette exactly. */}
                <div className="float-right ml-6 mb-4 hidden h-28 w-28 shrink-0 overflow-hidden rounded-full ring-1 ring-accent/40 sm:block lg:h-32 lg:w-32">
                  <img
                    src="/assets/filters/nanofiber.png"
                    alt="Electron microscopy laboratory"
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-medium sm:text-2xl">{nanofiber.title}</h2>
                <p className="mt-3 text-lg italic text-accent">{nanofiber.claim}</p>
                <p className="mt-5 leading-relaxed text-muted">{nanofiber.body}</p>
                <ul className="mt-7 space-y-3 border-t border-line pt-6">
                  {nanofiber.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal i={1}>
              <article className="card p-7 sm:p-9">
                <div className="float-right ml-6 mb-4 hidden h-28 w-28 shrink-0 overflow-hidden rounded-full ring-1 ring-accent/40 sm:block lg:h-32 lg:w-32">
                  <img
                    src="/assets/filters/odogard.png"
                    alt="ODOGard®-treated media bonding with odour and VOC molecules"
                    width={292}
                    height={292}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-medium sm:text-2xl">{odogard.title}</h2>
                <p className="mt-3 text-lg italic text-accent">{odogard.claim}</p>
                <p className="mt-5 leading-relaxed text-muted">{odogard.body}</p>
                <div className="mt-7 border-t border-line pt-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
                    What ODOGard® treats
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {odogard.treats.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-accent/25 bg-accent/[0.07] px-3 py-1.5 text-xs text-accent"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          </div>

          <Reveal i={2} className="lg:sticky lg:top-28">
            <div className="relative aspect-square">
              <Bloom intensity="md" />
              <SmartImage
                src="/assets/filters/merv13a.png"
                alt="MERV 13A nanofiber filter with ODOGard coating"
                label="Filter product render"
                ratio="aspect-square"
                className="h-full w-full object-contain"
              />
            </div>

            <ul className="mt-10 grid gap-7 sm:grid-cols-2">
              {filterFeatures.map((feature) => (
                <li key={feature.title}>
                  <span aria-hidden className="block h-px w-10 bg-accent" />
                  <h3 className="mt-4 text-base font-medium">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{feature.body}</p>
                </li>
              ))}
            </ul>

            {/* Specifying better filtration usually costs airflow. Here it doesn't. */}
            <div className="mt-12 border-t border-line pt-8">
              <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
                And what it does for the system
              </p>
              <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                {hvacBenefits.map((b) => (
                  <div key={b.title}>
                    <dt className="text-base font-medium text-ink">{b.title}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-muted">{b.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* MERV comparison matrix */}
      <Section surface>
        <div className="container">
          <SectionHeading
            eyebrow="Efficacy"
            title="What each rating actually captures."
            lead="The jump from MERV 11A to 13A is where bacteria and virus carriers start being caught at all. It is the reason we specify 13A as standard."
          />

          <Reveal className="scroll-x mt-12">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <caption className="sr-only">
                Particulate capture by MERV rating across three particle size bands
              </caption>
              <thead>
                <tr className="border-b border-line-strong">
                  <th
                    scope="col"
                    className="py-3 pr-6 text-left font-mono text-[11px] uppercase tracking-wider text-faint"
                  >
                    Particulate
                  </th>
                  {efficacyMatrix.columns.map((col, i) => (
                    <th
                      key={col}
                      scope="col"
                      className={cn(
                        "py-3 text-center font-mono text-[11px] uppercase tracking-wider",
                        i === efficacyMatrix.columns.length - 1 ? "text-accent" : "text-faint",
                      )}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              {efficacyMatrix.groups.map((group) => (
                <tbody key={group.band} className="divide-y divide-line">
                  <tr>
                    <th
                      scope="colgroup"
                      colSpan={4}
                      className="pb-2 pt-7 text-left font-mono text-[11px] uppercase tracking-wider text-muted"
                    >
                      {group.band}{" "}
                      <span className="tnum ml-2 normal-case tracking-normal text-faint">
                        {group.range}
                      </span>
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.name}>
                      <th scope="row" className="py-3.5 pr-6 text-left font-normal text-ink">
                        {row.name}
                      </th>
                      {row.caught.map((caught, i) => (
                        <td key={i} className="py-3.5 text-center">
                          {caught ? (
                            <>
                              <Check
                                aria-hidden
                                className={cn(
                                  "mx-auto h-4 w-4",
                                  i === 2 ? "text-accent" : "text-muted",
                                )}
                              />
                              <span className="sr-only">Captured</span>
                            </>
                          ) : (
                            <>
                              <Minus aria-hidden className="mx-auto h-4 w-4 text-faint/40" />
                              <span className="sr-only">Not captured</span>
                            </>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </Reveal>

          <Reveal i={1}>
            <p className="mt-8 max-w-2xl border-l-2 border-warn/40 pl-5 text-sm leading-relaxed text-muted">
              {efficacyMatrix.footnote}
            </p>
          </Reveal>
        </div>
      </Section>

      <FilterProcess />

      <FilterTestData />

      <FilterMyth />

      {/* The paired-system proof */}
      <Section>
        <div className="container">
          <SectionHeading
            eyebrow={filterComparison.eyebrow}
            title={filterComparison.headline}
            lead={filterComparison.body}
          />

          <Reveal className="scroll-x mt-12">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <caption className="sr-only">
                Capability comparison: filters commonly found in buildings, against the Eco AirTech
                Filters+ MERV 13A
              </caption>
              <thead>
                {/* Grouped header. Without it the reader has no way to tell that
                    three of these columns are filters we do not supply. */}
                <tr>
                  <th />
                  <th
                    colSpan={filterComparison.others.length}
                    scope="colgroup"
                    className="rounded-t-lg border-x border-t border-line bg-surface/40 px-4 py-2.5 text-center font-mono text-[11px] uppercase tracking-wider text-faint"
                  >
                    {filterComparison.othersLabel}
                  </th>
                  <th
                    scope="colgroup"
                    className="rounded-t-lg border-x border-t border-accent/40 bg-accent/[0.07] px-4 py-2.5 text-center font-mono text-[11px] uppercase tracking-wider text-accent"
                  >
                    {filterComparison.oursLabel}
                  </th>
                </tr>
                <tr className="border-b border-line-strong">
                  <th
                    scope="col"
                    className="py-3 pr-6 text-left font-mono text-[11px] uppercase tracking-wider text-faint"
                  >
                    Capability
                  </th>
                  {filterComparison.others.map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="border-x border-line bg-surface/40 px-4 py-3 text-center font-mono text-[11px] uppercase tracking-wider text-muted"
                    >
                      {col}
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="border-x border-accent/40 bg-accent/[0.07] px-4 py-3 text-center font-mono text-[11px] uppercase tracking-wider text-accent"
                  >
                    {filterComparison.ours}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filterComparison.rows.map((row, rowIdx) => {
                  const last = rowIdx === filterComparison.rows.length - 1;
                  const mark = (v: boolean | "partial", isOurs: boolean) =>
                    v === true ? (
                      <>
                        <Check
                          aria-hidden
                          className={cn("mx-auto h-4 w-4", isOurs ? "text-accent" : "text-muted")}
                        />
                        <span className="sr-only">Yes</span>
                      </>
                    ) : v === "partial" ? (
                      <>
                        <span aria-hidden className="text-xs text-muted">
                          partial
                        </span>
                        <span className="sr-only">Partial</span>
                      </>
                    ) : (
                      <>
                        <Minus aria-hidden className="mx-auto h-4 w-4 text-faint/40" />
                        <span className="sr-only">No</span>
                      </>
                    );

                  return (
                    <tr key={row.capability}>
                      <th scope="row" className="py-4 pr-6 text-left font-normal text-ink">
                        {row.capability}
                      </th>
                      {row.others.map((v: boolean | "partial", i: number) => (
                        <td
                          key={i}
                          className={cn(
                            "border-x border-line bg-surface/40 px-4 py-4 text-center",
                            last && "rounded-b-lg border-b",
                          )}
                        >
                          {mark(v, false)}
                        </td>
                      ))}
                      <td
                        className={cn(
                          "border-x border-accent/40 bg-accent/[0.07] px-4 py-4 text-center",
                          last && "rounded-b-lg border-b",
                        )}
                      >
                        {mark(row.ours, true)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Reveal>

          {/* States plainly where HEPA wins. A comparison that claims to beat
              everything at everything reads as marketing, not evidence. */}
          <Reveal i={1}>
            <p className="mt-8 max-w-3xl border-l-2 border-line-strong pl-5 text-sm leading-relaxed text-muted">
              {filterComparison.note}
            </p>
          </Reveal>
        </div>
      </Section>

      <ContactSection />
    </>
  );
}
