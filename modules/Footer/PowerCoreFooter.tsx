"use client";

import type { JSX } from "react";
import { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export default function PowerCoreFooter(): JSX.Element {
  const lastSyncRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const startedAt = Date.now();
    const interval = setInterval(() => {
      const diff = Date.now() - startedAt;
      if (lastSyncRef.current) {
        lastSyncRef.current.textContent = `${(diff / 1000).toFixed(1)}s`;
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="powercore-footer">
      <div className="core-wrapper holo-focus">
        <div className="core-glow" />
        <div className="core-ring" />
        <div className="core-center" />
      </div>

      <div className="footer-status">
        <p>&gt; POWER_CORE_STATUS: STABLE</p>
        <p>&gt; SYSTEM_INTEGRITY: STABLE</p>
        <p>&gt; MODULES: ALL LOADED</p>
        <p>&gt; NETWORK: ONLINE</p>
        <p>
          &gt; SESSION_UPTIME: <span ref={lastSyncRef}>0.0s</span>
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
      </div>
    </footer>
  );
}
