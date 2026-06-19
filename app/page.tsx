import type { Metadata } from "next";
import HeroSection from "@/modules/Hero/HeroSection";
import AnimatedSection from "@/components/AnimatedSection";
import TestimonialsSection from "@/modules/Testimonials/TestimonialsSection";
import Link from "next/link";
import projects from "@/content/projects.json";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Portfolio of Tanveer Singh — Developer & Programmer based in Sydney. Next.js, Firebase, AI integration, and Microsoft 365.",
  openGraph: {
    title: "Tanveer Singh | Portfolio",
    description:
      "Full-Stack Developer & Programmer. Internal portals, public websites, and AI-integrated digital solutions.",
    url: "/",
  },
};

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <>
      <HeroSection />

      <section className="featured-work">
        <header className="fw-header">
          <h2 className="fw-title">Selected Work</h2>
          <Link href="/portfolio" className="fw-all-link">
            All projects →
          </Link>
        </header>

        <div className="fw-list">
          {featured.map((project, i) => (
            <div key={project.title} className="fw-row">
              <span className="fw-index" aria-hidden>
                0{i + 1}
              </span>

              <div className="fw-row-main">
                <span className="fw-row-title">
                  {"link" in project && project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </span>
                <span className="fw-row-desc">{project.description}</span>
              </div>

              <div className="fw-row-meta">
                <span
                  className={`fw-status fw-status--${project.status.toLowerCase()}`}
                >
                  {project.status}
                </span>
                <span className="fw-tech">
                  {project.tech.slice(0, 3).join(" · ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AnimatedSection delay={0.2}>
        <TestimonialsSection />
      </AnimatedSection>
    </>
  );
}
