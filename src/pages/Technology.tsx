import { PageHero } from "@/components/layout/PageHero";
import { SmartImage } from "@/components/ui/SmartImage";
import { TechnologyFilm } from "@/components/sections/TechnologyFilm";
import { FilterMyth } from "@/components/sections/FilterMyth";
import { GrowthTimeline } from "@/components/sections/GrowthTimeline";
import { TheSolution } from "@/components/sections/TheSolution";
import { SafetyBand } from "@/components/sections/SafetyBand";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Technology() {

  return (
    <>
      <PageHero
        eyebrow="The technology"
        title="Nature cleans the air continuously. We bring that chemistry indoors."
        lead="Sunlight forms hydroxyl radicals that break down airborne pollutants. ARC® recreates that chemistry indoors, continuously treating the air and surfaces cleaning cannot reach."
        crumbs={[{ label: "Technology" }]}
        visual={
          <SmartImage
            src="/assets/tech/hydroxyl-cycle.webp"
            alt="Sunlight reacting with ozone and water vapour in the atmosphere to form hydroxyl radicals, which disperse through the air above a forest and lake"
            label="Hydroxyl formation diagram"
            ratio="aspect-[4/5]"
            className="mx-auto h-auto w-full max-w-sm object-contain lg:max-w-[26rem]"
          />
        }
      />

      <TechnologyFilm />

      <FilterMyth />
      <GrowthTimeline />
      <TheSolution />
      <SafetyBand />
      <ContactSection />
    </>
  );
}
