import type { Metadata } from "next";
import ExperienceTimeline from "@/modules/Experience/ExperienceTimeline";
import siteData from "@/content/siteData.json";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Review Tanveer Singh's professional history, highlighting ICT support achievements, Microsoft 365 leadership, and service roles across Sydney.",
  openGraph: {
    title: "Tanveer Singh | Experience",
    description:
      "Timeline of Tanveer Singh's ICT and service experience, including SharePoint administration, portal development, and operational support.",
    url: "/experience",
  },
};

export default function ExperiencePage() {
  return (
    <ExperienceTimeline header="Experience" entries={siteData.experience} />
  );
}
