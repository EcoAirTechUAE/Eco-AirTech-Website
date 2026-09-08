import { Check, MoveRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { filterMyth } from "@/content/technology";

export function FilterMyth() {
  return (
    <Section surface>
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-accent/50" />
              {filterMyth.eyebrow}
            </p>
            <h2 className="mt-6 text-display-md font-medium">{filterMyth.headline}</h2>
            <p className="mt-6 max-w-prose leading-relaxed text-muted">{filterMyth.body}</p>
            <p className="mt-6 max-w-prose leading-relaxed text-ink/90">{filterMyth.close}</p>
          </Reveal>

          <Reveal i={1}>
            <div className="card overflow-hidden">
              {/* What it does catch */}
              <div className="border-b border-line p-6 sm:p-7">
                <p className="font-mono text-eyebrow uppercase tracking-wider text-muted">
                  What a standard return filter catches
                </p>
                <ul className="mt-5 space-y-3">
                  {filterMyth.caught.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between gap-4 rounded-lg bg-surface2/60 px-4 py-3"
                    >
                      <span className="flex items-center gap-3 text-sm text-ink">
                        <Check aria-hidden className="h-4 w-4 shrink-0 text-accent" />
                        {item.name}
                      </span>
                      <span className="tnum shrink-0 font-mono text-xs text-faint">{item.size}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What goes straight past it */}
              <div className="p-6 sm:p-7">
                <p className="font-mono text-eyebrow uppercase tracking-wider text-warn">
                  What passes straight through
                </p>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {filterMyth.passesThrough.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between gap-3 rounded-lg border border-warn/15 bg-warn/[0.05] px-4 py-3"
                    >
                      <span className="flex min-w-0 items-center gap-2.5 text-sm text-ink">
                        <MoveRight aria-hidden className="h-4 w-4 shrink-0 text-warn" />
                        <span className="truncate">{item.name}</span>
                      </span>
                      <span className="tnum shrink-0 font-mono text-[11px] text-faint">
                        {item.size}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
