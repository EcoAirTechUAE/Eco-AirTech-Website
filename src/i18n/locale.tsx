import { createContext, useContext, useEffect, type ReactNode } from "react";

export type Lang = "en" | "ar";

export const LANGS: { code: Lang; label: string; native: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "English", native: "English", dir: "ltr" },
  { code: "ar", label: "Arabic", native: "العربية", dir: "rtl" },
];

interface LocaleValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  isRtl: boolean;
}

const LocaleContext = createContext<LocaleValue>({ lang: "en", dir: "ltr", isRtl: false });

export function useLocale() {
  return useContext(LocaleContext);
}

/**
 * Prefixes an app path with the active language.
 *
 * English is the default and stays unprefixed, so existing URLs keep working
 * and nothing that has already been shared breaks. Arabic lives under /ar.
 */
export function localePath(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === "en") return clean;
  return clean === "/" ? "/ar" : `/ar${clean}`;
}

/** Strips the language prefix, giving the route-relative path. */
export function stripLocale(pathname: string): string {
  if (pathname === "/ar") return "/";
  if (pathname.startsWith("/ar/")) return pathname.slice(3);
  return pathname;
}

export function LocaleProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const dir = lang === "ar" ? "rtl" : "ltr";

  // The document element carries lang and dir, not a wrapper div: screen
  // readers, the browser's own text handling and CSS logical properties all
  // key off <html>, and a nested dir would leave the page chrome mismatched.
  useEffect(() => {
    const el = document.documentElement;
    const prevLang = el.lang;
    const prevDir = el.dir;
    el.lang = lang;
    el.dir = dir;
    return () => {
      el.lang = prevLang;
      el.dir = prevDir;
    };
  }, [lang, dir]);

  return (
    <LocaleContext.Provider value={{ lang, dir, isRtl: dir === "rtl" }}>
      {children}
    </LocaleContext.Provider>
  );
}
