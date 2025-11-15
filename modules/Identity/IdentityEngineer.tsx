"use client";

import type { JSX } from "react";
import siteData from "@/content/siteData.json";

export default function IdentityEngineer(): JSX.Element {
  const engineer = siteData.identityStats.engineer;
  const [highlight, ...rest] = engineer.stats;
  const details = rest.length ? rest : engineer.stats;

  return (
    <div className="holo-card holo-focus">
      <h2 className="title glitch">{engineer.title}</h2>
      {highlight ? (
        <p className="subtitle">{highlight}</p>
      ) : (
        <p className="subtitle">Core engineering protocols calibrated.</p>
      )}
      <ul className="stat-list">
        {details.map((stat) => (
          <li key={stat} className="stat-item">
            {stat}
          </li>
        ))}
      </ul>
    </div>
  );
}
