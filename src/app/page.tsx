import { Beam } from "@/components/ui/beam";
import { CapsuleDock } from "@/components/ui/capsule-dock";
import { Scouter } from "@/components/ui/scouter";
import { DOCK, FOOTER } from "@/content/site";
import { SKILL_GROUPS, SKILLS_HEADING } from "@/content/skills";
import { AboutSection } from "@/features/home/about-section";
import { BeamStruggle } from "@/features/home/beam-struggle";
import { CareerSection } from "@/features/home/career-section";
import { ContactSection } from "@/features/home/contact-section";
import { HeroSection } from "@/features/home/hero-section";
import { KiMeter } from "@/features/home/ki-meter";
import { LabSection } from "@/features/home/lab-section";
import { SectionHeading } from "@/features/home/section-heading";
import { WorkSection } from "@/features/home/work-section";

export default function Home() {
  return (
    <>
      <KiMeter />
      <CapsuleDock label="Sections" mark={DOCK.mark} links={[...DOCK.links]} />
      <main id="top" className="min-w-0">
        <HeroSection />
        <AboutSection />
        <CareerSection />
        <Beam className="border-x-0 border-y-4" />
        <LabSection />
        <BeamStruggle />
        <WorkSection />
        <section id="scouter" aria-labelledby="scouter-title" className="gutter py-20">
          <div className="mx-auto max-w-page">
            <Scouter groups={SKILL_GROUPS} restingLine={SKILLS_HEADING.restingReading}>
              <SectionHeading id="scouter-title" kicker={SKILLS_HEADING.kicker} title={SKILLS_HEADING.title} accent="fight" />
            </Scouter>
          </div>
        </section>
        <ContactSection />
      </main>
      <footer className="gutter bg-ink pt-6.5 pb-22.5 text-caption text-muted">
        <p className="mx-auto m-0 max-w-page">{FOOTER}</p>
      </footer>
    </>
  );
}
