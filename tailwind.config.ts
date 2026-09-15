import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    // NB: Tailwind's own container plugin is disabled in `corePlugins` below.
    // It only emits padding for breakpoints present in `container.screens`,
    // so overriding that to a single `2xl` key silently dropped every
    // responsive gutter. `.container` is defined by hand in index.css instead.
    extend: {
      colors: {
        bg: "hsl(var(--bg) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        surface2: "hsl(var(--surface-2) / <alpha-value>)",
        line: {
          DEFAULT: "var(--line)",
          strong: "var(--line-strong)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          soft: "hsl(var(--accent-soft) / <alpha-value>)",
          lime: "hsl(var(--accent-2) / <alpha-value>)",
        },
        ink: "hsl(var(--text) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        faint: "hsl(var(--faint) / <alpha-value>)",
        warn: "hsl(var(--warn) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["'Instrument Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
        // No `display` serif: the site sets pull-quotes in Instrument Sans
        // italic, and Instrument Serif is no longer loaded at all. Declaring it
        // here would invite a `font-display` class that silently falls back.
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Fluid display sizes — clamp(min, preferred, max)
        // Hero headline only. Capped well below the old 6rem — at full width
        // that filled the viewport and overwhelmed everything under it.
        // Driven by --hero-headline in index.css so the hero render offset
        // cannot drift out of sync with it. Was capped at 6rem, which pushed
        // the supporting paragraph off-screen on a laptop.
        "display-xl": ["var(--hero-headline)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        // Headings stepped up roughly one notch. Deliberately restrained —
        // the hero (display-xl) is left alone, since that was tuned already.
        "display-lg": ["clamp(2.5rem, 5.2vw, 4.5rem)", { lineHeight: "1.0", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(2.125rem, 4vw, 3.375rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.6875rem, 2.8vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "stat": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        // 11px -> 13px, and tracking eased from 0.18em. Very wide letter-spacing
        // costs legibility at small sizes, which is the opposite of the point.
        "eyebrow": ["0.8125rem", { lineHeight: "1.1", letterSpacing: "0.14em" }],
      },
      maxWidth: {
        prose: "68ch",
      },
      backgroundImage: {
        "accent-grad": "linear-gradient(100deg, hsl(var(--accent)), hsl(var(--accent-2)))",
        "bloom":
          "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(var(--accent) / 0.16), transparent 70%)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "bloom-pulse": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.06)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 46s) linear infinite",
        "bloom-pulse": "bloom-pulse 7s ease-in-out infinite",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  // Replaced by the hand-written .container in index.css — see note above.
  corePlugins: { container: false },
  plugins: [animate],
} satisfies Config;
