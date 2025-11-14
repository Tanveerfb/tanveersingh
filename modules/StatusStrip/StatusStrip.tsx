"use client";

import { useEffect, useState } from "react";
import logData from "@/content/logs.json";

export default function StatusStrip() {
  const logs = (logData.logs ?? []).length
    ? logData.logs
    : ["Awaiting logs..."];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!logs.length) {
      return undefined;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % logs.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [logs.length]);

  const advanceLog = () => {
    setCurrentIndex((prev) => (prev + 1) % logs.length);
  };

  return (
    <section id="status-strip" className="status-strip" onClick={advanceLog}>
      <p className="status-text fx-status-anim">{logs[currentIndex]}</p>
    </section>
  );
}
