import { useState } from "react";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Shown in the placeholder so it is obvious which asset is missing. */
  label?: string;
  ratio?: string;
}

/**
 * An image that degrades gracefully.
 *
 * Client assets are supplied after build, so until the files land in
 * /public/assets the page must still look deliberate rather than broken.
 * On error this renders a labelled slot naming the expected file path.
 */
export function SmartImage({ src, alt, className, label, ratio = "aspect-[4/3]" }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line-strong bg-surface/50 p-6 text-center",
          ratio,
          className,
        )}
      >
        <span aria-hidden className="h-8 w-8 rounded-full bg-accent/10 ring-1 ring-accent/25" />
        <p className="text-sm text-muted">{label ?? alt}</p>
        <code className="font-mono text-[0.8125rem] text-faint">{src}</code>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
