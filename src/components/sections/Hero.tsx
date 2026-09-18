import { useRef } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ButtonLink, ButtonAnchor } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { HydroxylField } from "@/components/ui/HydroxylField";
import { Bloom } from "@/components/ui/Bloom";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappLink } from "@/config/site";
import { rangeCoverage } from "@/content/devices";

const facts = [
  { label: "Coverage", value: rangeCoverage },
  { label: "Ozone in testing", value: "0 ppm" },
  { label: "H₂O₂ vs OSHA limit", value: "20× below" },
];

export function Hero() {
  // The hydroxyls stream out of the actual render rather than a hardcoded
  // point, so the plume stays on the unit when the layout reflows and when
  // the columns stack on a phone.
  const deviceRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden">
      {/* Sits behind the headline and lockup, so it is deliberately dialled
          down: legible as movement, never competing with the text. */}
      <HydroxylField density={0.85} opacity={0.8} sourceRef={deviceRef} />

      {/*
        The headline leads; the product render balances it. Columns are close
        to even so the unit has room to read at this size.
      */}
      <div className="container relative grid gap-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-x-12 lg:pb-28 lg:pt-24">
        <div>
          <Reveal>
            <p className="eyebrow">
              Air technology · United Arab Emirates &amp; GCC
            </p>
          </Reveal>

          <Reveal i={1}>
            <h1 className="mt-7 text-display-xl font-medium">
              We recreate{" "}
              <span className="italic text-gradient">nature's disinfectant</span>,
              indoors and continuously.
            </h1>
          </Reveal>

          <Reveal i={2}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              Outdoors, sunlight drives natural atmospheric reactions that create hydroxyl
              radicals; highly reactive molecules that help break down airborne contaminants. Our
              systems reproduce that reaction inside your building, eliminating up to{" "}
              <span className="text-ink">99.9% of airborne and surface contaminants</span>, and
              never switching off.
            </p>
          </Reveal>

          <Reveal i={3}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink to="/contact" size="lg">
                Book an air assessment
                <ArrowRight aria-hidden className="h-4 w-4" />
              </ButtonLink>
              <ButtonAnchor href="#film" variant="outline" size="lg">
                See how it works
              </ButtonAnchor>
              <ButtonAnchor
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="lg"
                className="px-3"
              >
                <MessageCircle aria-hidden className="h-4 w-4" />
                WhatsApp
              </ButtonAnchor>
            </div>
          </Reveal>

          <Reveal i={4}>
            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-7">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="font-mono text-[0.8125rem] uppercase tracking-wider text-faint">
                    {f.label}
                  </dt>
                  <dd className="tnum mt-1.5 text-sm font-medium text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/*
          The PTAC, keyed off its studio background so it floats on the page
          rather than sitting in a black tile. The bloom reads through the
          transparency, which is the whole reason a framed render did not work
          here.
        */}
        <Reveal i={2} className="relative hero-render-offset">
          <div ref={deviceRef} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <Bloom intensity="lg" className="scale-125" />
            <SmartImage
              src="/assets/devices/hero-ptac.png"
              alt="The PTAC unit, shown with its casing separated to reveal the ARC® cell and UV lamp"
              label="PTAC product render"
              ratio="aspect-[3/2]"
              className="h-auto w-full object-contain drop-shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
            />
          </div>
        </Reveal>
      </div>

      <div className="rule" />
    </section>
  );
}
