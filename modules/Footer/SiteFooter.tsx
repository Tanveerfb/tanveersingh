import type { JSX } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import { SiNextdotjs, SiClaude } from "react-icons/si";
import profile from "@/content/profile.json";

interface FooterLink {
  label: string;
  href: string;
}

const NAV_LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="footer-inner">
        <div className="footer-rail" aria-hidden="true">
          <span className="footer-packet" />
        </div>

        <div className="footer-grid">
          <div className="footer-col footer-col--brand">
            <span className="footer-node" aria-hidden="true" />
            <p className="footer-brand-name">{profile.name}</p>
            <p className="footer-brand-role">{profile.role}</p>
            <p className="footer-brand-loc">{profile.location}</p>
            <p className="footer-brand-tag">
              Building reliable systems and web applications — end to end.
            </p>
          </div>

          <nav
            className="footer-col footer-col--nav"
            aria-label="Footer navigation"
          >
            <span className="footer-node" aria-hidden="true" />
            <p className="footer-col-head">{"// navigate"}</p>
            <ul className="footer-list">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col footer-col--connect">
            <span className="footer-node" aria-hidden="true" />
            <p className="footer-col-head">{"// connect"}</p>
            <ul className="footer-list">
              <li>
                <a
                  className="footer-link"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub aria-hidden focusable={false} />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  className="footer-link"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin aria-hidden focusable={false} />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="footer-link"
                  href={`mailto:${profile.email}`}
                >
                  <FaEnvelope aria-hidden focusable={false} />
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} {profile.name}
          </p>
          <div className="footer-actions">
            <p className="footer-built">
              Built with{" "}
              <SiNextdotjs
                className="footer-built-icon"
                aria-hidden
                focusable={false}
              />{" "}
              Next.js, assisted by{" "}
              <SiClaude
                className="footer-built-icon"
                aria-hidden
                focusable={false}
              />{" "}
              Claude Opus
            </p>
            <a className="footer-top" href="#page-content">
              ↑ Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
