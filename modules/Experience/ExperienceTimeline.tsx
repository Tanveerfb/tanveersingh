import ExperienceCard from "./ExperienceCard";
import { Fragment } from "react";

interface ExperienceEntry {
  company?: string;
  role: string;
  date: string;
  location?: string;
  responsibilities: string[];
}

interface ExperienceTimelineProps {
  header: string;
  entries: ExperienceEntry[];
}

export default function ExperienceTimeline({
  header,
  entries,
}: ExperienceTimelineProps) {
  return (
    <section className="experience-page">
      <h1 className="experience-title">{header}</h1>
      <div className="experience-list">
        {entries.map((entry, index) => (
          <Fragment
            key={`${entry.company ?? ""}-${entry.role}-${entry.date}-${index}`}
          >
            <ExperienceCard {...entry} />
            {entry.role === "ICT Support Engineer" ? (
              <section>
                <h2>Other Experience</h2>
              </section>
            ) : null}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
