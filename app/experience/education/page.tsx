import type { Metadata } from "next";
import siteData from "@/content/siteData.json";

export const metadata: Metadata = {
  title: "Education",
  description:
    "Explore Tanveer Singh's education journey, including Bachelor of Information Technology studies and ongoing Professional Year training.",
  openGraph: {
    title: "Tanveer Singh | Education",
    description:
      "Academic background for Tanveer Singh, covering Professional Year IT studies at ATMC and Bachelor of IT from Kent Institute.",
    url: "/experience/education",
  },
};

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
