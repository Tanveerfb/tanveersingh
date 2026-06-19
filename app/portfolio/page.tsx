import PageShell from "@/modules/Layout/PageShell";
import VerticalDataStrip from "@/modules/Layout/VerticalDataStrip";
import ProjectCard from "@/modules/ui/ProjectCard";

export default function PortfolioPage() {
  return (
    <>
      <VerticalDataStrip
        logs={[
          "> loading assets...",
          "> scanning projects...",
          "> grid stable",
        ]}
      />

      <PageShell>
        <h1 className="duke-fade-up duke-hover">Project Grid Viewer</h1>

        <section className="project-grid duke-stagger">
          <ProjectCard
            title="Personal Portfolio"
            description="Built with NextJS + Tailwind + DukeOS modules"
            tags={["Next.js", "Tailwind", "Design"]}
          />

          <ProjectCard
            title="Landing Page"
            description="Placeholder project summary..."
            tags={["Marketing", "UI", "Copywriting"]}
          />

          <ProjectCard
            title="Freelance Work"
            description="Details placeholder..."
            tags={["Client", "Delivery"]}
          />
        </section>
      </PageShell>
    </>
  );
}
