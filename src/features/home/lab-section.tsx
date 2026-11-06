import { SpecimenTube } from "@/components/ui/specimen-tube";
import { LAB, LAB_TUBES } from "@/content/lab";
import { Blueprint } from "./blueprint";
import { SectionHeading } from "./section-heading";

/** The Android-saga lab: the AI work, as concepts and atmosphere. */
export function LabSection() {
  return (
    <section id="lab" aria-labelledby="lab-title" className="lab-grid gutter border-y-4 border-ink py-20">
      <div className="mx-auto max-w-page">
        <div className="mb-11 grid items-center gap-8 md:grid-cols-2">
          <div>
            <SectionHeading id="lab-title" kicker={LAB.kicker} title={LAB.title} accent="intelligence" kickerClassName="text-lens" />
            <p className="-mt-2 mb-0 max-w-[56ch] text-muted">{LAB.intro}</p>
          </div>
          <Blueprint labels={LAB.blueprint} />
        </div>
        <div className="grid grid-cols-2 gap-x-3.5 gap-y-4 md:grid-cols-4 md:gap-4.5">
          {LAB_TUBES.map((tube) => (
            <SpecimenTube key={tube.code} {...tube} />
          ))}
        </div>
      </div>
    </section>
  );
}
