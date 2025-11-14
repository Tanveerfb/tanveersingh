"use client";

import type { JSX } from "react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import siteData from "@/content/siteData.json";
import { triggerReboot } from "@/modules/Intro/IntroSequence";
import {
  getMeltdownState,
  subscribeMeltdownState,
  triggerMeltdown,
} from "@/modules/Chaos/Meltdown";

const COMMANDS = ["help", "stats", "theme", "clear", "reboot"] as const;
type Command = (typeof COMMANDS)[number];

const MELTDOWN_COMMANDS = new Set([
  "hack",
  "break",
  "selfdestruct",
  "duke.exe overload",
]);

interface ConsoleLine {
  id: number;
  content: string;
}

let lineId = 0;

function nextId() {
  lineId += 1;
  return lineId;
}

function playTone(src: string, volume = 0.45): void {
  if (typeof Audio === "undefined") {
    return;
  }

  try {
    const audio = new Audio(src);
    audio.volume = volume;
    void audio.play().catch(() => undefined);
  } catch {
    // ignore playback errors
  }
}

const playAccess = () => playTone("/sfx/console_access.mp3", 0.4);
const playDenied = () => playTone("/sfx/console_denied.mp3", 0.5);

export default function MatrixConsole(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<ConsoleLine[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const appendLine = useCallback((content: string) => {
    setHistory((prev) => [...prev, { id: nextId(), content }]);
  }, []);

  const handleCommand = useCallback(
    async (command: string) => {
      const trimmed = command.trim().toLowerCase();

      if (!trimmed) {
        return;
      }

      appendLine(`> ${trimmed}`);

      if (MELTDOWN_COMMANDS.has(trimmed)) {
        const state = getMeltdownState();

        if (state.cooldown || state.active) {
          playDenied();
          appendLine("> meltdown cooling down. try again later.");
          return;
        }

        const success = triggerMeltdown();

        if (success) {
          playAccess();
          appendLine("> WARNING: meltdown initiated...");
          setOpen(false);
        } else {
          playDenied();
          appendLine("> meltdown offline. try again later.");
        }

        return;
      }

      if (!COMMANDS.includes(trimmed as Command)) {
        appendLine(`unknown command: ${trimmed}`);
        return;
      }

      switch (trimmed as Command) {
        case "help":
          appendLine("Available commands:");
          COMMANDS.forEach((cmd) => appendLine(`  - ${cmd}`));
          appendLine(
            "  - hack (alias: break, selfdestruct, duke.exe overload)"
          );
          break;
        case "stats":
          appendLine(`User: ${siteData.profile.name}`);
          appendLine(`Role: ${siteData.profile.role}`);
          appendLine(`Location: ${siteData.profile.location}`);
          appendLine(`Email: ${siteData.profile.email}`);
          appendLine(`Phone: ${siteData.profile.phone}`);
          break;
        case "theme":
          appendLine("Theme switching coming soon...");
          break;
        case "clear":
          setHistory([]);
          break;
        case "reboot":
          appendLine("Rebooting intro sequence...");
          triggerReboot();
          break;
        default:
          break;
      }
    },
    [appendLine]
  );

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "~" || event.key === "`") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
    }
  }, [open]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleCommand(input);
    setInput("");
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleMeltdownLog = (event: Event) => {
      const custom = event as CustomEvent<{ lines: string[] }>;

      if (!custom.detail?.lines?.length) {
        return;
      }

      custom.detail.lines.forEach((line) => appendLine(line));
    };

    window.addEventListener(
      "duke-meltdown-log",
      handleMeltdownLog as EventListener
    );

    return () => {
      window.removeEventListener(
        "duke-meltdown-log",
        handleMeltdownLog as EventListener
      );
    };
  }, [appendLine]);

  useEffect(() => {
    const unsubscribe = subscribeMeltdownState((state) => {
      if (state.active) {
        setOpen(false);
        inputRef.current?.blur();
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div className={`matrix-console${open ? " matrix-console--open" : ""}`}>
      <div className="console-inner">
        <div className="console-output" role="log" aria-live="polite">
          {history.map((line) => (
            <div key={line.id} className="console-line">
              {line.content}
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit} className="console-input-row">
          <span className="prompt">$</span>
          <input
            ref={inputRef}
            className="console-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Enter command..."
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}
