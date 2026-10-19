import { useEffect, useRef } from "react";
import { MessageCircle, Wind, X } from "lucide-react";
import { Button, ButtonAnchor } from "@/components/ui/Button";
import { whatsappLink } from "@/config/site";

/**
 * How each "What's the space?" option reads mid-sentence, so the note can say
 * "to talk through your hotel or resort" rather than echo the raw option.
 */
const spacePhrase: Record<string, string> = {
  "Residential, my home": "your home",
  "Hotel or resort": "your hotel or resort",
  "Palace or place of worship": "your building",
  Healthcare: "your healthcare space",
  "School or nursery": "your school or nursery",
  "Gym or wellness facility": "your gym or wellness space",
  "Hospitality or venue": "your venue",
  "Transportation or fleet": "your fleet",
};

interface Props {
  open: boolean;
  name: string;
  interest: string;
  onClose: () => void;
}

/**
 * The thank-you shown once an enquiry is accepted.
 *
 * Built on the native <dialog> element: showModal() gives focus trapping,
 * Escape to close, an inert page behind it and focus returned on close, all
 * without a library. A click on the backdrop closes it too. It never closes
 * on a timer; people read at different speeds.
 */
export function ThankYouDialog({ open, name, interest, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // showModal() does not stop the page scrolling behind the dialog.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const firstName = name.trim().split(/\s+/)[0] || "";
  const space = spacePhrase[interest] ?? "your space";

  return (
    <dialog
      ref={ref}
      aria-labelledby="thanks-title"
      aria-describedby="thanks-body"
      // Fires for Escape and for close() alike, so state never drifts.
      onClose={onClose}
      onClick={(e) => {
        // A click on the dialog element itself, not its content, is the backdrop.
        if (e.target === e.currentTarget) onClose();
      }}
      className="thanks m-auto w-[calc(100%-2rem)] max-w-md overflow-visible rounded-2xl border border-line-strong bg-surface p-0 text-ink shadow-[0_24px_80px_-12px_rgba(0,0,0,0.6)] backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-7 sm:p-9">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute end-4 top-4 grid h-9 w-9 place-items-center rounded-full text-faint transition-colors hover:bg-surface2 hover:text-ink"
        >
          <X aria-hidden className="h-4 w-4" />
        </button>

        <span className="thanks-icon grid h-12 w-12 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent">
          <Wind aria-hidden className="h-5 w-5" />
        </span>

        <p className="eyebrow mt-6">Enquiry received</p>
        <h2 id="thanks-title" className="mt-3 text-2xl font-medium sm:text-[1.75rem]">
          {firstName ? `Thank you, ${firstName}.` : "Thank you."}
        </h2>

        <div id="thanks-body" className="mt-4 space-y-3 body-text">
          <p>
            Your message is with our team, and a real person will read it, not an autoresponder.
            We'll be in touch within one working day to talk through {space}.
          </p>
          <p>Until then, take a deep breath. Making the next one cleaner is our job.</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button type="button" size="lg" onClick={onClose} autoFocus>
            Back to the site
          </Button>
          <ButtonAnchor
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            className="px-2"
          >
            <MessageCircle aria-hidden className="h-4 w-4" />
            Need us sooner? WhatsApp
          </ButtonAnchor>
        </div>
      </div>
    </dialog>
  );
}
