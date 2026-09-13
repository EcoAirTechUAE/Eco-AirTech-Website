/**
 * Filtration — the passive half of the system.
 *
 * Deliberately kept separate from the devices. The active technology breaks
 * contaminants down; the filter captures what is left. Specifying one without
 * the other is the single most common mistake we see in Gulf buildings.
 */

export const filterIntro = {
  eyebrow: "The passive half",
  headline: "The world's smartest filter",
  subhead: "Two filters in one — capturing particulates and gas-phase contaminants together.",
  body: "Most filters do one job: they hold particles. Ours holds particles and destroys the gas-phase compounds a mesh could never catch — odours, VOCs and formaldehyde — at a molecular level, in the media itself.",
};

export const nanofiber = {
  title: "Nanofiber technology",
  claim: "A true mechanical MERV rating, for the whole life of the filter.",
  body: "Most high-efficiency filters cheat. They rely on a temporary electrostatic charge to lift their rating on day one — a charge that dissipates as the filter loads, taking the performance with it. Our media spins fibres 411 times thinner than a human hair into a nonwoven substrate, achieving the rating mechanically. It performs the same in month six as it did on the day it was fitted.",
  points: [
    "Fibres spun 411× thinner than a human hair",
    "No artificially inflated efficiency from temporary static charge",
    "True mechanical MERV rating sustained throughout the filter's lifespan",
    "Pressure drop equivalent to a MERV 8 — hospital-grade filtration your fan can still breathe through",
    "Sealed frame with no bypass, so air cannot slip around the media",
    "Built with 50% less synthetic material than comparable filters, and recyclable",
  ],
};

/** The NAFA award — an independent industry credential, worth stating plainly. */
export const award = {
  name: "Raw Material Achievement Award",
  org: "National Air Filtration Association",
  body: "An independent industry award, given for the filter media itself rather than for anything written about it.",
};

/**
 * How ODOGard® actually deals with a gas-phase contaminant.
 *
 * Set as live text rather than lifting the manufacturer's slide: those panels
 * are white-background artwork with the captions burnt in, which would sit
 * badly on this site and could not be read by a screen reader.
 */
export const odogardProcess = {
  eyebrow: "Three stages",
  headline: "Capture, bond, destroy.",
  body: "A carbon filter holds an odour molecule until it is full, then releases it. ODOGard® does something different: it changes the molecule permanently, so nothing is stored and nothing comes back.",
  steps: [
    {
      n: "01",
      title: "Capture",
      body: "Odours and VOCs are trapped in the ODOGard®-coated nanofibre media as air passes through it.",
    },
    {
      n: "02",
      title: "Bond",
      body: "The coating forms a permanent chemical bond with the VOC and odour molecules it has caught.",
    },
    {
      n: "03",
      title: "Destroy",
      body: "Their molecular structure is altered for good, leaving inert compounds. The odour is gone rather than stored.",
    },
  ],
  properties: [
    "Patented and proprietary coating",
    "Proven in indoor grow facilities — among the most extreme odour environments there are",
    "100% non-toxic",
    "100% biodegradable",
  ],
};

/** Head-to-head against the incumbent technology. */
export const vsCarbon = {
  eyebrow: "Against carbon",
  headline: "The filter most buildings already use, beaten on its own ground.",
  body: "Activated carbon is the default answer to odour and VOCs. It adsorbs — it holds molecules on a surface until that surface is saturated, and in humid Gulf air a good share of that capacity is spent on water vapour rather than on what you wanted removed.",
  stats: [
    { value: "140%", label: "Greater VOC reduction", context: "versus carbon filters" },
    { value: "99%", label: "Greater odour reduction", context: "versus carbon filters" },
    { value: "50%", label: "Less synthetic material", context: "than comparable filters" },
  ],
};

/** What the media actually removes — the plain-language list. */
export const reduces = {
  nanofiber: ["Bacteria", "Dust", "Dust mites", "Pollen", "Mould"],
  odogard: ["VOCs", "Food odours", "Pet odours", "Terpenes"],
};

/** Why specifying this filter is not a trade-off against the HVAC system. */
export const hvacBenefits = [
  { title: "Increased airflow", body: "A lower resistance across the media means the system moves more air for the same effort." },
  { title: "Easier on the plant", body: "Less strain on fans and motors, which is where filtration usually costs a building money." },
  { title: "Saves energy", body: "The fan is not fighting the filter, so the same cooling is delivered for less power." },
  { title: "High-capacity design", body: "More media surface area, so the filter holds more before it needs changing." },
];

/** Two grades, for very different buildings. */
export const series = [
  {
    name: "Series 990",
    forWhat: "Occupied spaces",
    uses: ["Offices", "Residential", "Education", "Hospitality", "Long-term care"],
  },
  {
    name: "Series 3500",
    forWhat: "Heavy odour loads",
    uses: ["Food processing", "Animal facilities"],
  },
];

