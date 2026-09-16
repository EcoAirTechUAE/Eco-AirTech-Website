import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TechnologyFilm } from "@/components/sections/TechnologyFilm";
import { SurfaceMyth } from "@/components/sections/SurfaceMyth";
import { FilterMyth } from "@/components/sections/FilterMyth";
import { GrowthTimeline } from "@/components/sections/GrowthTimeline";
import { TheSolution } from "@/components/sections/TheSolution";
import { SafetyBand } from "@/components/sections/SafetyBand";
import { ContactSection } from "@/components/sections/ContactSection";
import { factors } from "@/content/technology";

export default function Technology() {

  return (
    <>
      <PageHero
        eyebrow="The technology"
        title="Hydroxyls bring nature's air-cleaning process indoors."
        lead="Sunlight and humidity react in the atmosphere to produce hydroxyls, which break contamination down continuously and without residue. Our ARC® cell reproduces that reaction inside your building. Here is exactly how, and why it reaches what cleaning cannot."
        crumbs={[{ label: "Technology" }]}
      />

      <TechnologyFilm />

      {/* Why it happens at all — the multi-factor argument */}
      <Section>
        <div className="container">
          <SectionHeading eyebrow={factors.eyebrow} title={factors.headline} lead={factors.body} />

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {factors.groups.map((group, i) => (
              <Reveal key={group.title} i={i} className="bg-surface p-7 sm:p-8">
                <h3 className="text-base font-medium">{group.title}</h3>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 body-text">
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <SurfaceMyth />
      <FilterMyth />
      <GrowthTimeline />
      <TheSolution />
      <SafetyBand />
      <ContactSection />
    </>
  );
}
