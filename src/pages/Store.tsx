import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck, Zap } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { store, storeLive } from "@/config/store";
import { fetchProduct, formatAed } from "@/lib/shopify";

const A = "/assets/store";

/** The online store (UAE). One product at launch: The MOVE. */
export default function Store() {
  const [price, setPrice] = useState<string | null>(store.launchPriceAed ? formatAed(store.launchPriceAed) : null);
  useEffect(() => {
    if (!storeLive()) return;
    fetchProduct(store.portableHandle).then((p) => p && setPrice(formatAed(p.price))).catch(() => {});
  }, []);

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_15%_0%,hsl(var(--accent)/0.14),transparent_70%),radial-gradient(ellipse_45%_60%_at_95%_20%,hsl(var(--accent-2)/0.10),transparent_70%)]" />
        <div className="container relative pb-10 pt-16 sm:pt-24">
          <Reveal>
            <div className="eyebrow text-accent">Eco Airtech store · UAE</div>
            <h1 className="mt-4 max-w-3xl text-display-lg font-medium text-ink">Protection you can plug in.</h1>
            <p className="mt-5 max-w-2xl text-lg body-text">
              The same technology we fit in hotels and homes, in a unit you can order online. It treats the air and the surfaces around it against mould, bacteria, viruses and odours, and it is delivered to your door.
            </p>
          </Reveal>
        </div>
      </section>

      <Section tight>
        <div className="container">
          <Reveal>
            <Link
              to="/store/portable"
              className="group grid overflow-hidden rounded-3xl border border-line bg-surface/50 transition-colors hover:border-accent/40 lg:grid-cols-[1.1fr_1fr]"
            >
              <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-b from-[#1b2420] to-[#0b100e]">
                <img src={`${A}/home-good.webp`} alt="The MOVE" className="h-[82%] w-auto object-contain transition duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <div className="eyebrow text-accent">{storeLive() ? "Free-standing · no installation" : "Now taking pre-orders"}</div>
                <h2 className="mt-3 text-display-md font-medium text-ink">{store.productName}</h2>
                <p className="mt-4 body-text">
                  Built smaller for real homes: active hydroxyls, bi-polar ionisation and an ODOGard® HEPA+ filter in a compact unit that covers up to 850 sq ft and uses just 12 to 36 watts. Auto Mode reacts to what it detects.
                </p>
                <div className="mt-6 text-2xl font-medium text-ink">{price ? <>{price} <span className="text-sm font-normal text-muted">inc. VAT</span></> : <span className="text-lg text-muted">Price confirmed at launch</span>}</div>
                <span className="mt-8 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-accent-grad px-7 text-[0.95rem] font-medium text-[#04140A]">
                  {storeLive() ? "Shop now" : "Pre-order now"} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              [Truck, store.delivery],
              [ShieldCheck, storeLive() ? "Secure checkout by Shopify." : "Pre-order now. No payment until stock arrives."],
              [Zap, "No installation. Working the day it arrives."],
            ].map(([Icon, text], i) => {
              const I = Icon as typeof Truck;
              return (
                <Reveal key={i} i={i} className="flex items-start gap-3 rounded-2xl border border-line p-5 text-sm text-muted">
                  <I aria-hidden className="h-5 w-5 shrink-0 text-accent" /> {text as string}
                </Reveal>
              );
            })}
          </div>

          <p className="mt-12 text-sm text-muted">
            Need a whole building treated?{" "}
            <Link to="/devices" className="text-accent hover:underline">
              Our fixed systems
            </Link>{" "}
            work through your air conditioning, and we specify them after a site assessment.
          </p>
        </div>
      </Section>
    </>
  );
}
