import GalleryCard from "./GalleryCard";

interface GalleryItem {
  title: string;
  poster: string;
  status?: string;
}

interface GalleryGridProps {
  header?: string;
  items: GalleryItem[];
}

export default function GalleryGrid({ header, items }: GalleryGridProps) {
  const resolvedHeader = header ?? "Gallery";

  return (
    <section className="gallery-page">
      {resolvedHeader && <h1 className="gallery-title">{resolvedHeader}</h1>}
      <div className="gallery-grid">
        {items.map((item, index) => (
          <GalleryCard
            key={index}
            title={item.title}
            poster={item.poster}
            status={item.status}
          />
        ))}
      </div>
    </section>
  );
}
