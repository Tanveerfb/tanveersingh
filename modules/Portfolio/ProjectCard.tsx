import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  link,
  image,
}: ProjectCardProps) {
  return (
    <div className="project-card panel">
      <div className="project-image">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            className="project-img"
          />
        ) : null}
      </div>
      <h3 className="project-title">{title}</h3>
      <p className="project-description">{description}</p>

      <div className="project-tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>

      {link ? (
        <a href={link} className="project-link">
          View
        </a>
      ) : null}
    </div>
  );
}
