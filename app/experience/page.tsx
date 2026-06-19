import PageShell from "@/modules/Layout/PageShell";
import VerticalDataStrip from "@/modules/Layout/VerticalDataStrip";
import TimelineItem from "@/modules/ui/TimelineItem";

export default function ExperiencePage() {
  return (
    <>
      <VerticalDataStrip
        logs={[
          "> scanning timeline...",
          "> verifying positions...",
          "> memory logs OK",
        ]}
      />

      <PageShell>
        <h1 className="duke-fade-up duke-hover">Work Memory Archive</h1>

        <div className="timeline duke-stagger">
          <TimelineItem
            role="ICT Support Engineer"
            company="Nobility Care Australia"
            year="2023–Present"
            details="Responsibilities placeholder..."
          />

          <TimelineItem
            role="Team Member"
            company="Domino’s"
            year="Until 2023"
            details="Experience details placeholder..."
          />

          <TimelineItem
            role="Freelance / Independent Projects"
            company="Self"
            year="Ongoing"
            details="Web dev, content creation, etc."
          />
        </div>
      </PageShell>
    </>
  );
}
