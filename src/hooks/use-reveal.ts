"use client";

import { useInView } from "motion/react";
import { useRef, useSyncExternalStore, type RefObject } from "react";

/** `static` is the server's render, the final frame, so nothing depends on JavaScript to be read. */
export type RevealState = "static" | "out" | "in";

const subscribe = () => () => {};

/**
 * Plays an element's entrance when it scrolls into view, once. Put `reveal` on `data-reveal`;
 * styles hide the `out` state under `motion-safe:` and animate the `in` state.
 */
export function useReveal<T extends Element>(amount = 0.2): { ref: RefObject<T | null>; reveal: RevealState } {
  const ref = useRef<T>(null);
  const seen = useInView(ref, { once: true, amount });
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return { ref, reveal: !mounted ? "static" : seen ? "in" : "out" };
}
