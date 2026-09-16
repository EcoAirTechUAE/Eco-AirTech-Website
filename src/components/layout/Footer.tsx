import { Link } from "react-router-dom";
import { Mail, MapPin, Linkedin, Instagram, Youtube } from "lucide-react";
import { site, whatsappLink } from "@/config/site";
import { devices } from "@/content/devices";
import { industries } from "@/content/industries";
import { Logo } from "./Logo";

const socials = [
  { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: site.social.instagram, label: "Instagram", Icon: Instagram },
  { href: site.social.youtube, label: "YouTube", Icon: Youtube },
].filter((s) => s.href);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="container py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs body-text">
              Nature-based air technology, running continuously, so the air indoors is as clean as
              the air outdoors ought to be.
            </p>

            <ul className="mt-7 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="flex items-center gap-2.5 text-muted transition-colors hover:text-accent"
                >
                  <Mail aria-hidden className="h-4 w-4 shrink-0 text-faint" />
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-muted">
                <MapPin aria-hidden className="h-4 w-4 shrink-0 text-faint" />
                {site.contact.address.line1}, {site.contact.address.line2}
              </li>
            </ul>

            {socials.length > 0 && (
              <ul className="mt-7 flex gap-2">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      <Icon aria-hidden className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <FooterColumn
            title="Technology"
            links={[
              { label: "How it works", to: "/technology" },
              { label: "Filters", to: "/filters" },
              { label: "Test results", to: "/results" },
              { label: "All devices", to: "/devices" },
            ]}
          />

          <FooterColumn
            title="Devices"
            links={devices.map((d) => ({ label: d.article, to: `/devices/${d.slug}` }))}
          />

          <FooterColumn
            title="Industries"
            links={industries.slice(0, 6).map((i) => ({ label: i.name, to: `/industries/${i.slug}` }))}
          />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-[0.8125rem] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              WhatsApp
            </a>
            <Link to="/contact" className="transition-colors hover:text-accent">
              Contact
            </Link>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-[0.8125rem] leading-relaxed text-faint/70">
          Performance figures shown across this site are drawn from independent laboratory and field
          testing, each published with the product configuration, technologies, duration and test
          conditions that produced it. Results vary with building type, air handling system,
          occupancy and specification.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; to: string }[];
}) {
  return (
    <div>
      <p className="font-mono text-eyebrow uppercase text-faint">{title}</p>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-sm text-muted transition-colors hover:text-accent">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
