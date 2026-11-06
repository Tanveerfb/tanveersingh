"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/class-names";

/** The share of the page scrolled past which the meter burns gold: around the career's end. */
const GOLD_FROM = 0.3;

/** Fills with page scroll, down the left edge or across the top on a phone. Decoration only. */
export function KiMeter() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const meter = ref.current;
    if (!meter) return;
    const update = () => {
      const progress = Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
      meter.style.setProperty("--ki", progress.toFixed(3));
      meter.dataset.gold = String(progress > GOLD_FROM);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="group/ki fixed inset-x-0 top-0 z-20 h-1.5 bg-navy md:inset-x-auto md:top-6 md:bottom-6 md:left-3 md:h-auto md:w-3.5 md:border-3 md:border-ink md:shadow-cel-sm"
    >
      <i
        className={cn(
          "absolute inset-y-0 left-0 block w-[calc(var(--ki,0)*100%)] bg-linear-to-r from-ki to-ki-pale",
          "group-data-[gold=true]/ki:from-orange group-data-[gold=true]/ki:via-gold group-data-[gold=true]/ki:to-gold-hi",
          "md:inset-x-0 md:top-auto md:bottom-0 md:h-[calc(var(--ki,0)*100%)] md:w-auto md:bg-linear-to-t",
        )}
      />
    </div>
  );
}
