import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { jsonLdForPath, metaForPath, SITE_URL } from "@/lib/seo";

/** Creates the tag on first use, then reuses it on every later navigation. */
function upsert(selector: string, create: () => HTMLElement): HTMLElement {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  const el = upsert(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute(attr, key);
    return m;
  });
  el.setAttribute("content", value);
}

/**
 * Keeps the document head in step with the current route.
 *
 * Each route is also prerendered to its own static HTML file with these tags
 * already baked in, which is what crawlers and link unfurlers actually read —
 * most of them never run JavaScript. This hook exists for the other half of
 * the story: once the SPA takes over, navigating from /devices to /filters
 * changes the URL without a page load, and without this the tab title and
 * canonical would still describe the page the visitor arrived on.
 */
export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = metaForPath(pathname);
    const canonical = `${SITE_URL}${meta.path === "/" ? "/" : meta.path}`;

    document.title = meta.title;

    setMeta("name", "description", meta.description);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", meta.image);
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setMeta("name", "twitter:image", meta.image);

    const link = upsert('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    });
    link.setAttribute("href", canonical);

    const ld = upsert('script[type="application/ld+json"]', () => {
      const s = document.createElement("script");
      s.setAttribute("type", "application/ld+json");
      return s;
    });
    ld.textContent = jsonLdForPath(pathname);
  }, [pathname]);

  return null;
}
