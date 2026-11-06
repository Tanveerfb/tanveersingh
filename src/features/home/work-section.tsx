"use client";

import { Chip } from "@/components/ui/chip";
import { MangaActionPanel, MangaPage, MangaPanel, MangaPanelText, MangaPanelTitle } from "@/components/ui/manga-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROJECT_GROUPS, PROJECTS, WORK, type Project } from "@/content/work";
import { SectionHeading } from "./section-heading";

const SPANS = { 2: "md:col-span-2", 3: "md:col-span-3", 4: "md:col-span-4" } as const;

// The page layout: how wide each panel runs in the six-column grid, as locked in docs/design/home.html.
const PANEL_SPANS: Record<string, keyof typeof SPANS> = {
  "NCA public website": 4,
  "NCA learning platform": 3,
  "NCA staff portal": 3,
  "NCA Links Hub": 2,
  "Microsoft 365 automation": 4,
  "Tinker Together website": 2,
  Toll: 4,
  "Truqorun website": 4,
  "Phasmo Tourney": 3,
  "SimetrixDT website": 3,
};
const ACTION_AFTER: Record<string, string> = { "NCA public website": "ドン!", Toll: "バン!" };
const GROUP_MARKS: Record<Project["group"], string> = { "Nobility Care Australia": "ド", "Tinker Together": "バ" };

function Chapter({ projects }: { projects: Project[] }) {
  return (
    <MangaPage className="overflow-visible md:grid-cols-6">
      {projects.flatMap((project, index) => {
        const action = ACTION_AFTER[project.name];
        const panel = (
          <MangaPanel key={project.name} from={index % 2 ? "right" : "left"} order={index % 3} className={`grid content-start gap-2 ${SPANS[PANEL_SPANS[project.name]]}`}>
            <Chip mark={GROUP_MARKS[project.group]} label={project.group} />
            <MangaPanelTitle className="m-0">{project.name}</MangaPanelTitle>
            <MangaPanelText className="text-body-sm/snug">{project.description}</MangaPanelText>
            <span className="font-mono text-xs/normal text-ink-soft">{project.stack.join(" · ")}</span>
            {project.links.length > 0 && (
              <span className="flex flex-wrap gap-x-3.5 gap-y-1 text-body-sm font-bold">
                {project.links.map((link) => (
                  <a key={link.href} href={link.href} className="wrap-anywhere underline after:inline-block after:pl-1 after:content-['➜']">
                    {link.label}
                  </a>
                ))}
              </span>
            )}
          </MangaPanel>
        );
        return action ? [panel, <MangaActionPanel key={action} sfx={action} order={(index + 1) % 3} className={SPANS[2]} />] : [panel];
      })}
    </MangaPage>
  );
}

/** The manga chapter: every cleared project, Nobility Care Australia first. */
export function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="gutter bg-paper py-18 text-on-paper">
      <div className="mx-auto max-w-page [&_:focus-visible]:outline-ink">
        <SectionHeading id="work-title" kicker={WORK.kicker} title={WORK.title} accent="work" kickerClassName="text-ember" />
        <Tabs defaultValue="all">
          <TabsList aria-label="Project groups" className="mb-4.5">
            <TabsTrigger value="all" surface="paper">
              {WORK.allTab}
            </TabsTrigger>
            {PROJECT_GROUPS.map((group) => (
              <TabsTrigger key={group} value={group} surface="paper">
                {group}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="all" className="mt-0">
            <Chapter projects={PROJECTS} />
          </TabsContent>
          {PROJECT_GROUPS.map((group) => (
            <TabsContent key={group} value={group} className="mt-0">
              <Chapter projects={PROJECTS.filter((project) => project.group === group)} />
            </TabsContent>
          ))}
        </Tabs>
        <div className="mt-4.5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="m-0 font-semibold">
            {WORK.studioPointer.text}{" "}
            <a href={WORK.studioPointer.href} className="underline">
              {WORK.studioPointer.label}
            </a>
            .
          </p>
          <p className="m-0 font-display text-cel tracking-cel">{WORK.chapterEnd}</p>
        </div>
      </div>
    </section>
  );
}
