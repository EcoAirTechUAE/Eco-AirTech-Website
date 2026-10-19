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
 * HELD BACK
 * "Could this be the future of mould-free homes?" (supplied as feedback from
 * a UK parliamentarian) is deliberately not included. Add it only once the
 * exact wording and permission for quote and attribution are confirmed, and
 * never in a way that implies political or institutional endorsement.
 */

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
}

export interface FeaturedStory {
  id: string;
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
  /** Visible label for illustrative stories, e.g. "placeholder for design review". */
  label?: string;
  image?: StoryImage;
  /** What the image should show, until one is supplied. */
  imageBrief?: string;
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

const PERMISSION = "Publication permission to confirm";

export const featuredStories: FeaturedStory[] = [
  {
    id: "air-diet",
    headline: "“We think about what we eat. What about the air we breathe?”",
    context:
      "For this household, the starting point was a different way of thinking about wellbeing: paying attention to the air they live in every day.",
    quote:
      "Very few of us think about our ‘air diet’. We wanted to look beyond traditional filters and find an air treatment solution for our home.",
    highlight: "our ‘air diet’",
    attribution: "Private residential client, UAE",
    sector: "residential",
    imageBrief:
      "A calm, naturally lit living room with understated furnishings and no recognisable skyline.",
    pending: "Adapted from supplied feedback: client approval of wording required",
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
    imageBrief:
      "A generic premium guest-room detail, such as a bed, curtain and soft daylight. No actual client property.",
    // The customer's reported experience, not proof that all mould was
    // removed or a guaranteed timeframe. Check against the trial record.
    pending: "Adapted feedback: approval and confirmation against the trial record required",
  },
  {
    id: "forgot-clean-air",
    headline: "“I forgot what clean air smelt like.”",
    context: "Sometimes the feedback that stays with us is the simplest.",
    quote: "I forgot what clean air smelt like.",
    highlight: "clean air",
    attribution: "Private residential client",
    sector: "residential",
    imageBrief:
      "A quiet reading corner with natural textures and soft light. No perfume, diffusers or imagery implying scent proves air quality.",
    pending: PERMISSION,
  },
  {
    id: "housing-illustrative",
    label: "Illustrative housing-provider story — placeholder for design review",
    headline: "From responding to problems to thinking about prevention.",
    context:
      "An example of how a future housing-sector story could explain the role of air treatment within a wider property-care programme.",
    body: [
      "Addressing damp, mould and condensation means looking beyond the immediate signs of a problem. A proactive approach considers ventilation, moisture sources, building conditions and ongoing maintenance.",
      "Air treatment can form part of that wider approach. The aim is to support better indoor environments while addressing the conditions that allow problems to return.",
    ],
    attribution: "Example sector perspective — housing",
    sector: "housing",
    imageBrief:
      "An unbranded residential building, or a property professional inspecting a generic home. Must not imply an existing housing-provider partnership.",
    pending: "Placeholder for design review: never publish as written",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "forgot-clean-air",
    quote: "I forgot what clean air smelt like.",
    attribution: "Private residential client",
    sector: "residential",
    strip: 1,
    pending: PERMISSION,
  },
  {
    id: "tv-and-fridge",
    quote: "I need you like I need my TV and fridge.",
    attribution: "Private residential client, UAE",
    sector: "residential",
    strip: 2,
    pending: PERMISSION,
  },
  {
    id: "beyond-filters",
    quote: "We wanted to look beyond traditional filters.",
    attribution: "Private residential client, UAE",
    sector: "residential",
    strip: 3,
    pending: "Adapted feedback: approval required",
  },
  {
    id: "victory-heights",
    quote:
      "Since installing Eco AirTech, my son has had a significant reduction in asthma triggers. Having lived here eleven years, we were considering leaving the UAE. Eco AirTech has changed that.",
    highlight: "Eco AirTech has changed that",
    attribution: "Homeowner, Victory Heights, Dubai",
    sector: "residential",
    // Supplied as "has not had significant reduction", which reverses the
    // meaning; drafted as the evident intent. Confirm the exact words.
    pending: "Wording to confirm with the client, and publication permission",
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
export const stripTestimonials = publishedTestimonials
  .filter((t) => t.strip)
  .sort((a, b) => a.strip! - b.strip!);
