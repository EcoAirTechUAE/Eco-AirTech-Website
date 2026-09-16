/**
 * Per-route metadata and structured data.
 *
 * This is the single source of truth for every <title>, description,
 * canonical URL, Open Graph tag and JSON-LD block on the site. It is read
 * twice: once at build time by src/prerender.tsx, which bakes the tags into a
 * static HTML file per route, and once at runtime by the <Seo> component,
 * which keeps them correct as the visitor navigates within the SPA.
 *
 * Before this existed, index.html carried one hardcoded canonical pointing at
 * the homepage, which was served for every URL — telling Google that /filters,
 * /technology and all 19 other routes were duplicates of / and should not be
 * indexed separately. That is the single most damaging thing a site can say
 * about itself, so the canonical is now derived from the path in one place.
 */

import { site } from "@/config/site";
import { devices } from "@/content/devices";
import { industries } from "@/content/industries";
import { faqGroups } from "@/content/faqs";

/**
 * The canonical origin, with no trailing slash.
 *
 * NB this must match the domain actually served to the public. While the site
 * runs on a *.vercel.app preview it will not, and Google should not be
 * indexing a preview anyway — see the robots rule in prerender.
 */
export const SITE_URL = site.url.replace(/\/+$/, "");

export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og/og-cover.jpg`;

export interface PageMeta {
  title: string;
  description: string;
  /** Route path, always starting with "/" and never ending in one. */
  path: string;
  image: string;
  /** Breadcrumb trail, excluding the home node. */
  crumbs: { name: string; path: string }[];
}

const BRAND = "Eco AirTech";

/** Title tags read better as "Page — Brand"; the homepage states the offer. */
const titled = (t: string) => `${t} — ${BRAND}`;

/**
 * Descriptions are kept under ~160 characters. Google truncates past roughly
 * that on desktop, and a sentence cut mid-clause in the results page is worse
 * than a shorter one that finishes its thought. The build enforces the limit.
 */
const STATIC: Record<string, Omit<PageMeta, "path" | "image" | "crumbs">> = {
  "/": {
    title: "Eco AirTech — Nature's disinfectant, indoors and continuous",
    description:
      "Nature-based air technology for the UAE and GCC. ARC® hydroxyl systems that treat the air and the surfaces around it, continuously.",
  },
  "/technology": {
    title: titled("How ARC® hydroxyl technology works"),
    description:
      "Sunlight and humidity break down contamination outdoors. ARC® reproduces that reaction indoors, reaching surfaces and ductwork that cleaning cannot.",
  },
  "/devices": {
    title: titled("Air purification units for every building type"),
    description:
      "Five units, one technology — in-duct HVAC, PTAC, 750+, OverWatch and Portable. Retrofit into the air handling you already have, from one room upwards.",
  },
  "/filters": {
    title: titled("MERV 13A nanofibre filters with ODOGard®"),
    description:
      "Hospital-grade MERV 13A filtration at the air resistance of a MERV 9, rated to end of service life — with full ASHRAE 52.2 test data.",
  },
  "/industries": {
    title: titled("Air quality by sector"),
    description:
      "Homes, hotels, palaces, healthcare, schools, gyms and transport — what drives contamination in each, and how the specification differs.",
  },
  "/results": {
    title: titled("Independent test results and protocols"),
    description:
      "Every published laboratory and live-environment result, each with the product, technologies fitted, duration, space and administering body that produced it.",
  },
  "/contact": {
    title: titled("Request a site assessment"),
    description:
      "Tell us about the building and we will come back within one working day. Assessment first, then a written specification and a fixed price — for the UAE and wider GCC.",
  },
};

/**
 * Routes whose page component renders <FaqSection />. Kept next to the routes
 * themselves so that moving the FAQ means updating one line here — the
 * verification build asserts these match what is actually in the markup.
 */
const FAQ_ROUTES = new Set(["/", "/contact"]);

const CRUMB_LABEL: Record<string, string> = {
  "/technology": "Technology",
  "/devices": "Devices",
  "/filters": "Filters",
  "/industries": "Industries",
  "/results": "Results",
  "/contact": "Contact",
};

/**
 * Trims a content summary down to something that fits a search result.
 *
 * Prefers to stop at a sentence end so the snippet reads as a finished
 * thought; falls back to a word boundary with an ellipsis if the first
 * sentence is itself too long.
 */
function clampDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const sentenceEnd = clean.lastIndexOf(". ", max);
  if (sentenceEnd > 80) return clean.slice(0, sentenceEnd + 1);

  const wordEnd = clean.lastIndexOf(" ", max - 1);
  return `${clean.slice(0, wordEnd > 0 ? wordEnd : max - 1)}…`;
}

/** Normalises "/devices/" and "/devices" to the same key. */
export function normalisePath(path: string): string {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
}

export function metaForPath(rawPath: string): PageMeta {
  const path = normalisePath(rawPath);
  const abs = (p: string) => (p.startsWith("http") ? p : `${SITE_URL}${p}`);

  const staticMeta = STATIC[path];
  if (staticMeta) {
    const crumbLabel = CRUMB_LABEL[path];
    return {
      ...staticMeta,
      path,
      image: DEFAULT_OG_IMAGE,
      crumbs: crumbLabel ? [{ name: crumbLabel, path }] : [],
    };
  }

  const device = devices.find((d) => `/devices/${d.slug}` === path);
  if (device) {
    return {
      title: titled(`${device.article} — ${device.kicker}`),
      description: clampDescription(device.summary),
      path,
      image: abs(device.image),
      crumbs: [
        { name: "Devices", path: "/devices" },
        { name: device.name, path },
      ],
    };
  }

  const industry = industries.find((i) => `/industries/${i.slug}` === path);
  if (industry) {
    return {
      title: titled(`Air quality for ${industry.name.toLowerCase()}`),
      description: clampDescription(industry.summary),
      path,
      image: abs(industry.image),
      crumbs: [
        { name: "Industries", path: "/industries" },
        { name: industry.name, path },
      ],
    };
  }

  // Unknown route — the 404. Deliberately given a title that cannot be
  // mistaken for content, and excluded from the sitemap.
  return {
    title: titled("Page not found"),
    description: "That page does not exist.",
    path,
    image: DEFAULT_OG_IMAGE,
    crumbs: [],
  };
}

/* ------------------------------ structured data ------------------------- */

/**
 * The organisation. Reused by reference (@id) from the other blocks rather
 * than repeated, which is what lets Google tie the site, the products and the
 * business together as one entity.
 */
function organisation() {
  const sameAs = [site.social.linkedin, site.social.instagram, site.social.youtube].filter(Boolean);

  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BRAND,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/assets/logo.png`,
    },
    description:
      "Nature-based air purification technology for the UAE and GCC, using ARC® photocatalytic oxidation to produce hydroxyls that treat air and surfaces continuously.",
    email: site.contact.email,
    areaServed: [
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "Qatar" },
      { "@type": "Country", name: "Kuwait" },
      { "@type": "Country", name: "Bahrain" },
      { "@type": "Country", name: "Oman" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.contact.address.line1,
      addressCountry: "AE",
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

function website() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: BRAND,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

function breadcrumbs(meta: PageMeta) {
  if (meta.crumbs.length === 0) return null;
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      ...meta.crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.name,
        item: `${SITE_URL}${c.path}`,
      })),
    ],
  };
}

