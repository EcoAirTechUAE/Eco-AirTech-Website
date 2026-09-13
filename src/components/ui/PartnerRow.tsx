import { useState } from "react";
import { cn } from "@/lib/utils";

interface Partner {
  name: string;
  short: string;
  logo: string;
}

function PartnerLogo({ partner }: { partner: Partner }) {
  const [failed, setFailed] = useState(false);

  // No artwork supplied yet: set the name in type at a weight that sits with
  // the logos beside it, rather than looking like a broken image.
  if (failed) {
    return (
      <span className="whitespace-nowrap text-sm font-medium tracking-tight text-muted/80 transition-colors duration-300 hover:text-ink">
        {partner.short}
      </span>
    );
  }

  /*
    Files share a 110px canvas height and a matched optical weight, so one
    `h-*` keeps the whole row in proportion. No grayscale filter — the marks
    are already pure white, so only the opacity lift does anything.
  */
  return (
    <img
      src={partner.logo}
      alt={partner.name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-9 w-auto object-contain opacity-70 transition-opacity duration-300 hover:opacity-100 sm:h-10"
    />
  );
}

/** Static row of accreditation / testing partner marks. */
export function PartnerRow({
  partners,
  className,
}: {
  partners: Partner[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-10 gap-y-6", className)}>
      {partners.map((partner) => (
        <li key={partner.name}>
          <PartnerLogo partner={partner} />
        </li>
      ))}
    </ul>
  );
}
