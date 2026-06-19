# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage with a full-viewport split hero (identity left, living circuit board right), a "What I Build" domain-tiles section, polished existing sections, and a contact CTA strip.

**Architecture:** Additive — three new components (CircuitBoard, WhatIBuild, ContactCTA) sit alongside existing sections. Hero gets a 2-col CSS Grid layout. All new SCSS files are added to `styles/globals.scss` via `@import`. Circuit board animations are pure CSS keyframes on SVG child elements (never on the container).

**Tech Stack:** Next.js 16 App Router, SCSS, framer-motion (existing, for hero entrance stagger only), inline SVG with CSS keyframe animations.

## Global Constraints

- No `backdrop-filter` anywhere
- No `opacity: 0` hardcoded on content — use `animation-fill-mode: both` or omit `initial` entirely
- No `animation: ... infinite` on full-height or full-viewport background containers — only on bounded SVG child elements
- Colors via CSS custom properties; `rgba()` alpha variations are acceptable where no token matches
- No inline `style={{}}` props unless the value is dynamic at runtime
- `@/` aliases only — no relative imports
- TypeScript strict mode — no `any`
- Files must stay under 400 lines
- Build (`npm run build`) must pass after every task
- One git commit per task only — not per file

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Modify | `styles/features/hero.scss` | 2-col grid layout, larger name + glow, panel container, accent rule |
| Modify | `modules/Hero/HeroSection.tsx` | Identity column structure, eyebrow text, circuit panel slot |
| Create | `modules/Hero/CircuitBoard.tsx` | SVG circuit board component (traces, nodes, CSS animations) |
| Create | `styles/features/circuit-board.scss` | Panel border/glow, SVG animation keyframes |
| Create | `modules/Home/WhatIBuild.tsx` | Domain tiles section |
| Create | `styles/features/what-i-build.scss` | Tile grid + responsive styles |
| Create | `modules/Home/ContactCTA.tsx` | Contact CTA strip |
| Create | `styles/features/contact-cta.scss` | CTA strip styles |
| Modify | `app/page.tsx` | Import + render all sections in correct order |
| Modify | `modules/Testimonials/TestimonialsSection.tsx` | Fix hardcoded `opacity: 0` animation anti-pattern |
| Modify | `styles/pages/home.scss` | `fw-index` color nudge |
| Modify | `styles/globals.scss` | Add `@import` for each new SCSS file |

---

## Task 1: Hero layout restructure + name glow

**Files:**
- Modify: `styles/features/hero.scss`
- Modify: `modules/Hero/HeroSection.tsx`

**Interfaces:**
- Produces: `.hero` (2-col grid), `.hero-identity` (left column), `.hero-circuit-panel` (right column slot), `.hero-accent-rule`, `.hero-name` with glow
- Consumed by: Task 2 (fills `.hero-circuit-panel` with CircuitBoard)

- [ ] **Step 1: Replace `styles/features/hero.scss`**

Full file replacement. The `.hero-content` class is renamed to `.hero-identity`. Add `.hero-circuit-panel` and `.hero-accent-rule`. The circuit panel is an empty slot now — Task 2 fills it.

