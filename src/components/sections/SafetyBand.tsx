import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { safety } from "@/content/technology";

export function SafetyBand() {
  return (
    <Section tight>
      <div className="container">
        <Reveal className="card overflow-hidden">
          <div className="grid gap-px bg-line lg:grid-cols-[1.3fr_1fr]">
            <div className="bg-surface p-7 sm:p-10">
              <span
                aria-hidden
                className="grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/25"
              >
                <ShieldCheck className="h-5 w-5" />
              </span>
              <h2 className="mt-6 text-display-sm font-medium">{safety.headline}</h2>
              <p className="mt-5 max-w-prose leading-relaxed text-muted">{safety.body}</p>
              <p className="mt-6 font-mono text-[0.8125rem] uppercase tracking-wider text-faint">
                {safety.footnote}
              </p>
            </div>

            <div className="grid gap-px bg-line sm:grid-cols-3 lg:grid-cols-1">
              {safety.figures.map((fig) => (
                <div
                  key={fig.label}
                  className="flex flex-col justify-center bg-surface p-7 sm:p-8"
                >
                  <p className="tnum text-3xl font-medium leading-none text-ink sm:text-4xl">
                    {fig.value}
                    {fig.unit && (
                      <span className="ml-1 text-base font-normal text-muted">{fig.unit}</span>
                    )}
                  </p>
                  <p className="mt-3 text-sm text-muted">{fig.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
