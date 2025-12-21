import ProjectCard from "@/components/ProjectCard";

interface PortfolioProject {
  title: string;
  description: string;
  note?: string;
  status?: string;
  focus: string[];
  tech: string[];
  link?: string;
}

interface PortfolioGridProps {
  header: string;
  projects: PortfolioProject[];
}

export default function PortfolioGrid({
  header,
  projects,
}: PortfolioGridProps) {
  return (
    <section className="portfolio-page">
      <h1 className="portfolio-title">{header}</h1>
      <div className="portfolio-grid">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
