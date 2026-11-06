import type { ScouterReading } from "@/components/ui/scouter";

/** Approved copy for the scouter. Real facts only, never an invented number. Owner, 2026-11-06. */

export const SKILLS_HEADING = {
  kicker: "スカウター · Scouter",
  title: "What I fight with",
  /** Quote with its date or not at all (about-tanveer.md). */
  restingReading: "1,000+ GitHub contributions in 2026 as of October, counted by GitHub",
};

export const SKILL_GROUPS: Array<{ name: string; readings: ScouterReading[] }> = [
  {
    name: "Web",
    readings: [
      { skill: "Next.js", lines: ["NCA public website", "NCA learning platform", "Tinker Together website", "Roleodex"], overload: true },
      { skill: "React", lines: ["NCA staff portal"] },
      { skill: "TypeScript", lines: ["NCA public website"] },
      { skill: "Tailwind CSS", lines: ["NCA public website"] },
      { skill: "WCAG", lines: ["NCA public website: a contrast audit that fails the build, and three themes"] },
    ],
  },
  {
    name: "Back end",
    readings: [
      { skill: "Firebase", lines: ["NCA website, learning platform and staff portal", "Tinker Together website", "Toll's online saves"], overload: true },
      { skill: "Zod", lines: ["NCA learning platform"] },
    ],
  },
  {
    name: "AI",
    readings: [
      { skill: "Claude", lines: ["First choice for AI work", "Claude Code, with my own published standard"], overload: true },
      { skill: "Gemini", lines: ["Second choice for AI work"] },
      { skill: "Local models", lines: ["Roleodex, on Ollama or LM Studio", "For material that shouldn't leave the building"] },
      { skill: "Vercel AI SDK", lines: ["Roleodex"] },
      { skill: "ComfyUI", lines: ["Toll's character art, on my own local pipeline", "Tinker Together's image pipelines"] },
    ],
  },
  {
    name: "Games (exploring now)",
    readings: [
      { skill: "Godot 4", lines: ["Toll, in public beta", "More than 500 automated tests"] },
      { skill: "Python", lines: ["Toll's tooling"] },
    ],
  },
  {
    name: "Microsoft 365",
    readings: [
      { skill: "SharePoint", lines: ["NCA's site structure, permissions and SIL house sites"] },
      { skill: "Power Automate", lines: ["NCA's workflows"] },
    ],
  },
];
