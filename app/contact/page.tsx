import type { Metadata } from "next";
import PageShell from "@/modules/Layout/PageShell";
import VerticalDataStrip from "@/modules/Layout/VerticalDataStrip";
import profile from "@/content/profile.json";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaDiscord,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tanveer Singh — open to ICT roles, freelance web projects, and collaborations.",
};

const channels = [
  {
    title: "Email",
    subtitle: profile.email,
    href: `mailto:${profile.email}`,
    icon: FaEnvelope,
    category: "Direct",
  },
  {
    title: "Discord",
    subtitle: "Direct message",
    href: profile.discord,
    icon: FaDiscord,
    category: "Direct",
  },
  {
    title: "GitHub",
    subtitle: "github.com/tanveerfb",
    href: profile.github,
    icon: FaGithub,
    category: "Professional",
  },
  {
    title: "LinkedIn",
    subtitle: "linkedin.com/in/tanveerfb",
    href: profile.linkedin,
    icon: FaLinkedin,
    category: "Professional",
  },
];

export default function ContactPage() {
  return (
    <>
      <VerticalDataStrip
        logs={[
          "> establishing uplink...",
          "> channels online",
          "> awaiting transmission",
          "> comms stable",
        ]}
      />

      <PageShell>
        <section className="contact-page">
          <h1 className="duke-fade-up">Communications Uplink</h1>

          <p className="contact-desc duke-fade-up">
            Available for ICT support roles, freelance web projects, and
            collaborations. Pick a channel.
          </p>

          <div className="contact-layout duke-stagger">
            <div className="contact-step">
              <h2 className="contact-step-title">Direct</h2>
              <div className="contact-options-grid">
                {channels
                  .filter((c) => c.category === "Direct")
                  .map((c) => (
                    <div
                      key={c.title}
                      className="contact-option-card holo-card fx-hover-trail"
                    >
                      <a
                        href={c.href}
                        className="contact-option-link"
                        target={
                          c.href.startsWith("mailto") ? undefined : "_blank"
                        }
                        rel="noopener noreferrer"
                      >
                        <span className="contact-option-icon">
                          <c.icon />
                        </span>
                        <span className="contact-option-text">
                          <span className="contact-option-title">{c.title}</span>
                          <span className="contact-option-subtitle">
                            {c.subtitle}
                          </span>
                        </span>
                      </a>
                    </div>
                  ))}
              </div>
            </div>

            <div className="contact-step">
              <h2 className="contact-step-title">Professional</h2>
              <div className="contact-options-grid">
                {channels
                  .filter((c) => c.category === "Professional")
                  .map((c) => (
                    <div
                      key={c.title}
                      className="contact-option-card holo-card fx-hover-trail"
                    >
                      <a
                        href={c.href}
                        className="contact-option-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="contact-option-icon">
                          <c.icon />
                        </span>
                        <span className="contact-option-text">
                          <span className="contact-option-title">{c.title}</span>
                          <span className="contact-option-subtitle">
                            {c.subtitle}
                          </span>
                        </span>
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </PageShell>
    </>
  );
}
