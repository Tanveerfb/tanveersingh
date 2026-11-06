"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type MouseEvent } from "react";

export type TransmissionPhase = "idle" | "out" | "in";

function jumpTo(hash: string): void {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  target.scrollIntoView({ behavior: "instant", block: "start" });
  // Move keyboard and screen-reader users along with the page.
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  history.pushState(null, "", hash);
}

/**
 * Section jumps: streak out, jump, streak in. The overlay's `animationend` drives the phases, so
 * its timing lives only in the tokens. With reduced motion, the jump is immediate.
 */
export function useInstantTransmission() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<TransmissionPhase>("idle");
  const pending = useRef<string | null>(null);

  const onLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const hash = event.currentTarget.hash;
    if (!hash || !document.querySelector(hash)) return;
    event.preventDefault();
    if (reduced) {
      jumpTo(hash);
      return;
    }
    pending.current = hash;
    setPhase("out");
  };

  // Links elsewhere on the page opt in with `data-transmit`.
  useEffect(() => {
    const onDocumentClick = (event: globalThis.MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[data-transmit]");
      if (!link || !link.hash || !document.querySelector(link.hash)) return;
      event.preventDefault();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        jumpTo(link.hash);
        return;
      }
      pending.current = link.hash;
      setPhase("out");
    };
    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  const onOverlayAnimationEnd = () => {
    if (phase === "out" && pending.current) {
      jumpTo(pending.current);
      pending.current = null;
      setPhase("in");
    } else {
      setPhase("idle");
    }
  };

  return { phase, onLinkClick, onOverlayAnimationEnd };
}
