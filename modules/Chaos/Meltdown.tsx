"use client";

import type { JSX } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type MeltdownGlobalState = {
  active: boolean;
  cooldown: boolean;
};

type MeltdownListener = (state: MeltdownGlobalState) => void;

let meltdownState: MeltdownGlobalState = {
  active: false,
  cooldown: false,
};

const meltdownListeners = new Set<MeltdownListener>();

let startMeltdownRef: (() => boolean) | null = null;

function emitMeltdownState(): void {
  meltdownListeners.forEach((listener) => listener(meltdownState));
}

function updateMeltdownState(partial: Partial<MeltdownGlobalState>): void {
  meltdownState = {
    ...meltdownState,
    ...partial,
  };
  emitMeltdownState();
}

export function subscribeMeltdownState(listener: MeltdownListener): () => void {
  meltdownListeners.add(listener);
  listener(meltdownState);
  return () => {
    meltdownListeners.delete(listener);
  };
}

export function getMeltdownState(): MeltdownGlobalState {
  return meltdownState;
}

export function isMeltdownCoolingDown(): boolean {
  return meltdownState.cooldown;
}

export function isMeltdownActive(): boolean {
  return meltdownState.active;
}

export function triggerMeltdown(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  if (!startMeltdownRef) {
    return false;
  }

  return startMeltdownRef();
}

function playSound(
  src: string,
  volume = 1,
  loop = false
): HTMLAudioElement | null {
  if (typeof Audio === "undefined") {
    return null;
  }

  try {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.loop = loop;
    void audio.play().catch(() => undefined);
    return audio;
  } catch {
    return null;
  }
}

function emitConsoleLines(lines: string[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("duke-meltdown-log", {
      detail: {
        lines,
      },
    })
  );
}

const chaosLines = [
  "> FIREWALL LOST",
  "> DATA NODES UNSTABLE",
  "> MEMORY CORRUPTED",
  "> NEURAL LINK FAILURE",
  "> CORE TEMPERATURE SPIKING",
  "> SIGNAL NOISE +900%",
  "> ROUTER CHOKE DETECTED",
  "> AI KERNEL DESYNC",
];

const recoveryLines = [
  "> DUKEOS RECOVERY MODE ENGAGED",
  "> Restoring system files...",
  "> Cleaning corrupted nodes...",
  "> Re-linking neural pathways...",
];

const stableLines = ["> SYSTEM STATUS: STABLE", "> OPERATOR: DUKE"];

const sequenceSchedule = [
  { phase: 0, delay: 0 },
  { phase: 1, delay: 400 },
  { phase: 2, delay: 1500 },
  { phase: 3, delay: 2200 },
  { phase: 4, delay: 4500 },
  { phase: 5, delay: 5700 },
  { phase: 6, delay: 7000 },
] as const;

const COMPLETE_TIMEOUT = 10000;
const COOLDOWN_TIMEOUT = 30000;

let alarmAudio: HTMLAudioElement | null = null;