```scss
/* ── Hero ── */

.hero {
  min-height: 100dvh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  padding: 4rem 0 5rem;
}

.hero-identity {
  max-width: 580px;
}

.hero-accent-rule {
  width: 48px;
  height: 2px;
  background: var(--accent-alt);
  box-shadow: 0 0 8px rgba(255, 45, 170, 0.6);
  margin-bottom: 1.4rem;
}

.hero-eyebrow {
  font-family: var(--font-mono), monospace;
  font-size: 0.76rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--accent-alt);
  margin: 0 0 1.4rem;

  &::before {
    content: "> ";
    opacity: 0.5;
  }
}

.hero-name {
  font-family: var(--font-display), sans-serif;
  font-size: clamp(4rem, 10vw, 7rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.06;
  color: var(--text);
  margin: 0 0 1.4rem;
  text-wrap: balance;
  text-shadow:
    0 0 40px rgba(0, 229, 255, 0.3),
    0 0 100px rgba(0, 229, 255, 0.1);
}

.hero-tagline {
  font-family: var(--font-body), sans-serif;
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  color: var(--text-muted);
  line-height: 1.65;
  max-width: 52ch;
  margin: 0 0 2.5rem;
  text-wrap: pretty;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-circuit-panel {
  height: 480px;
  border: 1px solid var(--accent);
  border-radius: 8px;
  box-shadow:
    0 0 20px rgba(0, 229, 255, 0.15),
    inset 0 0 40px rgba(0, 229, 255, 0.03);
  background: var(--panel);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── CTA Buttons ── */
.btn-primary {
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 1.5rem;
  background: transparent;
  border: 1px solid var(--accent);
  border-radius: 6px;
  color: var(--accent);
  font-family: var(--font-body), sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: var(--accent);
    color: var(--bg);
    box-shadow: 0 0 22px rgba(0, 229, 255, 0.35);
  }
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 1.5rem;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-muted);
  font-family: var(--font-body), sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    border-color: var(--text-muted);
    color: var(--text);
  }
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero-circuit-panel {
    display: none;
  }

  .hero-identity {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 3rem 0 4rem;
  }
}

@media (max-width: 480px) {
  .hero-name {
    font-size: clamp(2.6rem, 13vw, 4rem);
  }

  .hero-actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-primary,
  .btn-ghost {
    width: 100%;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .btn-primary,
  .btn-ghost {
    transition: none;
  }

  .hero-name {
    text-shadow: none;
  }
}
```

- [ ] **Step 2: Replace `modules/Hero/HeroSection.tsx`**

Rename `hero-content` → `hero-identity`. Add `.hero-accent-rule` div. Update eyebrow text to `tsingh · Sydney, AU` (hardcoded — display string, not semantic content). Add `.hero-circuit-panel` div (empty for now — Task 2 fills it).

```tsx
"use client";

import type { JSX } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function HeroSection(): JSX.Element {
  return (
    <section className="hero" aria-label="Introduction">
      <motion.div
        className="hero-identity"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="hero-accent-rule" aria-hidden="true" />

        <motion.p className="hero-eyebrow" variants={rise}>
          tsingh&ensp;&middot;&ensp;Sydney, AU
        </motion.p>

        <motion.h1 className="hero-name" variants={rise}>
          Tanveer Singh
        </motion.h1>

        <motion.p className="hero-tagline" variants={rise}>
          Building reliable systems and web applications — end to end.
        </motion.p>

        <motion.div className="hero-actions" variants={rise}>
          <Link href="/portfolio" className="btn-primary">
            View My Work
          </Link>
          <Link href="/contact" className="btn-ghost">
            Get in Touch
          </Link>
        </motion.div>
      </motion.div>

      <div className="hero-circuit-panel" aria-hidden="true">
        {/* CircuitBoard added in Task 2 */}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: exit 0, no TypeScript or SCSS errors. The circuit panel will be an empty bordered box — that's expected at this stage.

- [ ] **Step 4: Commit**

```bash
git add styles/features/hero.scss modules/Hero/HeroSection.tsx
git commit -m "feat(homepage): hero 2-col grid layout, name glow, accent rule"
```

---

## Task 2: CircuitBoard SVG component

**Files:**
- Create: `modules/Hero/CircuitBoard.tsx`
- Create: `styles/features/circuit-board.scss`
- Modify: `styles/globals.scss` (add import)
- Modify: `modules/Hero/HeroSection.tsx` (add CircuitBoard import + render)

**Interfaces:**
- Consumes: `.hero-circuit-panel` from Task 1 (parent container)
- Produces: `CircuitBoard` default export; `.circuit-svg`, `.trace`, `.trace--primary`, `.trace--secondary`, `.trace--animated`, `.trace--flicker`, `.node`, `.node--pulse-1/2/3` CSS classes

**SVG geometry (ViewBox: "0 0 400 500"):**

Primary traces (cyan glow, class `trace trace--primary`):
- Trace A: `M 30,120 H 160 V 200 H 300 V 140 H 380`
- Trace B (flicker target): `M 80,320 H 240 V 380 H 360`

Secondary traces (dim, class `trace trace--secondary`):
- `M 160,60 V 120`
- `M 300,200 V 320 H 360`
- `M 30,240 H 80 V 320`
- `M 360,380 V 460`

Animated data packet (class `trace trace--primary trace--animated`, same `d` as Trace A):
- `M 30,120 H 160 V 200 H 300 V 140 H 380`

Nodes (class `node`, `fill: var(--accent-alt)`):
| cx | cy | r | extra class |
|---|---|---|---|
| 160 | 120 | 5 | `node--pulse-1` |
| 300 | 200 | 5 | `node--pulse-2` |
| 160 | 200 | 3 | — |
| 300 | 140 | 3 | — |
| 80  | 320 | 4 | — |
| 240 | 320 | 4 | — |
| 360 | 380 | 5 | `node--pulse-3` |

- [ ] **Step 1: Create `styles/features/circuit-board.scss`**

```scss
/* ── Circuit Board ── */

