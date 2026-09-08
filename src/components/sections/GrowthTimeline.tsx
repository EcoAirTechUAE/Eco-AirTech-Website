import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { growthTimeline } from "@/content/technology";

export function GrowthTimeline() {
  const total = growthTimeline.steps.length;

  return (
    <Section>
      <div className="container">
        <SectionHeading
          eyebrow={growthTimeline.eyebrow}
          title={growthTimeline.headline}
          lead={growthTimeline.intro}
        />

        {/* Single column until there is genuinely room for five — at tablet
            widths five columns leaves ~90px of usable content per step. */}
        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-5">
          {growthTimeline.steps.map((step, i) => {
            // Colour advances from accent to warn across the sequence: the
            // further along the cycle, the worse the situation.
            const progress = i / (total - 1);
            const hue = `color-mix(in oklab, hsl(var(--accent)) ${Math.round(
              (1 - progress) * 100,
            )}%, hsl(var(--warn)))`;

            return (
              <Reveal as="li" key={step.time} i={i} className="relative bg-surface p-6 sm:p-7">
                {/* Intensity meter — fills further along the cycle. */}
                <div aria-hidden className="mb-6 h-0.5 w-full rounded-full bg-surface2">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${((i + 1) / total) * 100}%`,
                      background: hue,
                    }}
                  />
                </div>

                <p className="tnum font-mono text-[11px] uppercase tracking-wider" style={{ color: hue }}>
                  {step.time}
                </p>
                <h3 className="mt-3 text-base font-medium leading-snug">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </Reveal>
            );
          })}
        </ol>

        <Reveal i={2}>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ink/90">
            {growthTimeline.close}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
