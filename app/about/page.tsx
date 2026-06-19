import type { Metadata } from "next";
import PageShell from "@/modules/Layout/PageShell";
import VerticalDataStrip from "@/modules/Layout/VerticalDataStrip";
import profile from "@/content/profile.json";
import skills from "@/content/skills.json";

export const metadata: Metadata = {
  title: "About",
  description:
    "Operator profile for Tanveer Singh — Developer & Programmer based in Greater Sydney.",
};

const categoryLabels: Record<string, string> = {
  web: "Web",
  frameworks: "Frameworks",
  backend: "Backend",
  databases: "Databases",
  cloud: "Cloud & DevOps",
  microsoft365: "Microsoft 365",
  tools: "Tools",
  ai: "AI & Local LLM",
  exploring: "Currently Exploring",
};

export default function AboutPage() {
  const skillEntries = (
    Object.entries(skills) as [string, string[]][]
  ).filter(([, items]) => items.length > 0);

  return (
    <>
      <VerticalDataStrip
        logs={[
          "> parsing identity...",
          `> operator: ${profile.name}`,
          `> role: ${profile.role}`,
          "> biosync stable",
        ]}
      />

      <PageShell>
        <section className="about-page">
          <h1 className="duke-fade-up">Operator Profile</h1>

          <div className="profile-meta duke-fade-up">
            <div className="profile-field">
              <span className="profile-label">ROLE</span>
              <span className="profile-value">{profile.role}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">LOCATION</span>
              <span className="profile-value">{profile.location}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">CONTACT</span>
              <a
                href={`mailto:${profile.email}`}
                className="profile-value profile-link"
              >
                {profile.email}
              </a>
            </div>
            <div className="profile-field">
              <span className="profile-label">LANGUAGES</span>
              <span className="profile-value">
                {profile.strengths.languages.join(" · ")}
              </span>
            </div>
          </div>

          <p className="profile-summary duke-fade-up">{profile.summary}</p>
        </section>

        <section className="skills-section duke-stagger">
          <h2 className="skills-title">Technical Profile</h2>
          <div className="skills-grid about-panels">
            {skillEntries.map(([key, items]) => (
              <div key={key} className="skills-panel panel">
                <h3 className="skills-panel-title">
                  {categoryLabels[key] ?? key}
                </h3>
                <ul className="skills-list">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </PageShell>
    </>
  );
}
