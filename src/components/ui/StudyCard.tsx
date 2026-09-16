import { FlaskConical, Building2, Quote } from "lucide-react";
import type { Study } from "@/content/testResults";
import { cn } from "@/lib/utils";

const kindLabel: Record<Study["kind"], string> = {
  live: "Live environment",
  field: "Field test",
  lab: "Laboratory",
};

function KindBadge({ kind }: { kind: Study["kind"] }) {
  const Icon = kind === "lab" ? FlaskConical : Building2;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.8125rem] uppercase tracking-wider",
        kind === "lab"
          ? "border-line-strong text-muted"
          : "border-accent/30 bg-accent/10 text-accent",
      )}
    >
      <Icon aria-hidden className="h-3 w-3" />
      {kindLabel[kind]}
    </span>
  );
}

/** Before/after spore counts, shown as proportional bars against the max. */
function SpeciesChart({ species }: { species: NonNullable<Study["species"]> }) {
  const max = Math.max(...species.rows.map((r) => r.before), 1);

  return (
    <div className="mt-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-eyebrow uppercase text-faint">{species.unit}</p>
        <div className="flex items-center gap-4 font-mono text-[0.8125rem] text-faint">
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="h-2 w-2 rounded-full bg-warn" /> Before
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="h-2 w-2 rounded-full bg-accent" /> After
          </span>
        </div>
      </div>

      <ul className="space-y-5">
        {species.rows.map((row) => {
          const reduction =
            row.before > 0 ? Math.round(((row.before - row.after) / row.before) * 1000) / 10 : null;

          return (
            <li key={row.species}>
              <div className="flex items-baseline justify-between gap-4">
                <p
                  className={cn(
                    "text-sm",
                    row.emphasis ? "font-medium text-ink" : "text-muted",
                  )}
                >
                  {row.species}
                </p>
                <p className="tnum shrink-0 font-mono text-[0.8125rem] text-faint">
                  {row.before.toLocaleString()} → {row.after.toLocaleString()}
                  {reduction !== null && (
                    <span className="ml-2 text-accent">−{reduction}%</span>
                  )}
                </p>
              </div>

              <div className="mt-2 space-y-1" aria-hidden>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface2">
                  <div
                    className="h-full rounded-full bg-warn/70"
                    style={{ width: `${Math.max((row.before / max) * 100, row.before > 0 ? 1.5 : 0)}%` }}
                  />
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface2">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${Math.max((row.after / max) * 100, row.after > 0 ? 1.5 : 0)}%` }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function StudyCard({ study, className }: { study: Study; className?: string }) {
  return (
    <article className={cn("card p-6 sm:p-8", className)}>
      <div className="flex flex-wrap items-center gap-3">
        <KindBadge kind={study.kind} />
        <p className="font-mono text-[0.8125rem] uppercase tracking-wider text-faint">{study.setting}</p>
      </div>

      <h3 className="mt-5 text-display-sm font-medium">{study.headline}</h3>
      <p className="mt-1.5 text-sm text-muted">{study.title}</p>
      <p className="mt-4 max-w-prose leading-relaxed text-muted">{study.summary}</p>

      {study.species && <SpeciesChart species={study.species} />}

      {study.metrics && (
        <div className="scroll-x mt-7">
          <table className="w-full min-w-[420px] border-collapse text-sm">
            <caption className="sr-only">Measured reductions for {study.title}</caption>
            <thead>
              <tr className="border-b border-line-strong text-left">
                <th scope="col" className="py-2.5 pr-4 font-mono text-[0.8125rem] uppercase tracking-wider text-faint">
                  Contaminant
                </th>
                <th scope="col" className="py-2.5 pr-4 font-mono text-[0.8125rem] uppercase tracking-wider text-faint">
                  Medium
                </th>
                <th scope="col" className="py-2.5 text-right font-mono text-[0.8125rem] uppercase tracking-wider text-faint">
                  Reduced
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {study.metrics.map((m, i) => (
                <tr key={`${m.name}-${m.medium}-${i}`}>
                  <td className="py-3 pr-4 text-ink">{m.name}</td>
                  <td className="py-3 pr-4 text-muted">{m.medium}</td>
                  <td className="py-3 text-right font-medium text-accent">{m.reduction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {study.quote && (
        <blockquote className="mt-7 border-l-2 border-accent/40 pl-5">
          <Quote aria-hidden className="mb-3 h-4 w-4 text-accent/50" />
          <p className="text-[0.95rem] italic leading-relaxed text-ink/90">“{study.quote.text}”</p>
          <footer className="mt-3 text-[0.8125rem] text-faint">
            <span className="text-muted">{study.quote.author}</span> · {study.quote.role}
          </footer>
        </blockquote>
      )}

      <dl className="mt-8 grid gap-x-8 gap-y-4 border-t border-line pt-6 text-sm sm:grid-cols-2">
        {(
          [
            ["Product", study.meta.product],
            ["Technologies", study.meta.technologies],
            ["Duration", study.meta.duration],
            ["Test space", study.meta.space],
            ["Administered by", study.meta.administrator],
          ] as const
        ).map(([label, value]) => (
          <div key={label}>
            <dt className="font-mono text-[0.8125rem] uppercase tracking-wider text-faint">{label}</dt>
            <dd className="mt-1 text-muted">{value}</dd>
          </div>
        ))}
      </dl>

      {study.notes && (
        <ul className="mt-6 space-y-2">
          {study.notes.map((note) => (
            <li key={note} className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-faint">
              <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/50" />
              {note}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
