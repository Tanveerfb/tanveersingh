import siteData from "@/content/siteData.json";

const skillCategories: Array<{
  label: string;
  key: keyof typeof siteData.skills;
}> = [
  { label: "Web", key: "web" },
  { label: "Frameworks", key: "frameworks" },
  { label: "Backend", key: "backend" },
  { label: "Databases", key: "databases" },
  { label: "Cloud", key: "cloud" },
  { label: "Version Control", key: "versionControl" },
  { label: "Microsoft 365", key: "microsoft365" },
  { label: "Markup", key: "markup" },
  { label: "Tools", key: "tools" },
];

export default function SkillsSection() {
  return (
    <section className="skills-section">
      <h2 className="skills-title">Skills</h2>
      <div className="skills-grid">
        {skillCategories.map(({ label, key }) => {
          const items = siteData.skills[key];

          if (!items?.length) {
            return null;
          }

          return (
            <div key={key} className="skills-panel panel">
              <h3 className="skills-panel-title">{label}</h3>
              <ul className="skills-list">
                {items.map((item) => (
                  <li key={`${key}-${item}`}>{item}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
