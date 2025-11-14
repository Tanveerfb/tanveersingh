import ExperienceCard from "./ExperienceCard";

interface ExperienceEntry {
  company: string;
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
          <ExperienceCard key={index} {...entry} />
        ))}
      </div>
    </section>
  );
}
