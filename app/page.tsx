import type { Metadata } from "next";
import VideoBackground from "@/modules/Background/VideoBackground";
import IntroSequence from "@/modules/Intro/IntroSequence";
import HeroSection from "@/modules/Hero/HeroSection";
import DiagnosticsCapsulePanel from "@/modules/Hero/DiagnosticsCapsulePanel";

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
      <IntroSequence />
      <VideoBackground />
      <HeroSection />
      <DiagnosticsCapsulePanel />
    </>
  );
}
