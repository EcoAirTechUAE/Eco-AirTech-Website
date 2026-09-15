import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import { nav, site, whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ButtonLink } from "@/components/ui/Button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Lock body scroll while the overlay menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-[#04140A]"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
          scrolled || menuOpen
            ? "border-b border-line bg-bg/85 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
        style={{ height: "var(--header-h)" }}
      >
        <div className="container flex h-full items-center justify-between gap-6">
          <Link to="/" aria-label={`${site.name} — home`} className="shrink-0">
            <Logo withWordmark />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-3.5 py-2 text-sm transition-colors duration-200",
                    isActive ? "text-accent" : "text-muted hover:text-ink",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:border-accent/50 hover:text-accent sm:inline-flex"
              aria-label="Message us on WhatsApp"
            >
              <MessageCircle aria-hidden className="h-4 w-4" />
            </a>

            <ButtonLink to="/contact" className="hidden sm:inline-flex">
              Book an assessment
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink lg:hidden"
            >
              {menuOpen ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet overlay */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl lg:hidden"
        style={{ paddingTop: "var(--header-h)" }}
      >
        <nav aria-label="Mobile" className="container flex h-full flex-col overflow-y-auto py-8">
          <ul className="divide-y divide-line border-y border-line">
            {nav.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center justify-between py-5 text-2xl font-medium tracking-tight",
                      isActive ? "text-accent" : "text-ink",
                    )
                  }
                >
                  {item.label}
                  <span aria-hidden className="text-sm text-faint">
                    →
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3">
            <ButtonLink to="/contact" size="lg">
              Book an assessment
            </ButtonLink>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong text-[0.95rem] font-medium text-ink"
            >
              <MessageCircle aria-hidden className="h-4 w-4" />
              WhatsApp us
            </a>
          </div>

          <div className="mt-auto pt-10 text-sm text-faint">
            <a href={`mailto:${site.contact.email}`} className="block hover:text-ink">
              {site.contact.email}
            </a>
            <a href={`tel:${site.contact.phoneHref}`} className="mt-1 block hover:text-ink">
              {site.contact.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
