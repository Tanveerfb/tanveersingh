/**
 * Approved project copy. Nobility Care Australia comes first, Tinker Together second. Only the
 * projects cleared in decisions.md appear here; ask the owner before adding any other.
 */

export type ProjectGroup = "Nobility Care Australia" | "Tinker Together";

export type Project = {
  name: string;
  group: ProjectGroup;
  description: string;
  stack: string[];
  links: Array<{ label: string; href: string }>;
};

export const WORK = {
  kicker: "第1話 · Chapter one",
  title: "The work",
  allTab: "All",
  chapterEnd: "To be continued…",
  studioPointer: { text: "More of the studio's work is at", label: "tinkertogether.studio", href: "https://tinkertogether.studio" },
};

export const PROJECT_GROUPS: ProjectGroup[] = ["Nobility Care Australia", "Tinker Together"];

export const PROJECTS: Project[] = [
  {
    name: "NCA public website",
    group: "Nobility Care Australia",
    description:
      "Sixteen service pages for an NDIS provider, in light, dark and high-contrast themes. A contrast audit fails the build on any WCAG AA failure, and an admin area runs the blog, news, FAQs, reviews, SIL vacancies and team.",
    stack: ["Next.js 16", "TypeScript", "Tailwind v4", "SCSS", "Firebase", "next-intl", "Leaflet", "Vercel"],
    links: [{ label: "nobilitycare.com.au", href: "https://www.nobilitycare.com.au" }],
  },
  {
    name: "NCA learning platform",
    group: "Nobility Care Australia",
    description:
      "Staff training with block-based module authoring, learning paths by department, a compliance dashboard with escalations and an append-only audit log, certificates and Word import. First working version in under a week.",
    stack: ["Next.js 16", "Tiptap", "Firebase", "shadcn/ui", "Zustand", "Zod"],
    links: [{ label: "learning.nobilitycare.com.au", href: "https://learning.nobilitycare.com.au" }],
  },
  {
    name: "NCA staff portal",
    group: "Nobility Care Australia",
    description: "Folder-based document storage, view-only documents that can't be downloaded, user provisioning by invite, and a download and activity log. Internal.",
    stack: ["React", "Firebase", "React Bootstrap", "Chart.js"],
    links: [],
  },
  {
    name: "NCA Links Hub",
    group: "Nobility Care Australia",
    description: "A staff forms directory behind Microsoft Entra sign-in, limited to company accounts, with favourites. Internal.",
    stack: ["Next.js 16", "Firebase", "shadcn", "Zustand"],
    links: [],
  },
  {
    name: "Microsoft 365 automation",
    group: "Nobility Care Australia",
    description: "SharePoint sites for the Supported Independent Living houses, data collection in Microsoft Forms, and Power Automate flows. Internal.",
    stack: ["SharePoint", "Forms", "Power Automate"],
    links: [],
  },
  {
    name: "Tinker Together website",
    group: "Tinker Together",
    description: "The studio's site: portfolio, a blog with scheduled publishing and its own admin, and a website brief wizard for new clients.",
    stack: ["Next.js 16", "Firebase", "Vercel"],
    links: [{ label: "tinkertogether.studio", href: "https://tinkertogether.studio" }],
  },
  {
    name: "Toll",
    group: "Tinker Together",
    description:
      "A turn-based 3v3 team card battler for Windows, now in public beta: a shared hand of merging skill cards, 12 characters, online saves, a self-updating launcher with SHA-256 checks and rollback, and more than 500 automated tests. Its character art comes from my own pipeline on ComfyUI, running locally.",
    stack: ["Godot 4.7", "GDScript", "Firebase", "Python", "ComfyUI"],
    links: [
      { label: "Public beta", href: "https://github.com/Tanveerfb/toll-beta/releases/latest" },
      { label: "Project page", href: "https://tinkertogether.studio/portfolio/toll" },
    ],
  },
  {
    name: "Truqorun website",
    group: "Tinker Together",
    description: "Site for an India-based agency with partners in India and Australia: a network map, enquiries to Firestore and Discord, and an admin leads list.",
    stack: ["Next.js 16", "TypeScript", "Tailwind v4", "Firebase"],
    links: [{ label: "truqorun.com", href: "https://truqorun.com" }],
  },
  {
    name: "Phasmo Tourney",
    group: "Tinker Together",
    description: "Archive and live scoring for a five-tournament Phasmophobia series, each tournament in its own format.",
    stack: ["Next.js", "Firebase", "React Query", "D3", "Chart.js"],
    links: [{ label: "phasmo-tourney.vercel.app", href: "https://phasmo-tourney.vercel.app" }],
  },
  {
    name: "SimetrixDT website",
    group: "Tinker Together",
    description: "Site for a digital twin, simulation, SCADA and cybersecurity firm in Parramatta, with an admin CMS for news, use cases and PDF documentation, and a Three.js background.",
    stack: ["Next.js", "Firebase", "Three.js"],
    links: [{ label: "simetrixdt.com", href: "https://www.simetrixdt.com" }],
  },
];
