import { cn } from "@/lib/class-names";

const SHAPES = {
  line: "h-3.5",
  short: "h-3.5 w-2/5",
  title: "h-6 w-3/5",
} as const;

/** A drifting screentone block, in the shape of what is loading. */
export function Skeleton({ shape = "line", className }: { shape?: keyof typeof SHAPES; className?: string }) {
  return <span className={cn("screentone block animate-tone", SHAPES[shape], className)} aria-hidden="true" />;
}
