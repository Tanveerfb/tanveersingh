import GalleryGrid from "@/modules/Gallery/GalleryGrid";
import siteData from "@/content/siteData.json";

export default function GalleryPage() {
  const posters = siteData.creator.gamePosters;

  console.log("Gallery posters:", posters);

  return <GalleryGrid items={posters} />;
}
