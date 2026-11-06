import type { ReactNode } from "react";
import { cn } from "@/lib/class-names";

type SectionHeadingProps = {
  id: string;
  kicker: string;
  /** The section's title; `accent`, a word within it, is picked out in gold. */
  title: string;
  accent: string;
  kickerClassName?: string;
  children?: ReactNode;
};

/** A section's Japanese kicker and cel-lettered title. */
export function SectionHeading({ id, kicker, title, accent, kickerClassName = "text-orange", children }: SectionHeadingProps) {
  const [before, after] = title.split(accent);
  return (
    <>
      <p className={cn("m-0 mb-2 font-jp text-kicker font-black", kickerClassName)}>{kicker}</p>
      <h2 id={id} className="cel-lettering accent-gold m-0 mb-7 font-display text-h2 font-normal tracking-cel text-paper">
        {before}
        <em>{accent}</em>
        {after}
      </h2>
      {children}
    </>
  );
}
