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
  article: string; // "The HVAC" etc.
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
  image: string;
  silhouette: string;
}

export const rangeCoverage = "135 – 10,000 sq ft";

export const devices: Device[] = [
  {
    slug: "hvac",
    name: "HVAC",
    article: "The HVAC",
    kicker: "In-duct · whole building",
    coverage: "800 – 3,300 sq ft",
    mount: "Installed into existing ductwork",
    technologies: ["ARC® PCO", "Bi-Polar Ionisation"],
    summary:
      "Our flagship in-duct system. Fitted inside the ductwork you already have, it turns the air conditioning that currently circulates contamination into the thing that removes it.",
    body: [
      "The HVAC unit installs directly into existing ductwork and works in tandem with the incoming airflow from your air handling system. As air passes across the ARC® cell, cleaning agents are introduced into the ducting and carried through the whole building.",
      "That distribution is the point. Because the agents travel as a vapour with the air, coverage is even across every served room — including the parts of the building nobody thinks to clean, and the inside of the ductwork itself.",
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
    slug: "portable",
    name: "Portable",
    article: "The Portable",
    kicker: "Free-standing · no installation",
    coverage: "up to 1,500 sq ft",
    mount: "Free-standing — plugged in and moved between rooms",
    technologies: ["ARC® PCO", "Bi-Polar Ionisation", "ODOGard® HEPA+"],
    summary:
      "The whole system in a unit you can carry. No installation, no ductwork, no commitment — plug it in, and move it to wherever the problem is.",
    body: [
      "Every other unit in the range is fitted. The Portable is not. It carries the same three technologies — the ARC® cell producing hydroxyls, bi-polar ionisation, and an ODOGard®-coated HEPA+ filter — in a free-standing enclosure that needs nothing but a socket.",
      "That makes it the fastest way to act. Where a fixed installation is being specified, the Portable holds the space in the meantime. Where a room needs a deep reset — a suite between guests, a villa at handover, a nursery after building work — it is moved in, run, and moved on to the next room.",
      "It also tells you what it is doing. Onboard sensing tracks air quality, temperature and humidity and reports to a phone app, along with remaining life on each of the three consumables. In AUTO mode the unit raises and lowers its own output against what it detects, rather than running flat out regardless.",
      "Because it is redeployable, a single unit can serve a portfolio — which is why it tends to be the first thing operators buy and the last thing they retire.",
    ],
    stats: [
      { value: "99.9%", label: "Airborne mould spores", condition: "ARC + BPI + ODOGard®" },
      { value: "99%", label: "TVOCs", condition: "ARC + BPI + ODOGard®" },
      { value: "96%", label: "Odour elimination", condition: "ARC + BPI + ODOGard®" },
    ],
    features: [
      {
        title: "No installation at all",
        body: "No ductwork, no engineer, no downtime. It needs a power socket and nothing else, so it can be working the day it arrives.",
      },
      {
        title: "Onboard air quality sensing",
        body: "Continuous monitoring of air quality, temperature and humidity, reported to a phone app — so the effect is measured rather than assumed.",
      },
      {
        title: "AUTO mode",
        body: "Output rises and falls against what the unit actually detects, instead of running at a fixed rate regardless of conditions.",
      },
      {
        title: "Redeployable across a portfolio",
        body: "Move it between rooms, properties or sites. One unit can cover many spaces in rotation rather than serving a single room forever.",
      },
    ],
    bestFor: [
      "Hotel room turnarounds",
      "Post-renovation VOC clearing",
      "Villas at handover",
      "Nurseries & children's rooms",
      "Interim cover before a fixed install",
      "Clinics & consulting rooms",
      "Serviced apartments",
    ],
    quote: {
      text: "The Industry has never seen anything like this.",
      author: "Keith Roe",
      role: "Advanced IAQ Solutions",
    },
    image: "/assets/devices/portable.jpg",
    silhouette: "/assets/devices/portable-silhouette.svg",
  },
  {
    slug: "750-plus",
    name: "750+",
    article: "The 750+",
    kicker: "Wall mounted · room & zone",
    coverage: "up to 1,000 sq ft",
    mount: "Wall mounted, or fitted within AC ductwork",
    technologies: ["ARC® PCO", "Bi-Polar Ionisation", "ODOGard® HEPA+ filter"],
    summary:
      "The most tested unit in the range, and the one behind our strongest live-environment results. Compact enough to wall mount in a single room, powerful enough to hold a heavily contaminated one.",
    body: [
      "The 750+ combines all three technologies in a single self-contained unit: an ODOGard®-coated HEPA+ filter for particulates and gas-phase odours, the ARC® advanced PCO cell producing hydroxyls, and a bi-polar ionisation module.",
      "It is the unit we take into the hardest environments. Both of our 72-hour live trials in occupied, deliberately re-contaminated housing were run on a 750+ with no filter fitted — a deliberately conservative configuration — and still returned reductions of 96.4% and 95.9%.",
      "Its lightweight, compact design means it can be wall mounted in a room or placed within AC ductwork, and a transit variant is available for vehicles and enclosed cabins.",
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
        title: "Wall mount or in-duct",
        body: "Lightweight and compact, so it can be sited in the room itself or concealed within AC ductwork.",
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
    image: "/assets/devices/750-plus.jpg",
    silhouette: "/assets/devices/750-plus-silhouette.svg",
  },
  {
    slug: "ptac",
    name: "PTAC",
    article: "The PTAC",
    kicker: "Internal mount · concealed",
    coverage: "up to 700 sq ft",
    mount: "Mounted inside HVAC ductwork where access is poor",
    technologies: ["ARC® PCO"],
    summary:
      "A permanently mounted internal unit for spaces where ductwork access is limited. It is also our clearest answer to the fan and coil surfaces inside your AC unit.",
    body: [
      "The PTAC is designed to disappear. Permanently mounted inside the ductwork, it provides continuous purification in buildings where access is poor or where no equipment can be visible.",
      "It carries a reactive surface area more than sixteen times greater than comparable products, using the same category of active air purification technology developed and used by NASA.",
      "Its most striking result addresses something most buildings never inspect. In student residences, viable mould found on the fan housing and coil surfaces of the AC units was removed completely — the same result whether the unit ran continuously or only on temperature demand. The inside of an air conditioner is a warm, damp, organically-loaded environment; left alone, it becomes a distribution system for exactly what you are trying to remove.",
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
        body: "Permanently mounted inside ductwork — nothing visible in the occupied space, nothing for occupants to operate.",
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
    name: "OverWatch",
    article: "The OverWatch",
    kicker: "Large volume · industrial",
    coverage: "270 – 10,000 sq ft",
    coverageNote: "and up to 160,000 ft³",
    mount: "Ceiling suspended, wall mounted or roll-around",
    technologies: ["ARC® PCO", "Bi-Polar Ionisation"],
    summary:
      "Built for volume. Where a space is measured in cubic feet rather than floor area — warehouses, plant rooms, sports halls, food handling — this is the unit that covers it.",
    body: [
      "The OverWatch treats large occupied spaces that conventional room purifiers cannot reach, covering up to 160,000 cubic feet. It can be permanently installed or moved between areas as required.",
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
    variants: [
      {
        title: "Stainless steel",
        body: "Water-resistant for spaces where washing and rinsing is required. Recommended for food processing facilities, food warehouses and storage.",
      },
      {
        title: "Coated aluminium",
        body: "Powder-coated, water-resistant and easy to maintain. Installs suspended from the facility ceiling. Suited to warehouses and greenhouses.",
      },
      {
        title: "Roll-around",
        body: "Portable aluminium floor model. Also reduces odours embedded in rugs and upholstery — recommended for remediation across hospitals, schools, gyms and hospitality.",
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
    image: "/assets/devices/overwatch.png",
    silhouette: "/assets/devices/overwatch-silhouette.svg",
  },
];

export const deviceBySlug = (slug?: string) => devices.find((d) => d.slug === slug);
