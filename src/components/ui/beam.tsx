"use client";

import { useEffect, useRef } from "react";
import { drawImpactBeam, type BeamColors, type BeamTiming } from "@/lib/beam-impact";
import { cn } from "@/lib/class-names";
import { cssDurationMs } from "@/lib/css-duration";

/**
 * The impact-frame beam. Fires once when it comes into view, then rests on its final still;
 * remount it (a new `key`) to fire again. With reduced motion it is already fired, with no flash.
 */
export function Beam({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!host || !canvas || !ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const token = (name: string) => styles.getPropertyValue(name).trim();
    const colors: BeamColors = {
      ink: token("--color-ink"),
      paper: token("--color-paper"),
      ki: token("--color-ki"),
      pale: token("--color-ki-pale"),
      white: token("--color-white"),
      hi: token("--color-gold-hi"),
      orange: token("--color-orange"),
    };
    const timing: BeamTiming = {
      charge: cssDurationMs(token("--duration-beam-charge")),
      travel: cssDurationMs(token("--duration-beam-travel")),
      end: cssDurationMs(token("--duration-beam")),
      impactFrame: cssDurationMs(token("--duration-impact-frame")),
    };
    const sfxFont = token("--font-jp");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let startedAt = 0;
    let width = 0;
    let height = 0;

    const measure = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = host.clientWidth;
      height = host.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const paint = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      drawImpactBeam(ctx, { width, height, t, timing, colors, sfxFont });
    };
    const frame = (now: number) => {
      const t = now - startedAt;
      paint(Math.min(t, timing.end));
      raf = t < timing.end ? requestAnimationFrame(frame) : 0;
    };

    measure();
    paint(timing.end);

    const resize = new ResizeObserver(() => {
      if (raf) return;
      measure();
      paint(timing.end);
    });
    resize.observe(host);

    const view = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        view.disconnect();
        if (reduced) return;
        startedAt = performance.now();
        raf = requestAnimationFrame(frame);
      },
      { threshold: 0.5 },
    );

    let cancelled = false;
    // The sound effect's font isn't preloaded, so fetch it before the first firing.
    document.fonts.load(`900 40px ${sfxFont}`, "ドン!").finally(() => {
      if (cancelled) return;
      if (!raf) paint(timing.end);
      view.observe(host);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      resize.disconnect();
      view.disconnect();
    };
  }, []);

  return (
    <div ref={hostRef} className={cn("beam-range relative h-beam overflow-hidden border-3 border-ink", className)} aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
