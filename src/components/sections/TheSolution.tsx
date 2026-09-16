import { Fragment } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Bloom } from "@/components/ui/Bloom";
import { SmartImage } from "@/components/ui/SmartImage";
import { HydroxylField } from "@/components/ui/HydroxylField";
import { equation, howItWorks, pillars } from "@/content/technology";
import { cn } from "@/lib/utils";

/** H₂O + O₂ + ARC® = AOPs, rendered as the actual equation it is. */
export function EquationGraphic({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-2",
        className,
      )}
    >
      {equation.parts.map((part, i) => (
        <Fragment key={part.symbol}>
          <Reveal i={i} className="flex-1">
            <div className="rounded-xl border border-line bg-surface/70 p-5 text-center">
              {/* Sans, like every other heading. The serif is reserved for
                  italic pull-quotes; set upright on a chemical formula it was
                  the one place the face appeared out of role. */}
              <p className="text-3xl font-medium leading-none tracking-tight text-ink sm:text-4xl">
                {part.symbol}
              </p>
              <p className="mt-3 font-mono text-[0.8125rem] uppercase tracking-wider text-accent">
                {part.label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">{part.detail}</p>
            </div>
          </Reveal>
          <span
            aria-hidden
            className="shrink-0 self-center text-center text-2xl font-medium text-faint sm:px-1"
          >
            {i === equation.parts.length - 1 ? "=" : "+"}
          </span>
        </Fragment>
      ))}

      <Reveal i={3} className="flex-1">
        <div className="relative rounded-xl border border-accent/30 bg-accent/[0.07] p-5 text-center">
          <Bloom intensity="sm" animate={false} />
          <p className="text-3xl font-medium leading-none tracking-tight text-gradient sm:text-4xl">
            {equation.result.symbol}
          </p>
          <p className="mt-3 font-mono text-[0.8125rem] uppercase tracking-wider text-accent">
            {equation.result.label}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted">{equation.result.detail}</p>
        </div>
      </Reveal>
    </div>
  );
}

export function TheSolution() {
  return (
    <Section surface className="relative overflow-hidden">
      <HydroxylField density={0.55} opacity={0.5} />

      <div className="container">
        <Reveal className="max-w-3xl">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-accent/50" />
            What we do instead
          </p>
          <h2 className="mt-6 text-display-md font-medium">
            Take the reaction that cleans the outdoor air, and run it inside.
          </h2>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">
            Nothing exotic is being introduced into your building. The inputs are the water vapour
            and oxygen already in the room. All our technology adds is the catalyst and the energy
            that nature gets from sunlight.
          </p>
        </Reveal>

        <EquationGraphic className="mt-14" />

        {/* Cutaway of the cell itself. The render is flattened onto the same
            colour as its container, so it reads as a diagram rather than a
            pasted-in photograph. */}
        <Reveal className="mt-14">
          <figure className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-line bg-surface2">
            <SmartImage
              src="/assets/tech/arc-cell-airflow.jpg"
              alt="Cutaway of the ARC® cell: air is drawn through the honeycomb catalyst, across the UV lamp, and leaves as hydroxyls."
              label="ARC® cell airflow diagram"
              ratio="aspect-[2/1]"
              className="w-full object-contain"
            />
            <figcaption className="border-t border-line px-6 py-5 body-text sm:px-8">
              <span className="text-ink">Inside the ARC® cell.</span> Air is drawn through a
              honeycomb catalyst and across the UV lamp. The reaction converts the water vapour
              already in that air into hydroxyls, which leave with the airflow and carry on working
              out in the room — on surfaces, in ducting, and in the cavities cleaning never reaches.
            </figcaption>
          </figure>
        </Reveal>

        {/* The four-beat mechanism */}
        <ol className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {howItWorks.map((step, i) => (
            <Reveal as="li" key={step.n} i={i} className="relative">
              <div className="flex items-baseline gap-4">
                <span className="tnum text-4xl font-medium leading-none tracking-tight text-accent/30">
                  {step.n}
                </span>
                <span aria-hidden className="h-px flex-1 bg-line" />
              </div>
              <h3 className="mt-5 text-base font-medium leading-snug">{step.title}</h3>
              <p className="mt-2.5 body-text">{step.body}</p>
            </Reveal>
          ))}
        </ol>

        {/* The two technologies, side by side */}
        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.id} i={i}>
              <article className="card h-full p-7 sm:p-9">
                <h3 className="text-xl font-medium sm:text-2xl">{pillar.name}</h3>
                <p className="mt-1.5 text-lg italic text-accent">{pillar.subtitle}</p>
                <p className="mt-5 leading-relaxed text-ink/90">{pillar.summary}</p>
                <ul className="mt-6 space-y-4 border-t border-line pt-6">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex gap-3.5 body-text">
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
