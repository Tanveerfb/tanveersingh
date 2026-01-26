import { FaUser, FaCode, FaInfoCircle } from "react-icons/fa";

interface Overview {
  title: string;
  content: string;
}

interface AboutSectionProps {
  header: string;
  bio: string;
  skills: string[];
  overview: Overview;
}

export default function AboutSection({
  header,
  bio,
  skills,
  overview,
}: AboutSectionProps) {
  return (
    <section className="about-page">
      <h1 className="about-title">{header}</h1>

      <div className="about-panels">
        <div className="panel about-overview">
          <h2>
            <FaInfoCircle style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
            {overview.title}
          </h2>
          <p>{overview.content}</p>
        </div>

        <div className="panel about-bio">
          <h2>
            <FaUser style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
            Bio
          </h2>
          <p>{bio}</p>
        </div>

        <div className="panel about-skills">
          <h2>
            <FaCode style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
            Skills
          </h2>
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
