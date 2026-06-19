import type { Metadata } from "next";
import PageShell from "@/modules/Layout/PageShell";
import VerticalDataStrip from "@/modules/Layout/VerticalDataStrip";
import ProjectCard from "@/modules/ui/ProjectCard";
import projects from "@/content/projects.json";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Projects built by Tanveer Singh — internal portals, public websites, freelance work, and more.",
};

export default function PortfolioPage() {
  return (
    <>
      <VerticalDataStrip
        logs={[
          "> loading assets...",
          `> ${projects.length} projects indexed`,
          "> scanning build history...",
          "> grid stable",
        ]}
      />

      <PageShell>
        <h1 className="duke-fade-up">Project Grid Viewer</h1>

        <section className="portfolio-grid duke-stagger">
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              title={project.title}
              status={project.status}
              description={project.description}
              focus={project.focus}
              tech={project.tech}
              link={"link" in project ? project.link : undefined}
            />
          ))}
        </section>
      </PageShell>
    </>
  );
}
