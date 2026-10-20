import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  poster: string;
  /** Shown instead of the video to visitors who ask for reduced motion. */
  still?: string;
  label: string;
  className?: string;
}

/**
 * A short, silent product animation that plays like a moving image.
 *
 * Muted, looping and inline, which is what lets browsers autoplay it (iOS
 * refuses otherwise). Nothing downloads until it is near the viewport, and
 * it pauses when scrolled away. Visitors who ask for reduced motion get the
 * still, or the poster, and no video at all.
 */
export function LoopVideo({ src, poster, still, label, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "200px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  // Runs after the source is attached, so play() has something to play.
  useEffect(() => {
    const video = ref.current;
    if (!video || !near) return;
    if (inView) {
      video.play().catch(() => {
        // Autoplay can still be refused (e.g. Low Power Mode); the poster
        // stays, which is an acceptable outcome.
      });
    } else {
      video.pause();
    }
  }, [near, inView]);

  if (reduced) {
    return (
      <img
        src={still ?? poster}
        alt={label}
        loading="lazy"
        className={cn("h-full w-full object-contain", className)}
      />
    );
  }

  return (
    <video
      ref={ref}
      // Only given a source once near the viewport, so it costs nothing above the fold.
      src={near ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
