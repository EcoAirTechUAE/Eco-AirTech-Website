import type { ComponentProps, ReactNode } from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-lg border border-line-strong bg-surface/70 px-4 py-3 text-sm text-ink placeholder:text-faint transition-colors duration-200 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40 disabled:opacity-50";

interface BaseProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
}

function Wrapper({
  id,
  label,
  error,
  hint,
  required,
  className,
  children,
}: BaseProps & { id: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {!required && <span className="ml-1.5 text-xs font-normal text-faint">optional</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-warn">
          {error}
        </p>
      ) : (
        hint && <p className="mt-2 text-xs text-faint">{hint}</p>
      )}
    </div>
  );
}

export function TextField({
  label,
  error,
  hint,
  required,
  className,
  ...props
}: BaseProps & ComponentProps<"input">) {
  const id = useId();
  return (
    <Wrapper
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      className={className}
    >
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(control, error && "border-warn/60")}
        {...props}
      />
    </Wrapper>
  );
}

export function TextArea({
  label,
  error,
  hint,
  required,
  className,
  ...props
}: BaseProps & ComponentProps<"textarea">) {
  const id = useId();
  return (
    <Wrapper
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      className={className}
    >
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(control, "min-h-32 resize-y", error && "border-warn/60")}
        {...props}
      />
    </Wrapper>
  );
}

export function SelectField({
  label,
  error,
  hint,
  required,
  className,
  options,
  ...props
}: BaseProps & ComponentProps<"select"> & { options: string[] }) {
  const id = useId();
  return (
    <Wrapper
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      className={className}
    >
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(control, "appearance-none bg-[right_1rem_center] bg-no-repeat pr-10", error && "border-warn/60")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5l5-5' stroke='%238FA396' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")",
        }}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-surface2 text-ink">
            {option}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}
