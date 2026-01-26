"use client";

import type { JSX } from "react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import siteData from "@/content/siteData.json";
import {
  getMeltdownState,
  subscribeMeltdownState,
  triggerMeltdown,
} from "@/modules/Chaos/Meltdown";

const COMMANDS = [
  "help",
  "stats",
  "theme",
  "clear",
  "skills",
  "projects",
  "easter-egg",
  "download-resume",
] as const;
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
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
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
          break;
        case "theme":
          appendLine("Theme switching coming soon...");
          break;
        case "clear":
          setHistory([]);
          break;
        case "skills":
          appendLine("=== Technical Skills ===");
          appendLine(`Web: ${siteData.skills.web.join(", ")}`);
          appendLine(
            `Frameworks: ${siteData.skills.frameworks.join(", ")}`
          );
          appendLine(`Backend: ${siteData.skills.backend.join(", ")}`);
          appendLine(`Databases: ${siteData.skills.databases.join(", ")}`);
          appendLine(`Cloud: ${siteData.skills.cloud.join(", ")}`);
          appendLine(
            `Microsoft 365: ${siteData.skills.microsoft365.slice(0, 5).join(", ")}...`
          );
          break;
        case "projects":
          appendLine("=== Featured Projects ===");
          siteData.projects.slice(0, 3).forEach((project) => {
            appendLine(`[${project.status}] ${project.title}`);
            appendLine(`  Tech: ${project.tech.slice(0, 4).join(", ")}`);
          });
          break;
        case "easter-egg":
          appendLine("Try the Konami Code: ↑↑↓↓←→←→BA");
          appendLine("Hint: Use your arrow keys on the page!");
          break;
        case "download-resume":
          appendLine("Resume download feature available on the site!");
          appendLine("Look for the 'Download Resume' button.");
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
    if (input.trim()) {
      setCommandHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      handleCommand(input);
      setInput("");
    }
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
            onKeyDown={(event) => {
              if (event.key === "ArrowUp") {
                event.preventDefault();
                if (commandHistory.length > 0) {
                  const newIndex =
                    historyIndex === -1
                      ? commandHistory.length - 1
                      : Math.max(0, historyIndex - 1);
                  setHistoryIndex(newIndex);
                  setInput(commandHistory[newIndex]);
                }
              } else if (event.key === "ArrowDown") {
                event.preventDefault();
                if (historyIndex >= 0) {
                  const newIndex = historyIndex + 1;
                  if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setInput("");
                  } else {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex]);
                  }
                }
              }
            }}
            placeholder="Enter command..."
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}
