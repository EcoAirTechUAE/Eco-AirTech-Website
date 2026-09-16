import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { DeviceCard } from "@/components/ui/DeviceCard";
import { ButtonLink } from "@/components/ui/Button";
import { devices, rangeCoverage } from "@/content/devices";

export function DevicesShowcase() {
  return (
    <Section id="devices">
      <div className="container">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">
              The range
            </p>
            <h2 className="mt-6 text-display-md font-medium">
              One technology. Five ways to fit it into a building.
            </h2>
            <p className="mt-6 max-w-prose leading-relaxed text-muted">
              Specification depends on served volume, air handling type and how a space is actually
              used, so most buildings are addressed with a combination rather than a single unit.
              Coverage across the range runs from{" "}
              <span className="tnum text-ink">{rangeCoverage}</span>.
            </p>
          </Reveal>

          <Reveal i={1} className="shrink-0">
            <ButtonLink to="/devices" variant="outline" size="lg">
              Compare the range
              <ArrowRight aria-hidden className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {devices.map((device, i) => (
            <Reveal key={device.slug} i={i} className="h-full">
              <DeviceCard device={device} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