/**
 * Builds the JSON-LD graph for a route.
 *
 * Everything is emitted as one @graph rather than several separate script
 * tags, so the nodes can reference each other by @id.
 */
export function jsonLdForPath(rawPath: string): string {
  const path = normalisePath(rawPath);
  const meta = metaForPath(path);
  const nodes: Record<string, unknown>[] = [organisation(), website()];

  const crumbList = breadcrumbs(meta);
  if (crumbList) nodes.push(crumbList);

  const device = devices.find((d) => `/devices/${d.slug}` === path);
  if (device) {
    nodes.push({
      "@type": "Product",
      "@id": `${SITE_URL}${path}#product`,
      name: `${BRAND} ${device.name}`,
      description: clampDescription(device.summary),
      image: device.image.startsWith("http") ? device.image : `${SITE_URL}${device.image}`,
      category: "Air purification system",
      brand: { "@id": `${SITE_URL}/#organization` },
      // No price or rating: inventing either to win a rich result is exactly
      // the kind of thing that earns a structured-data penalty.
      additionalProperty: [
        { "@type": "PropertyValue", name: "Coverage", value: device.coverage },
        { "@type": "PropertyValue", name: "Mounting", value: device.mount },
        {
          "@type": "PropertyValue",
          name: "Technologies",
          value: device.technologies.join(", "),
        },
      ],
    });
  }

  const industry = industries.find((i) => `/industries/${i.slug}` === path);
  if (industry) {
    nodes.push({
      "@type": "Service",
      "@id": `${SITE_URL}${path}#service`,
      name: `Air purification for ${industry.name.toLowerCase()}`,
      description: clampDescription(industry.summary),
      provider: { "@id": `${SITE_URL}/#organization` },
      serviceType: "Indoor air quality treatment",
    });
  }

  // FaqSection renders on the homepage and /contact only. Declare FAQPage on
  // exactly those two: marking up questions that are not visible on the page
  // is a structured-data guidelines violation, and the penalty is losing rich
  // results site-wide rather than just on the offending page.
  if (FAQ_ROUTES.has(path)) {
    nodes.push({
      "@type": "FAQPage",
      "@id": `${SITE_URL}${path}#faq`,
      mainEntity: faqGroups.flatMap((group) =>
        group.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      ),
    });
  }

  nodes.push({
    "@type": "WebPage",
    "@id": `${SITE_URL}${path === "/" ? "/" : path}#webpage`,
    url: `${SITE_URL}${path === "/" ? "/" : path}`,
    name: meta.title,
    description: meta.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  });

  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}

/** Every indexable route, for the sitemap. Excludes the 404. */
export function indexableRoutes(): string[] {
  return [
    ...Object.keys(STATIC),
    ...devices.map((d) => `/devices/${d.slug}`),
    ...industries.map((i) => `/industries/${i.slug}`),
  ];
}
