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
      "Every day, sunlight reacts with water vapour in the atmosphere to produce hydroxyls, the molecules that scrub the outdoor air clean. ARC® reproduces that reaction indoors, continuously.",
    points: [
      "Hydroxyls occur naturally. They deactivate airborne and surface contaminants at a molecular level rather than simply trapping them.",
      "ARC® is our proprietary form of Photocatalytic Oxidation (PCO): ultraviolet energy activates a catalytic cell, converting ambient humidity into oxidising hydroxyls.",
      "Because the agent is a vapour, it travels wherever the air travels: behind furniture, inside ductwork, into grout and soft furnishings. Not just the surfaces you can reach.",
    ],
  },
  {
    id: "bpi",
    name: "Bi-Polar Ionisation",
    subtitle: "Natural electrical charges",
    summary:
      "The same charge separation that leaves the air feeling clean after a storm, generated on demand inside your building.",
    points: [
      "Ionisation brushes create a plasma of positively and negatively charged ions that disperse through the occupied space.",
      "Ions cluster around airborne particles (mould spores, bacteria, viruses, pollen), increasing their mass so they drop out of the breathing zone.",
      "Enlarged particles are also far easier for filtration to capture, which is why the two stages are specified together: filtration on the way into the system, active treatment downstream of it.",
    ],
  },
] as const;

export const safety = {
  headline: "Safe by design, not by exception",
  body: "Our systems produce approximately 0.05 ppm of gaseous hydrogen peroxide, twenty times lower than OSHA's permissible exposure limit of 1.0 ppm. Like oxygen, gaseous hydrogen peroxide is already present in the air you breathe. Independent testing has repeatedly recorded ozone at 0 ppm, or below the levels measured outdoors, for the full duration of the test.",
  figures: [
    { value: "0.05", unit: "ppm", label: "H₂O₂ produced" },
    { value: "1.0", unit: "ppm", label: "OSHA permissible limit" },
    { value: "20×", unit: "", label: "Below the limit" },
  ],
  footnote: "Verified by Advanced IAQ Solutions (IAQS). Occupied-space safe, with no evacuation and no downtime.",
};

/* ------------------------------------------------------------------ *
 * The education argument: why AC servicing is no longer enough
 * ------------------------------------------------------------------ */

export const surfaceMyth = {
  eyebrow: "The comfortable assumption",
  headline: "Cleaning reaches what you can see. The problem lives underneath it.",
  intro:
    "Wiping a surface, cleaning a filter or cleaning an HVAC unit may remove visible contamination, but it does not necessarily address the source. Microorganisms, spores and biofilms can persist in porous materials, hidden surfaces and ventilation systems, and can return within days when the right conditions remain: moisture, high humidity and an available nutrient source.",
  above: {
    label: "Above the surface: what cleaning removes",
    title: "Visible dust, debris & surface contamination",
    body: "Removed by wiping, filter replacement and HVAC cleaning. Important and genuinely useful, but typically focused on what is accessible and visible at the time of cleaning.",
    note: "Cleaning is essential, but it is only one part of the solution.",
  },
  below: {
    label: "Beyond the surface: what can remain",
    items: [
      {
        title: "Hidden reservoirs",
        body: "Spores, particles and microbial contamination can persist in porous materials, insulation, coils, drain pans, ductwork and other hard-to-reach areas beyond the visible surface.",
      },
      {
        title: "Continuous reintroduction",
        body: "Even after cleaning, outdoor air, occupant activity, moisture and HVAC circulation can continuously reintroduce particulates, microbes and odour-causing compounds into the indoor environment.",
      },
      {
        title: "Rapid recurrence",
        body: "If moisture, humidity, warmth and nutrient sources remain, microbial growth can return quickly, sometimes within 24 to 48 hours in favourable conditions.",
      },
    ],
  },
  close:
    "Contamination does not have to be visible to persist. Cleaning is important, but in environments where moisture, humidity and airborne pollutants are continually present, maintaining healthier indoor air quality often requires a continuous solution, not a one-time intervention.",
};

export const filterMyth = {
  eyebrow: "The filter in your AC",
  headline: "Your return filter protects the FCU. It was never designed to purify the air.",
  body: "Almost every air conditioning system across the Gulf runs a low-grade return filter, often little more than a washable mesh. It is specified to protect the coil and the fan from large debris, not to protect the people downstream of it. Everything that actually affects how you feel passes straight through.",
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
    "A gas-phase contaminant cannot be filtered by a mesh at all. It has to be broken down. That is a different category of technology, not a better filter.",
};