.circuit-svg {
  width: 90%;
  height: 90%;
}

.trace {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;

  &--primary {
    stroke: var(--accent);
    stroke-width: 1.5;
    filter: drop-shadow(0 0 4px rgba(0, 229, 255, 0.6));
  }

  &--secondary {
    stroke: var(--border);
    stroke-width: 1;
    opacity: 0.5;
  }

  &--animated {
    /* Moving data-packet: short dash travels full path */
    /* Trace A total length ≈ 490 SVG units (130+80+140+60+80) */
    stroke-dasharray: 14 476;
    stroke-dashoffset: 0;
    stroke: var(--accent);
    stroke-width: 2.5;
    filter: drop-shadow(0 0 6px rgba(0, 229, 255, 1));
    animation: dataPacket 5s linear infinite 1s;
  }

  &--flicker {
    animation: traceFlicker 9s linear infinite 2s;
  }
}

.node {
  fill: var(--accent-alt);
  filter: drop-shadow(0 0 6px rgba(255, 45, 170, 0.8));
}

/* ── Keyframes ── */

@keyframes dataPacket {
  /* dash travels 490 SVG units then resets */
  0% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  95% {
    stroke-dashoffset: -490;
    opacity: 0;
  }
  100% {
    stroke-dashoffset: -490;
    opacity: 0;
  }
}

@keyframes nodePulse {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 1;
  }
}

.node--pulse-1 {
  animation: nodePulse 3s ease-in-out infinite;
}

.node--pulse-2 {
  animation: nodePulse 3s ease-in-out infinite 1.8s;
}

.node--pulse-3 {
  animation: nodePulse 3s ease-in-out infinite 3.4s;
}

@keyframes traceFlicker {
  0%,
  13%,
  15%,
  100% {
    opacity: 1;
  }
  14% {
    opacity: 0.15;
  }
}

@keyframes panelGlitch {
  /* 12s cycle: glitch at ~96%, otherwise still */
  0%,
  95.4%,
  99%,
  100% {
    transform: none;
  }
  95.5% {
    transform: translateX(3px) translateY(-1px);
  }
  96.5% {
    transform: translateX(-3px) translateY(1px);
  }
  97.5% {
    transform: translateX(2px);
  }
  98% {
    transform: none;
  }
}

.circuit-svg {
  animation: panelGlitch 12s linear infinite;
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .trace--animated,
  .trace--flicker,
  .node--pulse-1,
  .node--pulse-2,
  .node--pulse-3,
  .circuit-svg {
    animation: none;
    stroke-dasharray: none;
    opacity: 1;
  }
}
```

- [ ] **Step 2: Create `modules/Hero/CircuitBoard.tsx`**

```tsx
import type { JSX } from "react";

export default function CircuitBoard(): JSX.Element {
  return (
    <svg
      className="circuit-svg"
      viewBox="0 0 400 500"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Secondary traces (dim — depth layer) */}
      <path className="trace trace--secondary" d="M 160,60 V 120" />
      <path className="trace trace--secondary" d="M 300,200 V 320 H 360" />
      <path className="trace trace--secondary" d="M 30,240 H 80 V 320" />
      <path className="trace trace--secondary" d="M 360,380 V 460" />

      {/* Primary traces (cyan glow) */}
      <path
        className="trace trace--primary"
        d="M 30,120 H 160 V 200 H 300 V 140 H 380"
      />
      <path
        className="trace trace--primary trace--flicker"
        d="M 80,320 H 240 V 380 H 360"
      />

      {/* Data packet — same path as Trace A, short animated dash */}
      <path
        className="trace trace--primary trace--animated"
        d="M 30,120 H 160 V 200 H 300 V 140 H 380"
      />

      {/* Nodes */}
      <circle className="node node--pulse-1" cx="160" cy="120" r="5" />
      <circle className="node node--pulse-2" cx="300" cy="200" r="5" />
      <circle className="node" cx="160" cy="200" r="3" />
      <circle className="node" cx="300" cy="140" r="3" />
      <circle className="node" cx="80" cy="320" r="4" />
      <circle className="node" cx="240" cy="320" r="4" />
      <circle className="node node--pulse-3" cx="360" cy="380" r="5" />
    </svg>
  );
}
```

- [ ] **Step 3: Add SCSS import to `styles/globals.scss`**

After line 9 (`@import "./features/hero.scss";`), add:

```scss
@import "./features/circuit-board.scss";
```

- [ ] **Step 4: Wire CircuitBoard into `modules/Hero/HeroSection.tsx`**

Add import at top (after framer-motion import):
```tsx
import CircuitBoard from "@/modules/Hero/CircuitBoard";
```

Replace the circuit panel comment with the component:
```tsx
<div className="hero-circuit-panel" aria-hidden="true">
  <CircuitBoard />
