import type { ComponentProps } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/class-names";
import { flamePath } from "@/lib/flame-path";

const FLAME_LAYERS = [
  { className: "fill-orange group-hover:animate-sway-1 group-focus-visible:animate-sway-1", path: flamePath(400, 58, 13, 1, 7) },
  { className: "fill-gold group-hover:animate-sway-2 group-focus-visible:animate-sway-2", path: flamePath(400, 58, 11, 0.78, 3) },
  { className: "fill-gold-hi group-hover:animate-sway-3 group-focus-visible:animate-sway-3", path: flamePath(400, 58, 9, 0.5, 11) },
];

type CardProps = ComponentProps<"article"> & {
  /** Full power: wears the flame-tongue crest, which sways only while hovered or focused. */
  highlighted?: boolean;
};

const CARD = "relative grid gap-2 border-3 border-ink p-5 shadow-cel";

/** The cel card: a hard shadow that deepens on hover. */
export function Card({ highlighted = false, className, children, ...props }: CardProps) {
  return (
    <article
      className={cn(
        CARD,
        "group isolate transition-[translate,box-shadow] duration-(--duration-press) ease-snap hover:-translate-x-0.75 hover:-translate-y-0.75 hover:shadow-cel-lg focus-visible:-translate-x-0.75 focus-visible:-translate-y-0.75 focus-visible:shadow-cel-lg",
        highlighted ? "card-full-power mt-12" : "bg-navy",
        className,
      )}
      {...props}
    >
      {highlighted && (
        <svg className="card-crest pointer-events-none absolute -z-10 overflow-visible" viewBox="0 0 400 58" preserveAspectRatio="none" aria-hidden="true">
          {FLAME_LAYERS.map((layer) => (
            <path key={layer.className} d={layer.path} className={cn("flame-layer", layer.className)} />
          ))}
        </svg>
      )}
      {children}
    </article>
  );
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return <h3 className={cn("m-0 font-display text-cel-title tracking-cel text-paper", className)} {...props} />;
}

export function CardMeta({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("m-0 text-caption text-muted", className)} {...props} />;
}

export function CardBody({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("m-0 text-body-sm", className)} {...props} />;
}

/** A loading card, shaped like the result. */
export function CardSkeleton() {
  return (
    <div className={cn(CARD, "gap-2.5 bg-navy")} role="status" aria-label="Loading">
      <Skeleton shape="short" />
      <Skeleton shape="title" />
      <Skeleton />
      <Skeleton />
    </div>
  );
}
