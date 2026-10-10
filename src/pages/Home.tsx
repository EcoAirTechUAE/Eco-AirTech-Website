import { Hero } from "@/components/sections/Hero";
import { TrustWall } from "@/components/sections/TrustWall";
import { SurfaceMyth } from "@/components/sections/SurfaceMyth";
import { NatureIndoors } from "@/components/sections/NatureIndoors";
import { DevicesShowcase } from "@/components/sections/DevicesShowcase";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { ProofBand } from "@/components/sections/ProofBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";

/**
 * Landing page order is deliberate:
 *   hook → proof → the problem → the solution →
 *   the products → the sectors → evidence → objections → convert.
 *
 * Each beat gets one short section. The depth behind them (filter data,
 * regrowth timeline, safety figures, test methodology, the full FAQ) lives on
 * the inner pages, one click away, so this page stays quick to read.
 */
export default function Home() {

  return (
    <>
      <Hero />
      <TrustWall />

      <SurfaceMyth />
      <NatureIndoors />

      <DevicesShowcase />
      <IndustriesGrid />

      <ProofBand />
      <FaqSection featured />
      <ContactSection />
    </>
  );
}
