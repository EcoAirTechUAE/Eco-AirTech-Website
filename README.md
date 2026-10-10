# Eco AirTech — GCC marketing site

Vite + React + TypeScript + Tailwind. The stack deliberately mirrors
Lovable's own scaffold (`@/*` alias, Tailwind config file, react-router) so
the project imports cleanly.

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # typecheck + production build
npm run preview
```

---

## Before this goes live

Three things, in priority order.

### 1. Contact details — `src/config/site.ts`

Every phone number, email, address and video ID lives in this one file.
Nothing else in the codebase hard-codes them. Replace everything marked
`TODO`, starting with the **WhatsApp number** — the floating button and every
WhatsApp CTA on the site read from it.

### 2. Connect the contact form — `src/lib/contact.ts`

`submitContact()` is currently a stub and **deliberately throws**, showing the
visitor a message directing them to WhatsApp. That is intentional: a form that
silently pretends to succeed loses real enquiries. Replace the function body
with a Supabase insert or a Formspree endpoint — examples are in the file —
and everything upstream keeps working unchanged.

### 3. Assets — `public/assets/README.md`

That file is a manifest: exact paths, formats and dimensions for the logo,
device renders, industry photography, video posters and client logos. Drop
files at those paths and they appear automatically.

Until then every image slot renders a labelled placeholder naming the file it
expects, so the site looks deliberate rather than broken while assets are
gathered.

---

## How it's organised

```
src/
  config/site.ts     contact details, WhatsApp, video IDs — single edit point
  content/           all copy and data as typed modules
  components/
    layout/          header, footer, WhatsApp button, page hero
    ui/              primitives — Section, Reveal, Stat, StudyCard, VideoFacade…
    sections/        one file per landing-page section
  pages/             one per route
  lib/               contact submission, motion hooks, utils
```

**Copy and figures live in `src/content/`, not in components.** The lab data is
dense and will be revised, and it should never require touching JSX to correct
a percentage.

`src/content/testResults.ts` is the important one. Every study carries its
product, technologies, duration, test space and administrator, because the
governing rule across this site is that **no figure appears without the
conditions that produced it**. Please keep that rule when adding results —
including the less flattering ones, which are currently published alongside
the rest on purpose.

---

## Positioning

The UK sister company, Arc AirTech, sells mould remediation to social housing
landlords under Awaab's Law. That framing is deliberately **not** used here.

This site sells to people investing in wellness — parents, hotels, schools,
employers, estates. Mould appears as *evidence* that the problem is real, never
as the pitch. The three consecutive sections after the technology film
(`SurfaceMyth`, `FilterMyth`, `GrowthTimeline`) carry the core education
argument: surface cleaning cannot reach embedded contamination, Gulf AC return
filters catch only coarse dust, and growth re-establishes within 24 hours. They
run before any product is mentioned, which is intentional.

---

## Notes

- **Motion** — one pattern (`Reveal`: fade and rise on entry), built on
  IntersectionObserver rather than an animation library. `framer-motion` was
  removed once it became clear it cost ~38 KB gzipped for a single effect.
  All motion is suppressed under `prefers-reduced-motion`.
- **Video** — `VideoFacade` loads nothing from YouTube or Vimeo until the
  visitor clicks, so no third-party scripts or cookies land on first paint.
- **Metadata** is set client-side in `src/lib/useMeta.ts`. Adequate for now; if
  organic search or social previews become a priority, pre-render the routes.
- **Theme** — the site is dark-only by design. Tokens are defined once in
  `src/index.css` and surfaced through `tailwind.config.ts`.
