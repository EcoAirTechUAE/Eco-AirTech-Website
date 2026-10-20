/**
 * Client reviews, for /reviews and the homepage strip.
 *
 * APPROVAL
 * Anything with a `pending` note is awaiting the client's permission or a
 * wording check. It shows, badged, on local builds and Vercel preview links,
 * and is left out of the live site automatically (see vite.config.ts). To
 * publish one, delete its `pending` line once the approval is in writing.
 *
 * ATTRIBUTION
 * Much of our work is under confidentiality agreements. Describe clients by
 * sector and place ("Private residential client, UAE") unless they have
 * agreed in writing to be named.
 *
 * WHAT NOT TO ADD
 * No star ratings, review-platform badges or counters without verified
 * figures. No portraits paired with quotes unless they are the actual
 * client's own approved photo. Stock or generated images are illustrative
 * only: mark them `illustrative: true` and never caption them as a client's
 * property.
 *
 * THE MP QUOTE
 * "Could this be the future of mould-free homes?" (a British Member of
 * Parliament) was published on 2026-10-19 on the business's confirmation of
 * wording and permission. Keep it framed as a question about possibilities:
 * never present it as political or institutional endorsement.
 */

import { site, type VideoSlot } from "@/config/site";

export type Sector = "residential" | "hospitality" | "housing";

export const sectorLabel: Record<Sector, string> = {
  residential: "Residential",
  hospitality: "Hospitality",
  housing: "Housing",
};

export interface StoryImage {
  src: string;
  alt: string;
  /** Stock or generated: captioned as illustrative, never as the client's. */
  illustrative?: boolean;
}

export interface StoryImages {
  main: StoryImage;
  /** Optional second image, shown smaller and overlapping the main one. */
  inset?: StoryImage;
  /**
   * A headshot rather than a scene: shown framed at its own size on the dark
   * panel, so a small portrait is never stretched soft across the column.
   */
  portrait?: boolean;
  /** Shown under the images, e.g. the place. */
  caption?: string;
  /** Photographer or rights holder, if the licence asks for credit. */
  credit?: string;
}

export interface Testimonial {
  id: string;
  /** The client's words. */
  quote: string;
  /** A phrase from inside `quote` to emphasise. Must match it exactly. */
  highlight?: string;
  /** e.g. "Private residential client, UAE". */
  attribution: string;
  sector: Sector;
  /** What is outstanding before this can go live. Remove once approved. */
  pending?: string;
  /** Show in the homepage strip, in this order. */
  strip?: number;
  /** Shown in the homepage strip but not on /reviews. */
  homeOnly?: boolean;
  /**
   * Set large on /reviews, left out of the grid. 1 sits at the top of the
   * page; 2 sits between the first and second featured stories.
   */
  lead?: 1 | 2;
}

export interface FeaturedStory {
  id: string;
  /** Replaces the sector label above the headline, e.g. "Perspective". */
  eyebrow?: string;
  headline: string;
  context: string;
  sector: Sector;
  attribution: string;
  /** A client quotation, shown with `highlight` picked out. */
  quote?: string;
  highlight?: string;
  /**
   * For an illustrative story that is not a client quotation: body copy,
   * shown as plain paragraphs under a visible label.
   */
  body?: string[];
  /** A word or phrase to pick out wherever it appears in headline and context. */
  emphasise?: string;
  /** Visible label for illustrative stories, e.g. "placeholder for design review". */
  label?: string;
  images?: StoryImages;
  /** What the image should show, until one is supplied. */
  imageBrief?: string;
  /** A YouTube or Vimeo film shown in the image area, behind a click-to-play facade. */
  video?: VideoSlot;
  pending?: string;
}

export const reviewsPage = {
  eyebrow: "Client stories",
  title: "What cleaner air means to our clients.",
  lead: "From the homes we live in to the places we stay, indoor air shapes our everyday experience. Here, clients share what led them to Eco AirTech, and what stood out afterwards.",
  confidentiality:
    "Some clients are described by sector rather than name to respect their privacy and confidentiality agreements.",
  wallHeadline: "More from our clients",
  strip: {
    eyebrow: "Client stories",
    headline: "In our clients’ words.",
    cta: "Read our client stories",
  },
  cta: {
    headline: "Tell us about the air in your space.",
    body: "Whether it’s your home, a guest room or a wider property portfolio, tell us what you’re experiencing. Our team can help you explore the right air treatment approach.",
    button: "Let’s talk",
  },
};

