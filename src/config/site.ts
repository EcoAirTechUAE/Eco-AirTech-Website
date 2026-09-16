/**
 * Single edit point for everything client-specific.
 *
 * Values marked TODO are placeholders — replace them before launch.
 * Nothing else in the codebase should hard-code a phone number, email,
 * address or video ID.
 */

export interface VideoSlot {
  provider: "youtube" | "vimeo";
  /**
   * The bare video ID:
   *   YouTube  https://www.youtube.com/watch?v=NiuDYx-0nm4  ->  "NiuDYx-0nm4"
   *   Vimeo    https://vimeo.com/123456789                  ->  "123456789"
   * Leave empty and the player renders a labelled placeholder rather than a
   * broken embed.
   */
  id: string;
  title: string;
  /**
   * Optional local still frame in /public/assets/posters/.
   * Omit it and the YouTube thumbnail is used automatically — set one only
   * if you want a branded frame, or to avoid the request to i.ytimg.com.
   */
  poster?: string;
  /** Optional. Shown on the play card. Leave unset rather than guessing. */
  duration?: string;
}

export type VideoKey =
  | "technology"
  | "residential"
  | "hotels"
  | "schools"
  | "gyms"
  | "transportation";

const videos: Record<VideoKey, VideoSlot> = {
  // Currently unused: the "science, explained properly" section shows the
  // airflow diagram instead of a film. Kept so a technology video can be
  // dropped back in later — render it with <VideoFacade video={site.videos.technology} />.
  technology: {
    provider: "youtube",
    id: "", // TODO
    title: "How ARC® technology works",
  },
  residential: {
    provider: "youtube",
    id: "NiuDYx-0nm4",
    title: "Transforming Homes Into Healthy Breathing Spaces",
  },
  hotels: {
    provider: "youtube",
    id: "uBNftZiaUoU",
    title: "Creating Healthier Hotel Environments",
  },
  schools: {
    provider: "youtube",
    id: "dXIxihw0sDo",
    title: "Cleaner Air. Healthier Classrooms.",
  },
  gyms: {
    provider: "youtube",
    id: "IxwBaN38r2E",
    title: "Cleaner Air. Healthier Workouts.",
  },
  transportation: {
    provider: "youtube",
    id: "pY8mkjXdKNc",
    title: "Revolutionising Public Transport Hygiene",
  },
};

export const site = {
  name: "Eco AirTech",
  tagline: "Leaders in Air Technology",
  url: "https://ecoairtech.ae",

  contact: {
    // wa.me requires international format, digits only — no '+', no spaces.
    whatsapp: "971507382560",
    whatsappMessage:
      "Hello Eco AirTech — I'd like to know more about improving the air quality in my space.",

    email: "hello@ecoairtech.ae", // TODO
    // Same line as WhatsApp. Split these if a separate landline is added.
    phoneDisplay: "+971 50 738 2560",
    phoneHref: "+971507382560",

    address: {
      line1: "Dubai", // TODO
      line2: "United Arab Emirates",
    },
  },

  social: {
    linkedin: "https://www.linkedin.com/company/eco-airtech/",
    instagram: "https://www.instagram.com/eco_airtech",
    youtube: "", // TODO
  },

  videos,
} as const;

/** Builds a wa.me deep link with a pre-filled message. */
export function whatsappLink(message?: string): string {
  const text = encodeURIComponent(message ?? site.contact.whatsappMessage);
  return `https://wa.me/${site.contact.whatsapp}?text=${text}`;
}

export const nav = [
  { label: "Technology", href: "/technology" },
  { label: "Devices", href: "/devices" },
  { label: "Filters", href: "/filters" },
  { label: "Industries", href: "/industries" },
  { label: "Results", href: "/results" },
] as const;
