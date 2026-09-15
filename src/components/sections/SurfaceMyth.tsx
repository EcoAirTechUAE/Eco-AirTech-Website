import { Eye, Layers, Wind, RotateCw } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { surfaceMyth } from "@/content/technology";

const icons = [Layers, Wind, RotateCw];

export function SurfaceMyth() {
  return (
    <Section id="how-it-works">
      <div className="container">
        <SectionHeading
          eyebrow={surfaceMyth.eyebrow}
          title={surfaceMyth.headline}
          lead={surfaceMyth.intro}
        />

        <div className="mt-16">
          {/* Above the surface — deliberately muted. This is the part everyone
              already does, and it is genuinely useful, just incomplete. */}
          <Reveal>
            <div className="rounded-t-2xl border border-line bg-surface/60 p-7 sm:p-9">
              <p className="font-mono text-eyebrow uppercase tracking-wider text-muted">
                {surfaceMyth.above.label}
              </p>
              <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
                <span
                  aria-hidden
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-strong text-muted"
                >
                  <Eye className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-medium">{surfaceMyth.above.title}</h3>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">
                    {surfaceMyth.above.body}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* The dividing line — the whole argument in one strip. */}
          <Reveal i={1}>
            <div className="relative flex items-center justify-center border-x border-line bg-bg py-4">
              <div
                aria-hidden
                className="absolute inset-x-0 top-1/2 border-t border-dashed border-line-strong"
              />
              <p className="relative bg-bg px-5 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-warn">
                {surfaceMyth.above.note}
              </p>
            </div>
          </Reveal>

          {/* Below the surface — where the actual problem lives. */}
          <Reveal i={2}>
            <div className="rounded-b-2xl border border-line bg-gradient-to-b from-accent/[0.07] to-transparent p-7 sm:p-9">
              <p className="font-mono text-eyebrow uppercase tracking-wider text-accent">
                {surfaceMyth.below.label}
              </p>

              <ul className="mt-8 grid gap-8 md:grid-cols-3">
                {surfaceMyth.below.items.map((item, idx) => {
                  const Icon = icons[idx];
                  return (
                    <li key={item.title}>
                      <span
                        aria-hidden
                        className="grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/25"
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-5 text-base font-medium">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal i={3}>
          <p className="mx-auto mt-14 max-w-2xl text-center text-2xl italic leading-snug text-ink sm:text-[1.75rem]">
            {surfaceMyth.close}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
