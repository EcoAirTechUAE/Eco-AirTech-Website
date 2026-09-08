/**
 * The technology and the education argument.
 *
 * Framing rule for this whole file: mould is *evidence*, wellness is the
 * pitch. We are not selling remediation to landlords under legal pressure —
 * we are selling continuously clean air to people investing in their own
 * health, their children's, their staff's and their guests'.
 */

export const equation = {
  parts: [
    { symbol: "H₂O", label: "Water", detail: "Ambient humidity already in your air" },
    { symbol: "O₂", label: "Oxygen", detail: "Drawn from the same air you breathe" },
    { symbol: "ARC®", label: "Catalyst", detail: "UV energy activating our catalytic cell" },
  ],
  result: { symbol: "AOPs", label: "Advanced Oxidation Products", detail: "Including hydroxyls and H₂O₂" },
};

export const pillars = [
  {
    id: "hydroxyls",
    name: "Hydroxyls",
    subtitle: "Nature's cleaning agents",
    summary:
      "Every day, sunlight reacts with water vapour in the atmosphere to produce hydroxyls — the molecules that scrub the outdoor air clean. ARC® reproduces that reaction indoors, continuously.",
    points: [
      "Hydroxyls occur naturally. They deactivate airborne and surface contaminants at a molecular level rather than simply trapping them.",
      "ARC® is our proprietary form of Photocatalytic Oxidation (PCO): ultraviolet energy activates a catalytic cell, converting ambient humidity into oxidising hydroxyls.",
      "Because the agent is a vapour, it travels wherever the air travels — behind furniture, inside ductwork, into grout and soft furnishings. Not just the surfaces you can reach.",
    ],
  },
  {
    id: "bpi",
    name: "Bi-Polar Ionisation",
    subtitle: "Natural electrical charges",
    summary:
      "The same charge separation that leaves the air feeling clean after a storm — generated on demand, inside your building.",
    points: [
      "Ionisation brushes create a plasma of positively and negatively charged ions that disperse through the occupied space.",
      "Ions cluster around airborne particles — mould spores, bacteria, viruses, pollen — increasing their mass so they drop out of the breathing zone.",
      "Enlarged particles are also far easier for filtration to capture, which is why the active and passive systems are designed to work as a pair.",
    ],
  },
] as const;

export const safety = {
  headline: "Safe by design, not by exception",
  body: "Our systems produce approximately 0.05 ppm of gaseous hydrogen peroxide — twenty times lower than OSHA's permissible exposure limit of 1.0 ppm. Like oxygen, gaseous hydrogen peroxide is already present in the air you breathe. Independent testing has repeatedly recorded ozone at 0 ppm, or below the levels measured outdoors, for the full duration of the test.",
  figures: [
    { value: "0.05", unit: "ppm", label: "H₂O₂ produced" },
    { value: "1.0", unit: "ppm", label: "OSHA permissible limit" },
    { value: "20×", unit: "", label: "Below the limit" },
  ],
  footnote: "Verified by Advanced IAQ Solutions (IAQS). Occupied-space safe — no evacuation, no downtime.",
};

/* ------------------------------------------------------------------ *
 * The education argument: why AC servicing is no longer enough
 * ------------------------------------------------------------------ */

export const surfaceMyth = {
  eyebrow: "The comfortable assumption",
  headline: "Cleaning reaches what you can see. The problem lives underneath it.",
  intro:
    "Wiping a surface, changing a filter, repainting a wall — each removes the visible layer. But microbial contamination is a living, reproducing organism, and its structure survives well beneath the part you can see.",
  above: {
    label: "Above the surface — what cleaning reaches",
    title: "Visible growth & settled dust",
    body: "Removed by wiping, by AC filter changes and by standard cleaning. Genuinely useful — but only ever the portion you can actually see.",
    note: "Most cleaning and AC maintenance stops here.",
  },
  below: {
    label: "At a molecular level — what remains",
    items: [
      {
        title: "Embedded structures",
        body: "Microscopic spores lodge deep in plaster, grout, timber, insulation and fabric — untouched by any surface treatment.",
      },
      {
        title: "Airborne reservoir",
        body: "A living organism keeps releasing millions of spores back into the air long after the surface looks and smells clean.",
      },
      {
        title: "The recolonisation cycle",
        body: "Return the same moisture and warmth and growth simply resumes. The organism was never actually removed.",
      },
    ],
  },
  close:
    "Contamination does not need to be visible to be active. Removing it means working at a molecular level, continuously — not cleaning once.",
};

