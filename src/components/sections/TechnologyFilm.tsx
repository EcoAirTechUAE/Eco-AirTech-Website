import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Bloom } from "@/components/ui/Bloom";
import { SmartImage } from "@/components/ui/SmartImage";
import { ambition } from "@/content/clients";
import { airflowSteps } from "@/content/technology";

export function TechnologyFilm() {
  return (
    <Section id="film" surface className="relative overflow-hidden">
      <Bloom intensity="sm" animate={false} className="top-1/4" />

      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-accent/50" />
              Three stages
            </p>
            <h2 className="mt-6 text-display-md font-medium">The science, explained properly.</h2>
            <p className="mt-6 max-w-prose leading-relaxed text-muted">
              Air technology is an easy category to make vague claims in. So rather than ask you to
              take ours on trust, here is exactly what happens inside the unit, what it produces,
              and why that reaches places cleaning never does.
            </p>

            <blockquote className="mt-10 border-l-2 border-accent/40 pl-5">
              <p className="text-xl italic leading-snug text-ink/90 sm:text-2xl">
                {ambition.statement}
              </p>
              <footer className="mt-3 font-mono text-[0.8125rem] uppercase tracking-wider text-faint">
                {ambition.eyebrow}
              </footer>
            </blockquote>
          </Reveal>

          {/*
            The airflow diagram. The artwork is cropped free of its original
            burnt-in captions — those are set below as live text instead, so
            nothing carries a black panel across the section background.
          */}
          <Reveal i={1}>
            <figure>
              <SmartImage
                src="/assets/tech/how-it-works.png"
                alt="Air passes through filtration, across the UV-activated ARC® cell where hydroxyl radicals form, and leaves with contaminants broken down."
                label="Airflow through the ARC® cell"
                ratio="aspect-[3/1]"
                className="w-full object-contain"
              />

              <figcaption className="mt-8">
                <ol className="grid gap-8 sm:grid-cols-3 sm:gap-6">
                  {airflowSteps.map((step) => (
                    <li key={step.n}>
                      <span aria-hidden className="block h-px w-8 bg-accent/50" />
                      <p className="mt-4 font-mono text-[0.8125rem] uppercase tracking-wider text-accent">
                        {step.n}
                      </p>
                      <h3 className="mt-2 text-base font-medium text-ink">{step.title}</h3>
                      <p className="mt-2 body-text">{step.body}</p>
                    </li>
                  ))}
                </ol>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
