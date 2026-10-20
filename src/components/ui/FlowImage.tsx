import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface Particles {
  /** Vertical band the particles travel in, as % of the image height. */
  band: [number, number];
  /** Where the filter face is, as % of the image width. Particles stop here. */
  stop: [number, number];
  count?: number;
}

interface Props {
  src: string;
  alt: string;
  className?: string;
  /** Load straight away; for an image near the top of the page. */
  eager?: boolean;
  /** Contaminants drifting in from the left and caught at the filter. */
  particles?: Particles;
}

/** Small seeded generator, so server and browser render identical particles. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A still image given a sense of airflow, in CSS alone.
 *
 * The picture drifts and zooms very slowly, and a soft band of light travels
 * left to right with the arrows. With `particles`, contaminants drift in from
 * the left and are caught at the filter face: they slow, shrink and fade into
 * the media, and never pass it. Particles sit inside the drifting layer, so
 * they stay registered to the filter as the image moves.
 *
 * No video and no script beyond rendering; everything stops for visitors who
 * ask for reduced motion (see .flow-* in index.css).
 */
export function FlowImage({ src, alt, className, eager, particles }: Props) {
  const dots = particles ? makeParticles(particles, src.length) : [];

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-line bg-black", className)}>
      <div className="flow-drift relative">
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="aspect-[3/2] w-full object-cover"
        />
        {dots.map((style, i) => (
          <span key={i} aria-hidden className="flow-particle" style={style} />
        ))}
      </div>
      <span aria-hidden className="flow-sweep pointer-events-none absolute inset-0" />
    </div>
  );
}

function makeParticles({ band, stop, count = 22 }: Particles, seed: number): CSSProperties[] {
  const rand = seeded(seed * 7919);
  const between = (a: number, b: number) => a + (b - a) * rand();
  return Array.from({ length: count }, () => {
    const duration = between(3.8, 6.5);
    return {
      top: `${between(band[0], band[1]).toFixed(1)}%`,
      width: `${between(5, 13).toFixed(1)}px`,
      "--stop": `${between(stop[0], stop[1]).toFixed(1)}%`,
      "--wob": `${between(-14, 14).toFixed(0)}px`,
      animationDuration: `${duration.toFixed(2)}s`,
      // Negative delays start each particle part-way through, so the image
      // never opens on an empty flow.
      animationDelay: `${(-between(0, duration)).toFixed(2)}s`,
    } as CSSProperties;
  });
}
