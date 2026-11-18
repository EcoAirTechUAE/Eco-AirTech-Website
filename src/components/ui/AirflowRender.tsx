import { cn } from "@/lib/utils";

/*
 * The OVERWATCH render with its airflow drawn over it: contaminated air is
 * pulled into the back of the unit, and treated air streams out through the
 * louvres and along the canopy into the room.
 *
 * Paths are in the render's own pixel space (760 × 695), so the SVG overlay
 * stays registered to the unit at any size. Animation is SVG SMIL; under
 * prefers-reduced-motion the moving particles are hidden (see .airflow-* in
 * index.css) and the static arrows still explain the flow.
 */

const W = 760;
const H = 590;

/** Small seeded generator, so server and browser render identical particles. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Stream {
  d: string;
  r: number;
  dur: number;
  begin: number;
}

function streams(seed: number, count: number, make: (between: (a: number, b: number) => number) => Omit<Stream, "begin">): Stream[] {
  const rand = seeded(seed);
  const between = (a: number, b: number) => a + (b - a) * rand();
  return Array.from({ length: count }, () => {
    const s = make(between);
    // Negative begin starts each particle part-way along, so it never opens empty.
    return { ...s, begin: -between(0, s.dur) };
  });
}

/** In: from the room on the left, curving into the back of the casing. */
const DIRTY = streams(11, 34, (between) => {
  const y0 = between(20, 560);
  const y1 = between(140, 380);
  const x1 = between(40, 150);
  return {
    d: `M ${-110 - between(0, 60)} ${y0} C ${between(-60, -10)} ${y0 + between(-40, 40)}, ${x1 - 60} ${y1 + between(-30, 30)}, ${x1} ${y1}`,
    r: between(6, 13),
    dur: between(3.4, 5.6),
  };
});

/** Out: from the louvres, across the canopy floor and out of its mouth. */
const CLEAN = streams(29, 42, (between) => {
  const x0 = between(320, 470);
  const y0 = between(280, 430);
  const x1 = between(660, 900);
  const y1 = between(470, 700);
  return {
    d: `M ${x0} ${y0} C ${x0 + between(60, 130)} ${y0 + between(40, 90)}, ${x1 - between(140, 220)} ${y1 - between(20, 90)}, ${x1} ${y1}`,
    r: between(5, 10),
    dur: between(2.6, 4.2),
  };
});

/** Guide arrows: drawn once, so the idea reads even with motion off. */
const GUIDE_IN = ["M -80 150 C 0 160, 50 200, 105 225", "M -80 470 C -10 440, 50 360, 110 300"];
const GUIDE_OUT = ["M 440 340 C 560 390, 640 440, 790 480", "M 420 420 C 520 480, 620 560, 760 620"];

export function AirflowRender({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <figure className={cn("relative w-full max-w-full overflow-hidden rounded-2xl border border-line bg-black", className)}>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_70%_70%,hsl(var(--accent-2)/0.14),transparent_70%),radial-gradient(ellipse_45%_45%_at_10%_35%,rgba(226,178,118,0.10),transparent_70%)]" />

      <div className="relative px-[9%] pb-[12%] pt-[15%]">
        <div className="relative">
          <img src={src} alt={alt} loading="eager" decoding="async" className="relative block h-auto w-full" />

          <svg
            aria-hidden
            viewBox={`0 0 ${W} ${H}`}
            overflow="visible"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <defs>
              <radialGradient id="aw-dirty">
                <stop offset="0%" stopColor="#e8b46a" />
                <stop offset="45%" stopColor="#9a6326" />
                <stop offset="72%" stopColor="#4a2e12" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4a2e12" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="aw-clean">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#b9fbe4" />
                <stop offset="60%" stopColor="#47d1a5" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#47d1a5" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="aw-glow">
                <stop offset="0%" stopColor="#47d1a5" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#47d1a5" stopOpacity="0" />
              </radialGradient>
              <marker id="aw-head-in" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" fill="rgba(226,178,118,0.7)" />
              </marker>
              <marker id="aw-head-out" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" fill="rgba(71,209,165,0.85)" />
              </marker>
            </defs>

            {/* Treated air glowing at the louvres and along the canopy floor */}
            <ellipse cx="470" cy="400" rx="260" ry="150" fill="url(#aw-glow)" transform="rotate(20 470 400)" />

            {GUIDE_IN.map((d) => (
              <path key={d} d={d} fill="none" stroke="rgba(226,178,118,0.6)" strokeWidth="4" strokeDasharray="2 12" strokeLinecap="round" markerEnd="url(#aw-head-in)" />
            ))}
            {GUIDE_OUT.map((d) => (
              <path key={d} d={d} fill="none" stroke="rgba(71,209,165,0.75)" strokeWidth="4" strokeDasharray="2 12" strokeLinecap="round" markerEnd="url(#aw-head-out)" />
            ))}

            <g className="airflow-particles">
              {DIRTY.map((p, i) => (
                <circle key={`d${i}`} r={p.r} fill="url(#aw-dirty)" opacity="0">
                  <animateMotion dur={`${p.dur.toFixed(2)}s`} begin={`${p.begin.toFixed(2)}s`} repeatCount="indefinite" path={p.d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.3 0 0.6 1" />
                  <animate attributeName="opacity" dur={`${p.dur.toFixed(2)}s`} begin={`${p.begin.toFixed(2)}s`} repeatCount="indefinite" values="0;0.95;0.95;0" keyTimes="0;0.12;0.8;1" />
                  <animate attributeName="r" dur={`${p.dur.toFixed(2)}s`} begin={`${p.begin.toFixed(2)}s`} repeatCount="indefinite" values={`${p.r};${p.r};${(p.r * 0.35).toFixed(1)}`} keyTimes="0;0.8;1" />
                </circle>
              ))}
              {CLEAN.map((p, i) => (
                <circle key={`c${i}`} r={p.r} fill="url(#aw-clean)" opacity="0">
                  <animateMotion dur={`${p.dur.toFixed(2)}s`} begin={`${p.begin.toFixed(2)}s`} repeatCount="indefinite" path={p.d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.2 0.4 0.4 1" />
                  <animate attributeName="opacity" dur={`${p.dur.toFixed(2)}s`} begin={`${p.begin.toFixed(2)}s`} repeatCount="indefinite" values="0;1;1;0" keyTimes="0;0.12;0.78;1" />
                </circle>
              ))}
            </g>
          </svg>
        </div>
      </div>

      <figcaption className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-4 font-mono text-[0.8125rem] uppercase tracking-wider sm:p-5">
        <span className="rounded-full border border-[rgba(226,178,118,0.35)] bg-black/60 px-3 py-1.5 text-[#e8c08a] backdrop-blur-sm">Contaminated air in</span>
      </figcaption>
      <span className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-accent-lime/40 bg-black/60 px-3 py-1.5 font-mono text-[0.8125rem] uppercase tracking-wider text-accent-lime backdrop-blur-sm sm:bottom-5 sm:right-5">
        Clean air out
      </span>
    </figure>
  );
}
