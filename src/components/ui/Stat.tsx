import { cn } from "@/lib/utils";

/**
 * Oversized numeral treatment for headline figures.
 *
 * The number carries the weight; the label and the conditions sit beneath it
 * at normal size. Conditions are never optional — a percentage without its
 * protocol is not evidence.
 */
export function Stat({
  value,
  prefix,
  suffix,
  label,
  context,
  className,
}: {
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
  context?: string;
  className?: string;
}) {
  return (
    <div className={cn("tnum", className)}>
      <p className="flex items-start text-stat font-medium leading-none text-gradient">
        {prefix && <span className="text-[0.5em] leading-[1.4]">{prefix}</span>}
        {value}
        {suffix && <span className="text-[0.5em] leading-[1.4]">{suffix}</span>}
      </p>
      <p className="mt-4 text-sm font-medium leading-snug text-ink">{label}</p>
      {context && <p className="mt-1 font-mono text-[0.8125rem] leading-snug text-faint">{context}</p>}
    </div>
  );
}
