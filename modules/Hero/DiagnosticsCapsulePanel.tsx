"use client";

import type { CSSProperties, JSX } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DecryptedText from "@/components/DecryptedText";

const EXPAND_ANIM_MS = 2500;
const COLLAPSE_ANIM_MS = 800;

const COLLAPSED_LINES = ["> System Integrity: STABLE", "> Modules Loaded: 8/8"];

const DIAGNOSTIC_LOGS = [
  "> Initializing DukeOS modules...",
  "> Loading matrix-console...",
  "> Loading neon-grid...",
  "> Loading hologram-panels...",
  "> Loading meltdown-handler...",
  "> Loading cursor-engine...",
  "> Verifying reactor core...",
  "> Optimizing UI pipeline...",
  "> Synchronizing media assets...",
  "> All modules loaded successfully.",
];

export default function DiagnosticsCapsulePanel(): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const [collapsing, setCollapsing] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const collapseTimeoutRef = useRef<number | null>(null);
  const logsLength = DIAGNOSTIC_LOGS.length;

  const handleToggle = useCallback(() => {
    if (collapsing) {
      return;
    }

    if (expanded) {
      setCollapsing(true);
      setExpanded(false);

      if (collapseTimeoutRef.current !== null) {
        window.clearTimeout(collapseTimeoutRef.current);
      }

      collapseTimeoutRef.current = window.setTimeout(() => {
        setCollapsing(false);
        setVisibleCount(0);
        collapseTimeoutRef.current = null;
      }, COLLAPSE_ANIM_MS);
    } else {
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
    }, Math.max(EXPAND_ANIM_MS / logsLength, 80));

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

  const visibleLogs = useMemo(() => {
    if (!panelVisible) {
      return [];
    }

    return DIAGNOSTIC_LOGS.slice(
      0,
      Math.min(Math.max(visibleCount, 1), logsLength)
    );
  }, [panelVisible, visibleCount, logsLength]);

  const animationDuration =
    expanded && !collapsing ? EXPAND_ANIM_MS : COLLAPSE_ANIM_MS;

  const capsuleStyle = {
    "--diag-anim-duration": `${animationDuration}ms`,
  } as CSSProperties;

  return (
    <motion.div
      className="diag-capsule"
      style={capsuleStyle}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="diag-header">
        <div className="diag-lines">
          {COLLAPSED_LINES.map((line) => (
            <p key={line}>
              <DecryptedText
                text={line}
                animateOn="hover"
                speed={150}
                maxIterations={40}
              />
            </p>
          ))}
        </div>

        <div
          className={`diag-reactor-toggle cursor-lock holo-focus${
            expanded ? " active" : ""
          }${collapsing ? " collapsing" : ""}`}
          onClick={handleToggle}
          role="button"
          aria-pressed={expanded}
          aria-label={expanded ? "Collapse diagnostics" : "Expand diagnostics"}
        >
          <div className="reactor-core" />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {panelVisible ? (
          <motion.div
            key="diag-expanded"
            className={`diag-expanded cursor-lock holo-focus${
              collapsing ? " collapsing" : ""
            }`}
            aria-live="polite"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {visibleLogs.map((line, index) => (
              <motion.p
                key={line + index}
                className="diag-line"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <DecryptedText
                  text={line}
                  animateOn="hover"
                  speed={125}
                  maxIterations={20}
                />
              </motion.p>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
