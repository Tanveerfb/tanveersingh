/* eslint-disable @next/next/no-img-element */

interface GalleryCardProps {
  title: string;
  poster: string;
  status?: string;
}

export default function GalleryCard({
  title,
  poster,
  status,
}: GalleryCardProps) {
  return (
    <div
      className="poster-card fx-hover-trail fx-scanlines"
      data-status={status ?? undefined}
    >
      <div className="poster-inner">
        <img
          src={poster}
          alt={title}
          className="poster-img gallery-img"
        />
        <span className="poster-title">{title}</span>
      </div>
    </div>
  );
}
