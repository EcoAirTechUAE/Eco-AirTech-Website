import { useState } from "react";
import { cn } from "@/lib/utils";

interface Partner {
  name: string;
  short: string;
  logo: string;
}

function PartnerLogo({ partner }: { partner: Partner }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="whitespace-nowrap text-sm font-medium tracking-tight text-muted">
        {partner.short}
      </span>
    );
  }

  return (
    <img
      src={partner.logo}
      alt={partner.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-6 w-auto max-w-[130px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-7"
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