</div>
```

- [ ] **Step 5: Verify build passes**

```bash
npm run build
```

Expected: exit 0. Circuit board renders in the right column. Animations play. On a ≤900px viewport, the panel is hidden.

- [ ] **Step 6: Commit**

```bash
git add modules/Hero/CircuitBoard.tsx styles/features/circuit-board.scss styles/globals.scss modules/Hero/HeroSection.tsx
git commit -m "feat(homepage): living circuit board SVG panel in hero"
```

---

## Task 3: What I Build domain tiles

**Files:**
- Create: `modules/Home/WhatIBuild.tsx`
- Create: `styles/features/what-i-build.scss`
- Modify: `styles/globals.scss` (add import)

**Interfaces:**
- Produces: `WhatIBuild` default export (no props); CSS classes `.what-i-build`, `.wib-label`, `.wib-grid`, `.wib-tile`, `.wib-prefix`, `.wib-name`, `.wib-desc`
- Consumed by: Task 5 (`app/page.tsx`)

- [ ] **Step 1: Create `modules/Home/WhatIBuild.tsx`**

The `modules/Home/` directory does not exist yet — create it implicitly by creating this file at the path.

Content is hardcoded — these 4 domains are stable display data, not frequently-edited copy.

```tsx
import type { JSX } from "react";

const domains = [
  {
    name: "Web Applications",
    desc: "Next.js, Node.js, full-stack from DB to deploy",
  },
  {
    name: "Cloud & Firebase",
    desc: "Auth, Firestore, storage, Vercel hosting",
  },
  {
    name: "AI Integration",
    desc: "Local LLMs, RAG pipelines, vector embeddings",
  },
  {
    name: "Microsoft 365",
    desc: "Administration, automation, internal tooling",
  },
] as const;

