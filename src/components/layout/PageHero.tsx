import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface Crumb {
  label: string;
  to?: string;
}

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  visual,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  /** Sits beside the copy on desktop, below it on narrow screens. */
  visual?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="container relative py-16 sm:py-24">
        {crumbs && (
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-faint">
                <li>
                  <Link to="/" className="transition-colors hover:text-accent">
                    Home
                  </Link>
                </li>
                {crumbs.map((crumb) => (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    <ChevronRight aria-hidden className="h-3 w-3" />
                    {crumb.to ? (
                      <Link to={crumb.to} className="transition-colors hover:text-accent">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-muted">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}

        {/*
          With a visual, the copy takes a column and the measure caps come
          off: the grid column is already narrower than max-w-4xl, so leaving
          them on would set the text in a column inside a column.
        */}
        <div
          className={cn(
            visual && "grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-x-16",
          )}
        >
          <Reveal i={1}>
            <p className="eyebrow mt-8 flex items-center gap-3">
              {eyebrow}
            </p>
            <h1 className={cn("mt-6 text-display-lg font-medium", !visual && "max-w-4xl")}>
              {title}
            </h1>
            {lead && (
              <p
                className={cn(
                  "mt-7 text-lg leading-relaxed text-muted",
                  !visual && "max-w-2xl",
                )}
              >
                {lead}
              </p>
            )}
          </Reveal>

          {visual && <Reveal i={2}>{visual}</Reveal>}
        </div>

        {children}
      </div>
    </section>
  );
}
