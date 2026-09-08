import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  q: string;
  a: string;
}

/**
 * Disclosure list. Built on buttons wired with aria-expanded/aria-controls,
 * with the panel toggled via `hidden` so collapsed answers leave the
 * accessibility tree entirely rather than lingering as hidden text.
 */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, idx) => {
        const isOpen = open === idx;
        const panelId = `${baseId}-panel-${idx}`;
        const buttonId = `${baseId}-button-${idx}`;

        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : idx)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-accent"
              >
                <span className="text-base font-medium leading-snug sm:text-lg">{item.q}</span>
                <Plus
                  aria-hidden
                  className={cn(
                    "mt-0.5 h-5 w-5 shrink-0 text-muted transition-all duration-300 ease-out group-hover:text-accent",
                    isOpen && "rotate-45 text-accent",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-7 pr-10"
            >
              <p className="max-w-prose leading-relaxed text-muted">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
