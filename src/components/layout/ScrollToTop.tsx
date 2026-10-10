import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll position on route change, but leaves in-page anchor
 * navigation (#hash) alone so jump links still work.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // The router does not scroll to anchors on a client-side navigation,
      // so a link like /contact#faq would otherwise land wherever the last
      // page was scrolled to.
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
