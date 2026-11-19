import type { ReactNode } from "react";

/**
 * Eco Airtech's own contaminant icons: a clean white line drawing of the
 * source, and a cloud of coloured particles that drifts slowly (still for
 * anyone who prefers reduced motion). One visual language for the whole set,
 * so eight different subjects read as one family.
 */

export type ContaminantKey = "mould" | "microbes" | "pollen" | "pets" | "odours" | "vocs" | "dust" | "outdoor";

type Dot = [x: number, y: number, r: number];

const line = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Particle clouds: positions in a 64 × 64 box, a colour pair, drawn behind or beside the line art. */
const CLOUDS: Record<ContaminantKey, { dots: Dot[]; from: string; to: string }> = {
  mould: { from: "#7FA35B", to: "#3E5A2B", dots: [[44, 10, 1.6], [50, 14, 1.2], [47, 19, 1.8], [54, 20, 1.1], [41, 15, 1.1], [52, 8, 1.3], [57, 13, 0.9], [45, 25, 1.0]] },
  microbes: { from: "#47D1A5", to: "#1E7F65", dots: [[8, 44, 1.5], [12, 50, 1.1], [6, 52, 1.0], [15, 45, 0.9], [10, 57, 1.3], [17, 54, 0.8]] },
  pollen: { from: "#F5B342", to: "#D9662B", dots: [[9, 18, 1.4], [6, 25, 1.1], [12, 28, 1.6], [5, 32, 0.9], [11, 36, 1.2], [15, 22, 0.9], [8, 40, 0.8]] },
  pets: { from: "#C9A27A", to: "#8A6545", dots: [[38, 6, 1.3], [44, 9, 1.1], [41, 13, 1.5], [48, 5, 0.9], [46, 15, 1.0], [52, 11, 0.8]] },
  odours: { from: "#F06A8A", to: "#B3264B", dots: [[22, 6, 1.2], [27, 10, 1.5], [24, 14, 1.0], [30, 5, 0.9], [32, 13, 1.1], [20, 12, 0.8]] },
  vocs: { from: "#7FB8F0", to: "#2F6FC2", dots: [[44, 14, 1.4], [49, 11, 1.1], [52, 17, 1.5], [57, 13, 1.0], [55, 21, 1.1], [60, 18, 0.8], [48, 20, 0.9]] },
  dust: { from: "#E8D8B0", to: "#A89466", dots: [[14, 20, 1.3], [20, 16, 1.0], [26, 19, 1.5], [33, 15, 1.1], [40, 18, 1.3], [46, 15, 0.9], [51, 19, 1.1], [30, 22, 0.8]] },
  outdoor: { from: "#B9C2BE", to: "#5D6763", dots: [[4, 36, 1.5], [8, 31, 1.1], [3, 28, 1.0], [10, 26, 1.3], [6, 22, 0.9], [13, 21, 0.8], [2, 41, 1.0]] },
};

const ART: Record<ContaminantKey, ReactNode> = {
  // A sporangium: stalk, head and released spores
  mould: (
    <>
      <path {...line} d="M30 56V30" />
      <path {...line} d="M30 44c-4-2-8-2-11 1M30 50c4-2 8-2 11 1" />
      <circle {...line} cx="30" cy="22" r="8" />
      <path {...line} d="M26 20.5h0.01M32 18h0.01M33 24h0.01M28 25h0.01" strokeWidth={3} />
      <path {...line} d="M18 56h24" />
    </>
  ),
  // A virus capsule beside a rod bacterium
  microbes: (
    <>
      <circle {...line} cx="38" cy="24" r="9" />
      <path {...line} d="M38 11v4M38 33v4M25 24h4M47 24h4M28.8 14.8l2.8 2.8M44.4 30.4l2.8 2.8M28.8 33.2l2.8-2.8M44.4 17.6l2.8-2.8" />
      <circle cx="35" cy="22" r="1.6" fill="currentColor" />
      <circle cx="41" cy="27" r="1.4" fill="currentColor" />
      <rect {...line} x="20" y="40" width="24" height="10" rx="5" transform="rotate(-20 32 45)" />
    </>
  ),
  // A pollen-bearing flower
  pollen: (
    <>
      <circle {...line} cx="36" cy="22" r="5" />
      <path {...line} d="M36 13a5.5 5.5 0 1 1 7.8 4.5M45 22.5a5.5 5.5 0 1 1-4.2 8M38.5 31a5.5 5.5 0 1 1-8.6-1.6M27.5 24a5.5 5.5 0 1 1 3-9.3" />
      <path {...line} d="M36 27v29M36 46c-5 0-9-3-10-7 5 0 9 3 10 7z" />
    </>
  ),
  // A cat's head: shed skin and hair
  pets: (
    <>
      <path {...line} d="M16 28l2-14 9 8h10l9-8 2 14c0 13-8 22-16 22s-16-9-16-22z" />
      <path {...line} d="M25 33h0.01M39 33h0.01" strokeWidth={3.4} />
      <path {...line} d="M30 39l2 2 2-2M32 41v3M10 37h8M10 43h8M46 37h8M46 43h8" />
    </>
  ),
  // A pan with rising fumes
  odours: (
    <>
      <path {...line} d="M8 40h36a0 0 0 0 1 0 0c0 7-6 12-13 12h-10c-7 0-13-5-13-12z" />
      <path {...line} d="M44 42h12" />
      <path {...line} d="M18 33c-2-3 2-5 0-8M26 33c-2-3 2-5 0-8M34 33c-2-3 2-5 0-8" />
    </>
  ),
  // A spray bottle: aerosols, cleaning products, VOCs
  vocs: (
    <>
      <path {...line} d="M22 26h14l3 6v22a3 3 0 0 1-3 3H22a3 3 0 0 1-3-3V32z" />
      <path {...line} d="M24 26v-6h10v6M24 20l-2-6h14l4 4h-6" />
      <path {...line} d="M24 40h10" />
    </>
  ),
  // A sofa cushion with settled dust
  dust: (
    <>
      <path {...line} d="M12 36v-6a5 5 0 0 1 5-5h30a5 5 0 0 1 5 5v6" />
      <path {...line} d="M8 38a4 4 0 0 1 8 0v4h32v-4a4 4 0 0 1 8 0v12H8z" />
      <path {...line} d="M14 50v5M50 50v5" />
    </>
  ),
  // A car's exhaust, drifting in through an open window
  outdoor: (
    <>
      <path {...line} d="M16 42l4-10c1-2 2.5-3 5-3h14c2.5 0 4 1 5 3l4 10" />
      <path {...line} d="M14 42h38a3 3 0 0 1 3 3v5H11v-5a3 3 0 0 1 3-3z" />
      <circle {...line} cx="21" cy="51" r="4" />
      <circle {...line} cx="45" cy="51" r="4" />
      <path {...line} d="M27 33h12" />
    </>
  ),
};

export function ContaminantIcon({ name, className }: { name: ContaminantKey; className?: string }) {
  const c = CLOUDS[name];
  const id = `grad-${name}`;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c.from} />
          <stop offset="1" stopColor={c.to} />
        </linearGradient>
      </defs>
      <g className="particles">
        {c.dots.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r * 1.35} fill={`url(#${id})`} style={{ animationDelay: `${(i * 0.37) % 2.4}s` }} />
        ))}
      </g>
      <g className="text-ink">{ART[name]}</g>
    </svg>
  );
}
