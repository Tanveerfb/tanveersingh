/** Approved career copy. Nobility Care Australia comes first, Tinker Together second. Owner, 2026-11-06. */

export type CareerEntry = {
  title: string;
  meta: string;
  description?: string;
};

export type CareerStage = {
  name: string;
  entries: CareerEntry[];
};

export const CAREER_HEADING = { kicker: "変身 · Transformations", prompt: "keep scrolling to power up" };

/** In the order the transformation scroll plays them, base form to full power. */
export const CAREER_STAGES: CareerStage[] = [
  {
    name: "Base form",
    entries: [
      {
        title: "Web Developer",
        meta: "Freelance · Mar 2021 – Oct 2026 · Greater Sydney",
        description: "Websites and web apps for my own clients, until the work became a studio.",
      },
      {
        title: "Web Developer Intern",
        meta: "Easylink Finance Australia · Apr 2022 – Jul 2022 · Greater Sydney",
      },
      {
        title: "Bachelor of Information Technology, Computer Programming",
        meta: "Kent Institute Australia · Sep 2018 – Mar 2021",
      },
      {
        title: "Bachelor of Information Technology",
        meta: "La Trobe University, Sydney campus · 2016 – 2018",
      },
    ],
  },
  {
    name: "Powering up",
    entries: [
      {
        title: "Information Technology Consultant",
        meta: "Truqorun · Freelance · Oct 2026 – present · Remote",
        description: "Full website design, front and back end.",
      },
      {
        title: "Information Technology Help Desk Support",
        meta: "Simetrix Digital Technologies · Contract · Jan 2026 – present · Remote",
        description: "Full website design, front and back end.",
      },
    ],
  },
  {
    name: "Full power",
    entries: [
      {
        title: "Nobility Care Australia",
        meta: "Developer Programmer · Contract · Feb 2023 – present · Campbelltown, NSW",
        description:
          "I built and maintain the public website, the staff portal and the learning platform for this NDIS provider, and I look after the SharePoint and Microsoft 365 setup, including the Power Automate workflows.",
      },
      {
        title: "Tinker Together",
        meta: "Head of Studio · Oct 2026 – present · Sydney",
        description:
          "My web development and AI studio in Sydney: custom websites, content management back ends, staff portals and learning platforms, with AI where it earns its place.",
      },
    ],
  },
];
