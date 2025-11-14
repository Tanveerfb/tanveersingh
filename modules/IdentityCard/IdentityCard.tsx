"use client";

import { useState } from "react";
import siteData from "@/content/siteData.json";

type IdentityVariant = "engineer" | "creator";

interface IdentityCardProps {
  variant: IdentityVariant;
}

export default function IdentityCard({ variant }: IdentityCardProps) {
  const [flipped, setFlipped] = useState(false);
  const cardData = siteData.identityStats[variant];

  const [frontHighlight, ...remainingStats] = cardData.stats;
  const backStats = remainingStats.length ? remainingStats : cardData.stats;

  return (
    <div
      className={`identity-card-container ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="identity-card-inner">
        <div className="identity-card-front panel">
          <h3 className="identity-front-title">{cardData.title}</h3>
          {frontHighlight ? (
            <p className="identity-front-content">{frontHighlight}</p>
          ) : null}
        </div>

        <div className="identity-card-back panel">
          <h3 className="identity-back-title">Stats</h3>
          <ul className="identity-back-list">
            {backStats.map((stat) => (
              <li key={stat}>{stat}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
