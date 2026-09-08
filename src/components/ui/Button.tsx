import { Link } from "react-router-dom";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "whatsapp";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-grad text-[#04140A] shadow-[0_0_0_0_hsl(var(--accent)/0.4)] hover:shadow-[0_8px_32px_-6px_hsl(var(--accent)/0.5)] hover:brightness-110",
  outline:
    "border border-line-strong bg-surface/60 text-ink hover:border-accent/50 hover:bg-surface2 backdrop-blur-sm",
  ghost: "text-muted hover:text-ink",
  whatsapp: "bg-[#25D366] text-[#04140A] hover:brightness-110",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-[0.95rem]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  to,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & { to: string } & Omit<ComponentProps<typeof Link>, "to" | "className">) {
  return (
    <Link to={to} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Link>
  );
}

export function ButtonAnchor({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & ComponentProps<"a">) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </a>
  );
}
