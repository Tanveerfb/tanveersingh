import type { Metadata } from "next";
import HeroSection from "@/modules/Hero/HeroSection";
import DiagnosticsCapsulePanel from "@/modules/Hero/DiagnosticsCapsulePanel";
import AnimatedSection from "@/components/AnimatedSection";
import SkillsRadar from "@/modules/Skills/SkillsRadar";
import Timeline from "@/modules/Experience/Timeline";
import TestimonialsSection from "@/modules/Testimonials/TestimonialsSection";
import ResumeDownload from "@/components/ResumeDownload";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Explore Tanveer Singh's cyberpunk-inspired portfolio hub showcasing Microsoft 365 expertise, custom portals, and immersive UI engineering.",
  openGraph: {
    title: "Tanveer Singh | Portfolio Home",
    description:
      "Experience the DukeOS interface highlighting Tanveer Singh's ICT support skills, Microsoft 365 solutions, and creative tech experiments.",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <DiagnosticsCapsulePanel />
      
      <AnimatedSection delay={0.2}>
        <div style={{ textAlign: "center", margin: "2rem 0" }}>
          <ResumeDownload />
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <SkillsRadar />
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <Timeline />
      </AnimatedSection>

      <AnimatedSection delay={0.5}>
        <TestimonialsSection />
      </AnimatedSection>
    </>
  );
}
