/**
 * Single source of truth for site-wide SEO + identity metadata.
 * Override the domain per-environment with NEXT_PUBLIC_SITE_URL.
 */

const RAW_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tanveer.truqorun.com";

/** Absolute origin, no trailing slash (so `${SITE_URL}/path` is always clean). */
export const SITE_URL: string = RAW_URL.replace(/\/+$/, "");

export const SITE_NAME = "Tanveer Singh Portfolio";
export const PERSON_NAME = "Tanveer Singh";
export const PERSON_ROLE = "Developer & Programmer";
export const PERSON_LOCATION = "Greater Sydney Region, NSW, Australia";

export const SITE_TITLE = `${PERSON_NAME} | ${PERSON_ROLE}`;
export const SITE_DESCRIPTION =
  "Portfolio of Tanveer Singh, a Developer & Programmer in Sydney — Next.js, Firebase, AI integration, Microsoft 365, and end-to-end web solutions.";

/** Identity anchors used by JSON-LD `sameAs` and AI-search disambiguation. */
export const SOCIAL_LINKS: readonly string[] = [
  "https://github.com/tanveerfb",
  "https://linkedin.com/in/tanveerfb",
];

/** Areas of expertise surfaced to crawlers (Person.knowsAbout + llms.txt). */
export const KNOWS_ABOUT: readonly string[] = [
  "Web Development",
  "Next.js",
  "React",
  "Node.js",
  "TypeScript",
  "Firebase",
  "AI Integration",
  "Retrieval-Augmented Generation (RAG)",
  "Local LLMs",
  "Microsoft 365 Administration",
  "SharePoint",
  "Full-Stack Development",
];

/** Routes included in the sitemap. Excludes /admin* and the /blog stub. */
export interface SiteRoute {
  path: string;
  priority: number;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
}

export const SITE_ROUTES: readonly SiteRoute[] = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/experience", priority: 0.8, changeFrequency: "monthly" },
  { path: "/portfolio", priority: 0.9, changeFrequency: "monthly" },
  { path: "/components", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
];
