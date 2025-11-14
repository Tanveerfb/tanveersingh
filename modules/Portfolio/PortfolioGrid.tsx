import ProjectCard from "./ProjectCard";

interface PortfolioProject {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
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
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}
