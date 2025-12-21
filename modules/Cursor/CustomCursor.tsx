"use client";

import type { JSX } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getMeltdownState,
  subscribeMeltdownState,
} from "@/modules/Chaos/Meltdown";

const CLICKABLE_SELECTOR =
  "a, button, [role='button'], .clickable, .diag-reactor-toggle";
const HOLO_FOCUS_SELECTOR =
  ".holo-focus, .holo-card, .holo-reveal, .diag-reactor-toggle, .diag-expanded";

function isClickable(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(target.closest(CLICKABLE_SELECTOR));
}

function isHoloFocus(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(target.closest(HOLO_FOCUS_SELECTOR));
}

export default function CustomCursor(): JSX.Element | null {
  const [enabled, setEnabled] = useState(true);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [lockOn, setLockOn] = useState(false);
  const [focusHover, setFocusHover] = useState(false);
  const [meltdownActive, setMeltdownActive] = useState(
    getMeltdownState().active
  );

  const meltdownActiveRef = useRef(meltdownActive);

  const positionTransform = useMemo(
    () =>
      `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
    [position.x, position.y]
  );

  useEffect(() => {
    const unsubscribe = subscribeMeltdownState((state) => {
      setMeltdownActive(state.active);
      if (state.active) {
        setIsVisible(true);
        setLockOn(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    meltdownActiveRef.current = meltdownActive;
  }, [meltdownActive]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(pointer: coarse)");

    const applyState = (isCoarse: boolean) => {
      if (isCoarse) {
        setEnabled(false);
        document.documentElement.classList.remove("custom-cursor-enabled");
      } else {
        setEnabled(true);
        document.documentElement.classList.add("custom-cursor-enabled");
      }
    };

    applyState(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      applyState(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (meltdownActiveRef.current) {
        setIsVisible(true);
        setLockOn(false);
        return;
      }
      setPosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
      const clickable = isClickable(event.target);
      const focusable = isHoloFocus(event.target);
      setFocusHover(focusable);
      setLockOn(clickable || focusable);
    };

    const handlePointerLeave = () => {
      if (meltdownActiveRef.current) {
        return;
      }
      setIsVisible(false);
      setLockOn(false);
      setFocusHover(false);
      setPosition({ x: -100, y: -100 });
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerdown", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  const classNames = [
    "custom-cursor",
    isVisible ? "custom-cursor--visible" : "",
    lockOn ? "custom-cursor--lock" : "",
    focusHover ? "custom-cursor--focus" : "",
    meltdownActive ? "custom-cursor--meltdown" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classNames}
      style={{ transform: positionTransform }}
      aria-hidden
    >
      <div className="cursor-core" />
      <div className="cursor-lock" />
    </div>
  );
}
