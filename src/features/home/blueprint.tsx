"use client";

import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/class-names";

const LINE = "blueprint-stroke fill-none group-data-[reveal=in]/print:animate-draw motion-safe:group-data-[reveal=out]/print:[stroke-dashoffset:900]";
const LABEL = "fill-print font-mono text-[12px]";

// Where each blueprint label sits, in the order of LAB.blueprint.
const LABEL_POSITIONS = [
  { x: 20, y: 112 },
  { x: 296, y: 112 },
  { x: 14, y: 24 },
  { x: 262, y: 232 },
  { x: 228, y: 14, hot: true },
];

/** The AI core's schematic, which draws itself when it comes into view. Decoration only. */
export function Blueprint({ labels }: { labels: string[] }) {
  const { ref, reveal } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} data-reveal={reveal} className="group/print border-2 border-print bg-lab-2/70 p-3.5" aria-hidden="true">
      <svg viewBox="0 0 420 240" className="block h-auto w-full">
        <circle cx="210" cy="120" r="70" strokeWidth="2" className={cn(LINE, "stroke-print")} />
        <circle cx="210" cy="120" r="40" strokeWidth="2" className={cn(LINE, "stroke-gold")} />
        <path d="M140 120 H40 M280 120 H380 M210 50 V16 M210 190 V224 M160 70 L96 30 M260 170 L330 212" strokeWidth="1.5" className={cn(LINE, "stroke-print")} />
        <path d="M190 120 h40 M210 100 v40" strokeWidth="2" className={cn(LINE, "stroke-gold")} />
        {labels.map((label, index) => (
          <text key={label} x={LABEL_POSITIONS[index].x} y={LABEL_POSITIONS[index].y} className={cn(LABEL, LABEL_POSITIONS[index].hot && "fill-gold")}>
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}
