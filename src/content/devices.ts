/**
 * The device range. Specifications and figures are taken from the
 * credentials deck; detailed study data lives in ./testResults.ts.
 */

export interface DeviceStat {
  value: string;
  label: string;
  condition: string;
}

export interface Device {
  slug: string;
  name: string;
  article: string; // "The CORE" etc.
  kicker: string;
  coverage: string;
  coverageNote?: string;
  mount: string;
  technologies: string[];
  summary: string;
  /** Long-form positioning — why you would choose this unit over the others. */
  body: string[];
  stats: DeviceStat[];
  features: { title: string; body: string }[];
  bestFor: string[];
  variants?: { title: string; body: string }[];
  quote?: { text: string; author: string; role: string };
  /**
   * The studies to show on this unit's page, in order, when it has more than
   * fit comfortably. Every study still appears on /results.
   */
  featuredStudies?: string[];
  /** An image under the specs in "Why this unit", filling that column. */
  sideImage?: { src: string; alt: string };
  /**
   * A short, silent parts animation, played muted on a loop. `still` is
   * shown instead to visitors who ask for reduced motion.
   */
  inside?: {
    headline: string;
    body: string;
    /** Either a silent parts video (with its poster)... */
    video?: string;
    poster?: string;
    /** ...or a still image, which is also the reduced-motion fallback for a video. */
    still?: string;
    /** Alt text for the still, when it is not an exploded view. */
    stillAlt?: string;
    /** The still is a landscape render rather than a tall exploded view. */
    wide?: boolean;
  };
  /** Further product renders, shown as a captioned grid. */
  gallery?: { src: string; alt: string; caption: string }[];
  /** A scene of the unit in use, with text beside it, directly under the page intro. */
  banner?: { src: string; alt: string; eyebrow: string; headline: string; body: string };
  /** Shows the hero product image smaller, for renders that soften when enlarged. */
  compactHero?: boolean;
  image: string;
  silhouette: string;
}

export const rangeCoverage = "135 – 10,000 sq ft";

