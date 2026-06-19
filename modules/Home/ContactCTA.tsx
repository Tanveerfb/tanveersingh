import type { JSX } from "react";
import profile from "@/content/profile.json";

export default function ContactCTA(): JSX.Element {
  return (
    <section className="contact-cta" aria-label="Contact">
      <div className="cta-inner">
        <h2 className="cta-headline">Let&apos;s build something.</h2>
        <p className="cta-sub">
          Open to freelance, contracts, and interesting problems.
        </p>
        <div className="cta-actions">
          <a href={`mailto:${profile.email}`} className="btn-primary">
            Send an Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}
