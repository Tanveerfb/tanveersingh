import { Metadata } from "next";
import { SITE_URL, SITE_NAME, PERSON_NAME } from "@/lib/siteConfig";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

/**
 * Builds per-page Metadata. When `image` is omitted the page inherits the
 * dynamic OG card from app/opengraph-image.tsx (no static asset required).
 */
export function generateSEO({
  title,
  description,
  image,
  url,
}: SEOProps): Metadata {
  const fullTitle = `${title} | ${PERSON_NAME}`;
  const canonical = url ?? "/";

  return {
    title: fullTitle,
    description,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: `${SITE_URL}${canonical === "/" ? "" : canonical}`,
      type: "website",
      siteName: SITE_NAME,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