export const growthTimeline = {
  eyebrow: "The 24-hour reality",
  headline: "Given moisture and warmth, this is how fast it comes back.",
  intro:
    "The Gulf climate sits at 20–35°C for most of the year, squarely inside the range that favours fast-growing, warm-adapted species. Deep-clean a space on Monday and, without something actively working, the cycle has already restarted by Tuesday.",
  steps: [
    { time: "Minutes–hours", title: "Spores settle", body: "Airborne spores land on a surface with available moisture." },
    { time: "12–24 hours", title: "Germination", body: "Filaments establish. Nothing is visible yet, and nothing smells wrong." },
    { time: "24–48 hours", title: "Spore production begins", body: "The colony starts releasing new spores back into the air." },
    { time: "3–7 days", title: "Visible colonies", body: "By the time you can see it, the airborne reservoir is already well established." },
    { time: "1–3 weeks", title: "Mass production", body: "Heavy, sustained spore release throughout the occupied space." },
  ],
  close:
    "This is why a one-off intervention cannot hold. The only thing that changes the outcome is a system that runs continuously.",
};

export const factors = {
  eyebrow: "Not one root cause",
  headline:
    "This isn't a surface-cleaning problem. It's an indoor environmental systems problem.",
  body: "Growth is rarely caused by any single failure. It emerges where moisture, organic material, temperature and time overlap: a combination of ambient humidity, ocean air, HVAC design, building age, outdoor spores carried in through doors and windows, and ordinary human activity. Chasing a single source is why the problem keeps returning.",
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
    body: "Moisture, oxygen and UV-C light react with our proprietary metallic catalyst, creating very stable hydroxyl radicals (•OH).",
  },
  {
    n: "03",
    title: "Contaminants neutralised",
    body: "Hydroxyl radicals react with airborne pollutants, helping break down VOCs and odours while inactivating bacteria, viruses and mould spores.",
  },
];

/** The four-beat "how it works" narrative used on the landing page. */
export const howItWorks = [
  {
    n: "01",
    title: "Air and moisture enter the cell",
    body: "Ambient humidity and oxygen, already present in your space, are drawn across the ARC® catalytic cell.",
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
    body: "Organic contaminants are deactivated at a molecular level, and because the system never stops, the recolonisation cycle never restarts.",
  },
];

export const testingMethod = {
  eyebrow: "How we measure",
  headline: "We test in occupied buildings, not just sealed chambers.",
  body: "A sealed laboratory is a flattering place to test air technology. Once contamination is removed it stays near zero, because nothing new is introduced. Real buildings do not behave that way: people come and go, doors open, spores arrive continuously. So we do both, and we say which is which.",
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
        "Valuable for isolating a single variable, but easy to make any technology look excellent",
      ],
    },
  },
  sampling: {
    title: "Air traps, not petri dishes",
    body: "Petri dishes are designed to force growth under laboratory conditions: they tell you what can grow, not what is in the air right now. We use APACOR AirTrap XL sampling analysed by Sporecyte's AI platform, which reflects the live environment.",
    specs: [
      { label: "Flow rate", value: "15 LPM" },
      { label: "Sample duration", value: "5 minutes" },
      { label: "Volume sampled", value: "75 litres" },
      { label: "Accuracy", value: "96%" },
      { label: "Petri dish accuracy", value: "50–70%" },
    ],
    detects:
      "Detects the full range of common IAQ target particles: mould, pollen, dander, construction dust, combustion particles and corrosion.",
  },
};

/**
 * Laboratories, standards bodies and sampling technology behind the published
 * results. Marks are normalised to white on transparency at a matched optical
 * weight, the same treatment as the client wall.
 *
 * All seven now have artwork. If one is ever replaced, re-run the whole set
 * through the normalisation rather than sizing it by hand — the weighting is
 * relative, so a single hand-sized file will sit wrong against the others.
 */
export const testingPartners = [
  { name: "MRIGlobal", short: "MRIGlobal", logo: "/assets/partners/mriglobal.png" },
  { name: "ASHRAE", short: "ASHRAE", logo: "/assets/partners/ashrae.png" },
  { name: "Sporecyte", short: "Sporecyte", logo: "/assets/partners/sporecyte.png" },
  { name: "APACOR", short: "APACOR", logo: "/assets/partners/apacor.png" },
  { name: "Advanced IAQ Solutions", short: "IAQS", logo: "/assets/partners/iaqs.png" },
  { name: "Microchem", short: "Microchem", logo: "/assets/partners/microchem.png" },
  { name: "Rem Brands", short: "Rem Brands", logo: "/assets/partners/rembrands.png" },
];
