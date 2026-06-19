import type { Metadata } from "next";
import PageShell from "@/modules/Layout/PageShell";
import VerticalDataStrip from "@/modules/Layout/VerticalDataStrip";
import TimelineItem from "@/modules/ui/TimelineItem";
import experience from "@/content/experience.json";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Work history and career timeline for Tanveer Singh — Full-Stack Developer, Programmer, and ICT professional based in Sydney.",
};

export default function ExperiencePage() {
  return (
    <>
      <VerticalDataStrip
        logs={[
          "> scanning timeline...",
          `> ${experience.length} records found`,
          "> verifying positions...",
          "> memory logs OK",
        ]}
      />

      <PageShell>
        <h1 className="duke-fade-up">Work Memory Archive</h1>

        <div className="experience-list duke-stagger">
          {experience.map((entry, i) => (
            <TimelineItem
              key={i}
              role={entry.role}
              company={"company" in entry ? entry.company : undefined}
              date={entry.date}
              location={entry.location}
              responsibilities={entry.responsibilities}
            />
          ))}
        </div>
      </PageShell>
    </>
  );
}
