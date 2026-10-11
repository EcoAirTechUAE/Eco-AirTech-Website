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
  quote?: { text: string; author: string; role: string };
}

export const industries: Industry[] = [
  {
    slug: "residential",
    name: "Residential",
    kicker: "Villas, apartments & family homes",
    summary:
      "Your home is more than the air you breathe. We treat the air and every surface continuously, through the air conditioning you already have.",
    body: [
      "What affects how a home feels does not only live in the air. It is on the surfaces your family touches, cooks and plays on, in the odours from cooking, pets and moisture, and in everything people and pets bring in every day.",
      "In the Gulf the windows stay shut for months and the same air recirculates through the same ductwork, drawing in humidity as it goes. Whatever is in the system ends up in every room, which is why mould, mildew and odours seem to keep returning, even after cleaning or a filter change.",
      "Filters and UV lamps only treat what passes through them. Our technology works through your air conditioning to carry treatment out into the rooms where your family actually lives, continuously reducing viruses, bacteria, mould, VOCs and odours in the air and on surfaces.",
      "Children are the reason most of our residential clients call. They breathe faster for their size than adults, spend more time close to floors and soft furnishings where contaminants settle, and their lungs are still developing.",
      "It is fitted inside your existing system by our engineers and runs silently, with nothing in the room and no sprays, chemicals or extra filters. Families treat it like water filtration: part of the home, not a response to a problem.",
    ],
    concerns: [
      {
        title: "A home that never quite feels fresh",
        body: "Even after cleaning or replacing the filters.",
      },
      {
        title: "Lingering odours",
        body: "Pets, cooking and moisture smells that seem to keep returning.",
      },
      {
        title: "Mould and mildew",
        body: "Coastal humidity and constant cooling create the conditions for growth in ducts, wall cavities and behind furniture.",
      },
      {
        title: "Children, allergies and pets",
        body: "Nurseries and bedrooms have the longest occupancy in the house, and the occupants least able to tolerate poor air.",
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
      "Healthcare never stops, and neither do the pathogens moving through it. Our technology works continuously between cleaning cycles to protect patients, staff and visitors.",
    body: [
      "Hospitals, clinics and long-term care homes treat the most vulnerable people in environments where pathogens spread easily, under the strain of high occupancy and stretched staff.",
      "Surface cleaning and filtration are essential, but they leave gaps. Pathogens build up between cleaning cycles, and in long-term care, odours from bacteria and organic matter can signal a risk that manual methods alone do not remove.",
      "Our technology closes that gap. It treats the air and surfaces continuously in occupied wards, waiting areas and treatment rooms, with no evacuation, no downtime and no interruption to clinical activity. It supplements infection-control protocol rather than replacing it.",
      "Independent laboratory testing shows it substantially reduces bacterial and viral pathogens, including SARS-CoV-2 (99.99%), H1N1 influenza (99.93%), MRSA (99.96%), E. coli (99.67%), Listeria (99.99%), Pseudomonas aeruginosa (99.99%), Candida auris (99.99%) and Clostridium difficile spores (91.11%).",
      "It is proven in the field too. In a four-week trial in active ambulances in Baltimore and Florida, surfaces in an equipped vehicle were swabbed regularly and compared with control vehicles running without it. Contamination was 94% to 99% lower on the stretcher bench, work table and door handles.",
    ],
    concerns: [
      {
        title: "Airborne exposure",
        body: "Waiting areas, exam rooms, wards and shared facilities, where patients and visitors breathe the same air.",
      },
      {
        title: "High-touch surfaces",
        body: "Surgical suites, ICUs and emergency departments, touched constantly between cleans.",
      },
      {
        title: "Gaps between cleaning cycles",
        body: "The risk of healthcare-associated infection rises between cleans, and stretched teams have limited time for deep disinfection.",
      },
      {
        title: "Odour in long-term care",
        body: "Persistent odour signals bacterial contamination. The technology breaks it down at the source.",
      },
    ],
    devices: ["hvac", "ptac", "750-plus", "portable"],
    image: "/assets/industries/healthcare.jpg",
    // Signage sits above the entrance and the figures approaching it below,
    // so the crop is biased slightly up from centre to keep both in frame.
    focal: "object-[50%_42%]",
    proof: {
      value: "94–99%",
      label: "Lower surface contamination",
      context: "4 weeks, active ambulances against controls",
    },
  },
  {
    slug: "schools",
    name: "Schools & Nurseries",
    kicker: "Where children spend their days",
    summary:
      "Schools bring children together to learn, which also makes them ideal places for germs to spread. US schools with our technology installed saw absenteeism drop by 58%.",
    body: [
      "Schools, nurseries and universities bring hundreds of people together in classrooms, cafeterias, sports halls, dormitories and buses. Children share the same air and the same desks, doors and equipment all day, giving airborne and surface germs countless chances to move from one person to the next, and then home to their families.",
      "Cleaning cannot keep up. Rooms are in use from the first bell to the last, with almost no time to deep clean between classes, and illness arrives in waves: after summer, after every holiday when families return from travelling, and through each seasonal outbreak.",
      "Our systems treat the air and surfaces continuously while children are in the room, working invisibly and without disrupting lessons. The same technology protects the school bus, the cafeteria and the staff room, as an added layer alongside good ventilation, cleaning and hygiene.",
      "The result shows up in attendance. Schools in the US with the technology installed saw absenteeism drop by 58%, and in two separate studies over a one-year period, student absences fell by 40% and 60%.",
      "A 2025 study across Dubai and Sharjah schools found that more needs to be done on indoor air, and that younger children are the most vulnerable. Our units retrofit into existing school air conditioning without disruption to teaching.",
    ],
    concerns: [
      {
        title: "Crowded, enclosed spaces",
        body: "Classrooms, cafeterias, dormitories and buses put many children in the same air for hours.",
      },
      {
        title: "Shared surfaces",
        body: "Desks, doors, cafeteria tables and sports equipment are touched all day, with little time to clean between uses.",
      },
      {
        title: "Seasonal waves of illness",
        body: "After summer, after every holiday and through each outbreak, illness moves through a class in days.",
      },
      {
        title: "Attendance and learning",
        body: "Fewer sick days mean more time in class. Poor air also worsens asthma and allergies, and dulls concentration.",
      },
    ],
    quote: {
      text: "The implementation of the technology has been a game-changer for our district. The notable decrease in absenteeism underscores the positive impact of prioritizing the health and safety of our students.",
      author: "School district",
      role: "United States",
    },
    devices: ["hvac", "ptac", "750-plus"],
    video: "schools",
    image: "/assets/industries/schools.jpg",
    proof: {
      value: "58%",
      label: "Drop in absenteeism",
      context: "US schools with the technology installed",
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
      "Buses, trains, ferries and planes move people through enclosed spaces all day. We treat the air and the surfaces continuously while vehicles stay in service, protecting passengers and crew.",
    body: [
      "Transport moves millions of passengers and crew through enclosed spaces every day. Buses, trains, taxis, ferries and aircraft share the same conditions: high occupancy, limited ventilation and constant turnover. Passengers share the air and touch the same seats, rails, tray tables and door handles.",
      "The Gulf sees this at scale every year. Families escape the summer heat, then return together on full flights, bringing home whatever they picked up abroad. It travels onward in the airport transfer, the school bus and the daily commute, and within days it is in classrooms and offices.",
      "Cleaning happens at the end of the shift, while contamination is reintroduced at every stop. Treating only the air, or only the surfaces, is no longer enough. Our technology treats both continuously while the vehicle is in service, reducing bacteria, viruses, mould, VOCs and odours between one passenger and the next.",
      "The results are measured in real fleets. A pilot on an active passenger rail system recorded a 72% reduction in pathogens. A regional transit authority has fitted the technology across 189 buses. After a public transit fleet was equipped, 52% of surveyed riders said they were more likely to travel on it. A school transport study found bus driver absenteeism fell by an average of 47%.",
      "In a four-week trial in active ambulances, the equipped vehicle carried 89% fewer total pathogens than the control. The transit unit is built for the vibration, power and space limits of vehicles, across public transit, school and executive fleets, airport shuttles, emergency services, marine and aviation.",
    ],
    concerns: [
      {
        title: "Enclosed cabins, limited ventilation",
        body: "People sit close together in recirculated air, often for hours at a time.",
      },
      {
        title: "Constant turnover",
        body: "Seats, rails and handles are shared all day, with contamination reintroduced at every stop.",
      },
      {
        title: "Gaps between cleaning cycles",
        body: "Periodic disinfection cannot cover a vehicle that is in service all day. Continuous treatment works while it is moving.",
      },
      {
        title: "Rider confidence and crew welfare",
        body: "Passengers expect visible, continuous cleanliness, and drivers and crew breathe that air for full shifts.",
      },
    ],
    devices: ["750-plus", "ptac"],
    video: "transportation",
    image: "/assets/industries/transportation.jpg",
    // The tram sits low in the frame — the upper third is sky — so a centred
    // crop cuts it off entirely.
    focal: "object-bottom",
    proof: {
      value: "72%",
      label: "Pathogen reduction",
      context: "Pilot on an active passenger rail system",
    },
  },
];

export const industryBySlug = (slug?: string) => industries.find((i) => i.slug === slug);
