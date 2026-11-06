"use client";

import { useReveal } from "@/hooks/use-reveal";

const BUBBLES = [0, 1, 2, 3];

type SpecimenTubeProps = {
  /** The readout code: "UNIT · RDX". */
  code: string;
  name: string;
  description: string;
  status: string;
};

/**
 * The capsule chamber: metal caps, glass, and a golden core that forms once the liquid fills it,
 * as it comes into view. Hovering boils it. The name plate below holds everything to read.
 */
export function SpecimenTube({ code, name, description, status }: SpecimenTubeProps) {
  const { ref, reveal } = useReveal<HTMLElement>();
  return (
    <article
      ref={ref}
      data-reveal={reveal}
      className="group grid grid-rows-[var(--spacing-cap)_var(--spacing-glass)_var(--spacing-cap)_1fr]"
    >
      <div className="tube-cap -mx-1 rounded-md border-3 border-ink shadow-cel-sm" />
      <div className="relative isolate overflow-hidden border-x-3 border-ink bg-lab-2" aria-hidden="true">
        <span className="tube-sheen absolute inset-y-0 left-[14%] w-[8%]" />
        <span className="tube-liquid absolute inset-x-0 bottom-0 -z-10 h-full group-data-[reveal=in]:transition-[height] group-data-[reveal=in]:duration-(--duration-fill) group-data-[reveal=in]:ease-fill motion-safe:group-data-[reveal=out]:h-0" />
        <span className="tube-core absolute top-[46%] left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-3 border-ink group-hover:animate-bob group-data-[reveal=in]:transition-[scale] group-data-[reveal=in]:delay-(--duration-burst) group-data-[reveal=in]:duration-(--duration-core) group-data-[reveal=in]:ease-snap motion-safe:group-data-[reveal=out]:scale-0" />
        {BUBBLES.map((index) => (
          <i
            key={index}
            style={{ "--i": index } as React.CSSProperties}
            className="tube-bubble absolute rounded-full border-2 border-white/60 opacity-0 group-hover:animate-bubble"
          />
        ))}
      </div>
      <div className="tube-cap -mx-1 rounded-md border-3 border-ink shadow-cel-sm" />
      <div className="mt-2.5 border-3 border-ink bg-lab p-4 shadow-cel-sm">
        <span className="font-mono text-code/none tracking-code text-lens">{code}</span>
        <h3 className="mt-1.5 mb-1 font-display text-cel-title tracking-cel wrap-anywhere text-paper">{name}</h3>
        <p className="m-0 text-sm">{description}</p>
        <span className="mt-2 inline-block bg-lens px-1.75 py-1 font-mono text-code/none tracking-readout text-on-lens">{status}</span>
      </div>
    </article>
  );
}