export default function WhatIBuild(): JSX.Element {
  return (
    <section className="what-i-build" aria-labelledby="wib-heading">
      <p className="wib-label" id="wib-heading">
        // what i build
      </p>
      <div className="wib-grid">
        {domains.map((d) => (
          <div key={d.name} className="wib-tile">
            <span className="wib-prefix" aria-hidden="true">
              //
            </span>
            <span className="wib-name">{d.name}</span>
            <span className="wib-desc">{d.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `styles/features/what-i-build.scss`**

```scss
/* ── What I Build ── */

.what-i-build {
  padding: 4rem 0;
  border-top: 1px solid var(--border);
  margin: 0;
}

.wib-label {
  font-family: var(--font-mono), monospace;
  font-size: 0.72rem;
  letter-spacing: 0.13em;
  color: var(--text-muted);
  margin: 0 0 2.5rem;
}

.wib-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.wib-tile {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0 1.5rem;

  &:first-child {
    padding-left: 0;
  }

  &:not(:first-child) {
    border-left: 1px solid var(--border);
  }
}

.wib-prefix {
  font-family: var(--font-mono), monospace;
  font-size: 0.72rem;
  color: var(--accent-alt);
  letter-spacing: 0.05em;
}

.wib-name {
  font-family: var(--font-display), sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text);
  letter-spacing: 0.01em;
}

.wib-desc {
  font-family: var(--font-body), sans-serif;
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.5;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .wib-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }

  .wib-tile {
    padding: 0;

    &:not(:first-child) {
      border-left: none;
    }
  }
}

@media (max-width: 640px) {
  .wib-grid {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
}
```

- [ ] **Step 3: Add SCSS import to `styles/globals.scss`**

After the `circuit-board` import (or after `hero.scss` if circuit-board import not yet added), add:

```scss
@import "./features/what-i-build.scss";
```

- [ ] **Step 4: Verify build passes**

```bash
npm run build
```

Expected: exit 0. (Section won't appear on homepage yet — wired in Task 5.)

- [ ] **Step 5: Commit**

```bash
git add modules/Home/WhatIBuild.tsx styles/features/what-i-build.scss styles/globals.scss
git commit -m "feat(homepage): What I Build domain tiles section"
```

---

## Task 4: Contact CTA strip

**Files:**
- Create: `modules/Home/ContactCTA.tsx`
- Create: `styles/features/contact-cta.scss`
- Modify: `styles/globals.scss` (add import)

**Interfaces:**
- Produces: `ContactCTA` default export (no props); CSS classes `.contact-cta`, `.cta-inner`, `.cta-headline`, `.cta-sub`, `.cta-actions`
- Consumed by: Task 5 (`app/page.tsx`)

- [ ] **Step 1: Create `modules/Home/ContactCTA.tsx`**

Reads `email` and `linkedin` from `content/profile.json`.

```tsx
import type { JSX } from "react";
import profile from "@/content/profile.json";

export default function ContactCTA(): JSX.Element {
  return (
    <section className="contact-cta" aria-label="Contact">
      <div className="cta-inner">
        <h2 className="cta-headline">Let&apos;s build something.</h2>
        <p className="cta-sub">
          Open to freelance, contracts, and interesting problems.
        </p>
        <div className="cta-actions">
          <a href={`mailto:${profile.email}`} className="btn-primary">
            Send an Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `styles/features/contact-cta.scss`**

```scss
/* ── Contact CTA strip ── */

.contact-cta {
  background: var(--panel);
  border-top: 1px solid var(--accent);
  box-shadow: 0 -2px 24px rgba(0, 229, 255, 0.12);
  padding: 5rem 0;
  margin: 0;
}

.cta-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.cta-headline {
  font-family: var(--font-display), sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
  margin: 0 0 0.75rem;
  text-wrap: balance;
}

.cta-sub {
  font-family: var(--font-body), sans-serif;
  font-size: 1rem;
  color: var(--text-muted);
  margin: 0 0 2rem;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 480px) {
  .cta-actions {
    flex-direction: column;
  }

  .cta-actions .btn-primary,
  .cta-actions .btn-ghost {
    width: 100%;
    justify-content: center;
  }
}
```

- [ ] **Step 3: Add SCSS import to `styles/globals.scss`**

After the `what-i-build` import, add:

```scss
@import "./features/contact-cta.scss";
```

- [ ] **Step 4: Verify build passes**

```bash
npm run build
```

Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add modules/Home/ContactCTA.tsx styles/features/contact-cta.scss styles/globals.scss
git commit -m "feat(homepage): contact CTA strip"
```

---

## Task 5: Wire page + fix testimonials + home polish

**Files:**
- Modify: `app/page.tsx`
- Modify: `modules/Testimonials/TestimonialsSection.tsx`
- Modify: `styles/pages/home.scss`

**Interfaces:**
- Consumes: `WhatIBuild` (Task 3), `ContactCTA` (Task 4)
- Page section order: Hero → WhatIBuild → Featured Work → Testimonials → ContactCTA

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import type { Metadata } from "next";
import HeroSection from "@/modules/Hero/HeroSection";
import AnimatedSection from "@/components/AnimatedSection";
import TestimonialsSection from "@/modules/Testimonials/TestimonialsSection";
import WhatIBuild from "@/modules/Home/WhatIBuild";
import ContactCTA from "@/modules/Home/ContactCTA";
import Link from "next/link";
import projects from "@/content/projects.json";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Portfolio of Tanveer Singh — Developer & Programmer based in Sydney. Next.js, Firebase, AI integration, and Microsoft 365.",
  openGraph: {
    title: "Tanveer Singh | Portfolio",
    description:
      "Full-Stack Developer & Programmer. Internal portals, public websites, and AI-integrated digital solutions.",
    url: "/",
  },
};

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <>
      <HeroSection />

      <WhatIBuild />

      <section className="featured-work">
        <header className="fw-header">
          <h2 className="fw-title">Selected Work</h2>
          <Link href="/portfolio" className="fw-all-link">
            All projects →
          </Link>
        </header>

        <div className="fw-list">
          {featured.map((project, i) => (
            <div key={project.title} className="fw-row">
              <span className="fw-index" aria-hidden>
                0{i + 1}
              </span>

              <div className="fw-row-main">
                <span className="fw-row-title">
                  {"link" in project && project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </span>
                <span className="fw-row-desc">{project.description}</span>
              </div>

              <div className="fw-row-meta">
                <span
                  className={`fw-status fw-status--${project.status.toLowerCase()}`}
                >
                  {project.status}
                </span>
                <span className="fw-tech">
                  {project.tech.slice(0, 3).join(" · ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AnimatedSection delay={0.2}>
        <TestimonialsSection />
      </AnimatedSection>

      <ContactCTA />
    </>
  );
}
```

- [ ] **Step 2: Fix `modules/Testimonials/TestimonialsSection.tsx`**

Remove `initial={{ opacity: 0, y: 20 }}` and `animate={{ opacity: 1, y: 0 }}` from the `motion.div`. Keep `whileHover={{ y: -8 }}` for the hover lift. The `AnimatedSection` wrapper in `app/page.tsx` already handles the section entrance animation.

Replace the current `motion.div` map:

```tsx
{testimonials.map((testimonial, index) => (
  <motion.div
    key={index}
    className="testimonial-card"
    whileHover={{ y: -8 }}
  >
    <div className="testimonial-quote">{testimonial.quote}</div>
    <div className="testimonial-author">
      <div className="author-avatar" aria-hidden="true">
        {testimonial.avatar || testimonial.name.charAt(0)}
      </div>
      <div className="author-info">
        <div className="author-name">{testimonial.name}</div>
        <div className="author-role">
          {testimonial.role} at {testimonial.company}
        </div>
      </div>
    </div>
  </motion.div>
))}
```

- [ ] **Step 3: Nudge `fw-index` color in `styles/pages/home.scss`**

Find the `.fw-index` rule (line ~59) and change:
```scss
color: var(--border);
```
to:
```scss
color: var(--text-muted);
```

- [ ] **Step 4: Verify build passes**

```bash
npm run build
```

Expected: exit 0. Full homepage renders with all 5 sections in order.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx modules/Testimonials/TestimonialsSection.tsx styles/pages/home.scss
git commit -m "feat(homepage): wire all sections, fix testimonials animation, polish"
```

---

## Task 6: Build sign-off + visual verification

**Files:** None modified — verification only.

- [ ] **Step 1: Build**

```bash
npm run build
```

Expected: exit 0, zero warnings treated as errors.

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Start dev server and verify each section**

```bash
npm run dev
```

Open `http://localhost:3000` and check:

**Hero (desktop ≥900px):**
- Left column: magenta accent rule → eyebrow `> tsingh · Sydney, AU` → name with cyan glow → tagline → CTAs
- Right column: circuit panel with cyan border/glow, traces visible, nodes pulsing, data packet traveling Trace A, occasional glitch

**Hero (tablet 640–899px):**
- Single column, circuit panel hidden
- Identity full-width, no overflow

**Hero (mobile <640px):**
- Name scales down cleanly (`clamp` kicks in)
- CTAs stack vertically

**What I Build:**
- 4 tiles with `//` prefix in magenta, domain names, descriptors
- Vertical separator between tiles visible
- 4-col → 2-col at 900px → 1-col at 640px

**Featured Work:**
- `01`/`02`/`03` indices now `var(--text-muted)` color (slightly visible)
- Rows unchanged

**Testimonials:**
- Quote visible immediately (no fade-in delay gate)
- Hover lift (`y: -8`) still works

**Contact CTA strip:**
- Panel background distinct from page background
- Top cyan border + glow visible
- Email + LinkedIn buttons side-by-side, wrap on mobile

**Reduced motion (`@media (prefers-reduced-motion: reduce)` via DevTools):**
- Circuit board: no node pulse, no data packet, no flicker, no glitch — static glow only
- Hero name: no text-shadow glow
- Buttons: no transitions

- [ ] **Step 4: Commit (if any last fixes applied)**

Only commit if fixes were needed. If all verified clean, no commit required — the branch is complete.
