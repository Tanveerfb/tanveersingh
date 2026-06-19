"use client";

import type { JSX } from "react";

interface TimelineItemProps {
  role: string;
  company?: string;
  date: string;
  location?: string;
  responsibilities: string[];
}

export default function TimelineItem({
  role,
  company,
  date,
  location,
  responsibilities,
}: TimelineItemProps): JSX.Element {
  return (
    <div className="experience-card">
      <p className="exp-period">{date}</p>
      <h3 className="exp-title">{role}</h3>
      {company && <p className="exp-company">{company}</p>}
      {location && !company && (
        <p className="exp-company">{location}</p>
      )}
      {location && company && (
        <p className="exp-location">{location}</p>
      )}
      <ul className="exp-details">
        {responsibilities.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
