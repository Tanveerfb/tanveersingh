"use client";

import type { JSX } from "react";
import { startTransition, useEffect, useState } from "react";

const INTRO_STORAGE_KEY = "duke_intro_played";

const introLines = [
  "> Initializing DukeOS...",
  "> Loading neural modules...",
  "> Connecting to NeonGrid Network...",
  "> Decrypting identity...",
  "> Boot sequence complete.",
];

export function triggerReboot(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(INTRO_STORAGE_KEY);
  window.location.reload();
}

export default function IntroSequence(): JSX.Element | null {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [hasPlayed, setHasPlayed] = useState<boolean | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    (
      window as typeof window & { triggerDukeReboot?: () => void }
    ).triggerDukeReboot = triggerReboot;
    return () => {
      delete (window as typeof window & { triggerDukeReboot?: () => void })
        .triggerDukeReboot;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const played = window.localStorage.getItem(INTRO_STORAGE_KEY) === "true";

    if (played) {
      startTransition(() => {
        setHasPlayed(true);
        setIntroDone(true);
        setIsVisible(false);
        setVisibleLines([]);
      });
      console.info("Intro skipped: duke_intro_played found in localStorage.");
      return;
    }

    startTransition(() => {
      setHasPlayed(false);
      setIntroDone(false);
      setIsVisible(true);
      setVisibleLines([]);
    });

    const timeouts: NodeJS.Timeout[] = [];

    introLines.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, index * 1500);
      timeouts.push(timeout);
    });

    const finishTimeout = setTimeout(() => {
      setIsVisible(false);
      window.localStorage.setItem(INTRO_STORAGE_KEY, "true");
    }, introLines.length * 1500 + 750);

    const hideTimeout = setTimeout(() => {
      setIntroDone(true);
    }, introLines.length * 1500 + 1500);

    timeouts.push(finishTimeout, hideTimeout);

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  if (hasPlayed === null || introDone) {
    return null;
  }

  return (
    <div className={`intro-overlay${isVisible ? "" : " intro-overlay-hide"}`}>
      <div className="intro-terminal">
        {visibleLines.map((line, index) => (
          <p key={index} className="intro-line">
            <span className="line-text intro-glitch">{line}</span>
            <span className="caret" aria-hidden>
              ▍
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}
