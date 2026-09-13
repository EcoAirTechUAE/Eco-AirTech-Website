import { useLocale } from "@/i18n/locale";

import * as clients from "./clients";
import * as devices from "./devices";
import * as faqs from "./faqs";
import * as filters from "./filters";
import * as industries from "./industries";
import * as technology from "./technology";
import * as testResults from "./testResults";

import { arOverrides } from "./ar";

/** English is the source of truth; every key exists here. */
const en = {
  ...clients,
  ...devices,
  ...faqs,
  ...filters,
  ...industries,
  ...technology,
  ...testResults,
};

export type Content = typeof en;

/** Recursive partial — an Arabic bundle may translate any subset. */
export type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * Overlays a translation onto the English base, key by key.
 *
 * Anything the translator has not reached yet falls through to English, so a
 * partial translation renders a complete page rather than blanks. Arrays
 * merge by index, which is why an Arabic array must keep the same order as
 * its English counterpart — `null` is the way to skip an entry.
 */
function deepMerge<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;

  if (Array.isArray(base) && Array.isArray(override)) {
    return base.map((item, i) =>
      i < override.length ? deepMerge(item, override[i]) : item,
    ) as unknown as T;
  }

  if (isPlainObject(base) && isPlainObject(override)) {
    const out: Record<string, unknown> = { ...base };
    for (const key of Object.keys(override)) {
      out[key] = deepMerge((base as Record<string, unknown>)[key], override[key]);
    }
    return out as T;
  }

  return override as T;
}

// Merged once at module load, not per render.
const ar: Content = deepMerge(en, arOverrides);

const bundles: Record<string, Content> = { en, ar };

/** Content for the active language, with English filling any gaps. */
export function useContent(): Content {
  const { lang } = useLocale();
  return bundles[lang] ?? en;
}

/** For non-component code (SSR helpers, tests). */
export function getContent(lang: string): Content {
  return bundles[lang] ?? en;
}
