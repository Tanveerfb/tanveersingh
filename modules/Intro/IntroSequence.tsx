"use client";

import type { JSX } from "react";
import { startTransition, useEffect, useState } from "react";
import { motion } from "framer-motion";
import DecryptedText from "@/components/DecryptedText";

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
    <motion.div
      className={`intro-overlay${isVisible ? "" : " intro-overlay-hide"}`}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      <motion.div
        className="intro-terminal"
        initial={{ scale: 0.98, y: 6 }}
        animate={{ scale: isVisible ? 1 : 0.98, y: isVisible ? 0 : 6 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {visibleLines.map((line, index) => (
          <motion.p
            key={`${line}-${index}`}
            className="intro-line"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <DecryptedText
              text={line}
              animateOn="view"
              parentClassName="line-text intro-glitch"
              speed={100}
              maxIterations={50}
            />
            <span className="caret" aria-hidden>
              ▍
            </span>
          </motion.p>
        ))}
      </motion.div>
    </motion.div>
  );
}
