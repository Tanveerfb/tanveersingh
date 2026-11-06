"use client";

import { useEffect, useRef } from "react";
import { BEAM_STRUGGLE } from "@/content/lab";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/** Where the clash stands at a scroll position from 0 to 1: pushed back, then breaking through. */
function clashAt(progress: number): { x: number; ball: number; sfx: number; white: number } {
  if (progress < 0.22) return { x: 50, ball: (progress / 0.22) * 0.6, sfx: 0, white: 0 };
  if (progress < 0.72) {
    const k = (progress - 0.22) / 0.5;
    return { x: 50 - 14 * Math.sin(k * Math.PI) + Math.sin(k * 40) * 2, ball: 0.8 + 0.2 * Math.sin(k * 30), sfx: 1, white: 0 };
  }
  const k = clamp((progress - 0.72) / 0.2);
  const white = progress > 0.9 ? clamp((progress - 0.9) / 0.06) * (1 - clamp((progress - 0.96) / 0.04)) : 0;
  return { x: 50 + 50 * k * k, ball: 1 - k * 0.6, sfx: 0, white };
}

/** The scroll-driven clash between the lab and the work. Reduced motion shows one still moment. */
export function BeamStruggle() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const progress = reduced ? 0.55 : clamp(-rect.top / Math.max(1, rect.height - window.innerHeight));
      const { x, ball, sfx, white } = clashAt(progress);
      stage.style.setProperty("--x", `${x}%`);
      stage.style.setProperty("--ball", ball.toFixed(3));
      stage.style.setProperty("--sfx", String(sfx));
      stage.style.setProperty("--white", white.toFixed(3));
    };

    update();
    if (reduced) return;
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section ref={sectionRef} aria-label="Transition to the work" className="relative h-(--spacing-struggle) bg-ink motion-reduce:h-auto">
      <div ref={stageRef} className="clash-glow sticky top-0 h-screen overflow-hidden motion-reduce:relative motion-reduce:h-[70vh]">
        <div className="beam-bands absolute top-1/2 left-0 h-(--spacing-beam-band) w-(--x) -translate-y-1/2 rounded-r-[60px] border-y-5 border-r-5 border-ink" aria-hidden="true" />
        <div className="rival-bands absolute top-1/2 right-0 h-(--spacing-beam-band) w-[calc(100%-var(--x))] -translate-y-1/2 rounded-l-[60px] border-y-5 border-l-5 border-ink" aria-hidden="true" />
        <div className="clash-ball absolute top-1/2 left-(--x) aspect-square w-(--spacing-ball) -translate-x-1/2 -translate-y-1/2 scale-(--ball) rounded-full" aria-hidden="true" />
        <div
          className="absolute top-[14%] left-1/2 -translate-x-1/2 -rotate-[5deg] font-jp text-struggle-sfx font-black whitespace-nowrap text-gold opacity-(--sfx) [-webkit-text-stroke:3px_var(--color-ink)] [paint-order:stroke_fill]"
          aria-hidden="true"
        >
          ゴゴゴゴ
        </div>
        <div className="absolute bottom-[16%] left-1/2 w-[min(90%,640px)] -translate-x-1/2 text-center">
          <p className="cel-lettering m-0 font-display text-struggle tracking-cel text-paper">{BEAM_STRUGGLE.caption}</p>
          <p className="m-0 mt-1.5 text-muted">{BEAM_STRUGGLE.line}</p>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-paper opacity-(--white)" aria-hidden="true" />
      </div>
    </section>
  );
}
