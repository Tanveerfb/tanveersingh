import PageShell from "@/modules/Layout/PageShell";
import VerticalDataStrip from "@/modules/Layout/VerticalDataStrip";
import SkillCard from "@/modules/ui/SkillCard";

export default function AboutPage() {
  return (
    <>
      <VerticalDataStrip
        logs={[
          "> parsing identity...",
          "> biosync stable...",
          "> profile nominal...",
        ]}
      />

      <PageShell>
        <h1 className="duke-fade-up duke-hover">Operator Profile</h1>

        <section className="duke-stagger">
          <p>Short introduction about Tanveer...</p>
          <p>Placeholder biography text...</p>
          <p>Something about your experience and personality...</p>
        </section>

        <section className="duke-stagger">
          <h2 className="duke-flicker">Core Skills</h2>
          <div className="skill-grid duke-stagger">
            <SkillCard name="JavaScript" />
            <SkillCard name="React" />
            <SkillCard name="Next.js" />
            <SkillCard name="Tailwind" />
            <SkillCard name="Firebase" />
            <SkillCard name="IT Support" />
          </div>
        </section>
      </PageShell>
    </>
  );
}
