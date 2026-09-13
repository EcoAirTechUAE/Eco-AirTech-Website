import { PageHero } from "@/components/layout/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { useMeta } from "@/lib/useMeta";

export default function Contact() {
  useMeta(
    "Contact",
    "Book an air assessment for your home, hotel, school or workplace anywhere in the UAE and GCC. We start by understanding the space and what's driving the problem.",
  );

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Find out what's actually in your air."
        lead="Tell us about the space and we'll come back within one working day. We start by understanding the environment and what's driving the problem, not by sending a quote — and if it turns out you don't need us, we'll tell you that."
        crumbs={[{ label: "Contact" }]}
      />

      <ContactSection />
      <FaqSection />
    </>
  );
}
