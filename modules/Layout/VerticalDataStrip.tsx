"use client";

import type { JSX } from "react";

interface VerticalDataStripProps {
  logs: string[];
}

export default function VerticalDataStrip({
  logs,
}: VerticalDataStripProps): JSX.Element {
  return (
    <div className="vertical-strip" aria-hidden>
      <div className="vertical-strip-inner">
        {logs.map((line, index) => (
          <p key={index} className="strip-line">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