export const odogard = {
  title: "ODOGard®",
  claim: "Gas-phase contaminants cannot be filtered. They have to be broken down.",
  body: "ODOGard® is embedded into the nanofibre itself during manufacture — infused through the core structure of the media rather than sprayed onto its surface. It neutralises odour compounds and volatile organic compounds at a molecular level instead of adsorbing them, and unlike carbon it does not take up moisture doing it. That last point matters in the Gulf: a carbon filter in humid air spends its capacity on water vapour.",
  treats: ["Pet odours", "Cooking odours", "Smoke odours", "Terpenes", "VOCs"],
};

/**
 * ASHRAE 52.2 test data, transcribed from the manufacturer's published
 * results (greentechenv.com/filters-101-24).
 *
 * The composite averages below are the standard's own E1/E2/E3 bands, and
 * they are what actually determine the MERV rating — worth showing, because
 * they are the part a specifier checks.
 */
export const ashrae = {
  eyebrow: "Independent test data",
  headline: "ASHRAE 52.2, measured band by band",
  body: "A MERV number is a single label for twelve separate measurements. This is the full curve behind ours — how much of each particle size the media actually captures on first pass.",
  conditions: [
    { label: "Standard", value: "ASHRAE 52.2" },
    { label: "Test aerosol", value: "KCl, neutralised" },
    { label: "Face velocity", value: "492 FPM" },
    { label: "Flow rate", value: "1,968 CFM" },
  ],
  /** Initial fractional efficiency, % captured per size band. */
  rows: [
    { range: "0.30 – 0.40", merv11: "19.0%", merv13: "36.8%" },
    { range: "0.40 – 0.55", merv11: "26.7%", merv13: "49.6%" },
    { range: "0.55 – 0.70", merv11: "34.9%", merv13: "60.8%" },
    { range: "0.70 – 1.00", merv11: "44.3%", merv13: "72.0%" },
    { range: "1.00 – 1.30", merv11: "55.3%", merv13: "80.2%" },
    { range: "1.30 – 1.60", merv11: "61.9%", merv13: "83.9%" },
    { range: "1.60 – 2.20", merv11: "68.0%", merv13: "86.5%" },
    { range: "2.20 – 3.00", merv11: "76.3%", merv13: "89.3%" },
    { range: "3.00 – 4.00", merv11: "82.3%", merv13: "91.3%" },
    { range: "4.00 – 5.00", merv11: "86.3%", merv13: "92.6%" },
    { range: "5.50 – 7.00", merv11: "88.2%", merv13: "93.9%" },
    { range: "7.00 – 10.00", merv11: "90.0%", merv13: "95.3%" },
  ],
  /** The three composite bands the MERV rating is actually derived from. */
  composites: [
    { band: "E1", range: "0.3 – 1.0 μm", merv11: "31.2%", merv13: "54.8%" },
    { band: "E2", range: "1.0 – 3.0 μm", merv11: "65.4%", merv13: "85.0%" },
    { band: "E3", range: "3.0 – 10.0 μm", merv11: "86.7%", merv13: "93.3%" },
  ],
  note: "E1 is the band that matters most and the one cheap filters fail. It covers bacteria, virus carriers and fine smoke — and a MERV 13A captures more than half of it on a single pass.",
};

/**
 * Pressure drop, in inches of water column. The argument for these filters in
 * the Gulf is that hospital-grade filtration does not have to cost you airflow.
 */
export const pressureDrop = {
  headline: "Filtration your system can actually breathe through",
  body: "Restrict the airflow and you trade clean air for a struggling fan, higher energy use and earlier failure. These are the published pressure drops across the operating range.",
  unit: "in w.c.",
  sizes: [
    {
      depth: '1"',
      rows: [
        { cfm: "295", fpm: "74", merv11: "0.05", merv13: "0.05" },
        { cfm: "590", fpm: "148", merv11: "0.10", merv13: "0.12" },
        { cfm: "885", fpm: "221", merv11: "0.16", merv13: "0.20" },
        { cfm: "1,180", fpm: "295", merv11: "0.23", merv13: "0.30" },
        { cfm: "1,475", fpm: "369", merv11: "0.31", merv13: "0.39" },
      ],
    },
    {
      depth: '2"',
      rows: [
        { cfm: "492", fpm: "123", merv11: "0.03", merv13: "0.06" },
        { cfm: "984", fpm: "246", merv11: "0.09", merv13: "0.15" },
        { cfm: "1,476", fpm: "369", merv11: "0.16", merv13: "0.25" },
        { cfm: "1,968", fpm: "492", merv11: "0.25", merv13: "0.38" },
        { cfm: "2,460", fpm: "615", merv11: "0.34", merv13: "0.52" },
      ],
    },
    {
      depth: '4"',
      rows: [
        { cfm: "492", fpm: "123", merv11: "0.05", merv13: "0.03" },
        { cfm: "984", fpm: "246", merv11: "0.10", merv13: "0.12" },
        { cfm: "1,476", fpm: "369", merv11: "0.18", merv13: "0.21" },
        { cfm: "1,968", fpm: "492", merv11: "0.28", merv13: "0.33" },
        { cfm: "2,460", fpm: "615", merv11: "0.40", merv13: "0.48" },
      ],
    },
  ],
  note: "Available in 1\", 2\" and 4\" depths. Figures are manufacturer-published test results.",
};

