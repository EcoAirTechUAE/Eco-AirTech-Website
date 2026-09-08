import { useState } from "react";
import type { CSSProperties } from "react";
import type { ClientLogo } from "@/content/clients";
import { cn } from "@/lib/utils";

function LogoItem({ item }: { item: ClientLogo }) {
  const [failed, setFailed] = useState(false);

  return (
    <li className="flex h-20 shrink-0 items-center justify-center px-8 sm:px-12">
      {failed ? (
        <span className="whitespace-nowrap text-sm font-medium tracking-tight text-muted transition-colors duration-300 hover:text-ink">
          {item.short ?? item.name}
        </span>
      ) : (
        /*
          Every logo file shares a 140px canvas height and was scaled to a
          matched optical weight, so one `h-*` here renders them all in
          proportion — no per-logo tuning, and no wordmark shouting over a
          square mark. No grayscale filter: they are already pure white, so
          only the opacity lift on hover does anything.
        */
        <img
          src={item.logo}
          alt={item.name}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-12 w-auto object-contain opacity-70 transition-opacity duration-300 hover:opacity-100 sm:h-14"
        />
      )}
    </li>
  );
}

/**
 * Continuous logo wall.
 *
 * The list is rendered twice and translated by exactly -50%, which is what
 * makes the loop seamless. `aria-hidden` on the duplicate keeps screen
 * readers from hearing every name twice. Pauses on hover, and the animation
 * is suppressed entirely under prefers-reduced-motion (handled globally in
 * index.css), leaving a scrollable row.
 */
export function LogoMarquee({
  items,
  reverse = false,
  duration = "52s",
  className,
}: {
  items: ClientLogo[];
  reverse?: boolean;
  duration?: string;
  className?: string;
}) {
  return (
    <div className={cn("mask-fade-x group relative overflow-hidden", className)}>
      <ul
        className={cn(
          "flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
        style={{ "--marquee-duration": duration } as CSSProperties}
      >
        {items.map((item) => (
          <LogoItem key={item.name} item={item} />
        ))}
        {items.map((item) => (
          <LogoItem key={`${item.name}-dup`} item={item} />
        ))}
      </ul>
    </div>
  );
}
