import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

interface Crumb {
  label: string;
  to?: string;
}

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="container relative py-16 sm:py-24">
        {crumbs && (
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-faint">
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

        <Reveal i={1}>
          <p className="eyebrow mt-8 flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-accent/50" />
            {eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl text-display-lg font-medium">{title}</h1>
          {lead && (
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">{lead}</p>
          )}
        </Reveal>

        {children}
      </div>
    </section>
  );
}
