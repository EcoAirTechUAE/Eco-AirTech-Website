import { ArrowRight, EyeOff, Wind, Timer } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { surfaceMyth } from "@/content/technology";

/**
 * Positional, matching `surfaceMyth.items`: hidden reservoirs, then
 * continuous reintroduction, then rapid recurrence. Timer rather than a cycle
 * arrow because what makes the third point land is how fast it comes back,
 * not that it repeats.
 */
const icons = [EyeOff, Wind, Timer];

/**
 * The whole "why cleaning is not enough" argument in one short section.
 * Homepage only: the filter and regrowth detail lives on /technology.
 */
export function SurfaceMyth() {
  return (
    <Section id="how-it-works">
      <div className="container">
        <SectionHeading
          eyebrow={surfaceMyth.eyebrow}
          title={surfaceMyth.headline}
          lead={surfaceMyth.intro}
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {surfaceMyth.items.map((item, idx) => {
            const Icon = icons[idx];
            return (
              <Reveal as="li" key={item.title} i={idx} className="card h-full p-7">
                <span
                  aria-hidden
                  className="grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/25"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-medium">{item.title}</h3>
                <p className="mt-2 body-text">{item.body}</p>
              </Reveal>
            );
          })}
        </ul>

        <Reveal i={3} className="mt-10">
          <ButtonLink to="/technology" variant="outline" size="lg">
            See the science
            <ArrowRight aria-hidden className="h-4 w-4" />
          </ButtonLink>
        </Reveal>
      </div>
    </Section>
  );
}
