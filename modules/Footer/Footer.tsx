import type { JSX } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitch,
  FaXTwitter,
  FaGlobe,
} from "react-icons/fa6";

interface SocialLink {
  label: string;
  url: string;
}

interface FooterProps {
  leftContent: string;
  social: SocialLink[];
  achievementText: string;
}

export default function Footer({
  leftContent,
  social,
  achievementText,
}: FooterProps): JSX.Element {
  const resolveSocialIcon = (label: string, url: string) => {
    const lowerLabel = label.toLowerCase();
    const lowerUrl = url.toLowerCase();

    if (lowerLabel.includes("github") || lowerUrl.includes("github.com")) {
      return FaGithub;
    }

    if (lowerLabel.includes("linkedin") || lowerUrl.includes("linkedin.com")) {
      return FaLinkedin;
    }

    if (lowerLabel.includes("twitch") || lowerUrl.includes("twitch.tv")) {
      return FaTwitch;
    }

    if (
      lowerLabel.includes("twitter") ||
      lowerLabel === "x" ||
      lowerUrl.includes("twitter.com") ||
      lowerUrl.includes("x.com")
    ) {
      return FaXTwitter;
    }

    return FaGlobe;
  };

  return (
    <footer id="site-footer" className="footer-bar">
      <div className="footer-inner">
        <div className="footer-left">{leftContent}</div>
        <div className="footer-center">
          {social.map((link) => {
            const Icon = resolveSocialIcon(link.label, link.url);

            return (
              <a
                key={link.url}
                className="footer-link"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon aria-hidden focusable={false} />
                {link.label}
              </a>
            );
          })}
        </div>
        <div className="footer-right">{achievementText}</div>
      </div>
    </footer>
  );
}
