import { MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonAnchor } from "@/components/ui/Button";
import { faqGroups } from "@/content/faqs";
import { whatsappLink } from "@/config/site";

export function FaqSection() {
  return (
    <Section id="faq">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-accent/50" />
                Questions
              </p>
              <h2 className="mt-6 text-display-md font-medium">
                The things people ask before they commit.
              </h2>
              <p className="mt-6 leading-relaxed text-muted">
                If yours isn't here, message us directly — you'll reach the team who specify the
                systems, not a call centre.
              </p>

              <ButtonAnchor
                href={whatsappLink("Hello Eco AirTech — I have a question about your systems.")}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                className="mt-8"
              >
                <MessageCircle aria-hidden className="h-4 w-4" />
                Ask on WhatsApp
              </ButtonAnchor>
            </Reveal>
          </div>

          <div className="space-y-14">
            {faqGroups.map((group, i) => (
              <Reveal key={group.category} i={i}>
                <h3 className="mb-5 font-mono text-eyebrow uppercase tracking-wider text-accent">
                  {group.category}
                </h3>
                <Accordion items={group.items} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
