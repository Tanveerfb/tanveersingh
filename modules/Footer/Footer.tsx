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
}: FooterProps) {
  return (
    <footer id="site-footer" className="footer-bar">
      <div className="footer-inner">
        <div className="footer-left">{leftContent}</div>
        <div className="footer-center">
          {social.map((link) => (
            <a
              key={link.url}
              className="footer-link"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="footer-right">{achievementText}</div>
      </div>
    </footer>
  );
}
