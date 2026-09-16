# Asset manifest

Drop files at the exact paths below and they appear automatically — no code
changes needed. Until a file exists, the site renders a labelled placeholder
naming the missing path, so nothing looks broken while you gather assets.

Everything here is served from the site root, so `public/assets/logo.png`
is referenced in code as `/assets/logo.png`.

---

## Brand — supplied ✅

| Path | Status | Notes |
|---|---|---|
| `logo.png` | **done** | House + wave mark, 298 × 240, transparent. Cropped from `ecoairtech white logo colour transparent.png` with the "ECO AIRTECH" wordmark removed. Used in the header and footer. |
| `logo-lockup-large.png` | **done** | Full lockup — mark plus the ECO AIRTECH wordmark, 1100 × 824. The hero graphic. |
| `../favicon.png` | **done** | 256 × 256, dark rounded square. |
| `../apple-touch-icon.png` | **done** | 180 × 180. |
| `og/og-cover.jpg` | outstanding | 1200 × 630 JPG. Social share image, referenced in `index.html`. |

The favicons carry an opaque `#060A08` ground on purpose: the house outline
in the master artwork is **white**, so a transparent favicon would be
invisible against a light browser tab strip.

For the same reason, use the *white* logo variant anywhere on this site — the
black-outline version (`icon no text.png`) disappears on the dark ground.

If a vector version of the mark ever turns up, drop it in as `logo.svg` and
change the one `src` in `src/components/layout/Logo.tsx`. The raster is
perfectly sharp at the sizes used here, so this is optional.

---

## Devices

| Path | Status | Notes |
|---|---|---|
| `devices/750-plus.jpg` | **done** | 655 × 1000, on black. |
| `devices/hvac.jpg` | **done** | 1000 × 667, on black. |
| `devices/ptac.jpg` | **done** | 1000 × 634, on black. |
| `devices/portable.jpg` | **done** | 533 × 1000, on black. |
| `devices/overwatch.jpg` | **outstanding** | The only unit without a render — its card shows a labelled placeholder. |

The supplied renders sit on black, so device cards frame them as product
tiles (`bg-black`, rounded, bordered) rather than floating them as cut-outs.
That is deliberate: a black rectangle floated on the slightly lighter card
would show a visible edge.

**The hero wants a transparent render.** A framed black tile was tried there
and read as a pasted-in box, so the hero currently shows the brand mark
instead. If a transparent cut-out of the HVAC unit turns up, point the hero's
`SmartImage` at it and drop the frame — the `<Bloom />` behind it is already
in place.

---

## Technology diagrams

| Path | Status | Notes |
|---|---|---|
| `tech/arc-cell-airflow.jpg` | **done** | 1400 × 691. ARC cell cutaway showing airflow. Flattened onto `#131C17` to match its container exactly. |
| `tech/how-it-works.png` | **done** | 1200 × 403, transparent. Three-stage airflow diagram, cropped from `How technology works.png` (y 210–710) to drop the burnt-in captions — those are live text in `airflowSteps`. 570 KB is heavy for a PNG; a proper quantiser (pngquant/oxipng) would roughly halve it without visible loss. Alpha is required, so it cannot become a JPEG: the page background has scroll-fixed gradients behind it. |
| `tech/hydroxyl.png` | **done** | 187 × 177, transparent. Glow sprite used by the hydroxyl canvas animation. |

---

## Filters

| Path | Size | Notes |
|---|---|---|
| `filters/merv13a.png` | 1000 × 1000 | MERV 13A filter, transparent PNG. **Outstanding.** |

---

## Client logos — supplied ✅

`clients/jumeirah.png` · `nhs.png` · `ihg.png` · `owtc.png` ·
`mod.png` · `dio.png` · `cvs.png` · `lq.png` · `great-places.png`

All ten were normalised from mixed source files (white-on-transparent,
coloured-on-transparent, dark-on-white, and L&Q on yellow) into a single
**white-with-alpha** treatment, which is what stops ten brand palettes
fighting each other on a dark wall.

Two things make the wall look designed rather than pasted together:

