import { Hero } from "@/components/sections/Hero";
import { TrustWall } from "@/components/sections/TrustWall";
import { TechnologyFilm } from "@/components/sections/TechnologyFilm";
import { SurfaceMyth } from "@/components/sections/SurfaceMyth";
import { FilterMyth } from "@/components/sections/FilterMyth";
import { GrowthTimeline } from "@/components/sections/GrowthTimeline";
import { TheSolution } from "@/components/sections/TheSolution";
import { SafetyBand } from "@/components/sections/SafetyBand";
import { DevicesShowcase } from "@/components/sections/DevicesShowcase";
import { FiltersTeaser } from "@/components/sections/FiltersTeaser";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { ProofBand } from "@/components/sections/ProofBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { useMeta } from "@/lib/useMeta";

/**
 * Landing page order is deliberate:
 *   hook → proof → explain the problem → present the solution →
 *   show the products → show the sectors → evidence → objections → convert.
 *
 * The three "problem" sections (SurfaceMyth, FilterMyth, GrowthTimeline) run
 * consecutively on purpose. They are the education job the brief is built
 * around, and they have to land before any product is mentioned.
 */
export default function Home() {
  useMeta(
    "",
    "Nature-based air technology that continuously eliminates up to 99.9% of airborne and surface contaminants. Medical-grade air for homes, hotels, schools and workplaces across the UAE and GCC.",
  );

  return (
    <>
      <Hero />
      <TrustWall />
      <TechnologyFilm />

      <SurfaceMyth />
      <FilterMyth />
      <GrowthTimeline />

      <TheSolution />
      <SafetyBand />

      <DevicesShowcase />
      <FiltersTeaser />
      <IndustriesGrid />

      <ProofBand />
      <FaqSection />
      <ContactSection />
    </>
  );
}
