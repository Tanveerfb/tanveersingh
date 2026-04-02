import type { Metadata } from "next";
import { generateSEO } from "@/components/SEO";

export const metadata: Metadata = generateSEO({
  title: "Blog",
  description: "Thoughts, tutorials, and insights — coming soon.",
  url: "/blog",
});

export default function BlogPage() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        textAlign: "center",
      }}
    >
      <h1 className="section-heading" style={{ marginBottom: 0 }}>
        Blog
      </h1>
      <p
        style={{
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.9rem",
        }}
      >
        &gt; Content incoming — check back soon.
      </p>
    </div>
  );
}
