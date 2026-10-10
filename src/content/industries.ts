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
      "We work with families investing in their household the same way they invest in water filtration or nutrition: as infrastructure, not as a response to a problem. Where there is an existing issue we address it; where there is not, the point is that one never establishes.",
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
      "A guest cannot describe good air. They can describe a room that smells closed-up, and they describe it in a review that stays online permanently.",
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
        body: "Warm, damp and organically loaded, and rarely inspected between deep services.",
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
      "We protect the people inside and the building itself: limiting the bacteria passed between worshippers, guests and household, and keeping mould out of the building.",
    body: [
      "Our role in these buildings is simple. We protect the people in them, and we protect the building itself.",
      "In a place of worship, people stand shoulder to shoulder. A prayer hall goes from empty to full within minutes, several times a day, and to capacity on Fridays. Worshippers share the same air, and kneel and prostrate on the same carpet. We treat that air and those surfaces continuously while people worship, reducing the bacteria and germs that pass from one person to the next.",
      "The building needs protecting too. Ablution areas keep humidity high beside carpeted halls, and palace wings are held cool and closed for weeks with nobody present to notice a problem. Those are the conditions mould needs, and it damages carpets, textiles, timber and collections as well as the air. Because our systems never switch off, growth does not get the chance to establish.",
      "Units install inside existing ductwork with nothing visible in the space, and work is scheduled around prayer times or the household. We are currently installing across palace projects in Saudi Arabia and residences in the UAE. Those clients are not named here, and will not be.",
    ],
    concerns: [
      {
        title: "Protecting worshippers",
        body: "Close contact in a full hall, several times a day. Continuous treatment limits what passes between people.",
      },
      {
        title: "Protecting the household",
        body: "The same care for family, guests and staff in palaces and private residences.",
      },
      {
        title: "Protecting the building",
        body: "Mould kept out of carpets, ductwork, closed wings and the collections they hold.",
      },
      {
        title: "Invisible, respectful installation",
        body: "Concealed equipment, work scheduled around prayer times and household routine, and confidentiality maintained permanently.",
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
      "It is designed to run in occupied space continuously, with no evacuation, no downtime and no interruption to clinical activity. It supplements infection-control protocol rather than competing with it.",
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
      "Children share a classroom, a school bus and everything they bring back from the holidays. We help stop germs and bacteria spreading through the school day.",
    body: [
      "A classroom puts thirty children in a sealed, air-conditioned room for the whole school day, breathing the same recirculated air. They are the youngest and most susceptible occupants of any building, and what one child brings in, the class shares.",
      "Every parent and teacher in the Gulf knows the pattern. Families travel over the summer, return on full flights, and in the first weeks of term the coughs and colds go round the class, then home to brothers, sisters and parents. The same happens after every holiday.",
      "Our systems treat the air and surfaces in classrooms continuously while children are in them, reducing the germs, bacteria and mould that pass from child to child. The same technology fits the school bus, so protection starts on the journey in.",
      "Cleaner air also supports learning. Poor indoor air quality worsens asthma and allergies, and attention and comprehension decline as the air degrades. A 2025 study across Dubai and Sharjah schools found that more needs to be done, and that younger children are the most vulnerable.",
      "Units retrofit into existing school air conditioning without disruption to teaching, and the result can be evidenced with independent testing rather than asserted.",
    ],
    concerns: [
      {
        title: "Stopping the spread in class",
        body: "Thirty children in recirculated air for six or more hours a day. Continuous treatment works while they are in the room.",
      },
      {
        title: "Back-to-school season",
        body: "After summer and every holiday, illness arrives with returning families and moves through a class in days.",
      },
      {
        title: "Asthma, allergies & concentration",
        body: "Poor air worsens both conditions and dulls attention well before anyone reports feeling unwell.",
      },
      {
        title: "Parent confidence",
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
      "Training multiplies exposure. Ventilation rate rises several times over resting levels, and breathing shifts from nasal to oral, bypassing the body's own filtration. Whatever is in the air of a gym is delivered deeper into the lungs and in far greater volume than in any other commercial environment.",
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
      "A dining room is judged the moment a guest walks in. The air is part of that experience, and it deserves the same care as the food and the service.",
    body: [
      "Hospitality is the business of caring for guests, and the air is the one part of the experience every guest shares. In a full dining room people sit close together for hours, breathing the same recirculated air. We treat that air continuously while they dine, reducing what passes from one table to the next.",
      "For most venues this is an investment in the guest experience: a room that feels fresh at the first seating and the last, an air quality standard you can evidence with independent test data, and a healthier environment for the team who work in it every day.",
      "For venues already struggling with contamination, such as mould in the air conditioning, a persistent musty smell or a problem that returns after every deep clean, we remediate. The technology eliminates up to 99.9% of airborne and surface contaminants, reaches the ductwork and fan coils that cleaning cannot, and keeps running so the problem does not come back.",
      "It retrofits into the air conditioning you already have and runs safely while the room is occupied, with no closure and no change to service.",
    ],
    concerns: [
      {
        title: "Protecting guests as they dine",
        body: "Continuous treatment of the air in the dining room itself, not only the air that happens to pass through a filter.",
      },
      {
        title: "Cross-contamination between tables",
        body: "Shared, recirculated air carries what one table breathes out to the next. Active treatment works in the space between them.",
      },
      {
        title: "Remediation where there is a problem",
        body: "Mould, bacteria and musty odours dealt with at the source, including inside the air conditioning system.",
      },
      {
        title: "An investment guests can feel",
        body: "A fresher room at every seating, backed by independently tested results rather than adjectives.",
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
      "Travel puts people shoulder to shoulder in sealed, recirculated air. We protect passengers and crew by treating that air continuously, limiting the germs and bacteria carried from one journey to the next.",
    body: [
      "Every journey brings strangers together in a small sealed space: a plane, a bus, a metro carriage, a taxi. The air is recirculated, the seats turn over all day, and whatever one passenger brings on board is shared with everyone else within seconds.",
      "The Gulf sees this at scale every year. Families escape the summer heat, then return together on full flights, bringing home whatever they picked up abroad. It travels onward in the airport transfer, the school bus and the daily commute, and within days it is in classrooms and offices.",
      "Our technology works while the vehicle is in service. It treats the air and the surfaces passengers touch continuously, reducing germs and bacteria between one passenger and the next, rather than waiting for the end-of-day clean.",
      "The evidence is direct. A hospital ran a four-week study across active ambulances and recorded 89% fewer total pathogens in the equipped vehicle than in the control. In a 220 sq ft school bus, airborne mould fell by around 81% and odour intensity by more than 95%, with ozone remaining below detectable levels throughout.",
      "The transit unit is built for the vibration, power and space limits of vehicles, across passenger transport, school and executive fleets, emergency services and aviation.",
    ],
    concerns: [
      {
        title: "Protecting passengers",
        body: "People sit close together in sealed, recirculated air, often for hours at a time.",
      },
      {
        title: "Stopping the spread between journeys",
        body: "Seats turn over all day with no chance to clean in between. Continuous treatment works while the vehicle is moving.",
      },
      {
        title: "The return from summer",
        body: "Full flights and school runs after the holidays carry illness back into homes, schools and workplaces.",
      },
      {
        title: "Duty of care to crew",
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
