/**
 * Client reviews, for /reviews and the homepage strip.
 *
 * HOW TO ADD ONE
 * Copy an entry below and fill it in. Only `id`, `quote`, `role`, `sector`
 * and `location` are required; everything else is optional and the layout
 * adapts to what is there.
 *
 * Confidentiality: much of our GCC work is contractually confidential (see
 * clients.ts). Leave `name` and `organisation` out and describe the client
 * instead, e.g. role "Director of Engineering", organisation omitted,
 * property "5-star resort". Never name a client without written permission.
 *
 * Featured stories (`featured: true`) get the large alternating layout at
 * the top of /reviews and are the ones the homepage strip draws from. Two or
 * three is right; more and they stop feeling featured.
 *
 * Entries marked `sample: true` are layout placeholders and show a visible
 * "Sample" badge. Remove every one before this page goes live.
 *
 * No star ratings, deliberately: Google ignores review stars a business
 * publishes about itself, and a small count ("5.0 from 6") undersells a
 * high-value service more than it helps.
 */
import type { VideoSlot } from "@/config/site";

export type Sector =
  | "residential"
  | "hotels"
  | "palaces"
  | "healthcare"
  | "schools"
  | "gyms"
  | "hospitality"
  | "transportation";

export const sectorLabel: Record<Sector, string> = {
  residential: "Homes",
  hotels: "Hotels & resorts",
  palaces: "Palaces & places of worship",
  healthcare: "Healthcare",
  schools: "Schools & nurseries",
  gyms: "Gyms & wellness",
  hospitality: "Hospitality & venues",
  transportation: "Transportation",
};

export interface Testimonial {
  id: string;
  /** The words, as given. Keep the client's phrasing; trim, don't rewrite. */
  quote: string;
  /** Optional phrase from inside `quote` to emphasise. Must match exactly. */
  highlight?: string;
  /** Person's name. Omit for confidential clients. */
  name?: string;
  /** Always present, e.g. "Facilities Manager" or "Homeowner". */
  role: string;
  /** Company or property name. Omit for confidential clients. */
  organisation?: string;
  /** Describes the client when they cannot be named, e.g. "5-star resort". */
  property?: string;
  location: string;
  sector: Sector;
  /** Month and year, e.g. "March 2026". */
  date?: string;
  /** Where the review came from, shown as a small label. */
  source?: "Google" | "LinkedIn" | "Email" | "Site visit";
  /** Headshot, /assets/reviews/<file>. Square, at least 160px. */
  photo?: string;
  /** Client logo, white on transparent like the others in /assets/clients. */
  logo?: string;
  /** A photo of the space or installation, for featured stories. */
  image?: string;
  video?: VideoSlot;
  featured?: boolean;
  /** Up to three outcomes, shown large beside a featured story. */
  metrics?: { value: string; label: string }[];
  /** id of a study in testResults.ts, to link the story to its data. */
  studyId?: string;
  sample?: boolean;
}

export const reviewsPage = {
  eyebrow: "Client stories",
  title: "What our clients say.",
  lead: "From family homes to five-star resorts, in their own words. Many of our GCC clients are contractually confidential, so some reviews are attributed by role and property rather than by name.",
  featuredHeadline: "In depth",
  wallHeadline: "More from our clients",
  strip: {
    eyebrow: "Client stories",
    headline: "In their own words.",
    cta: "Read all client stories",
  },
  cta: {
    headline: "Want results like these in your building?",
    body: "Every project starts with an assessment of the space and what's driving the problem.",
  },
};

export const testimonials: Testimonial[] = [
  {
    id: "sample-resort",
    sample: true,
    featured: true,
    quote:
      "Guests stopped mentioning the smell in the lower-floor rooms within the first fortnight. What convinced our engineering team was that Eco AirTech measured before and after, rather than asking us to take it on trust.",
    highlight: "measured before and after",
    role: "Director of Engineering",
    property: "5-star beach resort",
    location: "Dubai",
    sector: "hotels",
    date: "2026",
    source: "Email",
    image: "/assets/reviews/sample-resort.jpg",
    metrics: [
      { value: "212", label: "rooms treated" },
      { value: "0", label: "odour complaints in 6 months" },
    ],
  },
  {
    id: "sample-clinic",
    sample: true,
    featured: true,
    quote:
      "We needed something that worked continuously in occupied rooms, without closing a ward. Installation was done overnight across two floors and our infection control lead signed it off on the data.",
    highlight: "worked continuously in occupied rooms",
    name: "Dr. Sample Name",
    role: "Medical Director",
    organisation: "Sample Clinic",
    location: "Abu Dhabi",
    sector: "healthcare",
    date: "2026",
    logo: "/assets/reviews/sample-clinic-logo.png",
    metrics: [
      { value: "2", label: "floors, installed overnight" },
      { value: "24/7", label: "treatment in occupied rooms" },
    ],
  },
  {
    id: "sample-home",
    sample: true,
    quote:
      "Our daughter's allergies were worst at night. Three weeks after the unit went in, she's sleeping through. I wish we'd looked at the air conditioning years ago.",
    highlight: "she's sleeping through",
    name: "Sample N.",
    role: "Homeowner",
    location: "Dubai Hills",
    sector: "residential",
    source: "Google",
  },
  {
    id: "sample-school",
    sample: true,
    quote:
      "Parents ask about air quality now. Being able to show them the test results, not just a brochure, made the conversation easy.",
    role: "Head of Operations",
    property: "British curriculum school",
    location: "Sharjah",
    sector: "schools",
  },
  {
    id: "sample-gym",
    sample: true,
    quote:
      "The changing rooms used to smell damp by mid-afternoon. Not any more, and members noticed before we told them.",
    highlight: "members noticed before we told them",
    role: "General Manager",
    property: "Boutique fitness studio",
    location: "Dubai Marina",
    sector: "gyms",
    source: "Google",
  },
  {
    id: "sample-villa",
    sample: true,
    quote:
      "Straightforward from the first visit. They explained what was actually growing in our ducts and fixed it without anyone pulling the ceiling down.",
    name: "Sample A.",
    role: "Villa owner",
    location: "Al Barsha",
    sector: "residential",
  },
  {
    id: "sample-majlis",
    sample: true,
    quote:
      "A large majlis with heavy carpets and constant guests is hard to keep fresh. The difference was noticeable within days.",
    role: "Estate Manager",
    property: "Private residence",
    location: "Abu Dhabi",
    sector: "palaces",
  },
];

/** The stories that get the large layout, in order. */
export const featuredTestimonials = testimonials.filter((t) => t.featured);

/** Everything else, for the filterable grid. */
export const wallTestimonials = testimonials.filter((t) => !t.featured);
