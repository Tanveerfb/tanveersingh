"use client";

import type { JSX } from "react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "duke_announcement_dismissed";
const BAR_HEIGHT = "36px";

export default function AnnouncementBar(): JSX.Element | null {
  const dismissed =
    typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEY) === "1"
      : true;
  const [visible, setVisible] = useState(!dismissed);

  useEffect(() => {
    if (!visible) {
      document.documentElement.style.setProperty("--alert-h", "0px");
    } else {
      document.documentElement.style.setProperty("--alert-h", BAR_HEIGHT);
    }
  }, [visible]);

  function dismiss() {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "1");
    document.documentElement.style.setProperty("--alert-h", "0px");
  }

  if (!visible) return null;

  return (
    <div className="announcement-bar" role="status" aria-live="polite">
      <span className="announcement-text">
        <span className="announcement-prompt">&gt;</span> DukeOS TERMINAL ACTIVE
        <span className="announcement-sep"> — </span>
        press <kbd>~</kbd> to open
        <span className="announcement-sep"> | </span>
        try: <span className="announcement-cmd">help</span>,{" "}
        <span className="announcement-cmd">stats</span>,{" "}
        <span className="announcement-cmd">hack</span>
      </span>
      <button
        type="button"
        className="announcement-dismiss"
        aria-label="Dismiss announcement"
        onClick={dismiss}
      >
        ✕
      </button>
    </div>
  );
}
