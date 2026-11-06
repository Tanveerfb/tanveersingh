"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { drawFlowingFlame, type FlameBox } from "@/lib/aura-flame";
import { cn } from "@/lib/class-names";

const CHARGING = ["--color-ki-deep", "--color-ki-soft", "--color-ki-hi"];
const GOLDEN = ["--color-orange", "--color-gold", "--color-gold-hi"];
const LAYERS = [
  { scale: 1.15, alpha: 0.6, phase: 0 },
  { scale: 0.98, alpha: 0.8, phase: 2 },
  { scale: 0.78, alpha: 0.7, phase: 4 },
];
const POINTER_MOVE_RUN_MS = 500;
const POINTER_LEAVE_RUN_MS = 400;

type AuraProps = {
  /** What burns: the aura sizes itself around this. */
  children: ReactNode;
  className?: string;
};

/**
 * The flowing aura: smooth flame tongues, blue while charging and then gold. It plays once, then
 * moves only while the cursor is over it, leaning toward the cursor. Nothing loops in the
 * background; reduced motion paints the final golden frame. Remount it (a new `key`) to replay.
 */
export function Aura({ children, className }: AuraProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const target = targetRef.current;
    const ctx = canvas?.getContext("2d");
    if (!stage || !canvas || !target || !ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const token = (name: string) => styles.getPropertyValue(name).trim();
    const charging = CHARGING.map(token);
    const golden = GOLDEN.map(token);
    const chargeMs = parseFloat(token("--duration-aura-charge"));
    const playMs = parseFloat(token("--duration-aura"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let until = 0;
    let startedAt = performance.now();
    let lean = 0;
    let width = 0;
    let height = 0;
    let box: FlameBox = { cx: 0, cy: 0, rx: 0, ry: 0 };

    const measure = () => {
      const stageRect = stage.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = stageRect.width;
      height = stageRect.height;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      box = {
        cx: targetRect.left - stageRect.left + targetRect.width / 2,
        cy: targetRect.top - stageRect.top + targetRect.height * 0.6,
        rx: Math.min(width * 0.45, targetRect.width * 0.62),
        ry: targetRect.height * 0.55,
      };
    };

    const paint = (now: number) => {
      const elapsed = now - startedAt;
      const colors = reduced || elapsed > chargeMs ? golden : charging;
      ctx.clearRect(0, 0, width, height);
      LAYERS.forEach((layer, index) => {
        ctx.globalAlpha = layer.alpha;
        drawFlowingFlame(ctx, box, layer.scale, colors[index], elapsed / 1000, layer.phase, lean);
      });
      ctx.globalAlpha = 1;
    };

    const frame = (now: number) => {
      paint(now);
      raf = now < until ? requestAnimationFrame(frame) : 0;
    };

    const run = (ms: number) => {
      until = Math.max(until, performance.now() + ms);
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      lean = Math.max(-1, Math.min(1, (event.clientX - rect.left - box.cx) / (rect.width / 2))) * 0.6;
      run(POINTER_MOVE_RUN_MS);
    };
    const onPointerLeave = () => {
      lean = 0;
      run(POINTER_LEAVE_RUN_MS);
    };

    const resize = new ResizeObserver(() => {
      measure();
      paint(performance.now());
    });
    resize.observe(stage);

    let cancelled = false;
    // Lettering changes size when its font arrives, so wait before measuring for the first play.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      measure();
      startedAt = performance.now();
      if (reduced) paint(startedAt);
      else run(playMs);
    });

    if (!reduced) {
      stage.addEventListener("pointermove", onPointerMove);
      stage.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      resize.disconnect();
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div ref={stageRef} className={cn("aura-stage relative isolate grid place-items-center overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 -z-10 size-full" aria-hidden="true" />
      <div ref={targetRef}>{children}</div>
    </div>
  );
}