export const filterMyth = {
  eyebrow: "The filter in your AC",
  headline: "Your return filter is a dust screen. It was never an air purifier.",
  body: "Almost every air conditioning system across the Gulf runs a low-grade return filter — often little more than a washable mesh. It is specified to protect the coil and the fan from large debris, not to protect the people downstream of it. Everything that actually affects how you feel passes straight through.",
  /** Sized against a MERV 13A media filter, which does capture these. */
  passesThrough: [
    { name: "Mould spores", size: "1–30 μm" },
    { name: "Bacteria", size: "0.3–3 μm" },
    { name: "Virus carriers", size: "0.3–1 μm" },
    { name: "Fine smoke & PM2.5", size: "0.1–2.5 μm" },
    { name: "VOCs & formaldehyde", size: "gas phase" },
    { name: "Odour compounds", size: "gas phase" },
  ],
  caught: [{ name: "Hair, lint & coarse dust", size: "> 10 μm" }],
  close:
    "A gas-phase contaminant cannot be filtered by a mesh at all — it has to be broken down. That is a different category of technology, not a better filter.",
};

export const growthTimeline = {
  eyebrow: "The 24-hour reality",
  headline: "Given moisture and warmth, this is how fast it comes back.",
  intro:
    "Dubai's climate sits at 20–35°C for most of the year — squarely inside the range that favours fast-growing, warm-adapted species. Deep-clean a space on Monday and, without something actively working, the cycle has already restarted by Tuesday.",
  steps: [
    { time: "Minutes–hours", title: "Spores settle", body: "Airborne spores land on a surface with available moisture." },
    { time: "12–24 hours", title: "Germination", body: "Filaments establish. Nothing is visible yet — and nothing smells wrong." },
    { time: "24–48 hours", title: "Spore production begins", body: "The colony starts releasing new spores back into the air." },
    { time: "3–7 days", title: "Visible colonies", body: "By the time you can see it, the airborne reservoir is already well established." },
    { time: "1–3 weeks", title: "Mass production", body: "Heavy, sustained spore release throughout the occupied space." },
  ],
  close:
    "This is why a one-off intervention cannot hold. The only thing that changes the outcome is a system that runs continuously.",
};

export const factors = {
  eyebrow: "Not one root cause",
  headline: "It is a building systems problem, not a cleaning problem.",
  body: "Growth is rarely caused by any single failure. It emerges where moisture, organic material, temperature and time overlap — a combination of ambient humidity, ocean air, HVAC design, building age, outdoor spores carried in through doors and windows, and ordinary human activity. Chasing a single source is why the problem keeps returning.",
  groups: [
    {
      title: "Environmental conditions",
      items: ["High ambient humidity", "Moist coastal air", "Temperature fluctuation across zones"],
    },
    {
      title: "Building factors",
      items: ["HVAC design & maintenance", "Poor ventilation", "Leaks & condensation", "Building age"],
    },
    {
      title: "Pollutants",
      items: ["Outdoor spores via windows & doors", "Dust & organic debris", "Human activity & occupancy"],
    },
  ],
};

/**
 * The three stages shown in the airflow diagram.
 *
 * These captions are set as live text rather than baked into the artwork —
 * the supplied graphic had them burned in over a black panel, which never
 * sits cleanly on a page whose background moves as you scroll. Kept as HTML
 * they stay crisp at any size, are selectable and readable by screen
 * readers, and pick up the site's own typography.
 */
