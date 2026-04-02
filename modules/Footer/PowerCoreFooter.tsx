"use client";

import type { JSX } from "react";
import { useEffect, useRef, useState } from "react";
import { subscribeMeltdownState } from "@/modules/Chaos/Meltdown";
import { FaGithub, FaLinkedin, FaTwitch } from "react-icons/fa6";

interface FooterMeltdownController {
  setMeltdownMode: (state: boolean) => void;
}

let controllerRef: FooterMeltdownController | null = null;

export function setFooterMeltdownMode(state: boolean): void {
  controllerRef?.setMeltdownMode(state);
}

export default function PowerCoreFooter(): JSX.Element {
  const [meltdownMode, setMeltdownMode] = useState(false);
  const [lastSync, setLastSync] = useState(0);
  const lastSyncRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    controllerRef = { setMeltdownMode };
    return () => {
      controllerRef = null;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeMeltdownState((state) => {
      setMeltdownMode(state.active);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const startedAt = Date.now();
    const interval = setInterval(() => {
      const diff = Math.max(0, Date.now() - startedAt);
      setLastSync(diff);
      if (lastSyncRef.current) {
        lastSyncRef.current.textContent = `${(diff / 1000).toFixed(1)}s`;
      }
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (lastSyncRef.current) {
      lastSyncRef.current.textContent = `${(lastSync / 1000).toFixed(1)}s`;
    }
  }, [lastSync]);

  const footerClassName = [
    "powercore-footer",
    "holo-focus",
    meltdownMode ? "meltdown-mode" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <footer className={footerClassName}>
      <div className="core-wrapper holo-focus">
        <div className="core-glow" />
        <div className="core-ring" />
        <div className="core-center" />
      </div>

      <div className="footer-status">
        <p>&gt; POWER_CORE_STATUS: {meltdownMode ? "UNSTABLE" : "STABLE"}</p>
        <p>&gt; SYSTEM_INTEGRITY: {meltdownMode ? "COMPROMISED" : "STABLE"}</p>
        <p>&gt; MODULES: 8 / 8 LOADED</p>
        <p>&gt; NETWORK: ONLINE</p>
        <p>
          &gt; LAST_SYNC: <span ref={lastSyncRef}>0.0s</span> ago
        </p>
      </div>

      <div className="footer-links">
        <a
          className="holo-focus"
          href="https://github.com/tanveerfb"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub aria-hidden focusable={false} />
          GitHub
        </a>
        <a
          className="holo-focus"
          href="https://linkedin.com/in/tanveerfb"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin aria-hidden focusable={false} />
          LinkedIn
        </a>
        <a
          className="holo-focus"
          href="https://www.twitch.tv/dukesenior"
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitch aria-hidden focusable={false} />
          Twitch
        </a>
      </div>
    </footer>
  );
}
