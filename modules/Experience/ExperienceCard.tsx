import { FaBriefcase, FaMapMarkerAlt, FaCalendar } from "react-icons/fa";

interface ExperienceCardProps {
  company?: string;
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
      <h3 className="exp-title">
        <FaBriefcase style={{ marginRight: "0.5rem", verticalAlign: "middle", color: "var(--accent)" }} />
        {role}
      </h3>
      {company ? <p className="exp-company">{company}</p> : null}
      <p className="exp-period">
        <FaCalendar style={{ marginRight: "0.5rem", verticalAlign: "middle", fontSize: "0.9rem" }} />
        {date}
        {location ? (
          <>
            {" • "}
            <FaMapMarkerAlt style={{ marginLeft: "0.25rem", marginRight: "0.5rem", verticalAlign: "middle", fontSize: "0.9rem" }} />
            {location}
          </>
        ) : null}
      </p>
      <ul className="exp-details">
        {responsibilities.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}