export const airflowSteps = [
  {
    n: "01",
    title: "Clean air enters",
    body: "Multi-layer filtration captures dust, pollutants and odours before the air reaches the cell.",
  },
  {
    n: "02",
    title: "ARC® technology activated",
    body: "UV-C light activates a proprietary catalyst, converting the moisture already in that air into hydroxyl radicals (•OH).",
  },
  {
    n: "03",
    title: "Contaminants neutralised",
    body: "Hydroxyl radicals break mould, bacteria, viruses, VOCs and odours down into harmless molecules.",
  },
];

/** The four-beat "how it works" narrative used on the landing page. */
export const howItWorks = [
  {
    n: "01",
    title: "Air and moisture enter the cell",
    body: "Ambient humidity and oxygen — already present in your space — are drawn across the ARC® catalytic cell.",
  },
  {
    n: "02",
    title: "UV energy activates the catalyst",
    body: "The reaction converts water vapour into advanced oxidation products, principally hydroxyls, at very low concentration.",
  },
  {
    n: "03",
    title: "Agents disperse with the airflow",
    body: "Because they travel as a vapour, they reach surfaces, ductwork and cavities that cleaning never touches.",
  },
  {
    n: "04",
    title: "Contaminants break down, continuously",
    body: "Organic contaminants are deactivated at a molecular level — and because the system never stops, the recolonisation cycle never restarts.",
  },
];

export const testingMethod = {
  eyebrow: "How we measure",
  headline: "We test in occupied buildings, not just sealed chambers.",
  body: "A sealed laboratory is a flattering place to test air technology. Once contamination is removed it stays near zero, because nothing new is introduced. Real buildings do not behave that way — people come and go, doors open, spores arrive continuously. So we do both, and we publish both.",
  comparison: {
    live: {
      title: "Live testing",
      subtitle: "Occupied, real-world",
      points: [
        "Continuous introduction of airborne spores and contaminants",
        "Open ventilation and ongoing human activity",
        "Room held at ideal growth conditions (24°C), deliberately re-contaminated",
        "The technology must keep reducing contamination against constant challenge",
      ],
    },
    lab: {
      title: "Controlled lab",
      subtitle: "Sealed chamber",
      points: [
        "Sealed, airtight environment",
        "No ongoing contamination once the test begins",
        "Once contamination is eliminated it remains at or near zero",
        "Valuable for isolating a single variable — but easy to make any technology look excellent",
      ],
    },
  },
  sampling: {
    title: "Air traps, not petri dishes",
    body: "Petri dishes are designed to force growth under laboratory conditions — they tell you what can grow, not what is in the air right now. We use APACOR AirTrap XL sampling analysed by Sporecyte's AI platform, which reflects the live environment.",
    specs: [
      { label: "Flow rate", value: "15 LPM" },
      { label: "Sample duration", value: "5 minutes" },
      { label: "Volume sampled", value: "75 litres" },
      { label: "Accuracy", value: "96%" },
      { label: "Petri dish accuracy", value: "50–70%" },
    ],
    detects:
      "Detects the full range of common IAQ target particles — mould, pollen, dander, construction dust, combustion particles and corrosion.",
  },
};

export const testingPartners = [
  { name: "Advanced IAQ Solutions", short: "IAQS", logo: "/assets/partners/iaqs.svg" },
  { name: "MRIGlobal", short: "MRIGlobal", logo: "/assets/partners/mriglobal.svg" },
  { name: "Microchem", short: "Microchem", logo: "/assets/partners/microchem.svg" },
  { name: "Rem Brands", short: "Rem Brands", logo: "/assets/partners/rembrands.svg" },
  { name: "ASHRAE", short: "ASHRAE", logo: "/assets/partners/ashrae.svg" },
];
