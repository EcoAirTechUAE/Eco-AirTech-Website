import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { reduces, series, vsCarbon } from "@/content/filters";

export function FilterProcess() {
  return (
    <>
      {/* Against carbon */}
      <Section surface>
        <div className="container">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
            <Reveal>
              <p className="eyebrow">
                {vsCarbon.eyebrow}
              </p>
              <h2 className="mt-6 text-display-md font-medium">{vsCarbon.headline}</h2>
              <p className="mt-6 max-w-prose leading-relaxed text-muted">{vsCarbon.body}</p>
            </Reveal>

            <Reveal i={1}>
              <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
                {vsCarbon.stats.map((s) => (
                  <div key={s.label} className="bg-surface p-6">
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <p className="tnum text-display-sm font-medium text-accent">{s.value}</p>
                      <p className="mt-3 text-sm font-medium text-ink">{s.label}</p>
                      <p className="mt-1 text-xs text-muted">{s.context}</p>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <div>
                  <img
                    src="/assets/filters/nanofiber.png"
                    alt=""
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="mb-4 h-14 w-14 rounded-full object-cover ring-1 ring-accent/40"
                  />
                  <p className="font-mono text-[0.8125rem] uppercase tracking-wider text-faint">
                    Nanofibre removes
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {reduces.nanofiber.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line-strong px-3 py-1.5 text-xs text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <img
                    src="/assets/filters/odogard.png"
                    alt=""
                    width={292}
                    height={292}
                    loading="lazy"
                    decoding="async"
                    className="mb-4 h-14 w-14 rounded-full object-cover ring-1 ring-accent/40"
                  />
                  <p className="font-mono text-[0.8125rem] uppercase tracking-wider text-faint">
                    ODOGard® destroys
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {reduces.odogard.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-accent/25 bg-accent/[0.07] px-3 py-1.5 text-[0.8125rem] text-accent"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Two grades */}
          <div className="mt-20 grid gap-5 sm:grid-cols-2">
            {series.map((s, i) => (
              <Reveal key={s.name} i={i}>
                <div className="card h-full p-7">
                  <p className="font-mono text-[0.8125rem] uppercase tracking-wider text-accent">
                    {s.name}
                  </p>
                  <h3 className="mt-3 text-lg font-medium">{s.forWhat}</h3>
                  <ul className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
                    {s.uses.map((u) => (
                      <li key={u} className="text-sm text-muted">
                        {u}
                        <span aria-hidden className="ml-2 text-faint last:hidden">
                          ·
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
