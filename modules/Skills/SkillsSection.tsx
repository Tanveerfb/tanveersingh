import siteData from "@/content/siteData.json";
import type { IconType } from "react-icons";
import {
  FaAngleRight,
  FaCloud,
  FaCodeBranch,
  FaCubes,
  FaDatabase,
  FaGlobe,
  FaMagnifyingGlass,
  FaMicrosoft,
  FaScrewdriverWrench,
  FaServer,
  FaVideo,
} from "react-icons/fa6";

const CATEGORY_ICONS: Partial<Record<keyof typeof siteData.skills, IconType>> =
  {
    web: FaGlobe,
    frameworks: FaCubes,
    backend: FaServer,
    databases: FaDatabase,
    cloud: FaCloud,
    versionControl: FaCodeBranch,
    microsoft365: FaMicrosoft,
    tools: FaScrewdriverWrench,
    Exploring: FaMagnifyingGlass,
    "Content Creation": FaVideo,
  };

const skillCategories: Array<{
  label: string;
  key: keyof typeof siteData.skills;
}> = [
  { label: "Web", key: "web" },
  { label: "Frameworks", key: "frameworks" },
  { label: "Backend", key: "backend" },
  { label: "Databases", key: "databases" },
  { label: "Cloud", key: "cloud" },
  { label: "Microsoft 365", key: "microsoft365" },
  { label: "Tools", key: "tools" },
  { label: "Exploring", key: "Exploring" },
  { label: "Content Creation", key: "Content Creation" },
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
              <h3 className="skills-panel-title">
                {(() => {
                  const Icon = CATEGORY_ICONS[key];
                  return Icon ? (
                    <span className="skills-panel-icon" aria-hidden>
                      <Icon focusable={false} />
                    </span>
                  ) : null;
                })()}
                {label}
              </h3>
              <ul className="skills-list">
                {items.map((item) => (
                  <li key={`${key}-${item}`}>
                    <span className="skills-item-icon" aria-hidden>
                      <FaAngleRight focusable={false} />
                    </span>
                    <span className="skills-item-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
