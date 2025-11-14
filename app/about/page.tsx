import siteData from "@/content/siteData.json";
import SkillsSection from "@/modules/Skills/SkillsSection";

export default function AboutPage() {
  const { profile, summary, strengths } = siteData;

  return (
    <section className="about-page">
      <h1 className="about-title">{profile.name}</h1>

      <div className="about-panels">
        <div className="panel about-overview">
          <h2>{profile.role}</h2>
          <p>{summary}</p>
        </div>

        <div className="panel about-contact">
          <h2>Profile</h2>
          <ul className="about-contact-list">
            <li>
              <strong>Location:</strong> {profile.location}
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <a href={`tel:${profile.phone}`}>{profile.phone}</a>
            </li>
            <li>
              <strong>GitHub:</strong>{" "}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.github}
              </a>
            </li>
            <li>
              <strong>LinkedIn:</strong>{" "}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.linkedin}
              </a>
            </li>
          </ul>
        </div>

        <div className="panel about-strengths">
          <h2>Strengths</h2>
          <ul>
            {strengths.softSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>

          <h2>Languages</h2>
          <ul>
            {strengths.languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </div>
      </div>

      <SkillsSection />
    </section>
  );
}