export const featuredStories: FeaturedStory[] = [
  {
    id: "air-diet",
    headline: "“We think about what we eat. What about the air we breathe?”",
    context:
      "For this household, the starting point was a different way of thinking about wellbeing: paying attention to the air they live in every day.",
    quote:
      "Very few of us think about our ‘air diet’. We wanted to look beyond traditional filters and find an air treatment solution for our home.",
    highlight: "our ‘air diet’",
    // Naming Marsa Al Arab is agreed on condition the story stays positive
    // and about investing in wellbeing. Never pair it with mould or odour.
    attribution: "Private residential client, Marsa Al Arab, Dubai",
    sector: "residential",
    // Images of the development, chosen by the business. Confirm the licence
    // allows use on our site and add `credit` if it requires one.
    images: {
      main: {
        src: "/assets/reviews/marsa-al-arab-aerial.webp",
        alt: "Marsa Al Arab on the Dubai coastline, with the Burj Al Arab beyond",
      },
      inset: {
        src: "/assets/reviews/marsa-al-arab-villas.jpg",
        alt: "Waterfront villas at Marsa Al Arab",
      },
      caption: "Marsa Al Arab, Dubai",
    },
  },
  {
    id: "victory-heights",
    headline: "“A significant drop in our son’s asthma flare-ups.”",
    context:
      "After eleven years in Dubai, Luke and his family were exploring ways to better manage their son’s asthma. Moving abroad was one option they considered, but their experience with Eco AirTech changed that conversation.",
    // Wording supplied by the business on 2026-10-19, replacing the earlier
    // version. The family's own experience, not a medical claim; never
    // reword it into one.
    quote:
      "Since installing Eco AirTech, we’ve noticed significantly fewer flare-ups of our son’s asthma. We were exploring every option to support his health, including the possibility of moving abroad. Seeing this improvement has helped us feel much more comfortable staying in the place we call home.",
    highlight: "asthma",
    emphasise: "asthma",
    // Named, with his photo, as supplied by the business on 2026-10-19.
    attribution: "Luke Eley, homeowner, Victory Heights, Dubai",
    sector: "residential",
    images: {
      main: { src: "/assets/reviews/luke-eley.jpg", alt: "Luke Eley" },
      portrait: true,
    },
  },
  {
    id: "hotel-trial",
    headline: "A noticeable difference. A bigger conversation.",
    context:
      "Feedback following a hotel trial opened a wider discussion about mould, odour and the conditions that allow problems to return.",
    quote:
      "The change in the mould-related odour within 24 hours was astonishing. It made us want to explore a wider rollout. You also helped us understand that addressing mould means looking at more than one source.",
    highlight: "within 24 hours",
    attribution: "Senior hospitality executive, GCC",
    sector: "hospitality",
    // The film from the Hotels industry page.
    video: site.videos.hotels,
    // The customer's reported experience, not proof that all mould was
    // removed or a guaranteed timeframe. Released by the business on
    // 2026-10-20 as checked; never present it as a guaranteed result.
  },
  {
    id: "mp-mould-free",
    eyebrow: "Perspective",
    // Wording as supplied; the question is the headline, so no quote below.
    headline: "“Could this be the future of mould-free homes?”",
    context:
      "A question with possibilities far beyond the home: a more proactive approach to managing mould in hotels, workplaces and commercial buildings.",
    attribution: "British Member of Parliament",
    sector: "housing",
    // A product render, used uncropped at the business's request.
    images: {
      main: {
        src: "/assets/reviews/nursery-750.webp",
        alt: "A parent holding a child in a nursery, with a 750+ unit on a damp-stained wall",
        illustrative: true,
      },
    },
  },

];

export const testimonials: Testimonial[] = [
  {
    id: "forgot-clean-air",
    quote: "I forgot what clean air smelt like.",
    attribution: "Private residential client, UAE",
    sector: "residential",
    strip: 1,
    // Homepage strip only: /reviews is kept to its five sections.
    homeOnly: true,
  },
  {
    id: "tv-and-fridge",
    quote: "I need you like I need my TV and fridge.",
    // Also a Marsa Al Arab resident; same condition as the air-diet story.
    attribution: "Private residential client, Marsa Al Arab, Dubai",
    sector: "residential",
    strip: 2,
    lead: 1,
  },
  {
    id: "beyond-filters",
    quote: "We wanted to look beyond traditional filters.",
    // Same Marsa Al Arab client as the "air diet" story; same condition.
    attribution: "Private residential client, Marsa Al Arab, Dubai",
    sector: "residential",
    strip: 3,
  },
  {
    id: "svp-hospitality",
    // Supplied as "At last a solution that acutal works. These guys acutally
    // have the .solution"; typos corrected, wording otherwise as given.
    quote: "At last, a solution that actually works. These guys actually have the solution.",
    highlight: "a solution that actually works",
    attribution: "SVP, major hospitality group",
    lead: 2,
    sector: "hospitality",
  },
  {
    id: "mould-odour",
    quote: "The change in the mould-related odour within 24 hours was astonishing.",
    highlight: "within 24 hours",
    attribution: "Senior hospitality executive, GCC",
    sector: "hospitality",
    pending: "Adapted feedback: approval and supporting trial record required",
  },
];

/* Pending items are never rendered on the live site, so they are absent from
   its prerendered HTML and from what search engines index. */
const visible = <T extends { pending?: string }>(items: T[]) =>
  __SHOW_PENDING_REVIEWS__ ? items : items.filter((item) => !item.pending);

export const publishedStories = visible(featuredStories);
export const publishedTestimonials = visible(testimonials);
export const leadTestimonial = publishedTestimonials.find((t) => t.lead === 1);
export const secondLeadTestimonial = publishedTestimonials.find((t) => t.lead === 2);
/**
 * The grid skips lead quotes and any quote a featured story on the page
 * already contains, in its quote or its headline, so nothing reads twice. Those quotes still appear in the
 * homepage strip, where the stories are not shown.
 */
const inAStory = (quote: string) => {
  const core = quote.replace(/[.!?]+$/, "");
  return publishedStories.some(
    (story) => story.quote?.includes(core) || story.headline.includes(core),
  );
};
export const gridTestimonials = publishedTestimonials.filter(
  (t) => !t.lead && !t.homeOnly && !inAStory(t.quote),
);

export const stripTestimonials = publishedTestimonials
  .filter((t) => t.strip)
  .sort((a, b) => a.strip! - b.strip!);
