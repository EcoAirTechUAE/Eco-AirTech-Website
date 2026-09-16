/**
 * Build-time prerender.
 *
 * Renders every route to a static HTML file with its own <title>, meta
 * description, canonical, Open Graph tags and JSON-LD already in the head,
 * and the page content already in the body.
 *
 * Why this rather than relying on client-side tags alone: Google will execute
 * JavaScript, but it queues render-heavy pages and reads the first response
 * first. Everything else that matters here — the WhatsApp, LinkedIn, Slack and
 * X unfurlers that produce the preview card when someone shares a link — does
 * not run JavaScript at all. A tag written by useEffect is invisible to them.
 *
 * Output goes to dist/<route>/index.html. Vercel checks the filesystem before
 * applying the SPA rewrite, so /filters serves dist/filters/index.html and
 * only genuinely unknown paths fall through to the shell.
 *
 * Run after `vite build`:
 *   vite build --ssr src/prerender.tsx --outDir .prerender
 *   node .prerender/prerender.js
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "@/App";
import { indexableRoutes, jsonLdForPath, metaForPath, SITE_URL } from "@/lib/seo";
import { faqGroups } from "@/content/faqs";

const DIST = "dist";
const template = readFileSync(join(DIST, "index.html"), "utf8");

/** Escapes a value for use inside a double-quoted HTML attribute. */
const attr = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/**
 * JSON-LD sits in a <script> element, so the only sequence that can break out
 * of it is a literal "</script". Escaping the slash keeps the JSON valid while
 * making that impossible.
 */
const ldSafe = (s: string) => s.replace(/<\//g, "<\\/");

function headFor(path: string): string {
  const meta = metaForPath(path);
  const canonical = `${SITE_URL}${meta.path === "/" ? "/" : meta.path}`;

  return [
    `<title>${attr(meta.title)}</title>`,
    `<meta name="description" content="${attr(meta.description)}" />`,
    `<link rel="canonical" href="${attr(canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Eco AirTech" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta property="og:title" content="${attr(meta.title)}" />`,
    `<meta property="og:description" content="${attr(meta.description)}" />`,
    `<meta property="og:url" content="${attr(canonical)}" />`,
    `<meta property="og:image" content="${attr(meta.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${attr(meta.title)}" />`,
    `<meta name="twitter:description" content="${attr(meta.description)}" />`,
    `<meta name="twitter:image" content="${attr(meta.image)}" />`,
    `<script type="application/ld+json">${ldSafe(jsonLdForPath(path))}</script>`,
  ].join("\n    ");
}

/**
 * Strips the tags the template carries so the per-route ones do not end up
 * duplicated. index.html keeps a generic set purely so `vite dev` and any
 * unmatched path still have something sensible.
 */
function stripTemplateTags(html: string): string {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/i, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/i, "")
    .replace(/<meta\s+property="og:[^"]*"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>\s*/gi, "");
}

const routes = indexableRoutes();
let written = 0;

/* Build-time assertions. A wrong canonical or a duplicate title is not a
   cosmetic problem — it decides whether a page gets indexed at all — so these
   fail the build rather than printing a warning nobody reads. */
const problems: string[] = [];
const seenTitles = new Map<string, string>();
const seenDescriptions = new Map<string, string>();
const firstFaqQuestion = faqGroups[0]?.items[0]?.q ?? "";

for (const route of routes) {
  const body = renderToStaticMarkup(
    <StaticRouter location={route}>
      <App />
    </StaticRouter>,
  );

  let html = stripTemplateTags(template);

  html = html.replace("</head>", `  ${headFor(route)}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const meta = metaForPath(route);

  const duplicateTitle = seenTitles.get(meta.title);
  if (duplicateTitle) {
    problems.push(`${route} and ${duplicateTitle} share a <title>: "${meta.title}"`);
  }
  seenTitles.set(meta.title, route);

  const duplicateDescription = seenDescriptions.get(meta.description);
  if (duplicateDescription) {
    problems.push(`${route} and ${duplicateDescription} share a meta description`);
  }
  seenDescriptions.set(meta.description, route);

  if (meta.title.length > 70) {
    problems.push(`${route} title is ${meta.title.length} chars, and Google truncates past ~60-70`);
  }
  if (meta.description.length < 50 || meta.description.length > 170) {
    problems.push(`${route} description is ${meta.description.length} chars, aim for 50-170`);
  }

  // Exactly one canonical, and it must name this route.
  const canonicals = html.match(/<link rel="canonical"[^>]*>/g) ?? [];
  if (canonicals.length !== 1) {
    problems.push(`${route} has ${canonicals.length} canonical tags (expected 1)`);
  } else if (!canonicals[0].includes(`${SITE_URL}${route === "/" ? "/" : route}"`)) {
    problems.push(`${route} canonical does not point at itself: ${canonicals[0]}`);
  }

  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!ld) {
    problems.push(`${route} has no JSON-LD`);
  } else {
    try {
      JSON.parse(ld[1].split("<\\/").join("</"));
    } catch (err) {
      problems.push(`${route} JSON-LD does not parse: ${(err as Error).message}`);
    }
  }

  // FAQPage may only be declared where the questions are actually rendered.
  const declaresFaq = html.includes('"@type":"FAQPage"');
  const rendersFaq = firstFaqQuestion !== "" && body.includes(firstFaqQuestion);
  if (declaresFaq && !rendersFaq) {
    problems.push(`${route} declares FAQPage but does not render the FAQ`);
  }
  if (rendersFaq && !declaresFaq) {
    problems.push(`${route} renders the FAQ but does not declare FAQPage, a missed rich result`);
  }

  // No em dashes anywhere in the served file. They are not house style.
  //
  // This checks the finished HTML rather than grepping the source, so it also
  // covers titles and descriptions built at runtime from template literals,
  // the JSON-LD, and anything sitting in a comment that View Source would
  // show. Checking only the rendered body missed all of those.
  if (html.includes("—")) {
    const where = html
      .split("—")
      .slice(0, 3)
      .map((s) => s.slice(-70).replace(/\s+/g, " "))
      .join(" || ");
    problems.push(`${route} contains an em dash after: ...${where}`);
  }

  const outPath =
    route === "/" ? join(DIST, "index.html") : join(DIST, route.slice(1), "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  written++;
}

/* ------------------------------- sitemap -------------------------------- */

const today = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) => {
    const loc = `${SITE_URL}${route === "/" ? "/" : route}`;
    // The homepage is the entry point; section indexes change as content is
    // added; leaf pages are the most stable.
    const priority = route === "/" ? "1.0" : route.split("/").length === 2 ? "0.8" : "0.6";
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  }),
  "</urlset>",
].join("\n");

writeFileSync(join(DIST, "sitemap.xml"), sitemap);

const robots = [
  "User-agent: *",
  "Allow: /",
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  "",
].join("\n");

writeFileSync(join(DIST, "robots.txt"), robots);

if (problems.length > 0) {
  console.error("\nSEO problems found:");
  for (const problem of problems) console.error(`  ${problem}`);
  console.error(`\n${problems.length} problem(s). Build failed.`);
  process.exit(1);
}

console.log(`prerendered ${written} routes`);
console.log(`sitemap.xml: ${routes.length} urls`);
console.log(`robots.txt written for ${SITE_URL}`);
