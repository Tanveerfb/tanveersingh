import type { Metadata } from "next";
import ComponentsShowcase from "@/modules/Components/ComponentsShowcase";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Explore Tanveer Singh's custom React components library featuring reusable UI elements with cyberpunk aesthetics.",
  openGraph: {
    title: "Tanveer Singh | Components",
    description:
      "Browse the collection of custom-built React components showcasing modern design patterns and interactive UI elements.",
    url: "/components",
  },
};

export default function ComponentsPage() {
  // Sample components from the site
  const components = [
    {
      name: "ProjectCard",
      description: "Feature-rich card component with gradient borders, status pills, and animated gradient text. Perfect for showcasing projects with tags and metadata.",
      tags: ["card", "gradient", "animation"],
      category: "Display",
      tech: ["React", "TypeScript", "SCSS"],
      demoComponent: "ProjectCard",
    },
    {
      name: "GradientText",
      description: "Animated text component with customizable gradient colors and smooth transitions. Creates eye-catching titles and headers.",
      tags: ["text", "gradient", "animation"],
      category: "Typography",
      tech: ["React", "TypeScript", "CSS"],
      demoComponent: "GradientText",
    },
  ];

  return <ComponentsShowcase components={components} />;
}
