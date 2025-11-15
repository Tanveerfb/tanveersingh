"use client";

import type { JSX } from "react";
import siteData from "@/content/siteData.json";

type IdentityVariant = "engineer" | "creator";

interface IdentityCardProps {
  variant: IdentityVariant;
  className?: string;
}

export default function IdentityCard({
  variant,
  className,
}: IdentityCardProps): JSX.Element {
  const cardData = siteData.identityStats[variant];
  const [highlight, ...rest] = cardData.stats;
  const stats = rest.length ? rest : cardData.stats;

  return (
    <div
      className={["holo-card", "holo-focus", className ?? ""]
        .filter(Boolean)
        .join(" ")}
    >
      <h3 className="title glitch">{cardData.title}</h3>
      {highlight ? <p className="subtitle">{highlight}</p> : null}
      <ul className="stat-list">
        {stats.map((stat) => (
          <li key={stat} className="stat-item">
            {stat}
          </li>
        ))}
      </ul>
    </div>
  );
}
