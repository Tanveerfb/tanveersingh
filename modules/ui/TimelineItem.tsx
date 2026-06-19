"use client";

import type { JSX } from "react";

interface TimelineItemProps {
  role: string;
  company: string;
  year: string;
  details: string;
}

export default function TimelineItem({
  role,
  company,
  year,
  details,
}: TimelineItemProps): JSX.Element {
  return (
    <div className="timeline-item duke-stagger">
      <h3>{role}</h3>
      <p>{company}</p>
      <p>{year}</p>

      <p className="timeline-details">{details}</p>
    </div>
  );
}
