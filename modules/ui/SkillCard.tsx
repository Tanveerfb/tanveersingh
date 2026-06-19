"use client";

import type { JSX } from "react";

interface SkillCardProps {
  name: string;
}

export default function SkillCard({ name }: SkillCardProps): JSX.Element {
  return <div className="skill-card duke-stagger duke-hover">{name}</div>;
}
