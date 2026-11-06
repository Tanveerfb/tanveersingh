import Image from "next/image";
import type { ReactNode } from "react";
import { Chip } from "@/components/ui/chip";
import { ABOUT, PAGE_OWNER } from "@/content/site";

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid items-baseline gap-1.5 border-b-2 border-dashed border-line pb-3.5 md:grid-cols-[130px_minmax(0,1fr)] md:gap-3.5">
      <dt className="font-display text-cel-sm tracking-cel text-gold">{label}</dt>
      <dd className="m-0">{children}</dd>
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Chip key={item} label={item} />
      ))}
    </div>
  );
}

/** The resume at a glance: who, where and what, straight under the hero. */
export function AboutSection() {
  return (
    <section aria-label="About" className="gutter border-t-4 border-ink py-16">
      <div className="mx-auto grid max-w-page items-center gap-8.5 md:grid-cols-[300px_minmax(0,1fr)] md:gap-11">
        <div className="relative w-[min(72%,260px)] -rotate-[1.5deg] justify-self-center border-4 border-ink bg-white p-2 shadow-cel-lg md:w-full">
          <div className="relative aspect-[4/5] overflow-hidden bg-ink">
            <Image src={ABOUT.photo} alt={PAGE_OWNER} fill sizes="(min-width: 48rem) 300px, 260px" className="photo-ink object-cover object-[50%_62%]" />
            <span className="photo-halftone absolute inset-0" aria-hidden="true" />
          </div>
          <span className="sfx-lettering absolute -right-3.5 -bottom-3.5 -rotate-[8deg] font-jp text-sfx font-black text-orange" aria-hidden="true">
            ドン
          </span>
        </div>
        <dl className="m-0 grid gap-4.5">
          {ABOUT.facts.map((fact) => (
            <Fact key={fact.label} label={fact.label}>
              <span className="text-lg font-semibold">{fact.value}</span>
            </Fact>
          ))}
          <Fact label="Languages">
            <Chips items={ABOUT.languages} />
          </Fact>
          <Fact label="Interests">
            <Chips items={ABOUT.interests} />
          </Fact>
        </dl>
      </div>
    </section>
  );
}
