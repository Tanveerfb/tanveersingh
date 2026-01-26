import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export function generateSEO({
  title,
  description,
  image,
  url,
}: SEOProps): Metadata {
  const siteName = "Tanveer Singh Portfolio";
  const fullTitle = `${title} | Tanveer Singh`;
  const defaultImage = "/og-image.png";
  const siteUrl = "https://tanveersingh.dev";

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: url ? `${siteUrl}${url}` : siteUrl,
      type: "website",
      siteName,
      images: [
        {
          url: image || defaultImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image || defaultImage],
    },
  };
}
