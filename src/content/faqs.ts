export interface Faq {
  q: string;
  a: string;
}

export interface FaqGroup {
  category: string;
  items: Faq[];
}

export const faqGroups: FaqGroup[] = [
  {
    category: "The technology",
    items: [
      {
        q: "How does it actually work?",
        a: "Ultraviolet energy activates a catalytic cell — our ARC® technology — which converts ambient humidity and oxygen already in your air into advanced oxidation products, principally hydroxyls. Hydroxyls are what sunlight produces in the outdoor atmosphere to break down contamination naturally. Because they travel as a vapour with the airflow, they reach surfaces, ductwork and cavities rather than only treating air that happens to pass through a box. Most of our units pair this with bi-polar ionisation, which charges airborne particles so they clump together and drop out of the breathing zone.",
      },
      {
        q: "Is this just an air purifier with a good filter?",
        a: "No, and the distinction matters. A conventional purifier is passive: it can only treat air that physically passes through it, and it holds contaminants in the media rather than breaking them down. Our systems are active — the agents leave the unit and work throughout the space, including on surfaces. That is why we can publish surface reduction figures at all. We do also supply advanced filtration, but as the second half of a system rather than the whole answer.",
      },
      {
        q: "How is this different to a UV lamp in the AC unit?",
        a: "A UV lamp only disinfects what passes directly in front of it, within the ductwork, for the fraction of a second it is illuminated. It does nothing for the room. ARC® uses UV energy to drive a catalytic reaction that produces a travelling agent, so the effect is distributed through the served space rather than confined to the duct.",
      },
      {
        q: "What does it remove?",
        a: "Mould spores, bacteria, viruses and other pathogens, allergens including pollen and pet dander, VOCs, HCHO formaldehyde, odours, and respirable particulates. Independent testing has recorded up to 99.9% reduction across these categories — every figure on this site is published with the protocol that produced it, including the weaker results.",
      },
    ],
  },
  {
    category: "Safety",
    items: [
      {
        q: "Is it safe to run in occupied rooms?",
        a: "Yes — it is designed to run continuously in occupied space, which is the entire point. Our systems produce approximately 0.05 ppm of gaseous hydrogen peroxide, twenty times below OSHA's permissible exposure limit of 1.0 ppm. Gaseous hydrogen peroxide is already present in the air you breathe outdoors. There is no evacuation, no downtime and nothing for occupants to do.",
      },
      {
        q: "Does it produce ozone?",
        a: "Our standard occupied-space configurations are specified to avoid it. Independent testing has repeatedly recorded ozone at 0 ppm for the full duration of a test, and in every other case below TLV guidance and below the levels measured outdoors on the same day. Some laboratory configurations we publish do use elevated ozone — those are chamber tests characterising the technology, clearly labelled as such, and are not how occupied buildings are specified.",
      },
      {
        q: "Is it safe around children, pets and elderly occupants?",
        a: "Yes. The technology is installed in schools, nurseries, hospitals, nursing homes and veterinary clinics, and those are among the settings it is most often specified for. If anyone in the space has a specific respiratory or immune condition, tell us during the assessment and we will specify accordingly.",
      },
    ],
  },
  {
    category: "Installation & upkeep",
    items: [
      {
        q: "Do I need to replace my air conditioning system?",
        a: "No. Every unit in the range is designed to retrofit into what you already have. In-duct units install into existing ductwork and work alongside your current air handling equipment; wall-mounted units need only a power supply. No redesign, no replacement plant.",
      },
      {
        q: "How long does installation take?",
        a: "A wall-mounted unit is typically same-day. In-duct installations depend on the number of zones and access, but a residential villa is usually completed within a day and larger commercial projects are phased so that no area is taken out of use for long. Installation is carried out by our own engineers.",
      },
      {
        q: "Does this replace my AC servicing?",
        a: "No — it changes what servicing has to achieve. You should still maintain your air conditioning: coils, drainage and mechanical condition all still matter. What the technology removes is the expectation that cleaning alone will control microbial and gas-phase contamination between visits, which it has never been able to do. In practice most clients find their systems stay cleaner and their filters load more slowly.",
      },
      {
        q: "What maintenance does it need?",
        a: "Very little. The ARC® cell is periodically replaced on a defined service interval, and where treated filters are fitted these are changed on a normal filter schedule. We will set out the interval and cost for your specific installation up front, so there are no surprises later.",
      },
      {
        q: "How quickly will I notice a difference?",
        a: "Odour reduction is usually noticeable within the first 24 to 48 hours. Measured contamination reductions build over the following days — our published field tests are typically run over five days, and our live-environment trials over 72 hours. Where there is existing visible growth, cosmetic repair is still required; the technology's role is to make sure it does not come back.",
      },
      {
        q: "How do I know what size unit I need?",
        a: "That is what the assessment is for. Specification depends on served volume rather than floor area alone, plus the type of air handling system, occupancy pattern and what the space is used for. The range covers 135 to 10,000 sq ft, and larger volumes up to 160,000 cubic feet, so most buildings are addressed with a combination rather than a single unit.",
      },
    ],
  },
  {
    category: "Working with us",
    items: [
      {
        q: "How much does it cost?",
        a: "We price per project rather than from a list, because the specification genuinely differs between a nursery and a hotel tower. Engagements start with a site assessment: we look at the environment and what is driving the problem before proposing anything. You receive a specification and a fixed price, including the ongoing service interval, before any work is scheduled.",
      },
      {
        q: "Can you prove it will work in my building?",
        a: "Where testing adds meaningful insight, yes — and in commercial, healthcare, education and hospitality settings it usually does. We take a baseline air sample using APACOR AirTrap XL sampling analysed by Sporecyte's AI platform (96% accuracy, against 50 to 70% for the traditional petri dish method most providers still use), then re-test after installation, so you get before-and-after data for your own building rather than a percentage from someone else's. Not every project needs that. In a private home the practical answer is usually an assessment and a properly designed solution rather than a testing programme, and we will say so.",
      },
      {
        q: "Where do you operate?",
        a: "We are based in the UAE and work across the GCC, including Saudi Arabia. Our sister operation, Arc AirTech, runs the same core technology across the United Kingdom and Ireland, and the technology is deployed widely across the United States.",
      },
      {
        q: "Can you work with our facilities management or MEP contractor?",
        a: "Routinely. We are frequently specified alongside existing FM providers and MEP consultants, and we are happy to work to a consultant's specification or to provide one for tender. We can also provide the testing data your consultant will want to see before signing anything off.",
      },
    ],
  },
];

export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.items);
