"use client";

import type { JSX, ReactElement } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags?: string[];
}

export default function ProjectCard({
  title,
  description,
  tags = [],
}: ProjectCardProps): JSX.Element {
  return (
    <div className="project-card duke-stagger duke-hover">
      <h3>{title}</h3>
      <p>{description}</p>

      {tags.length > 0 && (
        <div className="project-tags">
          {tags.map(
            (tag, index): ReactElement => (
              <span key={index} className="tag">
                {tag}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
}
