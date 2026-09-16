/**
 * Social proof.
 *
 * Wording note: the credentials deck presents these as organisations where
 * the *technology* is trusted and in use — largely through our UK and US
 * operations. The copy reflects that precisely. It does not claim them as
 * Eco AirTech GCC clients.
 *
 * GCC work is real but contractually confidential, so it is presented as a
 * separate, deliberately unnamed panel.
 */

export interface ClientLogo {
  name: string;
  logo: string;
  /** Used for the text fallback before real logo files are supplied. */
  short?: string;
}

export const trustHeading = {
  eyebrow: "Proven at scale",
  headline: "The technology, trusted and in use by",
  sub: "Across aviation, healthcare, government, hospitality and education — in the GCC, the UK and Ireland, and the United States.",
};

/**
 * Supplied brand marks, all normalised to white-on-transparent at a matched
 * optical weight and a common 140px canvas height — see
 * public/assets/README.md. Because they share a canvas height, a single
 * `h-*` class in the marquee renders them all in proportion.
 */
export const clientLogos: ClientLogo[] = [
  { name: "Jumeirah", logo: "/assets/clients/jumeirah.png" },
  { name: "Dubai Holding", logo: "/assets/clients/dubai-holding.png" },
  { name: "NHS", logo: "/assets/clients/nhs.png" },
  { name: "InterContinental Hotels Group", logo: "/assets/clients/ihg.png", short: "IHG" },
  { name: "One World Trade Center", logo: "/assets/clients/owtc.png", short: "One WTC" },
  { name: "Ministry of Defence", logo: "/assets/clients/mod.png", short: "MoD" },
  { name: "Defence Infrastructure Organisation", logo: "/assets/clients/dio.png", short: "DIO" },
  { name: "CVS Health", logo: "/assets/clients/cvs.png" },
  { name: "L&Q", logo: "/assets/clients/lq.png" },
  { name: "Great Places Housing Group", logo: "/assets/clients/great-places.png", short: "Great Places" },
];

export const ambition = {
  eyebrow: "Our ambition",
  statement:
    "To become the GCC's most trusted name in clean air — protecting lives and elevating environments in every home, school, office, hotel and airport across the region.",
};
