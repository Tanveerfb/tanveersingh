import type { Metadata } from "next";
import { generateSEO } from "@/components/SEO";
import BlogCard from "@/components/BlogCard";
import AnimatedSection from "@/components/AnimatedSection";
import "@/styles/features/blog.scss";

export const metadata: Metadata = generateSEO({
  title: "Blog",
  description: "Technical insights, tutorials, and thoughts on web development, Microsoft 365, and modern technology.",
  url: "/blog",
});

// Sample blog posts - in production, these would come from a CMS or markdown files
const blogPosts = [
  {
    title: "Building Modern Web Applications with Next.js 14",
    excerpt: "Explore the latest features in Next.js 14 including server actions, improved performance, and the new App Router.",
    date: "2024-01-15",
    slug: "nextjs-14-modern-web-apps",
    tags: ["nextjs", "react", "web-development"],
  },
  {
    title: "Mastering SharePoint Power Automate Workflows",
    excerpt: "Learn how to create efficient automation workflows in Microsoft 365 using Power Automate and SharePoint.",
    date: "2024-01-10",
    slug: "sharepoint-power-automate",
    tags: ["microsoft-365", "sharepoint", "automation"],
  },
  {
    title: "Creating Cyberpunk UI with CSS and SCSS",
    excerpt: "A deep dive into creating futuristic, neon-inspired user interfaces with modern CSS techniques.",
    date: "2024-01-05",
    slug: "cyberpunk-ui-css",
    tags: ["css", "design", "ui-ux"],
  },
];

export default function BlogPage() {
  return (
    <div className="blog-page">
      <AnimatedSection>
        <header className="blog-header">
          <h1 className="section-heading">Blog & Insights</h1>
          <p className="blog-intro">
            Technical articles, tutorials, and insights from the digital frontier
          </p>
        </header>
      </AnimatedSection>

      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <AnimatedSection key={post.slug} delay={index * 0.1}>
            <BlogCard {...post} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