export const devices: Device[] = [
  {
    slug: "hvac",
    name: "CORE",
    article: "The CORE",
    kicker: "In-duct · whole building",
    coverage: "800 – 3,300 sq ft",
    mount: "Installed into existing ductwork",
    technologies: ["ARC®", "Bi-Polar Ionisation"],
    summary:
      "Our flagship in-duct system. Fitted inside the ductwork you already have, it turns the air conditioning that currently circulates contamination into the thing that removes it.",
    body: [
      "The CORE installs directly into existing ductwork and works in tandem with the incoming airflow from your air handling system. As air passes across the ARC® cell, cleaning agents are introduced into the ducting and carried through the whole building.",
      "That distribution is the point. Because the agents travel as a vapour with the air, coverage is even across every served room, including the parts of the building nobody thinks to clean, and the inside of the ductwork itself.",
      "Keeping ducts clear of contaminant build-up also reduces strain on the system. Cleaner ducts mean more efficient airflow, better performance from the air handling equipment, and less mould-related maintenance over the life of the installation.",
    ],
    stats: [
      { value: "99.9%", label: "Airborne mould spores", condition: "5 days" },
      { value: "99.9%", label: "TVOC & formaldehyde", condition: "5 days" },
      { value: "99.9%", label: "MRSA, air & surface", condition: "5 days" },
      { value: "90.0%", label: "Surface mould spores", condition: "5 days" },
    ],
    features: [
      {
        title: "Retrofits into existing systems",
        body: "No replacement plant, no redesign. It fits the ductwork already in the building and works alongside your current air handling units.",
      },
      {
        title: "Even air distribution",
        body: "Uses the duct network you already have to distribute treated air evenly, giving comprehensive coverage across large or subdivided spaces.",
      },
      {
        title: "Keeps ductwork clean",
        body: "Actively reduces contaminant build-up inside the ducts themselves, improving airflow efficiency and the working life of the equipment.",
      },
      {
        title: "Low maintenance",
        body: "Straightforward to monitor and service, with no daily intervention required from building staff.",
      },
    ],
    bestFor: [
      "Large commercial spaces",
      "Offices",
      "Schools & daycares",
      "Hospitals & clinics",
      "Nursing homes",
      "Hotels",
      "Distribution centres",
    ],
    image: "/assets/devices/hvac.jpg",
    silhouette: "/assets/devices/hvac-silhouette.svg",
  },
  {
    slug: "750-plus",
    name: "BREEZE",
    article: "The BREEZE",
    kicker: "Wall mounted · in-duct",
    coverage: "up to 1,000 sq ft",
    mount: "Wall mounted, or fitted within AC ductwork",
    technologies: ["ARC®", "Bi-Polar Ionisation", "ODOGard® HEPA+ filter"],
    summary:
      "The most tested unit in the range, and the one behind our strongest live-environment results. Wall mount it in a room or fit it in-duct with no invasive works, then unplug it and take it with you to the next property.",
    body: [
      "The BREEZE combines all three technologies in a single self-contained unit: an ODOGard®-coated HEPA+ filter for particulates and gas-phase odours, the ARC® advanced PCO cell producing hydroxyls, and a bi-polar ionisation module.",
      "It is the unit we take into the hardest environments. Both of our 72-hour live trials in occupied, deliberately re-contaminated housing were run on The BREEZE with no filter fitted, a deliberately conservative configuration, and still returned reductions of 96.4% and 95.9%.",
      "Its lightweight, compact design means it can be wall mounted in a room or fitted within existing AC ductwork. In-duct installation is plug and play: no cutting into ducts, ceilings or walls, and no specialist engineering works. That makes it ideal for the rental market, where the unit can simply be unplugged and moved to the next property. A transit variant is also available for vehicles and enclosed cabins.",
    ],
    stats: [
      { value: "99.9%", label: "Airborne mould spores", condition: "48 hours" },
      { value: "97.5%", label: "Surface mould spores", condition: "48 hours" },
      { value: "94.0%", label: "HCHO formaldehyde", condition: "5 days" },
      { value: "92.0%", label: "TVOC", condition: "5 days" },
    ],
    features: [
      {
        title: "ODOGard® coated HEPA+ filter",
        body: "Captures and neutralises unwanted VOCs and odours rather than simply holding them in the media.",
      },
      {
        title: "ARC® advanced PCO",
        body: "Produces hydroxyls that help prevent mould, mildew and allergens from pets, pollen and smoke from establishing.",
      },
      {
        title: "Bi-polar ionisation module",
        body: "Creates a plasma of electrical charges that removes allergens and airborne pathogens from the breathing zone.",
      },
      {
        title: "Wall mount or in-duct, plug and play",
        body: "Sits in the room or within existing AC ductwork with no invasive works, and unplugs to move with you. Ideal for rental properties.",
      },
    ],
    bestFor: [
      "Bedrooms & nurseries",
      "Villas & apartments",
      "Hotel rooms & suites",
      "Classrooms",
      "Clinics & consulting rooms",
      "Vehicles & transit cabins",
    ],
    featuredStudies: [
      "750-live-apartment",
      "750-live-house",
      "750-lab-ms2",
      "750-field-office",
    ],
    inside: {
      headline: "Three technologies, one compact unit.",
      body: "All three technologies in one compact, self-contained unit: the ODOGard®-coated HEPA+ filter, the ARC® advanced PCO cell and the bi-polar ionisation module.",
      video: "/assets/devices/video/750-plus-parts.mp4",
      poster: "/assets/devices/video/750-plus-parts-poster.webp",
    },
    image: "/assets/devices/750-plus.jpg",
    silhouette: "/assets/devices/750-plus-silhouette.svg",
  },
  {
    slug: "portable",
    name: "MOVE",
    article: "The MOVE",
    kicker: "Free-standing · no installation",
    coverage: "up to 850 sq ft",
    mount: "Free-standing, plugged into a standard socket and moved between rooms",
    technologies: ["ARC®", "Bi-Polar Ionisation", "ODOGard® HEPA+"],
    summary:
      "Built smaller for real homes. The whole system in a compact unit you can carry: no installation, no ductwork, no water tank. Plug it in and move it to wherever the problem is.",
    body: [
      "Every other unit in the range is fitted. The MOVE is not. It carries the same three technologies (the ARC® cell producing hydroxyls, bi-polar ionisation, and an ODOGard®-coated HEPA+ filter) in a free-standing unit that needs nothing but a standard socket. One unit covers up to 850 sq ft, enough for most homes from one central spot.",
      "It is built for occupied homes, where energy and every centimetre matter. At 5.2 kg and 44.5 cm tall it is easy to carry, store and position, and it draws only 12 to 36 watts, so it can run day and night, which is how it works best.",
      "That makes it the fastest way to act. Following a report of mould, odour or poor air, it can be delivered and working the same day. Where a fixed installation is being specified, The MOVE holds the space in the meantime. Where a room needs a deep reset, whether that is a bedroom with a mouldy wardrobe, a suite between guests or a villa at handover, it is moved in, run, and moved on.",
      "It also tells you what it is doing. A built-in sensor reads the air, and the light ring shows green, amber or red at a glance. In Auto Mode the fan speeds up and slows down with what it detects, and the app shows air quality, temperature, humidity and the remaining life of the HEPA filter, ARC® cell and BPI module.",
    ],
    stats: [
      { value: "99.9%", label: "Airborne mould spores", condition: "ARC + BPI + ODOGard®" },
      { value: "99%", label: "TVOCs", condition: "ARC + BPI + ODOGard®" },
      { value: "96%", label: "Odour elimination", condition: "ARC + BPI + ODOGard®" },
    ],
    features: [
      {
        title: "No installation at all",
        body: "No ductwork, no engineer, no water tank to empty and nothing to refill. It needs a standard socket and nothing else, so it can be working the day it arrives.",
      },
      {
        title: "Compact and efficient",
        body: "26.9 × 26.9 × 44.5 cm and 5.2 kg, drawing 12 to 36 watts. Small enough for flats and bedrooms, efficient enough to run around the clock.",
      },
      {
        title: "Auto Mode and live readings",
        body: "The built-in air quality sensor speeds the fan up and down as conditions change. Temperature, humidity and part life are in the app.",
      },
      {
        title: "Quiet day and night",
        body: "From 26 dB on its lowest setting. Sleep Mode turns off the light ring and dims the display for bedrooms.",
      },
    ],
    bestFor: [
      "Flats & family homes",
      "Bedrooms & nurseries",
      "Mould in wardrobes & bedrooms",
      "Rapid response to damp & mould reports",
      "Hotel room turnarounds",
      "Villas at handover",
      "Interim cover before a fixed install",
    ],
    quote: {
      text: "The Industry has never seen anything like this.",
      author: "Keith Roe",
      role: "Advanced IAQ Solutions",
    },
    sideImage: {
      src: "/assets/store/home-top.webp",
      alt: "The MOVE working beside a mould-affected wall in a child's bedroom",
    },
    image: "/assets/store/home-good.webp",
    silhouette: "/assets/devices/portable-silhouette.svg",
  },
  {
    slug: "ptac",
    name: "FLEX",
    article: "The FLEX",
    kicker: "Internal mount · concealed",
    coverage: "up to 700 sq ft",
    mount: "Mounted inside HVAC ductwork where access is poor",
    technologies: ["ARC®"],
    summary:
      "A permanently mounted internal unit for spaces where ductwork access is limited. It is also our clearest answer to the fan and coil surfaces inside your AC unit.",
    body: [
      "The FLEX is designed to disappear. Permanently mounted inside the ductwork, it provides continuous purification in buildings where access is poor or where no equipment can be visible.",
      "It carries a reactive surface area more than sixteen times greater than comparable products, using the same category of active air purification technology developed and used by NASA.",
      "Its most striking result addresses something most buildings never inspect. In student residences, viable mould found on the fan housing and coil surfaces of the AC units was removed completely, the same result whether the unit ran continuously or only on temperature demand. The inside of an air conditioner is a warm, damp, organically-loaded environment; left alone, it becomes a distribution system for exactly what you are trying to remove.",
    ],
    stats: [
      { value: ">99.99%", label: "Mould on fan & coil surfaces", condition: "5 days" },
      { value: ">90%", label: "TVOC", condition: "5 days" },
      { value: ">90%", label: "HCHO formaldehyde", condition: "5 days" },
      { value: "70%", label: "Airborne mould spores", condition: "5 days" },
    ],
    features: [
      {
        title: "16× reactive surface area",
        body: "A substantially larger active surface than comparable in-duct products, sustaining output across the served area.",
      },
      {
        title: "Completely concealed",
        body: "Permanently mounted inside ductwork, with nothing visible in the occupied space and nothing for occupants to operate.",
      },
      {
        title: "Treats the AC unit itself",
        body: "Directly addresses the fan housing and coil surfaces that conventional servicing rarely reaches between visits.",
      },
      {
        title: "Sized for multiple locations",
        body: "A single specification covering a wide range of room types and building uses.",
      },
    ],
    bestFor: [
      "Hotels",
      "Offices",
      "Schools",
      "Day care facilities",
      "Gyms",
      "Elevators",
      "Public restrooms",
      "Veterinary clinics",
    ],
    image: "/assets/devices/ptac.jpg",
    silhouette: "/assets/devices/ptac-silhouette.svg",
  },
  {
    slug: "overwatch",
    name: "OVERWATCH",
    article: "The OVERWATCH",
    kicker: "Large volume · industrial",
    coverage: "270 – 10,000 sq ft",
    coverageNote: "and up to 160,000 ft³",
    mount: "Ceiling suspended, wall mounted or roll-around",
    technologies: ["ARC®", "Bi-Polar Ionisation"],
    summary:
      "Built for volume. Where a space is measured in cubic feet rather than floor area (warehouses, plant rooms, sports halls, food handling), this is the unit that covers it.",
    body: [
      "The OVERWATCH treats large occupied spaces that conventional room purifiers cannot reach, covering up to 160,000 cubic feet. It can be permanently installed or moved between areas as required.",
      "Three casings are available depending on the environment. The stainless steel unit is water-resistant for spaces requiring washing and rinsing, and is recommended for food processing and storage. The powder-coated aluminium unit suspends from the facility ceiling for easy maintenance. The roll-around floor model offers portability and also reduces odours embedded in rugs and upholstery.",
      "In food handling and horticultural settings it is used to maintain a cleaner environment around meats, fruits, vegetables and flowers.",
    ],
    stats: [
      { value: "160,000", label: "Cubic feet covered", condition: "maximum volume" },
      { value: "10,000", label: "Square feet covered", condition: "maximum floor area" },
      { value: "3", label: "Casing variants", condition: "steel, aluminium, roll-around" },
    ],
    features: [
      {
        title: "Treats large occupied spaces",
        body: "Designed for volume rather than floor area, holding conditions across halls, warehouses and open-plan floors.",
      },
      {
        title: "Portable or installed",
        body: "Suspend it permanently from the ceiling, or move the roll-around model between areas as demand shifts.",
      },
      {
        title: "Washdown capable",
        body: "The optional stainless steel casing is water-resistant for environments where rinsing is part of the cleaning regime.",
      },
      {
        title: "Reduces odours & VOCs",
        body: "Addresses gas-phase contamination as well as airborne particulates across the full volume.",
      },
    ],
    bestFor: [
      "Warehouses",
      "Distribution centres",
      "Sports facilities",
      "Food processing & storage",
      "Open plan offices",
      "Grow houses",
      "Commercial spaces",
    ],
    banner: {
      src: "/assets/devices/overwatch-grow-hall.webp",
      alt: "The OVERWATCH suspended from the ceiling of a large indoor growing hall",
      eyebrow: "In use",
      headline: "Made for spaces measured in volume.",
      body: "The OVERWATCH treats large occupied spaces that conventional room purifiers cannot reach, covering up to 160,000 cubic feet. It can be suspended from the ceiling, wall mounted or rolled into place, and installed permanently or moved between areas as required.",
    },
    inside: {
      headline: "Built to treat the whole volume.",
      body: "ARC® and bi-polar ionisation in a single enclosure, with the casing chosen to suit the space: stainless steel, coated aluminium or roll-around.",
      still: "/assets/devices/overwatch-cells.webp",
      stillAlt: "The OVERWATCH's ARC® cells glowing beneath the control housings",
      wide: true,
    },
    gallery: [
      {
        src: "/assets/devices/overwatch-underside.webp",
        alt: "The OVERWATCH seen from below, with the ARC® cells lit behind the outlet louvres",
        caption: "Outlet louvres, cells lit",
      },
      {
        src: "/assets/devices/overwatch-front.webp",
        alt: "The OVERWATCH from the front, with its angled outlet hood",
        caption: "Front, with outlet hood",
      },
      {
        src: "/assets/devices/overwatch-fans.webp",
        alt: "The OVERWATCH intake side, showing its four fans",
        caption: "Intake, four fans",
      },
      {
        src: "/assets/devices/overwatch-interior.webp",
        alt: "Inside the OVERWATCH: the control board and power housing above the cells",
        caption: "Controls and power housing",
      },
    ],
    image: "/assets/devices/overwatch-render.webp",
    silhouette: "/assets/devices/overwatch-silhouette.svg",
  },
];

export const deviceBySlug = (slug?: string) => devices.find((d) => d.slug === slug);
