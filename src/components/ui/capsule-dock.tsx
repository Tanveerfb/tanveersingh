"use client";

import { useEffect, useRef } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { useInstantTransmission } from "@/hooks/use-instant-transmission";
import { cn } from "@/lib/class-names";

type DockLink = { href: `#${string}`; label: string };

type CapsuleDockProps = {
  /** The monogram, linking to the top of the page. */
  mark: DockLink;
  links: DockLink[];
  label: string;
};

const LINK = "whitespace-nowrap rounded-full border-2 border-transparent px-3.25 py-2.25 font-display text-cel-sm tracking-cel no-underline";

/** The floating paper capsule, within thumb reach. Jumps between sections by instant transmission. */
export function CapsuleDock({ mark, links, label }: CapsuleDockProps) {
  const active = useActiveSection(links.map((link) => link.href.slice(1)));
  const { phase, onLinkClick, onOverlayAnimationEnd } = useInstantTransmission();
  const navRef = useRef<HTMLElement>(null);

  // On a phone the capsule scrolls sideways: keep the current section in sight.
  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>('[aria-current="true"]');
    if (nav && link) nav.scrollLeft = link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2;
  }, [active]);

  return (
    <>
      <nav
        ref={navRef}
        aria-label={label}
        className="fixed bottom-[max(14px,env(safe-area-inset-bottom,0px))] left-1/2 z-40 flex max-w-[calc(100%-20px)] -translate-x-1/2 gap-1 overflow-x-auto rounded-full border-3 border-ink bg-paper p-1.5 shadow-cel [scrollbar-width:none] [&_:focus-visible]:outline-ink [&_:focus-visible]:-outline-offset-3"
      >
        <a href={mark.href} aria-label={mark.label} onClick={onLinkClick} className={cn(LINK, "bg-ink text-gold")}>
          {mark.label}
        </a>
        {links.map((link) => {
          const current = active === link.href.slice(1);
          return (
            <a
              key={link.href}
              href={link.href}
              aria-current={current ? "true" : undefined}
              onClick={onLinkClick}
              className={cn(LINK, current ? "border-ink bg-ember text-on-ember" : "text-ink hover:border-ink")}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
      {phase !== "idle" && (
        <div
          aria-hidden="true"
          onAnimationEnd={onOverlayAnimationEnd}
          className={cn("streak-overlay pointer-events-none fixed inset-0 z-30", phase === "out" ? "animate-streak-out" : "animate-streak-in")}
        />
      )}
    </>
  );
}
