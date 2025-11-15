"use client";

import type { CSSProperties, JSX } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const COLLAPSED_LINES = [
  "> Initializing DukeOS modules...",
  "> All modules loaded successfully.",
];

const REVEAL_INTERVAL_MS = 500;
const EXPAND_ANIM_MS = 5000;
const COLLAPSE_ANIM_MS = 1000;

export default function SystemLogStrip(): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const [collapsing, setCollapsing] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [fullLogs] = useState<string[]>(() => [
    "> Initializing DukeOS modules...",
    "> Loading matrix-console...",
    "> Loading neon-grid...",
    "> Loading hologram-panels...",
    "> Loading meltdown-handler...",
    "> Loading cursor-engine...",
    "> Verifying reactor core...",
    "> Optimizing UI pipeline...",
    "> Synchronizing gallery assets...",
    "> All modules loaded successfully.",
  ]);
  const panelId = useId();
  const logsLength = fullLogs.length;
  const collapseTimeoutRef = useRef<number | null>(null);

  const handleToggle = useCallback(() => {
    if (collapsing) {
      return;
    }

    if (expanded) {
      setCollapsing(true);

      if (collapseTimeoutRef.current !== null) {
        window.clearTimeout(collapseTimeoutRef.current);
      }

      const audio = new Audio("/sfx/terminal-denied.mp3");
      audio.volume = 0.3;
      void audio.play().catch(() => undefined);

      setExpanded(false);

      collapseTimeoutRef.current = window.setTimeout(() => {
        setCollapsing(false);
        setVisibleCount(0);
        collapseTimeoutRef.current = null;
      }, COLLAPSE_ANIM_MS);
    } else {
      if (collapseTimeoutRef.current !== null) {
        window.clearTimeout(collapseTimeoutRef.current);
        collapseTimeoutRef.current = null;
      }

      const audio = new Audio("/sfx/terminal-access.mp3");
      audio.volume = 0.3;
      void audio.play().catch(() => undefined);

      setVisibleCount(logsLength > 0 ? 1 : 0);
      setExpanded(true);
      setCollapsing(false);
    }
  }, [collapsing, expanded, logsLength]);

  useEffect(() => {
    if (!expanded || collapsing) {
      return;
    }

    if (logsLength <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= logsLength) {
          window.clearInterval(intervalId);
          return prev;
        }

        const next = prev + 1;

        if (next >= logsLength) {
          window.clearInterval(intervalId);
        }

        return next;
      });
    }, REVEAL_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [expanded, collapsing, logsLength]);

  useEffect(() => {
    return () => {
      if (collapseTimeoutRef.current !== null) {
        window.clearTimeout(collapseTimeoutRef.current);
      }
    };
  }, []);

  const panelVisible = expanded || collapsing;

  const visibleLogs = panelVisible
    ? fullLogs.slice(0, Math.min(Math.max(visibleCount, 1), logsLength))
    : [];

  const animationDuration =
    expanded && !collapsing ? EXPAND_ANIM_MS : COLLAPSE_ANIM_MS;

  const containerStyle = {
    "--log-anim-duration": `${animationDuration}ms`,
  } as CSSProperties;

  return (
    <div className="log-strip-container" style={containerStyle}>
      <div className="log-strip-collapsed">
        {COLLAPSED_LINES.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <button
        type="button"
        className="log-toggle holo-focus cursor-lock"
        onClick={handleToggle}
        aria-expanded={expanded}
        aria-controls={panelId}
      >
        {expanded ? "▲ Collapse" : "▼ Expand"}
      </button>

      {panelVisible ? (
        <div
          id={panelId}
          className={`log-strip-expanded cursor-lock holo-focus${
            collapsing ? " collapsing" : ""
          }`}
          role="region"
          aria-live="polite"
        >
          {visibleLogs.map((line, index) => (
            <p key={line + index} className="log-line">
              {line}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
