import { cn } from "@/lib/utils";

/**
 * The soft radial light source that sits behind product renders and hero
 * content — the visual signature carried through from the credentials deck.
 * Purely decorative, so it is hidden from assistive technology.
 */
export function Bloom({
  className,
  intensity = "md",
  animate = true,
}: {
  className?: string;
  intensity?: "sm" | "md" | "lg";
  animate?: boolean;
}) {
  const opacity = { sm: "opacity-40", md: "opacity-60", lg: "opacity-90" }[intensity];

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 bg-bloom blur-2xl",
        opacity,
        animate && "animate-bloom-pulse",
        className,
      )}
    />
  );
}
