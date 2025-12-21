import type { Metadata } from "next";
import PortfolioGrid from "@/modules/Portfolio/PortfolioGrid";
import siteData from "@/content/siteData.json";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "View Tanveer Singh's portfolio including Microsoft 365 portals, company landing pages, and bespoke IT automation projects.",
  openGraph: {
    title: "Tanveer Singh | Portfolio",
    description:
      "Collection of Tanveer Singh's featured projects spanning SharePoint solutions, internal portals, and Java deliverables.",
    url: "/portfolio",
  },
};

export default function PortfolioPage() {
  const projects = siteData.projects.map((project) => {
    const description =
      project.description ?? (project.focus ? project.focus.join(", ") : "");

    const projectWithOptionalLink = project as { link?: string; note?: string };

    return {
      title: project.title,
      description,
      note: projectWithOptionalLink.note,
      status: project.status,
      focus: project.focus ?? [],
      tech: project.tech ?? [],
      link: projectWithOptionalLink.link,
    };
  });

  return <PortfolioGrid header="Portfolio" projects={projects} />;
}
