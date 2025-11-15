import type { Metadata } from "next";
import GalleryGrid from "@/modules/Gallery/GalleryGrid";
import siteData from "@/content/siteData.json";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse Tanveer Singh's gallery of gaming posters and creative assets curated from the DukeOS creator catalog.",
  openGraph: {
    title: "Tanveer Singh | Gallery",
    description:
      "Visual showcase of Tanveer Singh's favorite gaming universes and content creation highlights.",
    url: "/gallery",
  },
};

export default function GalleryPage() {
  const posters = siteData.creator.gamePosters;

  return <GalleryGrid items={posters} />;
}
