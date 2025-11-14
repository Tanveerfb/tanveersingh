import PortfolioGrid from "@/modules/Portfolio/PortfolioGrid";
import siteData from "@/content/siteData.json";

export default function PortfolioPage() {
  const projects = siteData.projects.map((project) => {
    const tags = [
      project.status,
      ...(project.focus ?? []),
      ...(project.tech ?? []),
    ].filter(Boolean) as string[];

    const description =
      project.description ??
      (project.focus ? project.focus.join(", ") : "") ??
      "";

    const projectWithOptionalMedia = project as {
      link?: string;
      image?: string;
    };

    return {
      title: project.title,
      description,
      tags,
      link: projectWithOptionalMedia.link,
      image: projectWithOptionalMedia.image,
    };
  });

  return <PortfolioGrid header="Portfolio" projects={projects} />;
}
