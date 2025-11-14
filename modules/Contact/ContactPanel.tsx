interface ContactLink {
  label: string;
  url: string;
}

interface ContactPanelProps {
  header: string;
  description: string;
  email: string;
  phone?: string;
  links: ContactLink[];
}

export default function ContactPanel({
  header,
  description,
  email,
  phone,
  links,
}: ContactPanelProps) {
  return (
    <section className="contact-page">
      <h1 className="contact-title">{header}</h1>

      <div className="contact-panel panel">
        <p className="contact-desc">{description}</p>
        <p className="contact-email">
          Email: <a href={`mailto:${email}`}>{email}</a>
        </p>
        {phone ? (
          <p className="contact-phone">
            Phone: <a href={`tel:${phone}`}>{phone}</a>
          </p>
        ) : null}

        <div className="contact-links">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
