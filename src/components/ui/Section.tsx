import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Tighter vertical rhythm, for sections that follow closely from the one above. */
  tight?: boolean;
  /** Raised panel treatment. */
  surface?: boolean;
}

export function Section({ id, children, className, tight, surface }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        tight ? "py-16 sm:py-20" : "py-24 sm:py-32",
        surface && "border-y border-line bg-surface/40",
        className,
      )}
    >
      {children}
    </section>
  );
}

interface HeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
  /** Centres the block. Used sparingly — the default is left-aligned. */
  center?: boolean;
}

export function SectionHeading({ eyebrow, title, lead, className, center }: HeadingProps) {
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="eyebrow mb-5 flex items-center gap-3">
          {!center && <span aria-hidden className="h-px w-8 bg-accent/50" />}
          {eyebrow}
        </p>
      )}
      <h2 className="text-display-md font-medium">{title}</h2>
      {lead && <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">{lead}</p>}
    </Reveal>
  );
}

/** Small caps label used above dense content blocks. */
export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-eyebrow uppercase text-faint", className)}>{children}</p>
  );
}
