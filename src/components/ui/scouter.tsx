"use client";

import { useReducedMotion } from "motion/react";
import { useState } from "react";

/** One skill's reading. Real, dated facts only: never an invented number. */
export type ScouterReading = {
  skill: string;
  lines: string[];
  /** The biggest readings overload the lens. */
  overload?: boolean;
};

type Scan = { reading: ScouterReading; run: number; finished: boolean };

/** The green lens: pick a skill, the reading types in, and the biggest overload it with a ボン. */
export function Scouter({ readings }: { readings: ScouterReading[] }) {
  const reduced = useReducedMotion();
  const [scan, setScan] = useState<Scan | null>(null);

  const start = (reading: ScouterReading) => {
    setScan((current) => ({ reading, run: (current?.run ?? 0) + 1, finished: Boolean(reduced) }));
  };
  const finish = () => setScan((current) => current && { ...current, finished: true });

  const status = !scan ? "SCOUTER READY" : scan.finished ? "READING COMPLETE" : "SCANNING…";

  return (
    <div className="grid gap-3.5">
      <div className="relative">
        <div
          aria-live="polite"
          className="lens-face relative grid min-h-52.5 content-center gap-1.5 overflow-hidden rounded-lens border-4 border-ink p-5.5 font-mono text-lens-text shadow-cel-lg"
        >
          <span className="lens-scanlines pointer-events-none absolute inset-0" aria-hidden="true" />
          <span>{status}</span>
          <span className="font-display text-cel-xl tracking-cel text-white [-webkit-text-stroke:var(--cel-stroke-sm)_var(--color-lens-dark)] [paint-order:stroke_fill]">
            {scan?.reading.skill ?? "Pick a skill"}
          </span>
          {scan && (
            <ul key={scan.run} className="m-0 grid list-none gap-0.75 p-0 text-caption">
              {scan.reading.lines.map((line, index) => (
                <li
                  key={line}
                  style={{ "--i": index } as React.CSSProperties}
                  onAnimationEnd={index === scan.reading.lines.length - 1 ? finish : undefined}
                  className="animate-reading before:text-gold before:content-['▸_']"
                >
                  {line}
                </li>
              ))}
            </ul>
          )}
        </div>
        {scan?.finished && scan.reading.overload && (
          <div key={scan.run} className="pointer-events-none absolute -top-8.5 -right-1.5 z-10 grid aspect-[1.4] w-37.5 animate-boom place-items-center" aria-hidden="true">
            <svg className="absolute inset-0 size-full" viewBox="0 0 200 140" preserveAspectRatio="none">
              <polygon
                points="100,4 116,40 160,14 140,54 196,58 146,78 178,122 124,96 104,136 88,98 30,128 58,82 4,66 56,52 30,12 82,40"
                className="fill-gold-hi stroke-ink stroke-3"
              />
            </svg>
            <span className="relative -rotate-[8deg] font-jp text-sfx-sm font-black text-gold [-webkit-text-stroke:3px_var(--color-ink)] [paint-order:stroke_fill]">ボン!</span>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {readings.map((reading) => (
          <button
            key={reading.skill}
            type="button"
            aria-pressed={scan?.reading.skill === reading.skill}
            onClick={() => start(reading)}
            className="cursor-crosshair border-2 border-ink bg-navy px-2.75 py-2.25 text-sm/none font-semibold text-text shadow-cel-sm aria-pressed:bg-lens aria-pressed:text-on-lens"
          >
            {reading.skill}
          </button>
        ))}
      </div>
    </div>
  );
}
