import siteData from "@/content/siteData.json";

export default function EducationPage() {
  return (
    <section className="experience-page">
      <h1 className="experience-title">Education</h1>
      <div className="experience-list">
        {siteData.education.map((entry) => (
          <div
            key={`${entry.title}-${entry.institution}`}
            className="experience-card panel"
          >
            <h3 className="exp-title">{entry.title}</h3>
            <p className="exp-company">{entry.institution}</p>
            <p className="exp-period">{entry.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
