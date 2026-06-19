"use client";

import type { JSX } from "react";

interface PosterCardProps {
  src: string;
  alt: string;
}

export default function PosterCard({ src, alt }: PosterCardProps): JSX.Element {
  return (
    <div className="poster-card duke-hover duke-stagger">
      <img src={src} alt={alt} />
    </div>
  );
}
