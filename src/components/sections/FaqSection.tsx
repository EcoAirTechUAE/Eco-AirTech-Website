import { ArrowRight, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { faqGroups, featuredFaqs } from "@/content/faqs";
import { whatsappLink } from "@/config/site";

/** `featured` shows the short homepage list; without it, every group. */
export function FaqSection({ featured }: { featured?: boolean }) {
  return (
    <Section id="faq">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow">
                Questions
              </p>
              <h2 className="mt-6 text-display-md font-medium">
                The things people ask before they commit.
              </h2>
              <p className="mt-6 leading-relaxed text-muted">
                If yours isn't here, message us directly.
              </p>

              <ButtonAnchor
                href={whatsappLink("Hello Eco AirTech, I have a question about your systems.")}
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

          {featured ? (
            <Reveal i={1}>
              <Accordion items={featuredFaqs} />
              <ButtonLink to="/contact#faq" variant="ghost" size="lg" className="mt-6 px-0">
                All questions
                <ArrowRight aria-hidden className="h-4 w-4" />
              </ButtonLink>
            </Reveal>
          ) : (
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
          )}
        </div>
      </div>
    </Section>
  );
}
