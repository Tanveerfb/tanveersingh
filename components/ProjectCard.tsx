import GradientText from "@/components/GradientText";
import Link from "next/link";

export interface ProjectCardProps {
  title: string;
  description: string;
  note?: string;
  status?: string;
  focus: string[];
  tech: string[];
  link?: string;
  linkLabel?: string;
  className?: string;
  focusLabel?: string;
  techLabel?: string;
}

export default function ProjectCard({
  title,
  description,
  note,
  status,
  focus,
  tech,
  link,
  linkLabel = "View",
  className = "",
  focusLabel = "Focus",
  techLabel = "Tech",
}: ProjectCardProps) {
  const normalizedStatus = status?.trim();
  const statusKey = normalizedStatus?.toLowerCase();
  const statusModifierClass = (() => {
    if (!statusKey) return "";
    if (statusKey.includes("complete")) return "pill-status--completed";
    if (statusKey.includes("ongoing") || statusKey.includes("in progress")) {
      return "pill-status--ongoing";
    }
    if (statusKey.includes("pause") || statusKey.includes("hold")) {
      return "pill-status--paused";
    }
    return "";
  })();

  return (
    <div
      className={`gradient-border gradient-border--project-card ${className}`.trim()}
    >
      <article className="project-card">
        <header className="project-header">
          <h3 className="project-title">
            <GradientText
              colors={["var(--accent)", "var(--accent-alt)", "var(--accent)"]}
              animationSpeed={10}
            >
              {title}
            </GradientText>
          </h3>

          {normalizedStatus ? (
            <span className={`pill pill-status ${statusModifierClass}`.trim()}>
              {normalizedStatus}
            </span>
          ) : null}
        </header>

        {note ? <p className="project-note">{note}</p> : null}
        {description ? (
          <p className="project-description">{description}</p>
        ) : null}

        <div className="project-tabs" aria-label="Project metadata">
          {focus.length > 0 ? (
            <div className="tab-group" aria-label={focusLabel}>
              {focus.map((item) => (
                <span key={item} className="pill pill-focus">
                  {item}
                </span>
              ))}
            </div>
          ) : null}

          {tech.length > 0 ? (
            <div className="tab-group" aria-label={techLabel}>
              {tech.map((item) => (
                <span key={item} className="pill pill-tech">
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {link ? (
          link.startsWith("/") ? (
            <Link href={link} className="project-link">
              {linkLabel}
            </Link>
          ) : (
            <a href={link} className="project-link">
              {linkLabel}
            </a>
          )
        ) : null}
      </article>
    </div>
  );
}
