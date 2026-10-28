import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { filterMyth } from "@/content/technology";

// A soft light behind each cut-out, so the open mesh visibly lets it through.
const backlight = {
  backgroundImage:
    "radial-gradient(closest-side, rgba(238,244,238,0.34), rgba(238,244,238,0.1) 60%, transparent)",
};

function Filter({ img, className = "" }: { img: (typeof filterMyth.images)[number]; className?: string }) {
  return (
    <figure className={`flex flex-col ${className}`}>
      <div className="flex flex-1 items-center justify-center p-4" style={backlight}>
        <img
          src={img.src}
          alt={`${img.label} pre-filter`}
          width={img.width}
          height={img.height}
          loading="lazy"
          decoding="async"
          className="h-auto max-h-full w-full max-w-full object-contain"
        />
      </div>
      <figcaption className="mt-3 text-center font-mono text-eyebrow uppercase tracking-wider text-faint">
        {img.label}
      </figcaption>
    </figure>
  );
}

export function FilterMyth() {
  const [aluminium, washable, synthetic] = filterMyth.images;
  return (
    <Section surface>
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal>
            <p className="eyebrow">{filterMyth.eyebrow}</p>
            <h2 className="mt-6 text-display-md font-medium">
              {filterMyth.headline.split(filterMyth.highlight)[0]}
              <span className="text-accent">{filterMyth.highlight}</span>
              {filterMyth.headline.split(filterMyth.highlight)[1]}
            </h2>
            <p className="mt-6 max-w-prose leading-relaxed text-muted">{filterMyth.body}</p>
            <p className="mt-6 max-w-prose leading-relaxed text-ink/90">{filterMyth.close}</p>
          </Reveal>

          <Reveal i={1}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              <Filter img={aluminium} className="col-span-2 mx-auto w-full max-w-[22rem]" />
              <Filter img={washable} />
              <Filter img={synthetic} />
            </div>
            <p className="mt-8 text-center text-sm leading-relaxed text-muted">{filterMyth.note}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
