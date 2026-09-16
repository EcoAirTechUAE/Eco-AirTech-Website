import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { site, whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";

const DISMISS_KEY = "eat_wa_prompt_dismissed";

/** Official WhatsApp glyph. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/**
 * Floating WhatsApp entry point.
 *
 * Appears after the visitor has scrolled past the hero, so it never covers
 * the first impression. The prompt bubble can be dismissed, and that choice
 * is remembered for the session.
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!visible) return;
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      /* storage unavailable — show the prompt anyway */
    }
    if (dismissed) return;
    const t = setTimeout(() => setPromptOpen(true), 1400);
    return () => clearTimeout(t);
  }, [visible]);

  const dismiss = () => {
    setPromptOpen(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* nothing to do */
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 transition-all duration-500 ease-out sm:bottom-7 sm:right-7",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      {promptOpen && (
        <div className="relative max-w-[17rem] rounded-2xl rounded-br-sm border border-line bg-surface2 p-4 pr-9 shadow-2xl">
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute right-2.5 top-2.5 text-faint transition-colors hover:text-ink"
          >
            <X aria-hidden className="h-3.5 w-3.5" />
          </button>
          <p className="text-sm font-medium text-ink">Questions about your space?</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Message our team directly — we usually reply within the hour.
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-[0.8125rem] font-medium text-accent hover:underline"
          >
            Start a conversation →
          </a>
        </div>
      )}

      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={dismiss}
        aria-label={`Message ${site.name} on WhatsApp`}
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-[#04140A] shadow-[0_8px_30px_-6px_rgba(37,211,102,0.5)] transition-transform duration-300 ease-out hover:scale-105"
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 transition-transform duration-700 group-hover:scale-125 group-hover:opacity-0"
        />
        <WhatsAppIcon className="relative h-7 w-7" />
      </a>
    </div>
  );
}
