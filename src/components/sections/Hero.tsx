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
  return (
    <section className="relative overflow-hidden">
      {/* Sits behind the headline and lockup, so it is deliberately dialled
          down — legible as movement, never competing with the text. */}
      <HydroxylField density={0.85} opacity={0.8} />

      {/*
        The headline carries this section. The lockup is a supporting mark
        beside it, not a second focal point — so the text column takes most of
        the width and the logo column is deliberately narrow.
      */}
      <div className="container relative grid gap-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.45fr_0.55fr] lg:items-center lg:gap-x-12 lg:pb-28 lg:pt-24">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-accent/50" />
              Air technology · United Arab Emirates &amp; GCC
            </p>
          </Reveal>

          <Reveal i={1}>
            <h1 className="mt-7 text-display-xl font-medium">
              We recreate{" "}
              <span className="font-display italic text-gradient">nature's disinfectant</span> —
              indoors, continuously.
            </h1>
          </Reveal>

          <Reveal i={2}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              Outdoors, sunlight and humidity produce hydroxyls that break contamination down all by
              themselves. Our systems reproduce that reaction inside your building — eliminating up
              to <span className="text-ink">99.9% of airborne and surface contaminants</span>, and
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
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-faint">
                    {f.label}
                  </dt>
                  <dd className="tnum mt-1.5 text-sm font-medium text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/*
          Small brand mark, centred in its column and vertically against the
          text block. Capped in px rather than tied to the headline — its size
          should not move when the headline rewraps.
        */}
        <Reveal i={2} className="relative">
          <div className="relative mx-auto w-full max-w-[180px] sm:max-w-[210px]">
            <Bloom intensity="md" className="scale-[1.7]" />
            <SmartImage
              src="/assets/logo-lockup-large.png"
              alt=""
              label="Eco AirTech logo"
              ratio="aspect-[4/3]"
              className="h-auto w-full object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
            />
          </div>
        </Reveal>
      </div>

      <div className="rule" />
    </section>
  );
}
