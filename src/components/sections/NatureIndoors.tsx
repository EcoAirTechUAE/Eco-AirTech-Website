import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Bloom } from "@/components/ui/Bloom";
import { ButtonLink } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { airflowSteps } from "@/content/technology";

/**
 * The homepage's one explanation of the technology: what nature does
 * outdoors, then the same thing happening inside the unit. Two pictures and
 * three captions. The equation, the cell cutaway and the safety figures are
 * on /technology for anyone who wants them.
 */
export function NatureIndoors() {
  return (
    <Section id="film" surface className="relative overflow-hidden">
      <Bloom intensity="sm" animate={false} className="top-1/4" />

      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow">How it works</p>
            <h2 className="mt-6 text-display-md font-medium">
              Take the reaction that cleans the outdoor air, and run it inside.
            </h2>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">
              Outdoors, sunlight and water vapour create hydroxyls that break contamination down.
              Our ARC® cell reproduces that reaction in your building, using only the moisture and
              oxygen already in the room.
            </p>
            <ButtonLink to="/technology" variant="outline" size="lg" className="mt-9">
              Explore the technology
              <ArrowRight aria-hidden className="h-4 w-4" />
            </ButtonLink>
          </Reveal>

          <Reveal i={1}>
            <SmartImage
              src="/assets/tech/hydroxyl-cycle.webp"
              alt="Sunlight reacting with ozone and water vapour in the atmosphere to form hydroxyl radicals, which disperse through the air above a forest and lake"
              label="Hydroxyl formation diagram"
              ratio="aspect-[4/5]"
              className="mx-auto h-auto w-full max-w-sm object-contain lg:max-w-[26rem]"
            />
          </Reveal>
        </div>

        <Reveal className="mt-16 lg:mt-20">
          <figure>
            <SmartImage
              src="/assets/tech/how-it-works.png"
              alt="Air passes through filtration, across the UV-activated ARC® cell where hydroxyl radicals form, and leaves with contaminants broken down."
              label="Airflow through the ARC® cell"
              ratio="aspect-[3/1]"
              className="mx-auto w-full max-w-4xl object-contain"
            />

            <figcaption className="mx-auto mt-8 max-w-4xl">
              <ol className="grid gap-8 sm:grid-cols-3 sm:gap-6">
                {airflowSteps.map((step) => (
                  <li key={step.n}>
                    <p className="font-mono text-[0.8125rem] uppercase tracking-wider text-accent">
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
    </Section>
  );
}
