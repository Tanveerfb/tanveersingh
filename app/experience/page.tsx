import ExperienceTimeline from "@/modules/Experience/ExperienceTimeline";
import siteData from "@/content/siteData.json";

export default function ExperiencePage() {
  return (
    <ExperienceTimeline header="Experience" entries={siteData.experience} />
  );
}
