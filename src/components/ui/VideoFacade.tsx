import { useMemo, useState } from "react";
import { Play, Film } from "lucide-react";
import type { VideoSlot } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Click-to-load video.
 *
 * The YouTube player — scripts and cookies — is only loaded once the visitor
 * actually clicks. Until then the card shows a poster frame.
 *
 * Where no local poster is supplied we fall back to YouTube's thumbnail CDN.
 * That is a third-party image request on page load (i.ytimg.com serves static
 * images and sets no tracking cookies, unlike the player iframe). To avoid it
 * entirely, drop a still into /public/assets/posters/ and set `poster` on the
 * slot in site.ts.
 */
export function VideoFacade({
  video,
  className,
  eager = false,
}: {
  video: VideoSlot;
  className?: string;
  eager?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  // Ordered candidates: a local still wins; otherwise the largest YouTube
  // thumbnail, falling back to hqdefault, which always exists.
  const posters = useMemo(() => {
    if (video.poster) return [video.poster];
    if (video.provider === "youtube" && video.id) {
      return [
        `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
        `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
      ];
    }
    return [];
  }, [video]);

  const [posterIdx, setPosterIdx] = useState(0);
  const poster = posters[posterIdx];

  const frame = cn(
    "group relative w-full overflow-hidden rounded-2xl border border-line bg-surface aspect-video",
    className,
  );

  // No video attached yet. This still has to look like part of the site, so
  // it mirrors the real play card's layout and carries a brand wash rather
  // than sitting as a flat dark rectangle. The developer hint is dev-only —
  // it must never reach a visitor.
  if (!video.id) {
    return (
      <div className={cn(frame, className)}>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-accent/[0.10] via-transparent to-accent-2/[0.07]"
        />
        <div
          aria-hidden
          className="absolute -inset-x-10 -bottom-24 h-56 bg-bloom opacity-70 blur-2xl"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2.5">Film</p>
              <p className="text-base font-medium text-ink sm:text-lg">{video.title}</p>
              {import.meta.env.DEV && (
                <p className="mt-2 font-mono text-[0.8125rem] text-faint">
                  dev only — add this video's ID in src/config/site.ts
                </p>
              )}
            </div>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line-strong bg-bg/40 text-muted backdrop-blur-sm sm:h-16 sm:w-16">
              <Film aria-hidden className="h-5 w-5" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (playing) {
    const src =
      video.provider === "youtube"
        ? `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`
        : `https://player.vimeo.com/video/${video.id}?autoplay=1`;

    return (
      <div className={frame}>
        <iframe
          src={src}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className={cn(frame, "cursor-pointer text-left")}
      aria-label={`Play video: ${video.title}`}
    >
      {poster && (
        <img
          src={poster}
          alt=""
          loading={eager ? "eager" : "lazy"}
          onError={() => setPosterIdx((i) => i + 1)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/25 to-bg/10"
      />

      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7">
        <div />
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-base font-medium text-ink sm:text-lg">{video.title}</p>
            {video.duration && (
              <p className="mt-1 font-mono text-xs text-muted">{video.duration}</p>
            )}
          </div>
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-accent text-[#04140A] transition-transform duration-300 ease-out group-hover:scale-110 sm:h-16 sm:w-16">
            <Play aria-hidden className="ml-0.5 h-5 w-5 fill-current" />
          </span>
        </div>
      </div>
    </button>
  );
}