1. **Equal optical mass, not equal height.** Each logo is scaled so its
   bounding-box area is constant. Scaling everything to the same height makes
   a wide wordmark (Heathrow, 5.5:1) shout while a square mark disappears.
2. **A shared 150px canvas height.** Because every file has the same canvas,
   one `h-*` class in `LogoMarquee` renders them all in proportion — there is
   no per-logo tuning anywhere in the code. No logo exceeds 118px inside that
   canvas, so each keeps a clear margin and nothing can clip.

**On trimming.** Finding the true edge of a mark is the fiddly part. Trimming
on a per-row ink share quietly crops real detail — hairline rules, descenders
and the superscript ™ carry so little ink that their rows fall under the
floor. Thresholding on any single pixel fails the other way, because several
of these files carry one stray opaque pixel in a corner that stretches the box
to the whole canvas. The trim therefore counts a pixel only if it has two
solid neighbours: a one-pixel line keeps its neighbours along its length and
survives, an isolated speck does not.

NHS needed special handling: its mark is white letters inside a blue box, so
a straight recolour would have produced a solid white rectangle. Only its
near-white pixels were kept, leaving clean white letterforms.

To add a logo, drop the source in and re-run the normalisation rather than
hand-sizing it — otherwise it will not sit right against the others.

---

## Industry photography

| Path | Status | Source |
|---|---|---|
| `industries/residential.jpg` | **done** | 1000 × 667 |
| `industries/hotels.jpg` | **done** | 739 × 415 |
| `industries/palaces.jpg` | **done** | 720 × 479 |
| `industries/schools.jpg` | **done** | 1000 × 667 |
| `industries/gyms.jpg` | **done** | 1000 × 562 |
| `industries/hospitality.jpg` | **done** | 960 × 500 |
| `industries/transportation.jpg` | **done** | 823 × 373 |
| `industries/healthcare.jpg` | **outstanding** | Only sector without a photo. |

Cards render at roughly 640 px wide, so these are capped at 1000 px — enough
for a 1.5× display. **`hotels`, `palaces` and `transportation` were supplied
below that**, so they are used at their native size rather than upscaled;
they may look slightly soft on a high-DPI screen. Higher-resolution originals
would be worth swapping in if they exist.

Replacements should be landscape JPG, ~1000 px wide. They sit under a dark
gradient with text over the lower half, so mid-to-bright images with an
uncluttered bottom third work best.

---

## Video posters — optional

Not required. Where a YouTube ID is set, the player uses that video's own
thumbnail automatically.

Supply a still here only if you want a branded frame instead, or to avoid the
page making a request to `i.ytimg.com` before the visitor clicks. 1920 × 1080
JPG at `posters/<name>.jpg`, then set `poster` on the matching slot in
`src/config/site.ts`.

**Video IDs go in `src/config/site.ts`, not here.** Currently live:
residential, hotels and transportation. Still needed: **technology, schools,
gyms** — those three render a labelled placeholder until an ID is added.

---

## Client logos

SVG strongly preferred (they are displayed white/greyscale and scaled).
Where SVG isn't available, use PNG with transparency at height ≥ 80px.

Filenames must match `src/content/clients.ts`:

```
clients/heathrow.svg          clients/nhs-barts.svg
clients/mod.svg               clients/ihg.svg
clients/choice-hotels.svg     clients/loews.svg
clients/owtc.svg              clients/cvs-health.svg
clients/qmul.svg              clients/qub.svg
clients/st-lukes.svg          clients/lq.svg
clients/places-for-people.svg clients/hastings.svg
clients/eastman.svg           clients/lsu.svg
clients/yankees.svg           clients/lambeth.svg
clients/baltimore-fire.svg    clients/mtvh.svg
```

Any logo missing simply falls back to the organisation's name set in type,
which looks intentional — so partial delivery is fine.

**Before publishing:** confirm you have permission to display each mark.
The copy describes them as organisations where the *technology* is trusted
and in use, which is how the credentials deck presents them.

---

## Testing partners

```
partners/iaqs.svg      partners/mriglobal.svg
partners/microchem.svg partners/rembrands.svg
partners/ashrae.svg
```
