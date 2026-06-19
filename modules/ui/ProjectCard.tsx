"use client";

import type { JSX } from "react";

interface ProjectCardProps {
  title: string;
  status: string;
  description: string;
  focus: string[];
  tech: string[];
  link?: string;
}

export default function ProjectCard({
  title,
  status,
  description,
  focus,
  tech,
  link,
}: ProjectCardProps): JSX.Element {
  const statusClass =
    status.toLowerCase() === "completed"
      ? "pill-status--completed"
      : status.toLowerCase() === "ongoing"
        ? "pill-status--ongoing"
        : "pill-status--paused";

  return (
    <div className="project-card fx-hover-trail">
      <div className="project-header">
        <h3 className="project-title">{title}</h3>
        <span className={`pill pill-status ${statusClass}`}>{status}</span>
      </div>

      <p className="project-description">{description}</p>

      <div className="project-tabs">
        {focus.length > 0 && (
          <div className="tab-group">
            {focus.map((f, i) => (
              <span key={i} className="pill pill-focus">
                {f}
              </span>
            ))}
          </div>
        )}
        {tech.length > 0 && (
          <div className="tab-group">
            {tech.map((t, i) => (
              <span key={i} className="pill pill-tech">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          View Project →
        </a>
      )}
    </div>
  );
}
