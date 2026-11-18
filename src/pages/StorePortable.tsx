import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Minus, Plus, ShieldCheck, Smartphone, Truck, Zap } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { ContaminantIcon, type ContaminantKey } from "@/components/store/ContaminantIcon";
import { store, storeLive } from "@/config/store";
import { whatsappLink } from "@/config/site";
import { checkoutUrl, fetchProduct, formatAed, type LiveProduct } from "@/lib/shopify";
import { TextField, SelectField } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

/*
 * The MOVE, sold online in the UAE. The manufacturer sells it as the
 * "Portable ARC Home" (model 1X5825); product facts come from its product
 * information sheet, owner's guide and owner's manual.
 */

const A = "/assets/store";

const GALLERY = [
  { src: `${A}/home-good.webp`, alt: "The MOVE: the light ring shows good air quality in green" },
  { src: `${A}/home-fair.webp`, alt: "The light ring turns amber when air quality is moderate" },
  { src: `${A}/home-poor.webp`, alt: "The light ring turns red when air quality is poor" },
  { src: `${A}/home-top.webp`, alt: "The MOVE working beside a mould-affected wall", cover: true },
  { src: `${A}/home-nursery.webp`, alt: "The MOVE in a child's bedroom", cover: true },
];

/** Headline figures from the manufacturer's specification. */
const SMALLER: [string, string][] = [
  ["850", "Sq ft coverage"],
  ["5.2 kg", "Light enough to carry"],
  ["12–36 W", "Power use"],
  ["26 dB", "On its quietest setting"],
];

const CONTAMINANTS: { key: ContaminantKey; title: string; body: string }[] = [
  { key: "mould", title: "Mould spores", body: "Airborne spores from damp walls, AC units and hidden growth." },
  { key: "microbes", title: "Bacteria and viruses", body: "Carried in the air and left on surfaces people touch." },
  { key: "pollen", title: "Allergens and pollen", body: "From outdoors, houseplants and dust mites." },
  { key: "pets", title: "Pet dander", body: "Microscopic flecks of skin and hair shed by pets." },
  { key: "odours", title: "Odours and cooking gases", body: "From food preparation, smoke and stale rooms." },
  { key: "vocs", title: "Formaldehyde and VOCs", body: "From new furniture, paint, aerosols and cleaning products." },
  { key: "dust", title: "Household dust", body: "Fine particles, dead skin cells and dust mites." },
  { key: "outdoor", title: "Outdoor pollution", body: "Traffic fumes and fine dust drawn in from outside." },
];

const FEATURES = [
  {
    title: "Active purification",
    body: "The ARC® cell uses UV light and a quad-metallic catalyst to turn the moisture already in your air into hydroxyls, the same cleaning agents sunlight makes outdoors. They leave the unit and work in the room.",
    img: `${A}/home-top.webp`,
  },
  {
    title: "Reacts on its own",
    body: "A built-in sensor reads the air. In Auto Mode the fan speeds up and slows down with what it detects, and the light ring shows green, amber or red at a glance.",
    img: `${A}/home-poor.webp`,
    swap: `${A}/home-good.webp`,
  },
  {
    title: "ODOGard® HEPA+ filter",
    body: "Particles are captured, and odour and VOC molecules are bonded and changed at a molecular level, so the smell is eliminated rather than stored.",
    img: `${A}/home-fair.webp`,
  },
  {
    title: "No installation",
    body: "Free-standing and compact. It plugs into a standard socket, has no water tank to empty and nothing to refill, and moves easily to wherever the problem is.",
    img: `${A}/home-nursery.webp`,
  },
];

const COMPARE: { label: string; them: string; us: string }[] = [
  { label: "Where it works", them: "Only on air that passes through the unit", us: "In the unit, and in the room: hydroxyls travel with the air to surfaces" },
  { label: "What happens to contaminants", them: "Held in the filter media", us: "Captured by the filter, and broken down by hydroxyls and ODOGard®" },
  { label: "Mould on surfaces", them: "Not treated", us: "Treated where the hydroxyls reach" },
  { label: "Odours and VOCs", them: "Carbon filters adsorb until saturated", us: "ODOGard® changes the molecule so the odour is gone" },
  { label: "Technologies", them: "Filtration", us: "ARC®, bi-polar ionisation and ODOGard® HEPA+" },
];

