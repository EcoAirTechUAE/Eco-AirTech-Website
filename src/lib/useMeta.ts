import { useEffect } from "react";
import { site } from "@/config/site";

/**
 * Minimal per-route document metadata.
 *
 * Deliberately dependency-free rather than pulling in a helmet library for
 * what amounts to two DOM writes. Note this is client-side only — if search
 * or social previews become important, the site should be pre-rendered.
 */
export function useMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : `${site.name} — Medical-grade air for the Gulf`;

    if (!description) return;
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute("content", description);
  }, [title, description]);
}