/** What the "A" actually means — a distinction most buyers have never had explained. */
export const aRating = {
  title: 'Why the rating carries an "A"',
  body: "Most high-efficiency filters earn their number using a temporary electrostatic charge that fades as the media loads — so the filter you fit is not the filter you are running three months later. The A designation certifies the rating is delivered mechanically, by the fibre structure itself, and is still being delivered at the end of the filter's life. Our nanofibre media behaves like an electrostatic filter without depending on a charge, which is also why it holds up in humid air.",
};

export const filterFeatures = [
  {
    title: "Captures ultra-fine particles",
    body: "Down to 0.3 microns — including smoke, bacteria and virus carriers that pass straight through a standard return filter.",
  },
  {
    title: "Eliminates odours & VOCs",
    body: "ODOGard® technology addresses gas-phase contaminants at a molecular level, not by holding them in the media.",
  },
  {
    title: "Protects your HVAC system",
    body: "Hospital-grade filtration achieved without the pressure drop that causes breakdowns and inflated maintenance bills.",
  },
  {
    title: "Recyclable",
    body: "The media is recyclable at end of life, so improving air quality does not simply move the problem elsewhere.",
  },
];

/** MERV comparison — the argument for 13A in one table. */
export const efficacyMatrix = {
  columns: ["MERV 8A", "MERV 11A", "MERV 13A"],
  groups: [
    {
      band: "Coarse particles",
      range: "10.0 – 3.0 μm",
      rows: [
        { name: "Pollen", caught: [true, true, true] },
        { name: "Dust & mites", caught: [true, true, true] },
        { name: "Pet dander", caught: [true, true, true] },
      ],
    },
    {
      band: "Fine particles",
      range: "3.0 – 1.0 μm",
      rows: [
        { name: "Odours", caught: [true, true, true] },
        { name: "VOCs", caught: [true, true, true] },
        { name: "Smoke", caught: [false, true, true] },
        { name: "Mould", caught: [false, true, true] },
      ],
    },
    {
      band: "Ultrafine particles",
      range: "1.0 – 0.3 μm",
      rows: [
        { name: "Bacteria", caught: [false, false, true] },
        { name: "Virus carriers", caught: [false, false, true] },
      ],
    },
  ],
  footnote:
    "Most Gulf air conditioning systems run a washable mesh return filter, which sits below MERV 8 — it does not appear on this table at all.",
};

/**
 * Filter against filter, on capability.
 *
 * This replaced an active-only vs active-plus-filter table that compared two
 * separate studies side by side. Reported at different precision, it showed
 * airborne mould at >99.99% without the filter and >99.94% with it — which
 * reads as the filter making things worse. It was arguing against the product.
 *
 * The honest differentiator is not that this beats every filter at everything
 * — a true HEPA captures more fine particulate, and that is stated below. It
 * is that everything else forces a trade-off: efficiency against airflow, or
 * particulate against gas phase. This is the only column without a gap.
 */
export const filterComparison = {
  eyebrow: "Against the alternatives",
  headline: "Every other filter makes you choose.",
  body: "Filtration normally forces a trade. Raise the efficiency and you lose airflow. Add carbon for odours and you get nothing for fine particulate — and in humid Gulf air it spends much of its capacity on water vapour. The point of this media is that it does not ask you to pick.",
  columns: ["Standard MERV 8", "True HEPA", "Activated carbon", "Filters+ MERV 13A"],
  rows: [
    {
      capability: "Coarse dust, pollen, dander",
      values: [true, true, false, true] as const,
    },
    {
      capability: "Ultrafine particulate (0.3–1 μm)",
      values: [false, true, false, true] as const,
    },
    {
      capability: "Gas-phase VOCs and formaldehyde",
      values: [false, false, true, true] as const,
    },
    {
      capability: "Destroys odours rather than storing them",
      values: [false, false, "partial", true] as const,
    },
    {
      capability: "Rating holds as the filter loads",
      values: [true, true, false, true] as const,
    },
    {
      capability: "Low pressure drop — no airflow penalty",
      values: [true, false, false, true] as const,
    },
    {
      capability: "Unaffected by humidity",
      values: [true, true, false, true] as const,
    },
    {
      capability: "Retrofits existing ductwork",
      values: [true, false, "partial", true] as const,
    },
  ],
  note: "A true HEPA captures more fine particulate than any MERV-rated media, and we would never claim otherwise. What it cannot do is fit most existing air handling systems without a substantial pressure-drop penalty, and it does nothing at all for gas-phase contamination. Filters+ delivers a true mechanical MERV 13A at the pressure drop of a MERV 8, and treats the gas phase in the same pass.",
};

