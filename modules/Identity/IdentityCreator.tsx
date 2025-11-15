"use client";

import type { JSX } from "react";
import siteData from "@/content/siteData.json";

export default function IdentityCreator(): JSX.Element {
  const creator = siteData.identityStats.creator;
  const [highlight, ...rest] = creator.stats;
  const details = rest.length ? rest : creator.stats;

  return (
    <div className="holo-card holo-focus">
      <h2 className="title glitch">{creator.title}</h2>
      {highlight ? (
        <p className="subtitle">{highlight}</p>
      ) : (
        <p className="subtitle">Holographic broadcast suite engaged.</p>
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
