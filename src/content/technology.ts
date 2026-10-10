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
      "Sunlight and water vapour produce hydroxyls, the molecules that clean the outdoor air. ARC® reproduces that reaction indoors, continuously.",
    points: [
      "Breaks contaminants down at a molecular level rather than trapping them.",
      "Travels wherever the air travels: behind furniture, inside ductwork, into soft furnishings.",
    ],
  },
  {
    id: "bpi",
    name: "Bi-Polar Ionisation",
    subtitle: "Natural electrical charges",
    summary:
      "The charge that leaves the air feeling clean after a storm, generated inside your building.",
    points: [
      "Ions cluster around spores, bacteria, viruses and pollen so they drop out of the breathing zone.",
      "The enlarged particles are far easier for filtration to capture.",
    ],
  },
] as const;

export const safety = {
  headline: "Safe by design, not by exception",
  body: "Our systems produce around 0.05 ppm of gaseous hydrogen peroxide, twenty times below OSHA's permissible limit. Independent testing has repeatedly recorded ozone at 0 ppm, or below outdoor levels.",
  figures: [
    { value: "0.05", unit: "ppm", label: "H₂O₂ produced" },
    { value: "1.0", unit: "ppm", label: "OSHA permissible limit" },
    { value: "20×", unit: "", label: "Below the limit" },
  ],
  footnote: "Verified by Advanced IAQ Solutions (IAQS). No evacuation, no downtime.",
};

/* ------------------------------------------------------------------ *
 * The education argument: why AC servicing is no longer enough
 * ------------------------------------------------------------------ */

export const surfaceMyth = {
  eyebrow: "Why cleaning is not enough",
  headline: "Cleaning removes contamination. It doesn't stop it coming back.",
  intro:
    "Cleaning, filter changes and AC servicing all help, but they are periodic. Between visits, the conditions that let contamination return are still there.",
  items: [
    {
      title: "Hidden reservoirs",
      body: "Spores and microbes persist in coils, drain pans, ductwork and porous materials that cleaning never reaches.",
    },
    {
      title: "Continuous reintroduction",
      body: "Outdoor air, people and the AC itself bring particles, microbes and odours straight back in.",
    },
    {
      title: "Rapid recurrence",
      body: "With Gulf warmth and humidity, growth can re-establish within 24 to 48 hours.",
    },
  ],
};

export const filterMyth = {
  eyebrow: "The filter in your AC",
  headline: "Your return filter protects the FCU. It was never designed to purify the air.",
  body: "Most Gulf AC systems run a low-grade return filter, often a washable mesh. It protects the coil and fan from large debris. Everything that affects how you feel passes straight through.",
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
    "Gases cannot be filtered by a mesh at all. They have to be broken down.",
};

export const growthTimeline = {
  eyebrow: "The 24-hour reality",
  headline: "Given moisture and warmth, this is how fast it comes back.",
  intro:
    "The Gulf sits at 20–35°C for most of the year, ideal for fast-growing species. Deep-clean on Monday and the cycle has restarted by Tuesday.",
  steps: [
    { time: "Minutes–hours", title: "Spores settle", body: "Airborne spores land on a surface with available moisture." },
    { time: "12–24 hours", title: "Germination", body: "Filaments establish. Nothing is visible yet, and nothing smells wrong." },
    { time: "24–48 hours", title: "Spore production begins", body: "The colony starts releasing new spores back into the air." },
    { time: "3–7 days", title: "Visible colonies", body: "By the time you can see it, the airborne reservoir is already well established." },
    { time: "1–3 weeks", title: "Mass production", body: "Heavy, sustained spore release throughout the occupied space." },
  ],
  close:
    "The only thing that changes the outcome is a system that runs continuously.",
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
    body: "Filtration captures dust, pollutants and odours before the air reaches the cell.",
  },
  {
    n: "02",
    title: "ARC® technology activated",
    body: "Moisture, oxygen and UV-C light react with our catalyst to create hydroxyl radicals.",
  },
  {
    n: "03",
    title: "Contaminants neutralised",
    body: "Hydroxyls travel with the air, breaking down VOCs and odours and inactivating bacteria, viruses and mould.",
  },
];

export const testingMethod = {
  eyebrow: "How we measure",
  headline: "We test in occupied buildings, not just sealed chambers.",
  body: "A sealed laboratory flatters any air technology: once contamination is removed, nothing new arrives. Real buildings are constantly re-contaminated. So we test in both, and say which is which.",
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