export function Meltdown(): JSX.Element | null {
  const [meltdownActive, setMeltdownActive] = useState(false);
  const [phase, setPhase] = useState<number>(-1);
  const [cooldown, setCooldown] = useState(false);

  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const humAudioRef = useRef<HTMLAudioElement | null>(null);
  const pointerBackupRef = useRef<string>("");
  const cooldownRef = useRef(false);
  const meltdownActiveRef = useRef(false);

  const chaosDisplay = useMemo(() => chaosLines, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const stopAlarm = useCallback(() => {
    if (alarmAudio) {
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
    }
  }, []);

  const startAlarm = useCallback(() => {
    if (typeof Audio === "undefined") {
      return;
    }

    try {
      if (!alarmAudio) {
        alarmAudio = new Audio("/sfx/alarm_crisis.mp3");
        alarmAudio.loop = true;
      }

      alarmAudio.loop = true;
      alarmAudio.currentTime = 0;
      alarmAudio.volume = 0.9;
      void alarmAudio.play().catch(() => undefined);
    } catch {
      // ignore playback errors
    }
  }, []);

  const endSequence = useCallback(() => {
    clearTimers();
    setPhase(-1);
    setMeltdownActive(false);
    meltdownActiveRef.current = false;

    if (humAudioRef.current) {
      humAudioRef.current.pause();
      humAudioRef.current = null;
    }
    stopAlarm();

    document.body.classList.remove("meltdown-distort");
    document.body.style.pointerEvents = pointerBackupRef.current;

    setCooldown(true);
    cooldownRef.current = true;
    updateMeltdownState({ cooldown: true, active: false });

    const cooldownTimer = setTimeout(() => {
      setCooldown(false);
      cooldownRef.current = false;
      updateMeltdownState({ cooldown: false });
    }, COOLDOWN_TIMEOUT);

    timersRef.current.push(cooldownTimer);
  }, [clearTimers, stopAlarm]);

  const startSequence = useCallback(() => {
    if (meltdownActiveRef.current || cooldownRef.current) {
      return;
    }

    clearTimers();

    pointerBackupRef.current = document.body.style.pointerEvents;
    document.body.style.pointerEvents = "none";
    document.body.classList.add("meltdown-distort");

    setPhase(0);
    setMeltdownActive(true);
    meltdownActiveRef.current = true;
    updateMeltdownState({ active: true });

    stopAlarm();
    if (humAudioRef.current) {
      humAudioRef.current.pause();
      humAudioRef.current = null;
    }

    sequenceSchedule.forEach(({ phase: scheduledPhase, delay }) => {
      const timer = setTimeout(() => {
        setPhase(scheduledPhase);

        if (scheduledPhase === 1) {
          startAlarm();
        }

        if (scheduledPhase === 4) {
          stopAlarm();
        }

        if (scheduledPhase === 5) {
          humAudioRef.current = playSound("/sfx/hum_recovery.mp3", 0.35, true);
        }

        if (scheduledPhase === 6) {
          if (humAudioRef.current) {
            humAudioRef.current.pause();
            humAudioRef.current = null;
          }
          emitConsoleLines(stableLines);
        }
      }, delay);

      timersRef.current.push(timer);
    });

    const completionTimer = setTimeout(() => {
      endSequence();
    }, COMPLETE_TIMEOUT);

    timersRef.current.push(completionTimer);
  }, [clearTimers, endSequence, startAlarm, stopAlarm]);

  useEffect(() => {
    cooldownRef.current = cooldown;
  }, [cooldown]);

  useEffect(() => {
    meltdownActiveRef.current = meltdownActive;
  }, [meltdownActive]);

  useEffect(() => {
    updateMeltdownState({ active: meltdownActive });

    if (!meltdownActive && phase === -1) {
      document.body.classList.remove("meltdown-distort");
    }
  }, [meltdownActive, phase]);

  useEffect(() => {
    if (meltdownActive) {
      document.body.classList.add("meltdown-distort");
    }
  }, [meltdownActive]);

  useEffect(() => {
    startMeltdownRef = () => {
      if (meltdownActiveRef.current || cooldownRef.current) {
        return false;
      }
      startSequence();
      return true;
    };

    return () => {
      startMeltdownRef = null;
    };
  }, [startSequence]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    (
      window as typeof window & { triggerMeltdown?: () => boolean }
    ).triggerMeltdown = triggerMeltdown;

    return () => {
      const win = window as typeof window & { triggerMeltdown?: () => boolean };
      if (win.triggerMeltdown === triggerMeltdown) {
        delete win.triggerMeltdown;
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      clearTimers();
      if (humAudioRef.current) {
        humAudioRef.current.pause();
        humAudioRef.current = null;
      }
      stopAlarm();
      document.body.style.pointerEvents = pointerBackupRef.current;
      document.body.classList.remove("meltdown-distort");
      updateMeltdownState({ active: false, cooldown: false });
    };
  }, [clearTimers, stopAlarm]);

  const overlayActive = meltdownActive || phase >= 0;

  const recoveryDisplay = useMemo(() => recoveryLines, []);

  if (!overlayActive) {
    return null;
  }

  return (
    <div className={`meltdown-overlay ${meltdownActive ? "is-active" : ""}`}>
      {phase === 0 && <div className="meltdown-flicker" />}

      {phase === 1 && (
        <div className="meltdown-alert">
          <div className="meltdown-text">!!! SYSTEM BREACH DETECTED !!!</div>
          <div className="meltdown-text">!!! CRITICAL FAILURE !!!</div>
          <div className="meltdown-glitch meltdown-glitch--one" />
          <div className="meltdown-glitch meltdown-glitch--two" />
        </div>
      )}

      {phase === 2 && (
        <div className="meltdown-shatter">
          <span className="fragment fragment-a" />
          <span className="fragment fragment-b" />
          <span className="fragment fragment-c" />
        </div>
      )}

      {phase === 3 && (
        <div className="meltdown-chaos">
          {chaosDisplay.map((line, index) => (
            <p key={index} className={`chaos-line chaos-line-${index % 4}`}>
              {line}
            </p>
          ))}
        </div>
      )}

      {phase === 4 && <div className="meltdown-blackout" />}

      {phase === 5 && (
        <div className="meltdown-recovery">
          {recoveryDisplay.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      )}

      {phase === 6 && (
        <div className="meltdown-stable">
          {stableLines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}
