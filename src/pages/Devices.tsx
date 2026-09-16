import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { DeviceCard } from "@/components/ui/DeviceCard";
import { ContactSection } from "@/components/sections/ContactSection";
import { FiltersTeaser } from "@/components/sections/FiltersTeaser";
import { devices, rangeCoverage } from "@/content/devices";
import { useMeta } from "@/lib/useMeta";

export default function Devices() {
  useMeta(
    "Devices",
    `The Eco AirTech range — HVAC, 750+, PTAC and OverWatch. Active air purification covering ${rangeCoverage}, retrofitted into existing air conditioning systems.`,
  );

  return (
    <>
      <PageHero
        eyebrow="The range"
        title="Five units. One technology."
        lead={`Every device retrofits into existing systems — no replacement plant, no redesign. Coverage runs from ${rangeCoverage}, and most buildings are specified as a combination rather than a single unit.`}
        crumbs={[{ label: "Devices" }]}
      />

      <Section>
        <div className="container">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {devices.map((device, i) => (
              <Reveal key={device.slug} i={i} className="h-full">
                <DeviceCard device={device} className="h-full" />
              </Reveal>
            ))}
          </div>

          {/* Specification comparison */}
          <Reveal className="mt-20">
            <h2 className="text-display-sm font-medium">At a glance</h2>
            <div className="scroll-x mt-8">
              <table className="w-full min-w-[620px] border-collapse text-sm">
                <caption className="sr-only">Comparison of the Eco AirTech device range</caption>
                <thead>
                  <tr className="border-b border-line-strong text-left">
                    {["Device", "Coverage", "Mounting", "Technologies"].map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="py-3 pr-6 font-mono text-[0.8125rem] uppercase tracking-wider text-faint"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {devices.map((device) => (
                    <tr key={device.slug} className="align-top">
                      <th scope="row" className="py-5 pr-6 text-left font-medium text-ink">
                        {device.article}
                      </th>
                      <td className="tnum py-5 pr-6 text-muted">
                        {device.coverage}
                        {device.coverageNote && (
                          <span className="block text-[0.8125rem] text-faint">{device.coverageNote}</span>
                        )}
                      </td>
                      <td className="py-5 pr-6 text-muted">{device.mount}</td>
                      <td className="py-5 text-muted">{device.technologies.join(" · ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </Section>

      <FiltersTeaser />
      <ContactSection />
    </>
  );
}
