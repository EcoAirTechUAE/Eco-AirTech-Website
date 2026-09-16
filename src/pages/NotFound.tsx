import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { nav } from "@/config/site";
import { Link } from "react-router-dom";

export default function NotFound() {

  return (
    <section className="relative overflow-hidden">
      <div className="container relative flex min-h-[70vh] flex-col justify-center py-24">
        <p className="eyebrow">
          Error 404
        </p>
        <h1 className="mt-6 max-w-2xl text-display-lg font-medium">
          That page seems to have cleared the air.
        </h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">
          The link may be out of date, or the page may have moved. Here's where to go instead.
        </p>

        <div className="mt-9">
          <ButtonLink to="/" size="lg">
            Back to the homepage
            <ArrowRight aria-hidden className="h-4 w-4" />
          </ButtonLink>
        </div>

        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/contact" className="text-sm text-muted transition-colors hover:text-accent">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
