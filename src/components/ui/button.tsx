import { Slot } from "radix-ui";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/class-names";

const VARIANTS = {
  primary:
    "bg-gold text-on-gold border-ink shadow-cel hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-cel-lift active:translate-x-0.75 active:translate-y-0.75 active:shadow-cel-press",
  secondary:
    "bg-blue text-on-blue border-ink shadow-cel hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-cel-lift active:translate-x-0.75 active:translate-y-0.75 active:shadow-cel-press",
  ghost: "bg-transparent text-paper border-line hover:border-gold hover:text-gold",
} as const;

const SIZES = {
  sm: "text-cel-sm px-3.5 pt-2 pb-1.75",
  md: "text-cel px-5 pt-3 pb-2.5",
  lg: "text-cel-lg px-7 pt-4 pb-3.25",
} as const;

type ButtonProps = ComponentProps<"button"> & {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  /** Shows a spinner and blocks repeat presses, keeping the button's colours. */
  loading?: boolean;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** Renders the single child (a link, usually) as the button. */
  asChild?: boolean;
};

/** The cel slab: flat fill, ink outline, hard shadow. Lifts on hover, sinks flat on press. */
export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  asChild = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot.Root : "button";
  return (
    <Component
      type={asChild ? undefined : "button"}
      disabled={asChild ? undefined : disabled || loading}
      aria-busy={loading || undefined}
      data-loading={loading}
      className={cn(
        "inline-flex items-center gap-2 border-3 font-display tracking-cel no-underline",
        "transition-[translate,box-shadow] duration-(--duration-press) ease-snap",
        VARIANTS[variant],
        SIZES[size],
        fullWidth && "w-full justify-center",
        "data-[loading=true]:pointer-events-none",
        "data-[loading=false]:disabled:translate-none data-[loading=false]:disabled:cursor-not-allowed data-[loading=false]:disabled:border-dashed data-[loading=false]:disabled:border-ink data-[loading=false]:disabled:bg-navy data-[loading=false]:disabled:text-muted data-[loading=false]:disabled:shadow-none",
        className,
      )}
      {...props}
    >
      {loading && <span className="size-4 animate-spinner rounded-full border-3 border-current border-r-transparent" aria-hidden="true" />}
      {!loading && leadingIcon}
      <Slot.Slottable>{children}</Slot.Slottable>
      {trailingIcon}
    </Component>
  );
}