const SPECS: [string, string][] = [
  ["Coverage", "Up to 850 sq ft (79 m²), based on an 8 ft ceiling and 3 air changes per hour"],
  ["Active CADR", "230"],
  ["Dimensions", "26.9 × 26.9 × 44.5 cm"],
  ["Weight", "5.2 kg"],
  ["Power use", "12 to 36 W, set automatically by air quality"],
  ["Noise", "26 to 53 dB"],
  ["Power supply", "100–240 V AC, 50/60 Hz, standard 3-pin socket"],
  ["Technologies", "ARC® active purification, bi-polar ionisation, ODOGard® HEPA+ filter"],
  ["Particle capture", "Down to 0.25 microns"],
  ["Modes", "Auto Mode, 5 manual fan speeds and Sleep Mode"],
  ["Sensing", "Air quality, temperature and humidity"],
  ["App", "Greentech Connect over WiFi: live readings and remaining life of the HEPA filter, ARC® cell and BPI module"],
  ["Water tank", "None"],
  ["Warranty", "3 years from the manufacturer"],
  ["Delivery", `${store.shipsTo} only`],
];

const FAQ = [
  {
    q: "How is it delivered?",
    a: `${store.delivery} You will receive tracking details once your order is on its way.`,
  },
  storeLive()
    ? {
        q: "How do I pay?",
        a: "Checkout is handled securely by Shopify. Card details are entered on Shopify's checkout and never touch our website.",
      }
    : {
        q: "How does the pre-order work?",
        a: "Leave your details and how many units you would like. Nothing is charged now. When stock arrives we will contact you to confirm your order and arrange delivery, and you can change your mind at any point before then.",
      },
  {
    q: "Does it need installing?",
    a: "No. Plug it into a standard 3-pin socket, switch it on and connect the Greentech Connect app to your home WiFi. Run it on full speed for the first 24 hours, then switch to Auto Mode and leave it running.",
  },
  {
    q: "Where should I put it?",
    a: "In an open, central spot such as a hallway, landing or main living area, with internal doors open so air can move between rooms. A coffee table or similar raised surface helps. Avoid corners, behind furniture, under curtains or next to a heater. If you have mould in one room, start with the unit in that room.",
  },
  {
    q: "How much space does it cover?",
    a: "Up to 850 sq ft (79 m²), which is enough for most homes from one central spot. The figure is based on an 8 ft ceiling and 3 air changes per hour.",
  },
  {
    q: "Should it run all the time?",
    a: "Yes. It is designed to run continuously, day and night, and uses only 12 to 36 watts. At night, Sleep Mode turns off the coloured light and dims the display.",
  },
  {
    q: "How is it different from a normal air purifier?",
    a: "A conventional purifier is passive: it can only treat air that physically passes through it, and it holds contaminants in the media rather than breaking them down. The MOVE also produces hydroxyls that leave the unit and work in the room air and on surfaces.",
  },
  {
    q: "Will it remove mould that is already on a wall?",
    a: "It reduces mould spores in the air, but mould already growing on a surface still needs cleaning, and the cause of damp needs fixing. Run The MOVE for at least 72 hours first, keep it running while you wipe the mould away with warm water and detergent, then leave it on Auto.",
  },
  {
    q: "Which parts need replacing?",
    a: "The HEPA filter every 9 to 12 months, the BPI module every 2 years and the ARC® cell every 2 to 3 years. The app shows the remaining life of each as a percentage, so you can see when one is due. There is no water tank to empty and nothing to refill.",
  },
  {
    q: "Is there a warranty?",
    a: "Yes, 3 years from the manufacturer. Please keep your proof of purchase.",
  },
  {
    q: "Is it safe to use around people and pets?",
    a: "Yes. Hydroxyls occur naturally outdoors and the system is designed to run continuously in occupied rooms, which is how it is used in homes, nurseries and hotel rooms.",
  },
];

