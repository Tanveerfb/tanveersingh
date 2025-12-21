"use client";

import type { JSX } from "react";
import siteData from "@/content/siteData.json";
import DecryptedText from "@/components/DecryptedText";
import ElectricBorder from "@/components/ElectricBorder";
import PixelCard from "@/components/PixelCard";
import {
  FaCalendarDays,
  FaDiscord,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa6";

export default function ContactFlow(): JSX.Element {
  const { profile } = siteData;

  return (
    <section className="contact-page">
      <h1 className="contact-title">
        <DecryptedText
          text="Contact"
          animateOn="both"
          revealDirection="center"
          speed={150}
          sequential
          maxIterations={50}
        />
      </h1>

      <div className="contact-layout">
        <ElectricBorder
          color="var(--success)"
          thickness={5}
          chaos={0.2}
          speed={1}
        >
          <div className="contact-panel panel">
            <h2 className="contact-step-title">Reach out</h2>
            <p className="contact-desc">
              Calendly or email are the best way to reach me.
            </p>

            <div className="contact-options-grid">
              <PixelCard
                variant="yellow"
                className="contact-option-card"
                style={{ height: 96 }}
                noFocus
              >
                <a
                  className="contact-option-link"
                  href={`mailto:${profile.email}`}
                >
                  <span className="contact-option-icon" aria-hidden="true">
                    <FaEnvelope />
                  </span>
                  <span className="contact-option-text">
                    <span className="contact-option-title">Email</span>
                    <span className="contact-option-subtitle">
                      {profile.email}
                    </span>
                  </span>
                </a>
              </PixelCard>

              <PixelCard
                variant="blue"
                className="contact-option-card"
                style={{ height: 96 }}
                noFocus
              >
                <a
                  className="contact-option-link"
                  href="https://calendly.com/tanveerfb/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-option-icon" aria-hidden="true">
                    <FaCalendarDays />
                  </span>
                  <span className="contact-option-text">
                    <span className="contact-option-title">Calendly</span>
                    <span className="contact-option-subtitle">
                      Book a 30-min slot
                    </span>
                  </span>
                </a>
              </PixelCard>

              <PixelCard
                variant="pink"
                className="contact-option-card"
                style={{ height: 96 }}
                noFocus
              >
                <a
                  className="contact-option-link"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-option-icon" aria-hidden="true">
                    <FaLinkedin />
                  </span>
                  <span className="contact-option-text">
                    <span className="contact-option-title">LinkedIn</span>
                    <span className="contact-option-subtitle">Connect</span>
                  </span>
                </a>
              </PixelCard>

              <PixelCard
                variant="yellow"
                className="contact-option-card"
                style={{ height: 96 }}
                noFocus
              >
                <a
                  className="contact-option-link"
                  href={profile.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-option-icon" aria-hidden="true">
                    <FaDiscord />
                  </span>
                  <span className="contact-option-text">
                    <span className="contact-option-title">Discord</span>
                    <span className="contact-option-subtitle">Message me</span>
                  </span>
                </a>
              </PixelCard>
            </div>
          </div>
        </ElectricBorder>
      </div>
    </section>
  );
}
