"use client";

import { useReveal } from "@/hooks/use-reveal";
import { BEAM_END_X, BEAM_START_X, beamEdge, beamSpiral } from "@/lib/beam-geometry";
import { cn } from "@/lib/class-names";

const OUTER = beamEdge(40, 4, 18, 0);
const MIDDLE = beamEdge(27, 3, 14, 1);
const CORE = beamEdge(13, 2, 10, 2);
const SPIRAL = beamSpiral();
const SPARK = "0,-46 10,-14 40,-30 20,-2 46,8 16,14 28,42 0,22 -24,40 -14,12 -44,4 -18,-6 -36,-34 -8,-16";

const ORB = "svg-origin-center group-data-[reveal=in]:animate-orb motion-safe:group-data-[reveal=out]:scale-0";

/**
 * The flowing beam: tapers from the orb with rippling edges, a spiral through the core and a
 * spark ring at the tip. Fires once when it comes into view; remount it (a new `key`) to fire
 * again. With reduced motion it is already fired.
 */
export function Beam({ className }: { className?: string }) {
  const { ref, reveal } = useReveal<HTMLDivElement>(0.4);
  return (
    <div ref={ref} data-reveal={reveal} className={cn("group beam-range relative h-50 overflow-hidden border-2 border-ink", className)} aria-hidden="true">
      <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
        <g className="group-data-[reveal=in]:animate-beam-wipe motion-safe:group-data-[reveal=out]:[clip-path:inset(0_100%_0_0)]">
          <polygon points={OUTER} className="fill-ki stroke-ink stroke-4" />
          <polygon points={MIDDLE} className="fill-ki-pale" />
          <polygon points={CORE} className="fill-white" />
          <path d={SPIRAL} className="beam-spiral-dash fill-none stroke-white stroke-2 opacity-70 group-data-[reveal=in]:animate-beam-spiral" />
        </g>
        <g transform={`translate(${BEAM_END_X} 100)`}>
          <polygon
            points={SPARK}
            className="svg-origin-center fill-gold-hi stroke-ink stroke-3 group-data-[reveal=in]:animate-spark motion-safe:group-data-[reveal=out]:opacity-0"
          />
        </g>
        <circle cx={BEAM_START_X} cy="100" r="34" className={cn(ORB, "fill-ki stroke-ink stroke-4")} />
        <circle cx={BEAM_START_X} cy="100" r="22" className={cn(ORB, "fill-ki-pale")} />
        <circle cx={BEAM_START_X} cy="100" r="12" className={cn(ORB, "fill-white")} />
      </svg>
    </div>
  );
}
