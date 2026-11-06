"use client";

import { useState } from "react";
import { Aura } from "@/components/ui/aura";
import { Button } from "@/components/ui/button";
import { HERO } from "@/content/site";

const ROCKS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

/**
 * The transformation: shake, rumble, rising rocks, a blue aura, a flash, then the golden form. Its
 * resting style is the final frame and the charging looks are held by CSS animations timed to the
 * aura, so reduced motion and a slow load both land on gold. A new `key` replays all of it.
 */
export function HeroSection() {
  const [run, setRun] = useState(0);
  return (
    <Aura key={run} className="gutter min-h-hero w-full">
      <span className="hero-sky-charging absolute inset-0 -z-20 animate-charging-layer opacity-0" aria-hidden="true" />
      <span className="hero-lines absolute -inset-[30%] -z-20 animate-lines opacity-40" aria-hidden="true" />
      <span className="absolute inset-0 z-10 animate-flash bg-paper opacity-0" aria-hidden="true" />
      {ROCKS.map((index) => (
        <i key={index} style={{ "--i": index } as React.CSSProperties} className="debris-rock absolute -z-10 animate-debris opacity-0" aria-hidden="true" />
      ))}
      <div className="mx-auto grid max-w-page animate-shake justify-items-center pt-12 pb-23 text-center">
        <div
          className="animate-rumble font-jp text-rumble font-black text-gold [-webkit-text-stroke:var(--cel-stroke-sm)_var(--color-ink)] [paint-order:stroke_fill] [rotate:-4deg] [text-shadow:3px_3px_0_var(--color-ink)] select-none"
          aria-hidden="true"
        >
          ゴゴゴゴ
        </div>
        <p className="mt-3 mb-4.5 border-2 border-ink bg-ember px-3 py-1.75 text-caption/tight font-extrabold tracking-[0.14em] text-on-ember uppercase shadow-cel-sm">{HERO.eyebrow}</p>
        <h1 data-aura-target className="cel-lettering-lg m-0 w-fit font-display text-name font-normal tracking-cel uppercase">
          <span className="block animate-charging-color text-gold [--charging-color:var(--color-paper)]">{HERO.firstName}</span>
          <span className="block animate-charging-color text-orange [--charging-color:var(--color-ki-soft)]">{HERO.lastName}</span>
        </h1>
        <p className="mt-6.5 mb-2 text-thesis font-extrabold text-balance [text-shadow:2px_2px_0_var(--color-ink)]">{HERO.tagline}</p>
        <p className="m-0 mb-6 max-w-[64ch] [text-shadow:1px_1px_0_var(--color-ink)]">
          {HERO.roles.map((role) => (
            <b key={role} className="block">
              {role}
            </b>
          ))}
          {HERO.intro}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Button asChild>
            <a href="#work" data-transmit>
              {HERO.primaryAction}
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a href="#contact" data-transmit>
              {HERO.secondaryAction}
            </a>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setRun((current) => current + 1)}>
            {HERO.replay}
          </Button>
        </div>
      </div>
    </Aura>
  );
}
