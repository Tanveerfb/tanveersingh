"use client";

import type { JSX } from "react";
import { startTransition, useEffect, useState } from "react";
import { motion } from "framer-motion";
import DecryptedText from "@/components/DecryptedText";

const INTRO_STORAGE_KEY = "duke_intro_played";

const bootLines = [
  "> Initializing DukeOS core...",
  "> Authenticating operator...",
  "> Loading system modules...",
  "> Verifying memory integrity...",
  "> Optimizing UI pipeline...",
  "> Engaging hologram layer...",
  "> Boot sequence complete.",
];

const CRITICAL_KEYWORDS = ["core", "memory", "error", "integrity", "critical"];

export function triggerReboot(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(INTRO_STORAGE_KEY);
  window.location.reload();
}

function playSfx(src: string, volume = 1): void {
  if (typeof window === "undefined") return;
  const audio = new Audio(src);
  audio.volume = volume;
  void audio.play().catch(() => {
    // ignore playback errors (e.g., autoplay restrictions)
  });
}

export default function IntroSequence(): JSX.Element | null {
  const [hasPlayed, setHasPlayed] = useState<boolean | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [currentLine, setCurrentLine] = useState(0);
  const [currentCharCount, setCurrentCharCount] = useState(0);
  const [typing, setTyping] = useState(true);
  const [shake, setShake] = useState(false);
  const [aberrateLine, setAberrateLine] = useState(-1);
  const [bootCompleteVisible, setBootCompleteVisible] = useState(false);
  const [playedAccessSfx, setPlayedAccessSfx] = useState(false);
  const [playedCriticalSfx, setPlayedCriticalSfx] = useState(false);
  const [playedHumSfx, setPlayedHumSfx] = useState(false);

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
      });
      console.info("Intro skipped: duke_intro_played found in localStorage.");
      return;
    }

    startTransition(() => {
      setHasPlayed(false);
      setIntroDone(false);
      setIsVisible(true);
      setCurrentLine(0);
      setCurrentCharCount(0);
      setTyping(true);
      setPlayedAccessSfx(true);
      setPlayedCriticalSfx(false);
      setPlayedHumSfx(false);
    });

    playSfx("/sfx/terminal-access.mp3", 0.75);
  }, []);

  useEffect(() => {
    if (!isVisible || hasPlayed === null || hasPlayed) return;

    if (currentLine >= bootLines.length) {
      const finishTimeout = window.setTimeout(() => {
        setTyping(false);
        setBootCompleteVisible(true);
        if (!playedHumSfx) {
          playSfx("/sfx/soft-hum.mp3", 0.4);
          setPlayedHumSfx(true);
        }

        const completeTimeout = window.setTimeout(() => {
          setIsVisible(false);
          window.localStorage.setItem(INTRO_STORAGE_KEY, "true");
        }, 1600);

        const doneTimeout = window.setTimeout(() => {
          setIntroDone(true);
        }, 2300);

        return () => {
          window.clearTimeout(completeTimeout);
          window.clearTimeout(doneTimeout);
        };
      }, 0);

      return () => {
        window.clearTimeout(finishTimeout);
      };
    }

    const line = bootLines[currentLine];
    const lower = line.toLowerCase();
    const isCritical = CRITICAL_KEYWORDS.some((keyword) =>
      lower.includes(keyword),
    );

    let charIndex = 0;
    const startTypingTimeout = window.setTimeout(() => {
      setTyping(true);
    }, 0);

    const interval = window.setInterval(() => {
      charIndex += 1;
      setCurrentCharCount(charIndex);

      if (charIndex === 1) {
        setAberrateLine(currentLine);
        window.setTimeout(() => {
          setAberrateLine(-1);
        }, 280);

        if (isCritical && !playedCriticalSfx) {
          setShake(true);
          playSfx("/sfx/terminal-denied.mp3", 0.25);
          setPlayedCriticalSfx(true);
          window.setTimeout(() => {
            setShake(false);
          }, 220);
        }
      }

      if (charIndex >= line.length) {
        window.clearInterval(interval);
        setTyping(false);

        window.setTimeout(() => {
          setCurrentLine((prev) => prev + 1);
          setCurrentCharCount(0);
          if (!playedAccessSfx) {
            playSfx("/sfx/terminal-access.mp3", 0.65);
            setPlayedAccessSfx(true);
          }
        }, 260);
      }
    }, 40);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(startTypingTimeout);
    };
  }, [currentLine, isVisible, hasPlayed]);

  if (hasPlayed === null || introDone) {
    return null;
  }

  const renderedTextFor = (line: string, index: number): string => {
    if (index < currentLine) return line;
    if (index > currentLine) return "";
    return line.slice(0, currentCharCount);
  };

  return (
    <div className={`intro-overlay${isVisible ? "" : " intro-overlay-hide"}`}>
      <div className={`intro-wrapper ${shake ? "shake" : ""}`}>
        <div className="intro-depth-code" />
        <div className="intro-depth-particles" />
        <div className="intro-depth-scanline" />

        <div className="intro-lines">
          {bootLines.map((line, index) => (
            <p
              key={index}
              className={`intro-line${index === currentLine ? " active" : ""}${
                aberrateLine === index ? " aberrate" : ""
              }`}
            >
              {renderedTextFor(line, index)}
              {index === currentLine && typing && (
                <span className="cursor" aria-hidden>
                  █
                </span>
              )}
            </p>
          ))}

          {bootCompleteVisible && (
            <div className="boot-complete duke-fade-up">
              &gt; DukeOS Loaded Successfully
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
