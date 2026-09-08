import { useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";

/**
 * Brand mark.
 *
 * `/assets/logo.png` is the supplied icon — white house outline plus the
 * colour wave — cropped from the master artwork with the "ECO AIRTECH"
 * wordmark removed. The white house is what makes it read on the dark
 * ground; the dark-house variant of this artwork disappears entirely.
 *
 * Pass `withWordmark` to set the company name in type beside the mark.
 */
export function Logo({
  className,
  withWordmark = false,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  const mark = failed ? (
    // Safety net only — drawn inline so a missing file never breaks the header.
    <svg
      viewBox="0 0 32 30"
      aria-hidden
      className="h-9 w-auto shrink-0 sm:h-10"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M2.5 13.2 16 2.5l13.5 10.7v14.3h-27V13.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        className="text-ink"
      />
      <path d="M6 19.5c3.4-3.2 6.7-3.2 10 0s6.6 3.2 10 0" stroke="url(#eat-wave-a)" strokeWidth="2.4" />
      <path
        d="M6 24c3.4-3.2 6.7-3.2 10 0s6.6 3.2 10 0"
        stroke="url(#eat-wave-b)"
        strokeWidth="2"
        opacity="0.6"
      />
      <defs>
        <linearGradient id="eat-wave-a" x1="6" y1="19" x2="26" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(var(--accent))" />
          <stop offset="1" stopColor="hsl(var(--accent-2))" />
        </linearGradient>
        <linearGradient id="eat-wave-b" x1="6" y1="24" x2="26" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(var(--accent-2))" />
          <stop offset="1" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <img
      src="/assets/logo.png"
      alt={site.name}
      width={224}
      height={180}
      onError={() => setFailed(true)}
      className="h-9 w-auto shrink-0 sm:h-10"
    />
  );

  if (!withWordmark) {
    return <span className={cn("inline-flex", className)}>{mark}</span>;
  }

  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      {mark}
      <span className="text-[0.95rem] font-semibold uppercase leading-none tracking-[0.14em]">
        Eco<span className="text-accent">&nbsp;AirTech</span>
      </span>
    </span>
  );
}
