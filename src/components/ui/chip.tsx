import { cn } from "@/lib/class-names";

type ChipProps = {
  /** One katakana mark, decoration only. */
  mark: string;
  label: string;
  className?: string;
};

/** The sound-effect chip: a slanted ink badge for tiers, tags and stack. */
export function Chip({ mark, label, className }: ChipProps) {
  return (
    <span className={cn("clip-chip inline-flex items-baseline gap-1.5 justify-self-start bg-ink px-3 pt-1.5 pb-1.25 font-display text-base/none tracking-cel text-paper", className)}>
      <b className="font-jp text-caption/none font-black text-gold" aria-hidden="true">
        {mark}
      </b>
      {label}
    </span>
  );
}
