import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEO } from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import "@/styles/features/blog-post.scss";

// Sample blog posts data
const blogPosts = {
  "nextjs-14-modern-web-apps": {
    title: "Building Modern Web Applications with Next.js 14",
    date: "2024-01-15",
    content: `
      <h2>Introduction</h2>
      <p>Next.js 14 brings exciting new features that make building modern web applications easier than ever.</p>
      
      <h2>Server Actions</h2>
      <p>Server Actions allow you to write server-side code directly in your components, eliminating the need for API routes in many cases.</p>
      
      <h2>Performance Improvements</h2>
      <p>The latest version includes significant performance optimizations, making your applications faster and more responsive.</p>
    `,
    tags: ["nextjs", "react", "web-development"],
  },
  "sharepoint-power-automate": {
    title: "Mastering SharePoint Power Automate Workflows",
    date: "2024-01-10",
    content: `
      <h2>Getting Started</h2>
      <p>Power Automate is a powerful tool for automating business processes in Microsoft 365.</p>
      
      <h2>Creating Your First Workflow</h2>
      <p>Learn how to create automated workflows that respond to events in SharePoint.</p>
    `,
    tags: ["microsoft-365", "sharepoint", "automation"],
  },
  "cyberpunk-ui-css": {
    title: "Creating Cyberpunk UI with CSS and SCSS",
    date: "2024-01-05",
    content: `
      <h2>The Cyberpunk Aesthetic</h2>
      <p>Cyberpunk design is characterized by neon colors, geometric shapes, and futuristic elements.</p>
      
      <h2>Key CSS Techniques</h2>
      <p>Learn how to use CSS variables, gradients, and animations to create stunning cyberpunk UIs.</p>
    `,
    tags: ["css", "design", "ui-ux"],
  },
};

type BlogPostParams = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];
  
  if (!post) {
    return generateSEO({
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
      url: `/blog/${slug}`,
    });
  }

  return generateSEO({
    title: post.title,
    description: post.content.substring(0, 160),
    url: `/blog/${slug}`,
  });
}

export default async function BlogPost({ params }: BlogPostParams) {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  return (
    <article className="blog-post">
      <AnimatedSection>
        <header className="blog-post-header">
          <h1 className="blog-post-title">{post.title}</h1>
          <time className="blog-post-date">{post.date}</time>
          <div className="blog-post-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-tag">
                #{tag}
              </span>
            ))}
          </div>
        </header>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </AnimatedSection>
    </article>
  );
}
