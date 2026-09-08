import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInView, useReducedMotion } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger index — multiplied by 60ms. */
  i?: number;
  as?: "div" | "li" | "section" | "article";
}

/**
 * Fade-and-rise on entry. The only motion pattern used on the site — one
 * idea applied consistently, rather than a different flourish per section.
 *
 * Under prefers-reduced-motion the element renders plainly with no transform
 * and no transition, so content is never hidden waiting for an animation
 * that will not run.
 */
export function Reveal({ children, className, i = 0, as: Tag = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      // Single generic element ref — all four permitted tags are HTMLElements.
      ref={ref as never}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
        inView ? "translate-y-0 opacity-100" : "translate-y-[18px] opacity-0",
        className,
      )}
      style={{ transitionDelay: `${i * 60}ms` }}
    >
      {children}
    </Tag>
  );
}
