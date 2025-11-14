interface ExperienceCardProps {
  company: string;
  role: string;
  date: string;
  location?: string;
  responsibilities: string[];
}

export default function ExperienceCard({
  company,
  role,
  date,
  location,
  responsibilities,
}: ExperienceCardProps) {
  return (
    <div className="experience-card panel">
      <h3 className="exp-title">{role}</h3>
      <p className="exp-company">{company}</p>
      <p className="exp-period">
        {date}
        {location ? ` • ${location}` : ""}
      </p>
      <ul className="exp-details">
        {responsibilities.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}
