"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tags?: string[];
}

export default function BlogCard({
  title,
  excerpt,
  date,
  slug,
  tags = [],
}: BlogCardProps) {
  return (
    <motion.article
      className="pixel-card blog-card"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/blog/${slug}`} className="blog-card-link">
        <div className="blog-card-content">
          <div className="blog-card-date">{date}</div>
          <h3 className="blog-card-title">{title}</h3>
          <p className="blog-card-excerpt">{excerpt}</p>
          {tags.length > 0 && (
            <div className="blog-card-tags">
              {tags.map((tag) => (
                <span key={tag} className="blog-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
