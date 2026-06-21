import type { JSX } from "react";
import {
  SITE_URL,
  SITE_NAME,
  PERSON_NAME,
  PERSON_ROLE,
  SITE_DESCRIPTION,
  SOCIAL_LINKS,
  KNOWS_ABOUT,
} from "@/lib/siteConfig";

/**
 * Renders a JSON-LD <script> for a schema.org node.
 * JSON.stringify output is safe to inject — it contains no executable markup.
 */
function JsonLd({ data }: { data: Record<string, unknown> }): JSX.Element {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Site-wide structured data: Person (identity/Knowledge Panel) + WebSite.
 * Mounted once in the root layout.
 */
export function SiteStructuredData(): JSX.Element {
  const personId = `${SITE_URL}/#person`;

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: PERSON_NAME,
    url: SITE_URL,
    jobTitle: PERSON_ROLE,
    description: SITE_DESCRIPTION,
    sameAs: SOCIAL_LINKS,
    knowsAbout: KNOWS_ABOUT,
    address: {
      "@type": "PostalAddress",
      addressRegion: "New South Wales",
      addressLocality: "Greater Sydney",
      addressCountry: "AU",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en-AU",
    author: { "@id": personId },
    publisher: { "@id": personId },
  };

  return (
    <>
      <JsonLd data={person} />
      <JsonLd data={website} />
    </>
  );
}

interface PortfolioItem {
  title: string;
  description: string;
  link?: string;
}

/**
 * ItemList of portfolio works (CreativeWork). Mounted on the portfolio page so
 * each project becomes an addressable entity for rich results + AI grounding.
 */
export function PortfolioStructuredData({
  projects,
}: {
  projects: readonly PortfolioItem[];
}): JSX.Element {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${PERSON_NAME} — Portfolio`,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        author: { "@id": `${SITE_URL}/#person` },
        ...(project.link ? { url: project.link } : {}),
      },
    })),
  };

  return <JsonLd data={data} />;
}
