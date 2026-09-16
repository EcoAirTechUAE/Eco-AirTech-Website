/**
 * Build-time smoke test. Renders every route to static HTML and asserts on
 * the result, so copy and content regressions are caught before a deploy
 * rather than by eye on the live site.
 *
 * Not part of the app bundle — built separately:
 *   npx vite build --ssr src/verify.tsx --outDir .verify && node .verify/verify.js
 */
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "@/App";
import { devices } from "@/content/devices";
import { industries } from "@/content/industries";

const routes = [
  "/",
  "/technology",
  "/devices",
  "/filters",
  "/industries",
  "/results",
  "/contact",
  "/no-such-page",
  ...devices.map((d) => `/devices/${d.slug}`),
  ...industries.map((i) => `/industries/${i.slug}`),
];

function render(path: string): string {
  return renderToStaticMarkup(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>,
  );
}

/** Strings that must not appear on any route. */
const FORBIDDEN: [string, string][] = [
  ["Heathrow", "removed client logo"],
  ["heathrow.png", "removed client logo asset"],
  ["hello@ecoairtech.ae", "old email"],
  ["tel:+971", "phone link (should be WhatsApp/email only)"],
  ["+971 50 738 2560", "phone number on display"],
  ["971500000000", "placeholder WhatsApp number"],
  ["do outdoors what nothing indoors", "replaced technology headline"],
  ["building systems problem, not a cleaning problem", "replaced myth headline"],
  ["beaten on its own ground", "replaced filter headline"],
  ["text-sm leading-relaxed text-muted", "un-migrated body copy class"],
];

/** [route, string that must appear, description] */
const REQUIRED: [string, string, string][] = [
  ["/technology", "Hydroxyls bring nature", "new technology headline"],
  ["/technology", "indoor environmental systems problem", "new myth headline"],
  ["/filters", "Transform your existing HVAC", "new filter headline"],
  ["/contact", "hello@eco-airtech.com", "new email"],
  ["/devices/overwatch", "/assets/devices/overwatch.png", "OverWatch render"],
  ["/", "971507382560", "live WhatsApp number"],
];

let failures = 0;
const fail = (msg: string) => {
  failures++;
  console.log(`  FAIL  ${msg}`);
};

const pages = new Map<string, string>();

for (const route of routes) {
  let html: string;
  try {
    html = render(route);
  } catch (err) {
    fail(`${route} threw: ${err instanceof Error ? err.message : String(err)}`);
    continue;
  }
  pages.set(route, html);

  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) fail(`${route} has ${h1s} <h1> elements (expected exactly 1)`);

  const imgs = html.match(/<img\b[^>]*>/g) ?? [];
  for (const img of imgs) {
    if (!/\salt=/.test(img)) fail(`${route} has an <img> with no alt attribute`);
  }

  for (const [needle, what] of FORBIDDEN) {
    if (html.includes(needle)) fail(`${route} still contains ${what}: "${needle}"`);
  }
}

for (const [route, needle, what] of REQUIRED) {
  const html = pages.get(route);
  if (!html) {
    fail(`${route} did not render, cannot check ${what}`);
  } else if (!html.includes(needle)) {
    fail(`${route} is missing ${what}: "${needle}"`);
  }
}

// Green label sizing: every small green label should now be the shared 13px
// step. Any 10/11/12px size sitting on an accent or faint tone is a leftover.
for (const [route, html] of pages) {
  const classLists = html.match(/class="[^"]*"/g) ?? [];
  for (const cls of classLists) {
    const green = /(?:^|\s|")text-(?:accent|faint)\b/.test(cls);
    const tiny = /text-\[(?:10|11|12)px\]|\btext-xs\b/.test(cls);
    if (green && tiny) fail(`${route} has undersized green text: ${cls}`);
  }
}

console.log(`\nRoutes rendered: ${pages.size}/${routes.length}`);
console.log(failures === 0 ? "ALL CHECKS PASSED" : `${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);
