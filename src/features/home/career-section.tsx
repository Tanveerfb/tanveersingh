import { Card, CardBody, CardMeta, CardTitle } from "@/components/ui/card";
import { CAREER_HEADING, CAREER_STAGES } from "@/content/career";
import { cn } from "@/lib/class-names";

const LEVELS = [
  { title: "text-paper", pipOn: "bg-muted" },
  { title: "text-ki-soft", pipOn: "bg-ki" },
  { title: "text-gold", pipOn: "bg-gold" },
];
const PIPS = [0, 1, 2];

/**
 * The power ladder: every role and date visible as you scroll, highest tier first, so it reads
 * like a resume with Nobility Care Australia at the top.
 */
export function CareerSection() {
  const top = CAREER_STAGES.length - 1;
  return (
    <section id="forms" aria-label="Career" className="gutter pt-18 pb-14">
      <div className="mx-auto max-w-page">
        <p className="m-0 mb-2 font-jp text-kicker font-black text-orange">{CAREER_HEADING.kicker}</p>
        {CAREER_STAGES.map((stage, level) => ({ stage, level }))
          .reverse()
          .map(({ stage, level }) => (
            <div key={stage.name} className="grid gap-4 border-t-2 border-dashed border-line py-6.5 md:grid-cols-[190px_minmax(0,1fr)] md:gap-6.5">
              <div className="self-start md:sticky md:top-6">
                <h2 className={cn("cel-lettering m-0 font-display text-tier font-normal tracking-cel", LEVELS[level].title)}>{stage.name}</h2>
                <div className="mt-3 flex gap-1" aria-hidden="true">
                  {PIPS.map((pip) => (
                    <i key={pip} className={cn("h-2.25 w-6.5 border-2 border-ink", pip <= level ? LEVELS[level].pipOn : "bg-line")} />
                  ))}
                </div>
              </div>
              <div className={cn("grid gap-5.5 md:grid-cols-2", level === top ? "items-stretch" : "items-start")}>
                {stage.entries.map((entry) => (
                  <Card key={entry.title} highlighted={level === top}>
                    <CardTitle>{entry.title}</CardTitle>
                    <CardMeta className="text-sm/snug">{entry.meta}</CardMeta>
                    {entry.description && <CardBody className="text-base/snug">{entry.description}</CardBody>}
                  </Card>
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
