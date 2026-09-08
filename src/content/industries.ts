/**
 * Sectors we work with.
 *
 * `video` maps to a key in site.videos — only the sectors we have filmed
 * carry one. The rest render without a video block rather than an empty slot.
 */

import { site } from "@/config/site";

export interface Industry {
  slug: string;
  name: string;
  kicker: string;
  summary: string;
  /** The specific reason this sector cares — not a generic benefit list. */
  body: string[];
  concerns: { title: string; body: string }[];
  devices: string[]; // device slugs
  video?: keyof typeof site.videos;
  image: string;
  /**
   * Tailwind object-position for the card crop. Cards are wider than the
   * source photos, so the top and bottom get trimmed — set this where the
   * subject does not sit dead centre. Defaults to centre.
   * e.g. "object-bottom" | "object-top" | "object-[50%_35%]"
   */
  focal?: string;
  proof?: { value: string; label: string; context: string };
}

export const industries: Industry[] = [
  {
    slug: "residential",
    name: "Residential",
    kicker: "Villas, apartments & family homes",
    summary:
      "The air inside a home is the air a family breathes for most of their lives. In the Gulf, almost all of it has passed through an air conditioning system first.",
    body: [
      "A sealed, air-conditioned home in a hot coastal climate is an unusual environment. Windows stay shut for months, humidity is drawn in and condensed continuously, and the same air recirculates through the same ductwork day after day. Whatever is in that system ends up in every room.",
      "Children are the reason most of our residential clients call. They breathe faster relative to their body size than adults, spend more time close to floors and soft furnishings where contaminants settle, and their respiratory systems are still developing. What they breathe at home for the first ten years is not a small variable.",
      "We work with families investing in their household the same way they invest in water filtration or nutrition — as infrastructure, not as a response to a problem. Where there is an existing issue we address it; where there is not, the point is that one never establishes.",
    ],
    concerns: [
      {
        title: "Nurseries & children's bedrooms",
        body: "The rooms with the longest continuous occupancy in the house, and the occupants least able to tolerate poor air.",
      },
      {
        title: "Humidity-driven growth",
        body: "Coastal humidity plus constant cooling creates condensation in wall cavities, around ducting and behind furniture.",
      },
      {
        title: "Allergens & pets",
        body: "Dander, pollen carried in from outside, and dust that recirculates rather than dispersing.",
      },
      {
        title: "New-build off-gassing",
        body: "Fresh joinery, adhesives, paints and furnishings release formaldehyde and VOCs for months after handover.",
      },
    ],
    devices: ["750-plus", "hvac", "ptac", "portable"],
    video: "residential",
    image: "/assets/industries/residential.jpg",
    proof: {
      value: "96.4%",
      label: "Stachybotrys reduction",
      context: "72 hours, occupied residential property",
    },
  },
  {
    slug: "hotels",
    name: "Hotels & Resorts",
    kicker: "Guest experience, protected",
    summary:
      "A guest cannot describe good air. They can describe a room that smells closed-up — and they describe it in a review that stays online permanently.",
    body: [
      "Air quality is one of the few parts of a guest's experience that is felt immediately and almost never articulated precisely. The complaint arrives as 'the room smelled musty', 'I couldn't sleep', 'my allergies were bad'. The cause is usually a fan coil unit that has been damp for a long time.",
      "Rooms are the hardest case in the building: they sit unoccupied and cooled for days, then are handed to someone paying a premium and expecting perfection. Housekeeping addresses surfaces beautifully; nothing in a standard turnaround addresses what is inside the unit blowing air across the bed.",
      "Our units install into existing ductwork or fan coils without visible equipment in the room and without any change to housekeeping routine. For properties positioning around wellness, it is also a claim that can be substantiated with third-party data rather than adjectives.",
    ],
    concerns: [
      {
        title: "Odour in guest rooms",
        body: "The single most common air-related complaint, and the hardest to resolve with cleaning alone.",
      },
      {
        title: "Fan coil contamination",
        body: "Warm, damp and organically loaded — and rarely inspected between deep services.",
      },
      {
        title: "Vacant room cycles",
        body: "Rooms held cool and closed for days give growth exactly the conditions it needs.",
      },
      {
        title: "Wellness positioning",
        body: "A measurable, independently tested air standard, rather than a marketing adjective.",
      },
    ],
    devices: ["ptac", "hvac", "750-plus", "portable"],
    video: "hotels",
    image: "/assets/industries/hotels.jpg",
    proof: {
      value: ">99.99%",
      label: "Mould on fan & coil surfaces",
      context: "5 days, IAQS field test",
    },
  },
  {
    slug: "palaces",
    name: "Palaces & Places of Worship",
    kicker: "Discreet, comprehensive, respectful",
    summary:
      "Buildings of standing, where the air handling is complex, occupancy swings between empty and full, and nothing about the intervention may be visible.",
    body: [
      "These buildings share a shape of problem: substantial served volumes, several independent air handling systems, and occupancy that swings between near-empty and completely full. Neither a palace nor a mosque tolerates visible equipment, and neither can be taken out of use while work is carried out.",
      "In palaces and private residences the difficulty is vacancy. A wing held at temperature with no occupancy, no door movement and no change of air is close to an ideal growth environment — and the problem is rarely caught early, because nobody is in the room to notice it. Those same conditions damage what the rooms contain: textiles, timber, manuscripts and collections are all sensitive to exactly the humidity that drives microbial growth.",
      "Places of worship present the opposite difficulty: density. A prayer hall goes from empty to full within minutes, several times a day, and at Friday prayers to capacity. The floors are carpeted throughout, worshippers are barefoot and kneel and prostrate directly onto them, and ablution facilities keep humidity high in the adjoining spaces. Warmth, moisture and heavy organic loading in the same rooms is the combination that microbial growth needs — and carpet holds all three long after cleaning.",
      "Our units install inside existing ductwork with nothing visible in the space, and the work is scheduled around prayer times or around the household rather than the other way round. We are currently installing across palace projects in Saudi Arabia and residences in the UAE. Those clients are not named here, and will not be — discretion is a condition of the work, and we treat it as one.",
    ],
    concerns: [
      {
        title: "Congregational density",
        body: "Halls that fill to capacity within minutes, several times a day, then stand empty again — a load no fixed ventilation rate is sized for.",
      },
      {
        title: "Carpet & ablution humidity",
        body: "Wudu facilities keep moisture high beside carpeted halls that worshippers kneel and prostrate on. Carpet holds moisture and organic matter long after cleaning.",
      },
      {
        title: "Extended vacancy",
        body: "Cooled, closed wings and halls with no ventilation change and nobody present to notice a developing problem.",
      },
      {
        title: "Invisible, respectful installation",
        body: "Concealed equipment, controlled site access, work scheduled around prayer times and household routine, and confidentiality maintained permanently.",
      },
    ],
    devices: ["hvac", "ptac", "overwatch"],
    image: "/assets/industries/palaces.jpg",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    kicker: "Hospitals, clinics & care",
    summary:
      "Environments where the people most vulnerable to airborne contamination are the people who have to be there.",
    body: [
      "Healthcare settings concentrate immunocompromised patients, antimicrobial-resistant organisms and continuous human traffic in the same air. The infection-control burden is well understood; the contribution of the air handling system to it is often less closely examined.",
      "Our technology has been tested directly against the organisms that matter in these environments. Independent laboratory testing at Microchem recorded greater than 99.99% inactivation of MRSA on surfaces over six hours, and MRIGlobal recorded 86.98% inactivation of SARS-CoV-2 on surfaces over four hours.",
      "It is designed to run in occupied space continuously — no evacuation, no downtime, no interruption to clinical activity. It supplements infection-control protocol rather than competing with it.",
    ],
    concerns: [
      {
        title: "Antimicrobial-resistant organisms",
        body: "Directly tested against MRSA, with results published in full alongside their protocols.",
      },
      {
        title: "Immunocompromised patients",
        body: "Reducing the airborne and surface contaminant load in the spaces where exposure matters most.",
      },
      {
        title: "Continuous occupancy",
        body: "Operates safely in occupied space, so wards and clinics never need to be taken offline.",
      },
      {
        title: "Transit & ambulance",
        body: "Enclosed, high-turnover vehicles where infection control between patients is hardest to complete.",
      },
    ],
    devices: ["hvac", "ptac", "750-plus", "portable"],
    image: "/assets/industries/healthcare.jpg",
    // Signage sits above the entrance and the figures approaching it below,
    // so the crop is biased slightly up from centre to keep both in frame.
    focal: "object-[50%_42%]",
    proof: {
      value: ">99.99%",
      label: "MRSA inactivation on surfaces",
      context: "6 hours, Microchem laboratory",
    },
  },
  {
    slug: "schools",
    name: "Schools & Nurseries",
    kicker: "Where children spend their days",
    summary:
      "A 2025 study across Dubai and Sharjah schools found that while measures exist, more needs to be done — and that younger children are the most vulnerable.",
    body: [
      "Classrooms combine the highest occupant density of any building type with the youngest and most susceptible occupants. Thirty children in a sealed, air-conditioned room generate substantial humidity and particulate load, and recirculate it for the whole school day.",
      "The consequences are not limited to health. Poor indoor air quality worsens asthma and allergies, and there is a well-established link between air quality and cognitive performance — attention, error rates and comprehension all decline as the air degrades. Parents increasingly ask about it directly.",
      "Our units retrofit into existing school HVAC without disruption to teaching, and the resulting air standard can be evidenced with third-party testing rather than asserted. We have field-tested in educational settings, including a cleaning products store — a deliberately hostile gas-phase environment — where TVOC fell by 95%.",
    ],
    concerns: [
      {
        title: "High occupant density",
        body: "The most people per cubic metre of any building type, for six or more hours a day.",
      },
      {
        title: "Asthma & allergy prevalence",
        body: "Poor indoor air quality measurably worsens both, and children are disproportionately affected.",
      },
      {
        title: "Concentration & learning",
        body: "Cognitive performance is sensitive to air quality well before anyone reports feeling unwell.",
      },
      {
        title: "Parent expectations",
        body: "A verifiable air standard is increasingly part of how families choose a school.",
      },
    ],
    devices: ["hvac", "ptac", "750-plus"],
    video: "schools",
    image: "/assets/industries/schools.jpg",
    proof: {
      value: "95.0%",
      label: "TVOC reduction",
      context: "5 days, educational facility",
    },
  },
  {
    slug: "gyms",
    name: "Gyms & Wellness",
    kicker: "Fitness, spa & recovery",
    summary:
      "People come to a gym to improve their health, then breathe harder than anywhere else in their week while doing it.",
    body: [
      "Training multiplies exposure. Ventilation rate rises several times over resting levels, and breathing shifts from nasal to oral — bypassing the body's own filtration. Whatever is in the air of a gym is delivered deeper into the lungs and in far greater volume than in any other commercial environment.",
      "The conditions are also unusually favourable to growth: sustained humidity from perspiration and showers, warm surfaces, heavy textile and equipment loading, and continuous occupancy. Spa, sauna and pool areas add standing moisture on every surface.",
      "For operators positioning around recovery, longevity and performance, air is the one input in the building that every member consumes continuously and that almost no competitor can substantiate.",
    ],
    concerns: [
      {
        title: "Elevated respiration",
        body: "Members breathe several times more air, more deeply, and largely through the mouth.",
      },
      {
        title: "Persistent humidity",
        body: "Perspiration, showers, pools and steam keep surfaces damp for most of the operating day.",
      },
      {
        title: "Odour management",
        body: "Gas-phase contamination that ventilation dilutes but never actually removes.",
      },
      {
        title: "Shared equipment & textiles",
        body: "High-touch surfaces and absorbent materials in continuous circulation.",
      },
    ],
    devices: ["overwatch", "hvac", "750-plus"],
    video: "gyms",
    image: "/assets/industries/gyms.jpg",
    proof: {
      value: ">95%",
      label: "Odour intensity reduction",
      context: "5 days, enclosed cabin field test",
    },
  },
  {
    slug: "hospitality",
    name: "Hospitality & Venues",
    kicker: "Restaurants, cafés & event spaces",
    summary:
      "Kitchens, crowds and long service hours produce a gas-phase load that extraction dilutes but never eliminates.",
    body: [
      "Food service generates a continuous stream of cooking odours, grease aerosols and VOCs, alongside high occupancy and warm, humid back-of-house conditions. Extraction moves air; it does not clean it, and it does nothing for what has already settled in soft furnishings and ductwork.",
      "The commercial consequence is straightforward: a dining room that smells of last night's service, or a function space that smells closed-up, damages the experience before anything is served.",
      "ODOGard® addresses odour compounds at a molecular level rather than masking them, and the active technology treats the ductwork and back-of-house areas that extraction alone cannot reach.",
    ],
    concerns: [
      {
        title: "Cooking odour carry-over",
        body: "Gas-phase compounds that migrate into dining rooms and settle into furnishings.",
      },
      {
        title: "Back-of-house humidity",
        body: "Warm, wet kitchen and store environments running for most of the day.",
      },
      {
        title: "Grease in ductwork",
        body: "An organic food source accumulating in exactly the place air is distributed from.",
      },
      {
        title: "Variable occupancy",
        body: "Function spaces that sit closed and cooled between events, then fill completely.",
      },
    ],
    devices: ["overwatch", "hvac", "ptac"],
    image: "/assets/industries/hospitality.jpg",
  },
  {
    slug: "transportation",
    name: "Transportation",
    kicker: "Fleet, transit & aviation",
    summary:
      "Small sealed volumes, continuous occupant turnover and recirculated air — the most concentrated exposure environment there is.",
    body: [
      "A vehicle cabin is the hardest air quality problem in miniature: a very small volume, heavy occupant turnover, limited fresh air, and a recirculation system that redistributes whatever is present within seconds.",
      "The evidence here is unusually direct. A hospital ran a four-week study across active ambulances and recorded 89% fewer total pathogens in the equipped vehicle than in the control. In a 220 sq ft school bus, odour intensity fell by more than 95% and airborne mould by around 81%, with ozone remaining below detectable levels throughout.",
      "The transit variant is designed for the vibration, power and space constraints of vehicle installation, across passenger transport, executive fleet, emergency services and aviation.",
    ],
    concerns: [
      {
        title: "Very small sealed volumes",
        body: "Contaminant concentration rises far faster than in any building.",
      },
      {
        title: "High occupant turnover",
        body: "Continuous introduction of new contamination with no opportunity to clean between.",
      },
      {
        title: "Recirculated air",
        body: "Cabin systems redistribute rather than replace, spreading contamination in seconds.",
      },
      {
        title: "Duty of care",
        body: "Drivers and crew occupy that air for full shifts, every working day.",
      },
    ],
    devices: ["750-plus", "ptac"],
    video: "transportation",
    image: "/assets/industries/transportation.jpg",
    // The tram sits low in the frame — the upper third is sky — so a centred
    // crop cuts it off entirely.
    focal: "object-bottom",
    proof: {
      value: "89%",
      label: "Fewer pathogens vs control",
      context: "4 weeks, active ambulance fleet",
    },
  },
];

export const industryBySlug = (slug?: string) => industries.find((i) => i.slug === slug);
