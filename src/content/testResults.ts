/**
 * Every published lab and live-test result, with its provenance attached.
 *
 * Rule: no figure appears anywhere on this site without the conditions that
 * produced it — product, technologies fitted, duration, space and who ran it.
 * A percentage without its protocol is marketing; with it, it is evidence.
 *
 * Source: Eco AirTech credentials deck.
 */

export type Medium = "Airborne" | "Surface" | "Surface (fan/coil)" | "Air & surface";

export interface Metric {
  name: string;
  medium: Medium;
  reduction: string;
}

export interface SpeciesRow {
  species: string;
  before: number;
  after: number;
  /** Flags the headline organism in a study. */
  emphasis?: boolean;
}

export interface Study {
  id: string;
  device: string; // device slug
  kind: "live" | "lab" | "field";
  title: string;
  setting: string;
  headline: string;
  summary: string;
  meta: {
    product: string;
    technologies: string;
    duration: string;
    space: string;
    administrator: string;
  };
  metrics?: Metric[];
  species?: { unit: string; rows: SpeciesRow[] };
  quote?: { text: string; author: string; role: string };
  notes?: string[];
}

export const studies: Study[] = [
  /* ------------------------------- 750+ ------------------------------- */
  {
    id: "750-live-apartment",
    device: "750-plus",
    kind: "live",
    title: "Occupied apartment block",
    setting: "Government housing · heavy existing contamination",
    headline: "96.4% reduction of Stachybotrys",
    summary:
      "A 72-hour trial in a genuinely contaminated, occupied apartment block — not a chamber. Spore concentrations fell sharply across every classification present, including Stachybotrys, the species associated with significant water damage.",
    meta: {
      product: "750+ Wall Mount (no filter)",
      technologies: "PCO / O₃ / ODOGard®",
      duration: "72 hours",
      space: "Apartment block corridor & rooms",
      administrator: "Live field trial",
    },
    species: {
      unit: "Spores per m³",
      rows: [
        { species: "Stachybotrys", before: 34013, after: 1867, emphasis: true },
        { species: "Aspergillus / Penicillium", before: 7107, after: 6400 },
        { species: "Chaetomium", before: 1307, after: 264 },
      ],
    },
    notes: [
      "Contamination was deliberately maintained throughout the trial rather than isolated.",
    ],
  },
  {
    id: "750-live-house",
    device: "750-plus",
    kind: "live",
    title: "Occupied house",
    setting: "Government housing · bathroom & ground floor",
    headline: "95.9% overall reduction",
    summary:
      "A second 72-hour live trial in an occupied property, again under continuous real-world contamination. Cladosporium — the most abundant airborne genus in most buildings — fell by more than 98%.",
    meta: {
      product: "750+ Wall Mount (no filter)",
      technologies: "PCO / O₃ / ODOGard®",
      duration: "72 hours",
      space: "Residential house",
      administrator: "Live field trial",
    },
    species: {
      unit: "Spores per m³",
      rows: [
        { species: "Aspergillus / Penicillium", before: 66653, after: 18800, emphasis: true },
        { species: "Cladosporium", before: 16213, after: 307 },
        { species: "Alternaria-like", before: 0, after: 0 },
      ],
    },
  },
  {
    id: "750-lab-ms2",
    device: "750-plus",
    kind: "lab",
    title: "Aerosol deactivation of MS2",
    setting: "Sealed chamber · FDA Good Laboratory Practices",
    headline: "98.21% bioaerosol reduction of MS2",
    summary:
      "MS2 is an established surrogate for influenza and SARS-CoV-2. The unit reduced the aerosolised virus by an average net log of 1.86 ± 0.38 within four hours, demonstrating capability against airborne bio-aerosols rather than surfaces alone.",
    meta: {
      product: "750+ Wall Mount (no filter)",
      technologies: "PCO / O₃ / ODOGard®",
      duration: "4 hours",
      space: "9.1′ × 9.1′ × 7.0′ sealed chamber (759 ft³)",
      administrator: "Aerosol Research & Engineering Laboratories",
    },
    notes: ["Conducted in compliance with FDA Good Laboratory Practices (GLP)."],
  },
  {
    id: "750-field-office",
    device: "750-plus",
    kind: "field",
    title: "Commercial office",
    setting: "1,240 sq ft occupied workplace",
    headline: "97% reduction of surface mould and bacteria",
    summary:
      "Measured in real time over five days across a working office, covering airborne and surface contamination as well as gas-phase pollutants.",
    meta: {
      product: "750+ Wall Mount (no filter)",
      technologies: "PCO / BPI / ODOGard®",
      duration: "5 days, measured in real time",
      space: "1,240 sq ft commercial space",
      administrator: "Advanced IAQ Solutions (IAQS)",
    },
    metrics: [
      { name: "Mould spores", medium: "Surface", reduction: "97.00%" },
      { name: "Mould spores", medium: "Airborne", reduction: "93.00%" },
      { name: "Bacteria counts", medium: "Surface", reduction: "97.50%" },
      { name: "TVOC", medium: "Airborne", reduction: "92.00%" },
      { name: "HCHO (formaldehyde)", medium: "Airborne", reduction: "94.00%" },
    ],
    quote: {
      text: "It is my considered observation that the 750+ Wall Mount does provide a significant reduction of the typical air and surface contaminants tested. ASHRAE provides guidance as to the use of supplemental air purification after increasing fresh air ventilation to a minimum of 6 air changes per hour and filtration to MERV 13. This study was performed without those improvements. It is my considered opinion that if this unit was used within the current ASHRAE guidelines an even greater efficacy could be expected.",
      author: "Keith Roe",
      role: "Advanced IAQ Solutions",
    },
    notes: ["Ozone levels were 0 ppm throughout the duration of the test."],
  },
  {
    id: "750-field-education",
    device: "750-plus",
    kind: "field",
    title: "Educational facility",
    setting: "Cleaning products storage room",
    headline: "95.0% reduction of TVOC",
    summary:
      "A deliberately hostile gas-phase environment — a sealed store of cleaning chemicals inside a school. Both TVOC and formaldehyde fell substantially over five days of real-time measurement.",
    meta: {
      product: "750+ Wall Mount (no filter)",
      technologies: "PCO / O₃",
      duration: "5 days, measured in real time",
      space: "3,500 ft³ storage room",
      administrator: "Advanced IAQ Solutions (IAQS)",
    },
    quote: {
      text: "There was a significant reduction of TVOC and HCHO from the initial readings which would not have been expected to occur without the introduction of this combined technology.",
      author: "Keith Roe",
      role: "Advanced IAQ Solutions",
    },
    notes: [
      "Ozone levels remained below TLV guidance and below the levels measured outdoors for the full test.",
    ],
  },
  {
    id: "750-field-schoolbus",
    device: "750-plus",
    kind: "field",
    title: "School bus",
    setting: "220 sq ft enclosed transit cabin",
    headline: ">95% reduction in odour intensity",
    summary:
      "A small, heavily occupied, poorly ventilated cabin — one of the hardest environments to hold. Ozone remained below detectable levels throughout.",
    meta: {
      product: "750+ Wall Mount",
      technologies: "PCO / O₃ / ODOGard®",
      duration: "5 days, measured in real time",
      space: "220 sq ft school bus",
      administrator: "Advanced IAQ Solutions (IAQS)",
    },
    metrics: [
      { name: "Odour intensity", medium: "Airborne", reduction: ">95.00%" },
      { name: "Ozone levels", medium: "Airborne", reduction: "Below detectable" },
    ],
    quote: {
      text: "It is my observation and considered opinion that the technology had a significant effect on stabilizing the indoor air environment as well as definitively reducing airborne contaminants as defined by the readings. No single technology alone would produce those results.",
      author: "Keith Roe",
      role: "Advanced IAQ Solutions",
    },
  },
  {
    id: "750-field-ambulance",
    device: "750-plus",
    kind: "field",
    title: "Active ambulance fleet",
    setting: "Four-week hospital study against a control vehicle",
    headline: "89% fewer total pathogens than the control",
    summary:
      "A hospital ran a four-week real-world study across active ambulances. Enclosed, high-turnover and time-pressured, they are among the hardest environments to keep clean — and among the highest-consequence.",
    meta: {
      product: "750+ Wall Mount (Transit)",
      technologies: "PCO / O₃ / ODOGard®",
      duration: "4 weeks, weekly sampling",
      space: "Ambulance interior",
      administrator: "Pace Labs (CLIA & GLP compliant)",
    },
    notes: [
      "EMS personnel carry the highest occupational risk of acquiring infectious disease of any profession, and often cannot complete infection-control protocols between patients.",
    ],
  },

  /* ------------------------------- HVAC ------------------------------- */
  {
    id: "hvac-field-office-active",
    device: "hvac",
    kind: "field",
    title: "Commercial office — active solution",
    setting: "Occupied workplace, no filter fitted",
    headline: ">99.99% reduction of airborne mould spores",
    summary:
      "The in-duct unit running as an active solution alone, with no filtration assistance — isolating what the technology itself contributes.",
    meta: {
      product: "HVAC (active solution only — no filter)",
      technologies: "PCO / BPI",
      duration: "5 days, real-time measurement",
      space: "Commercial office space",
      administrator: "Advanced IAQ Solutions (IAQS)",
    },
    metrics: [
      { name: "Mould spores", medium: "Airborne", reduction: ">99.99%" },
      { name: "HCHO (formaldehyde)", medium: "Airborne", reduction: ">99.90%" },
      { name: "TVOC", medium: "Airborne", reduction: ">99.00%" },
      { name: "Bacteria counts", medium: "Airborne", reduction: ">95.00%" },
      { name: "Bacteria counts", medium: "Surface", reduction: "90.00%" },
    ],
    quote: {
      text: "It is my considered observation that pureAir HVAC does provide a rapid and significant reduction of the typical contaminants tested. The levels achieved and maintained during this test were far below any known standard or established TLV. It is my considered opinion that this sustained condition would not be typical or possible without the continuous use of this product.",
      author: "Keith Roe",
      role: "Advanced IAQ Solutions",
    },
    notes: [
      "Ozone levels remained below TLV guidance and below the levels measured outdoors.",
    ],
  },
  {
    id: "hvac-field-office-paired",
    device: "hvac",
    kind: "field",
    title: "Commercial office — active + passive",
    setting: "1,240 sq ft, HVAC unit paired with a treated filter",
    headline: ">99% reduction of airborne mould, bacteria, TVOC and odours",
    summary:
      "The same environment with an ODOGard®-coated MERV 13 filter added. This is the configuration we specify by default, and the difference it makes is the clearest argument for treating active and passive technology as one system.",
    meta: {
      product: "HVAC + treated filter (active + passive)",
      technologies: "PCO / BPI / ODOGard® MERV 13",
      duration: "5 days, real-time measurement",
      space: "1,240 sq ft room",
      administrator: "Advanced IAQ Solutions (IAQS)",
    },
    metrics: [
      { name: "Bacteria counts", medium: "Airborne", reduction: ">99.99%" },
      { name: "TVOC", medium: "Airborne", reduction: ">99.99%" },
      { name: "HCHO (formaldehyde)", medium: "Airborne", reduction: ">99.99%" },
      { name: "Odour intensity", medium: "Airborne", reduction: ">99.99%" },
      { name: "Mould spores", medium: "Airborne", reduction: ">99.94%" },
    ],
    quote: {
      text: "It is my considered observation that HVAC in combination with an ODOGard coated filter does provide a rapid and significant reduction of the typical air and surface contaminants tested. In my considered opinion, the sustained condition would not be achievable without the continual use of the technology represented.",
      author: "Keith Roe",
      role: "Advanced IAQ Solutions",
    },
    notes: ["Ozone levels were 0 ppm throughout the duration of the test."],
  },
  {
    id: "hvac-lab-sars",
    device: "hvac",
    kind: "lab",
    title: "Surface inactivation of SARS-CoV-2",
    setting: "Controlled chamber · stainless steel coupons",
    headline: "86.98% inactivation of SARS-CoV-2 on surfaces",
    summary:
      "Test samples showed 0.89 log lower infectivity of SARS-CoV-2 compared with control samples after four hours of exposure.",
    meta: {
      product: "HVAC (active solution only)",
      technologies: "PCO / BPI",
      duration: "4 hours",
      space: "9 × 9 × 9 ft test chamber",
      administrator: "MRIGlobal",
    },
  },
  {
    id: "hvac-lab-mrsa",
    device: "hvac",
    kind: "lab",
    title: "Surface inactivation of MRSA",
    setting: "Controlled chamber · glass coupons",
    headline: ">99.99% inactivation of MRSA on surfaces",
    summary:
      "Test samples showed greater than 4.75 log lower infectivity of MRSA compared with control samples after six hours. The test also demonstrated that the technology did not raise chamber concentrations of H₂O₂ or O₃.",
    meta: {
      product: "HVAC (active solution only)",
      technologies: "PCO / 20% O₃",
      duration: "6 hours",
      space: "Controlled test chamber",
      administrator: "Microchem",
    },
    metrics: [
      { name: "MRSA — PCO / 20% O₃", medium: "Surface", reduction: ">99.99%" },
      { name: "MRSA — 50% O₃", medium: "Surface", reduction: ">99.95%" },
      { name: "MRSA — PCO / BPI / 20% O₃", medium: "Surface", reduction: "93.93%" },
    ],
    notes: [
      "All four configurations run for 6 hours in a controlled chamber at Microchem, with no filter fitted.",
      "Each configuration was run for the same duration under the same chamber conditions.",
    ],
  },

  /* ------------------------------- PTAC ------------------------------- */
  {
    id: "ptac-field-dorm",
    device: "ptac",
    kind: "field",
    title: "Student residence",
    setting: "220 sq ft dormitory rooms",
    headline: ">99.99% reduction of mould on fan and coil surfaces",
    summary:
      "The most direct evidence we have that the inside of an air conditioning unit is itself a contamination source. Viable mould on the fan housing and coil surfaces was removed completely — whether the unit ran continuously or only on temperature demand.",
    meta: {
      product: "PTAC (active solution only — no filter)",
      technologies: "PCO",
      duration: "5 days, measured in real time",
      space: "220 sq ft dorm rooms",
      administrator: "Advanced IAQ Solutions (IAQS)",
    },
    metrics: [
      { name: "Mould spores", medium: "Surface (fan/coil)", reduction: ">99.99%" },
      { name: "TVOC", medium: "Airborne", reduction: ">90.00%" },
      { name: "HCHO (formaldehyde)", medium: "Airborne", reduction: ">90.00%" },
    ],
    quote: {
      text: "The use of the PTAC unit completely removed the viable mold spores found on the fan housing and coil surfaces of the AC units. These results were the same whether the unit was operated continuously or as to temperature demand. It would be my considered opinion that PTAC would serve as an effective deterrent to mold growth on and in an AC unit, and would also be expected to produce a sustained and improved overall indoor air quality within the serviced areas.",
      author: "Keith Roe",
      role: "Advanced IAQ Solutions",
    },
  },
];

export const studiesFor = (deviceSlug: string) => studies.filter((s) => s.device === deviceSlug);

/** Headline figures for the landing page proof band. */
export const headlineResults = [
  {
    value: "96.4",
    suffix: "%",
    label: "Stachybotrys reduction",
    context: "72 hours, occupied building",
    studyId: "750-live-apartment",
  },
  {
    value: "99.99",
    prefix: ">",
    suffix: "%",
    label: "Airborne mould spores",
    context: "5 days, commercial office",
    studyId: "hvac-field-office-active",
  },
  {
    value: "98.2",
    suffix: "%",
    label: "MS2 bioaerosol",
    context: "4 hours, FDA GLP chamber",
    studyId: "750-lab-ms2",
  },
  {
    value: "89",
    suffix: "%",
    label: "Fewer pathogens vs control",
    context: "4 weeks, active ambulances",
    studyId: "750-field-ambulance",
  },
];
