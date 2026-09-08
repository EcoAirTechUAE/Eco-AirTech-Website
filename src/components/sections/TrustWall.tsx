import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { clientLogos, trustHeading } from "@/content/clients";

export function TrustWall() {
  const half = Math.ceil(clientLogos.length / 2);

  return (
    <Section tight className="overflow-hidden">
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-accent/50" />
            {trustHeading.eyebrow}
          </p>
          <h2 className="mt-5 text-display-sm font-medium">{trustHeading.headline}</h2>
          <p className="mt-3 text-muted">{trustHeading.sub}</p>
        </Reveal>
      </div>

      <div className="mt-12 space-y-3">
        <LogoMarquee items={clientLogos.slice(0, half)} duration="58s" />
        <LogoMarquee items={clientLogos.slice(half)} duration="66s" reverse />
      </div>
    </Section>
  );
}
