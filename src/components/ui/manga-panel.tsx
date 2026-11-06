"use client";

import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/class-names";

/** The chapter page: paper gutters, ink text. Its panels slide in when it comes into view. */
export function MangaPage({ className, children, ...props }: ComponentProps<"div">) {
  // A long page may be taller than the screen, so a small part in view is enough to start it.
  const { ref, reveal } = useReveal<HTMLDivElement>(0.05);
  return (
    <div
      ref={ref}
      data-reveal={reveal}
      className={cn("group/page grid grid-cols-1 gap-2.5 overflow-hidden bg-paper text-on-paper min-[480px]:grid-cols-2 [&_:focus-visible]:outline-ink", className)}
      {...props}
    >
      {children}
    </div>
  );
}

type PanelMotion = {
  /** Which side it slides in from. */
  from?: "left" | "right";
  /** Its place in the page's sequence. */
  order?: number;
  wide?: boolean;
};

function panelStyle(from: PanelMotion["from"], order: number): CSSProperties {
  return { "--i": order, "--panel-from": from === "right" ? "60px" : "-60px" } as CSSProperties;
}

const PANEL = "relative min-w-0 overflow-hidden border-4 border-ink group-data-[reveal=in]/page:animate-panel-slide motion-safe:group-data-[reveal=out]/page:opacity-0";

function SpeedLines() {
  return <span className="speed-lines pointer-events-none absolute inset-0 opacity-0 group-data-[reveal=in]/page:animate-speed-fade" aria-hidden="true" />;
}

type MangaPanelProps = PanelMotion & { children: ReactNode; className?: string };

/** A black and white panel, sliding in with speed lines. */
export function MangaPanel({ from = "left", order = 0, wide = false, className, children }: MangaPanelProps) {
  return (
    <article style={panelStyle(from, order)} className={cn(PANEL, "bg-white p-4", wide && "col-span-full", className)}>
      <SpeedLines />
      {children}
    </article>
  );
}

export function MangaPanelTitle({ className, ...props }: ComponentProps<"h3">) {
  return <h3 className={cn("my-1.5 font-display text-cel-title tracking-cel", className)} {...props} />;
}

export function MangaPanelText({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("m-0 text-sm", className)} {...props} />;
}

/** A wordless action panel: radiating lines and a sound effect. Decoration only. */
export function MangaActionPanel({ sfx, from = "right", order = 0, wide = false, className }: PanelMotion & { sfx: string; className?: string }) {
  return (
    <div style={panelStyle(from, order)} className={cn(PANEL, "action-lines grid min-h-30 place-items-center", wide && "col-span-full", className)} aria-hidden="true">
      <SpeedLines />
      <span className="absolute aspect-square w-[46%] rounded-full bg-white" />
      <span className="relative -rotate-6 font-jp text-sfx-lg font-black text-orange [-webkit-text-stroke:3px_var(--color-ink)] [paint-order:stroke_fill]">{sfx}</span>
    </div>
  );
}
