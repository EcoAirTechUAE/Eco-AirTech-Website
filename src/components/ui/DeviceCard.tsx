import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Device } from "@/content/devices";
import { SmartImage } from "./SmartImage";
import { cn } from "@/lib/utils";

export function DeviceCard({ device, className }: { device: Device; className?: string }) {
  return (
    <Link
      to={`/devices/${device.slug}`}
      className={cn(
        "group card relative flex flex-col overflow-hidden p-7 transition-all duration-500 ease-out hover:border-accent/40 hover:bg-surface sm:p-8",
        className,
      )}
    >
      {/* The renders are supplied on black, so they are framed as product
          tiles rather than floated as cut-outs — consistent across the range
          and free of the halo a mismatched backdrop would produce. */}
      <div className="relative mb-7 h-44 overflow-hidden rounded-lg border border-line bg-black">
        <SmartImage
          src={device.image}
          alt={`${device.article} unit`}
          label={`${device.name} render`}
          ratio="h-44"
          className="h-full w-full object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <p className="font-mono text-[11px] uppercase tracking-wider text-accent">{device.kicker}</p>

      <h3 className="mt-3 flex items-start justify-between gap-3 text-2xl font-medium">
        {device.article}
        <ArrowUpRight
          aria-hidden
          className="mt-1 h-5 w-5 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </h3>

      <p className="tnum mt-1.5 text-sm text-muted">
        {device.coverage}
        {device.coverageNote && <span className="text-faint"> {device.coverageNote}</span>}
      </p>

      <p className="mt-5 flex-1 text-sm leading-relaxed text-muted">{device.summary}</p>

      <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-line pt-6">
        {device.stats.slice(0, 2).map((stat) => (
          <div key={stat.label}>
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="tnum block text-xl font-medium text-accent">{stat.value}</span>
              <span className="mt-1 block text-xs leading-snug text-muted">{stat.label}</span>
              <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wider text-faint">
                {stat.condition}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </Link>
  );
}