function Gallery() {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-[#1b2420] to-[#0b100e]">
        {GALLERY.map((g, j) => (
          <img
            key={g.src}
            src={g.src}
            alt={g.alt}
            loading={j === 0 ? "eager" : "lazy"}
            className={cn(
              "absolute inset-0 h-full w-full transition-opacity duration-500",
              g.cover ? "object-cover" : "object-contain p-6",
              j === i ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Product images">
        {GALLERY.map((g, j) => (
          <button
            key={g.src}
            type="button"
            role="tab"
            aria-selected={j === i}
            aria-label={g.alt}
            onClick={() => setI(j)}
            className={cn(
              "h-16 w-16 shrink-0 overflow-hidden rounded-xl border bg-[#141b18] transition-colors",
              j === i ? "border-accent" : "border-line hover:border-line-strong",
            )}
          >
            <img src={g.src} alt="" className={cn("h-full w-full", g.cover ? "object-cover" : "object-contain p-1")} />
          </button>
        ))}
      </div>
    </div>
  );
}

function useLiveProduct() {
  const [product, setProduct] = useState<LiveProduct | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">(storeLive() ? "loading" : "idle");
  useEffect(() => {
    if (!storeLive()) return;
    fetchProduct(store.portableHandle)
      .then((p) => {
        setProduct(p);
        setState(p ? "ready" : "error");
      })
      .catch(() => setState("error"));
  }, []);
  return { product, state };
}

const EMIRATES = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"];
const OPEN_PREORDER = "open-preorder";

/** Sends the compact bars' visitors to the main box with the form open. */
function openPreorder() {
  window.dispatchEvent(new Event(OPEN_PREORDER));
  document.getElementById("preorder")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Pre-order while Shopify is not connected. Goes through the same endpoint as
 * the contact form, so each pre-order lands in the Airtable enquiry list,
 * tagged "Pre-order: The MOVE". No payment is taken.
 */
function PreorderForm({ qty }: { qty: number }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [failure, setFailure] = useState<string | null>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    // The endpoint treats phone as optional; for a pre-order we need it.
    if (get("phone").replace(/[^\d]/g, "").length < 7) {
      setErrors({ phone: "Please enter a mobile number so we can confirm your order." });
      return;
    }
    setStatus("sending");
    setErrors({});
    setFailure(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: get("name"),
          email: get("email"),
          phone: get("phone"),
          interest: `Pre-order: ${store.productName}`,
          message: `Pre-order request: ${qty} x ${store.productName}. Delivery to ${get("emirate")}.`,
          page: "/store/portable",
          website: get("website"),
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { errors?: Record<string, string>; error?: string };
      if (res.ok) return setStatus("sent");
      if (body.errors) setErrors(body.errors);
      else setFailure(body.error ?? "We could not send that just now. Please message us on WhatsApp.");
    } catch {
      setFailure("We could not send that just now. Please message us on WhatsApp.");
    }
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div role="status" className="mt-5 rounded-2xl border border-accent/30 bg-accent/5 p-5 text-sm">
        <p className="flex items-center gap-2 font-medium text-ink">
          <Check aria-hidden className="h-4 w-4 text-accent" /> Your pre-order is in.
        </p>
        <p className="mt-2 text-muted">
          We have reserved {qty} {qty > 1 ? "units" : "unit"} for you. When stock arrives we will be in touch to confirm your order and arrange delivery. Nothing has been charged.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="mt-5 grid gap-4">
      <TextField label="Name" name="name" autoComplete="name" required error={errors.name} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Email" name="email" type="email" autoComplete="email" required error={errors.email} />
        <TextField label="Mobile" name="phone" type="tel" autoComplete="tel" placeholder="+971 …" required error={errors.phone} />
      </div>
      <SelectField label="Delivery to" name="emirate" options={EMIRATES} required defaultValue="Dubai" />
      {/* Honeypot: hidden from people, filled in by bots. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <button
        type="submit"
        disabled={status === "sending"}
        className="h-12 rounded-full bg-accent-grad px-6 text-[0.95rem] font-medium text-[#04140A] transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : qty > 1 ? `Pre-order ${qty} units` : "Pre-order now"}
      </button>
      {failure && (
        <p className="text-sm text-warn">
          {failure}{" "}
          <a href={whatsappLink(`Hello Eco AirTech, I would like to pre-order ${qty} ${store.productName}.`)} target="_blank" rel="noopener noreferrer" className="underline">
            Open WhatsApp
          </a>
        </p>
      )}
      <p className="text-xs text-faint">No payment now. We only use your details to confirm this pre-order.</p>
    </form>
  );
}

function BuyBox({ compact = false }: { compact?: boolean }) {
  const { product, state } = useLiveProduct();
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const live = state === "ready" && product;
  const price = live ? formatAed(product.price) : store.launchPriceAed ? formatAed(store.launchPriceAed) : null;
  const [formOpen, setFormOpen] = useState(false);
  useEffect(() => {
    if (compact) return;
    const open = () => setFormOpen(true);
    window.addEventListener(OPEN_PREORDER, open);
    return () => window.removeEventListener(OPEN_PREORDER, open);
  }, [compact]);

  async function buy() {
    if (!live) return;
    setBusy(true);
    setErr(null);
    try {
      window.location.href = await checkoutUrl(product.variantId, qty);
    } catch (e) {
      setErr("Checkout could not be started. Please try again, or message us on WhatsApp.");
      setBusy(false);
    }
  }

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-ink">{store.productName}</div>
          <div className="text-xs text-muted">{price ?? "Price confirmed at launch"}</div>
        </div>
        {live && product.available ? (
          <button type="button" onClick={buy} disabled={busy} className="h-11 rounded-full bg-accent-grad px-5 text-sm font-medium text-[#04140A]">
            {busy ? "Opening…" : "Buy now"}
          </button>
        ) : (
          <button type="button" onClick={openPreorder} className="h-11 rounded-full bg-accent-grad px-5 text-sm font-medium text-[#04140A]">
            Pre-order
          </button>
        )}
      </div>
    );
  }

  return (
    <div id="preorder" className="scroll-mt-[calc(var(--header-h)+16px)] rounded-3xl border border-line bg-surface/70 p-6 backdrop-blur-sm sm:p-8">
      <div className="eyebrow text-accent">{live ? "Free-standing · no installation" : "Pre-order · no payment now"}</div>
      <h1 className="mt-3 text-display-sm font-medium text-ink">{store.productName}</h1>
      <p className="mt-3 text-[0.95rem] body-text">
        Built smaller for real homes. The same ARC® active technology in a compact unit: active hydroxyls, bi-polar ionisation and an ODOGard® HEPA+ filter. Plug it in and it starts treating the air and the surfaces around it.
      </p>

      <div className="mt-6 flex items-baseline gap-3">
        {state === "loading" ? (
          <span className="h-8 w-32 animate-pulse rounded bg-surface2" />
        ) : price ? (
          <>
            <span className="tnum text-3xl font-medium text-ink">{price}</span>
            <span className="text-sm text-muted">inc. VAT</span>
          </>
        ) : (
          <span className="text-lg text-ink">Price confirmed at launch</span>
        )}
      </div>
      {store.bnpl.length > 0 && (product?.price ?? store.launchPriceAed) && (
        <p className="mt-2 text-sm text-ink">
          Or {store.bnplInstalments} interest-free payments of {formatAed(Math.round(((product?.price ?? store.launchPriceAed)! / store.bnplInstalments) * 100) / 100)} with {store.bnpl.join(" or ")}.
        </p>
      )}
      {!live && <p className="mt-2 text-sm text-muted">Pre-order now and we will reserve a unit for you. Nothing is charged until stock arrives and you confirm.</p>}

      <ul className="mt-6 space-y-2.5 text-sm text-ink">
        {["Covers up to 850 sq ft, enough for most homes", "Uses just 12 to 36 watts, built to run day and night", "Auto Mode reacts to what it detects", "Live readings and part life in the app", "3-year manufacturer's warranty"].map((b) => (
          <li key={b} className="flex gap-2.5">
            <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {b}
          </li>
        ))}
      </ul>

      <div className="mt-7 flex items-center gap-3">
        <div className="flex h-12 items-center rounded-full border border-line-strong">
          <button type="button" aria-label="One fewer" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-12 w-11 items-center justify-center text-muted hover:text-ink">
            <Minus className="h-4 w-4" />
          </button>
          <span className="tnum w-6 text-center text-ink" aria-live="polite">
            {qty}
          </span>
          <button type="button" aria-label="One more" onClick={() => setQty((q) => Math.min(10, q + 1))} className="flex h-12 w-11 items-center justify-center text-muted hover:text-ink">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {live && product.available ? (
          <button
            type="button"
            onClick={buy}
            disabled={busy}
            className="h-12 flex-1 rounded-full bg-accent-grad px-6 text-[0.95rem] font-medium text-[#04140A] transition hover:brightness-110 disabled:opacity-60"
          >
            {busy ? "Opening secure checkout…" : "Buy now"}
          </button>
        ) : live ? (
          <span className="flex h-12 flex-1 items-center justify-center rounded-full border border-line-strong text-sm text-muted">Out of stock</span>
        ) : !formOpen ? (
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-accent-grad px-6 text-[0.95rem] font-medium text-[#04140A] transition hover:brightness-110"
          >
            Pre-order
          </button>
        ) : null}
      </div>
      {!live && formOpen && <PreorderForm qty={qty} />}
      {err && <p className="mt-3 text-sm text-warn">{err}</p>}

      <div className="mt-7 grid gap-3 border-t border-line pt-6 text-sm text-muted">
        <div className="flex gap-3">
          <Truck aria-hidden className="h-5 w-5 shrink-0 text-accent" /> {store.delivery}
        </div>
        <div className="flex gap-3">
          <ShieldCheck aria-hidden className="h-5 w-5 shrink-0 text-accent" />{" "}
          {live ? "Secure checkout by Shopify. Card details never touch our site." : "No payment to pre-order. You confirm before anything is charged."}
        </div>
      </div>
    </div>
  );
}

function FeatureTile({ f }: { f: (typeof FEATURES)[number] }) {
  const [alt, setAlt] = useState(false);
  useEffect(() => {
    if (!f.swap) return;
    const t = setInterval(() => setAlt((a) => !a), 2600);
    return () => clearInterval(t);
  }, [f.swap]);
  return (
    <article className="group">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-[#1b2420] to-[#0b100e]">
        <img src={f.img} alt="" loading="lazy" className={cn("absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.03]", /nursery|home-top/.test(f.img) ? "object-cover" : "object-contain p-4", f.swap && alt ? "opacity-0" : "opacity-100")} />
        {f.swap && <img src={f.swap} alt="" loading="lazy" className={cn("absolute inset-0 h-full w-full object-contain p-4 transition duration-700", alt ? "opacity-100" : "opacity-0")} />}
      </div>
      <h3 className="mt-5 text-xl font-medium text-ink">{f.title}</h3>
      <p className="mt-2 body-text !text-sm">{f.body}</p>
    </article>
  );
}

function ScienceImage() {
  return (
    <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-black">
      <img src={`${A}/home-top.webp`} alt="The MOVE beside a mould-affected wall in a child's bedroom" loading="lazy" className="h-full w-full object-cover" />
      <figcaption className="absolute left-6 top-5 rounded-xl bg-black/55 px-3 py-2 text-left text-sm text-ink backdrop-blur-sm">
        <span className="eyebrow block text-accent">In the room</span>
        Treating the air and the walls around it
      </figcaption>
    </figure>
  );
}

export default function StorePortable() {
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Buy */}
      <section className="relative pb-16 pt-8 sm:pt-12">
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[11px] uppercase tracking-wider text-faint">
            <Link to="/store" className="hover:text-ink">Store</Link> <span aria-hidden>/</span> <span className="text-muted">{store.productName}</span>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <Reveal className="min-w-0">
              <Gallery />
            </Reveal>
            <Reveal i={1} className="min-w-0 lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
              <BuyBox />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Built smaller */}
      <section className="relative overflow-hidden border-y border-line bg-black">
        <div className="relative mx-auto min-h-[34rem] w-full max-w-[1600px] sm:aspect-[16/9] sm:max-h-[78vh] sm:min-h-0">
          <img src={`${A}/home-nursery.webp`} alt="The MOVE in a child's bedroom" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[50%_40%]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="container pb-10 sm:pb-14">
              <div className="eyebrow text-accent">Built smaller for real homes</div>
              <h2 className="mt-3 max-w-2xl text-display-md font-medium text-ink">More compact. Same punch.</h2>
              <p className="mt-3 max-w-xl text-ink/80">Easier to carry, store and position, with the same proven ARC® active technology at its heart.</p>
              <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
                {SMALLER.map(([v, l]) => (
                  <div key={l}>
                    <dd className="tnum text-gradient text-4xl font-medium">{v}</dd>
                    <dt className="mt-1 text-sm text-ink">{l}</dt>
                  </div>
                ))}
              </dl>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-faint">Manufacturer&rsquo;s specification</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <Section>
        <div className="container">
          <Reveal>
            <div className="eyebrow text-accent">How it works</div>
            <h2 className="mt-3 max-w-3xl text-display-md font-medium text-ink">Purification that does not wait for the air to come to it.</h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} i={i}>
                <FeatureTile f={f} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* What it tackles */}
      <Section surface>
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="eyebrow text-accent">What it tackles</div>
            <h2 className="mt-3 text-display-md font-medium text-ink">The things you cannot see, in the air and on surfaces.</h2>
          </Reveal>
          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {CONTAMINANTS.map((c, i) => (
              <Reveal key={c.key} i={i % 4} className="text-center">
                <ContaminantIcon name={c.key} className="mx-auto h-20 w-20" />
                <h3 className="mt-5 text-lg font-medium text-ink">{c.title}</h3>
                <p className="mx-auto mt-2 max-w-[17rem] body-text !text-sm">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* The science */}
      <Section>
        <div className="container grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="eyebrow text-accent">ARC® active purification</div>
            <h2 className="mt-3 text-display-md font-medium text-ink">Nature&rsquo;s disinfectant, made indoors.</h2>
            <p className="mt-5 max-w-prose body-text">
              Active Radiant Catalysis uses a broad-spectrum UV lamp to activate a quad-metallic catalyst. It turns water vapour and oxygen already in the room into advanced oxidation products, principally hydroxyls, which seek out and break down contaminants at a molecular level. Bi-polar ionisation charges airborne particles so they clump together and drop out of the breathing zone.
            </p>
            <div className="mt-10 flex flex-wrap items-end gap-x-5 gap-y-4 font-light">
              {[
                ["H₂O", "Water vapour"],
                ["+", ""],
                ["O₂", "Oxygen"],
                ["+", ""],
                ["ARC®", "UV + catalyst"],
                ["=", ""],
                ["•OH", "Hydroxyls (AOPs)"],
              ].map(([v, l], i) =>
                l ? (
                  <div key={i}>
                    <div className="text-gradient text-4xl sm:text-5xl">{v}</div>
                    <div className="mt-1 text-xs text-muted">{l}</div>
                  </div>
                ) : (
                  <div key={i} className="pb-6 text-2xl text-faint">{v}</div>
                ),
              )}
            </div>
          </Reveal>
          <Reveal i={1}>
            <ScienceImage />
          </Reveal>
        </div>
      </Section>

      {/* ODOGard */}
      <Section surface tight>
        <div className="container max-w-3xl">
          <Reveal>
            <div className="eyebrow text-accent">ODOGard® HEPA+ filter</div>
            <h2 className="mt-3 text-display-sm font-medium text-ink">A filter that destroys odours, not just stores them.</h2>
            <p className="mt-4 body-text">
              ODOGard® attaches to a volatile organic compound or odour molecule and changes its structure, so the odour is eliminated rather than held in the filter until it saturates.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <dd className="tnum text-gradient text-4xl font-medium">99%</dd>
                <dt className="mt-2 text-sm text-ink">more effective than traditional carbon filters</dt>
              </div>
              <div>
                <dd className="tnum text-gradient text-4xl font-medium">140%</dd>
                <dt className="mt-2 text-sm text-ink">greater reduction in airborne VOCs</dt>
              </div>
            </dl>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-faint">Manufacturer&rsquo;s data for ODOGard® media</p>
          </Reveal>
        </div>
      </Section>

      {/* Results */}
      <Section tight>
        <div className="container">
          <Reveal>
            <div className="eyebrow text-accent">Independent test results</div>
            <h2 className="mt-3 text-display-sm font-medium text-ink">What the ARC® technology removes.</h2>
          </Reveal>
          <dl className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              ["99.9%", "Airborne mould spores"],
              ["99%", "TVOCs"],
              ["96%", "Odour elimination"],
            ].map(([v, l], i) => (
              <Reveal key={l} i={i} className="rounded-2xl border border-line bg-surface/50 p-6">
                <dd className="tnum text-stat text-gradient">{v}</dd>
                <dt className="mt-4 text-ink">{l}</dt>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-faint">ARC® + BPI + ODOGard®</div>
              </Reveal>
            ))}
          </dl>
          <Link to="/results" className="mt-8 inline-flex items-center gap-2 text-sm text-accent hover:underline">
            See the full results and test conditions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* Comparison */}
      <Section surface>
        <div className="container">
          <Reveal className="max-w-3xl">
            <div className="eyebrow text-accent">Why it is different</div>
            <h2 className="mt-3 text-display-md font-medium text-ink">Most purifiers wait for air to reach them.</h2>
            <p className="mt-4 body-text">
              A conventional purifier is passive: it can only treat the air that physically passes through it, and it holds contaminants in the filter. The MOVE filters too, and then goes further.
            </p>
          </Reveal>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-line-strong font-mono text-[11px] uppercase tracking-wider text-faint">
                  <th className="py-4 pr-6 font-normal" />
                  <th className="py-4 pr-6 font-normal">Filter-only purifier</th>
                  <th className="py-4 font-normal text-accent">{store.productName}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {COMPARE.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="py-5 pr-6 font-medium text-ink">{r.label}</th>
                    <td className="py-5 pr-6 text-muted">{r.them}</td>
                    <td className="py-5 text-ink">
                      <span className="flex gap-2.5">
                        <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {r.us}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Specs + FAQ */}
      <Section>
        <div className="container grid gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="eyebrow text-accent">Specification</div>
            <h2 className="mt-3 text-display-sm font-medium text-ink">At a glance.</h2>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {SPECS.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 py-4 text-sm">
                  <dt className="text-faint">{k}</dt>
                  <dd className="text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                [Zap, "Works the day it arrives"],
                [Smartphone, "Readings in the app"],
                [Truck, "UAE delivery by Quiqup"],
              ].map(([Icon, label]) => {
                const I = Icon as typeof Zap;
                return (
                  <div key={label as string} className="flex items-center gap-3 rounded-2xl border border-line p-4 text-sm text-ink">
                    <I aria-hidden className="h-5 w-5 shrink-0 text-accent" /> {label as string}
                  </div>
                );
              })}
            </div>
          </Reveal>
          <Reveal i={1}>
            <div className="eyebrow text-accent">Questions</div>
            <h2 className="mt-3 text-display-sm font-medium text-ink">{storeLive() ? "Before you buy." : "Before you pre-order."}</h2>
            <Accordion items={FAQ} className="mt-8" />
          </Reveal>
        </div>
      </Section>

      {/* Closing buy band */}
      <section className="border-t border-line bg-surface/40 py-16">
        <div className="container grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,28rem)]">
          <div>
            <h2 className="text-display-sm font-medium text-ink">Cleaner air, from the day it arrives.</h2>
            <p className="mt-3 max-w-prose text-muted">Treating a whole property, a hotel or a building? We specify fixed systems that work through your air conditioning.</p>
            <Link to="/devices" className="mt-5 inline-flex items-center gap-2 text-sm text-accent hover:underline">
              See the full range <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <BuyBox compact />
        </div>
      </section>

      {/* Sticky buy bar */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/90 py-3 backdrop-blur-xl transition-transform duration-300",
          showBar ? "translate-y-0" : "translate-y-full",
        )}
        aria-hidden={!showBar}
      >
        <div className="container">
          <BuyBox compact />
        </div>
      </div>
    </>
  );
}
