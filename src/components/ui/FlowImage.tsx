import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  className?: string;
  /** Load straight away; for an image near the top of the page. */
  eager?: boolean;
}

/**
 * A still image given a sense of airflow, in CSS alone.
 *
 * The picture drifts and zooms very slowly, and a soft band of light travels
 * left to right across it, in the direction the arrows point. No video and
 * no script: it costs nothing beyond the image itself. Both movements stop
 * for visitors who ask for reduced motion (see .flow-* in index.css).
 */
export function FlowImage({ src, alt, className, eager }: Props) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-line bg-black", className)}>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="flow-drift aspect-[3/2] w-full object-cover"
      />
      <span aria-hidden className="flow-sweep pointer-events-none absolute inset-0" />
    </div>
  );
}
