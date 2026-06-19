# Homepage Redesign — Design Spec
**Date:** 2026-06-20
**Approach:** Additive (existing sections kept/polished) + Hero-led layout (Approach C hero, Approach A content additions)

---

## Page Structure

```
1. Hero          — full viewport, 2-col split, neon identity + circuit board panel
2. What I Build  — 4 domain tiles, horizontal strip (NEW)
3. Featured Work — existing list, light polish
4. Testimonials  — existing, animation anti-pattern fixed
5. CTA Strip     — full-width contact strip (NEW)
```

---

## Section 1: Hero

### Layout
- `min-height: 100dvh` — full viewport
- CSS Grid: `grid-template-columns: 1fr 1fr` on desktop (≥900px)
- Tablet (640–899px): `grid-template-columns: 1fr` — circuit panel hidden, identity full-width
- Mobile (<640px): single column, identity only

### Identity Column (left)
- **Accent rule:** `width: 48px; height: 2px; background: var(--accent-alt)` above eyebrow — horizontal neon dash, not a side stripe
- **Eyebrow:** `> tsingh · Sydney, AU` — monospace, `var(--accent-alt)`, existing `::before` `"> "` removed (content becomes the CLI prompt itself)
- **Name:** `clamp(4rem, 10vw, 7rem)` — larger than current `5.5rem` max. Cyan glow:
  ```css
  text-shadow: 0 0 40px rgba(0,229,255,0.3), 0 0 100px rgba(0,229,255,0.1);
  ```
- **Tagline:** unchanged content, unchanged styles
- **CTAs:** unchanged. `btn-primary` hover gains `box-shadow: 0 0 22px rgba(0,229,255,0.35)` (already transitions to solid fill)
- **Entrance animation:** existing framer-motion stagger kept as-is

### Circuit Board Panel (right)
- **Container:** `var(--panel)` background, `border: 1px solid var(--accent)` with `box-shadow: 0 0 20px rgba(0,229,255,0.15)` — powered PCB aesthetic
- **Implementation:** Inline SVG React component (`CircuitBoard.tsx`)
- **Visual:** Abstract schematic fragment — 90° trace angles, not a realistic board layout
  - Traces: `stroke: var(--accent)` (cyan), `stroke-width: 1.5`, `filter: drop-shadow(0 0 4px rgba(0,229,255,0.6))`
  - Nodes (solder points): `fill: var(--accent-alt)` (magenta), radius 4–6px, `filter: drop-shadow(0 0 6px rgba(255,45,170,0.8))`
  - Background traces (secondary): `stroke: var(--border)`, no glow — depth layering

#### Circuit Animations (SVG child elements only — not the container)
All animations target individual SVG elements. Never on the `.hero` or panel container itself.

1. **Node pulse** — 3 nodes, staggered `animation-delay` (0s, 1.8s, 3.4s), `animation-duration: 3s`, keyframe: opacity 0.4 → 1 → 0.4. Slow, organic, not frantic.

2. **Data packet** — a bright `<circle r="3">` travels along a trace path using `stroke-dashoffset` on a matching invisible `<path>`. One packet every ~5s. Color: `var(--accent)`, glow via `filter`.

3. **Trace flicker** — one trace segment `opacity` keyframe: 1 → 0.3 → 1, `animation-duration: 0.12s`, triggered via `animation-delay: 7s; animation-iteration-count: 1` then repeats every 9s using a long-duration wrapper. Mimics electrical interference.

4. **Glitch displacement** — the SVG panel itself gets an occasional `translate` + `opacity` micro-glitch: `transform: translateX(2px)` for 80ms then back. Achieved with a long-duration keyframe (95% at rest, 96–97% displaced, 98% back). `animation-duration: 12s; animation-iteration-count: infinite` — safe because it's `transform` only on a contained element, not a full-viewport background.

**`@media (prefers-reduced-motion: reduce)`:** All four animations set to `animation: none`. Static glow remains.

---

## Section 2: What I Build

### Layout
- Full-width section, `padding: 5rem 0`
- `border-top: 1px solid var(--border)`
- Section label: `// what i build` — monospace, `var(--text-muted)`, small, above the tiles

### Tiles
- `display: grid; grid-template-columns: repeat(4, 1fr)` on desktop
- `repeat(2, 1fr)` on tablet (640–899px)
- `1fr` on mobile
- Dividers: `border-left: 1px solid var(--border)` on tiles 2–4 (1px = within the ban threshold of >1px)
- No card backgrounds, no shadows, no border on the tile itself

### Tile Anatomy (per tile)
```
// [prefix glyph — var(--accent-alt)]
[Domain Name — display font, var(--text), 1.1rem, font-weight 600]
[1-line descriptor — body font, var(--text-muted), 0.82rem]
```

### Content
| Domain | Descriptor |
|---|---|
| Web Applications | Next.js, Node.js, full-stack from DB to deploy |
| Cloud & Firebase | Auth, Firestore, storage, Vercel hosting |
| AI Integration | Local LLMs, RAG pipelines, vector embeddings |
| Microsoft 365 | Administration, automation, internal tooling |

### Data source
Descriptors hardcoded in component — content is fixed, not JSON-driven (no `content/whatibuild.json` needed; these 4 domains won't change frequently).

---

## Section 3: Featured Work

**No structural changes.** Light polish only:

- `fw-index` color: `var(--border)` → `var(--text-muted)` — numbers are currently nearly invisible. Still dim, just readable.

---

## Section 4: Testimonials

**Fix animation anti-pattern.** `TestimonialsSection.tsx` currently uses:
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
```
This gates content visibility on animation firing — broken in hidden tabs and headless renderers.

**Fix:** Remove `initial`/`animate` from the `motion.div`. The `AnimatedSection` wrapper already handles entrance via `duke-fade-up`. If framer-motion hover (`whileHover={{ y: -8 }}`) is kept, use `motion.div` with only `whileHover` — no `initial`/`animate`.

No content changes.

---

## Section 5: Contact CTA Strip

### Layout
- Full-width strip, `padding: 4rem 0`
- `background: var(--panel)`
- `border-top: 1px solid var(--accent)` with `box-shadow: 0 -2px 20px rgba(0,229,255,0.2)` — mirrors the navbar bottom glow, inverted (top edge)
- Content max-width `1280px`, centered

### Content
- Headline: `"Let's build something."` — display font, `clamp(1.8rem, 4vw, 2.8rem)`, `var(--text)`
- Subline: `"Open to freelance, contracts, and interesting problems."` — body font, `var(--text-muted)`
- **Email button** (primary style): `mailto:tanveerfb@gmail.com`
- **LinkedIn button** (ghost style): `https://linkedin.com/in/tanveerfb`
- Buttons side by side, wrap on mobile

### Data source
Links from `content/profile.json` (`email`, `linkedin`).

---

## New Files

| File | Purpose |
|---|---|
| `modules/Hero/CircuitBoard.tsx` | SVG circuit board component |
| `modules/Home/WhatIBuild.tsx` | Domain tiles section |
| `modules/Home/ContactCTA.tsx` | CTA strip section |
| `styles/features/circuit-board.scss` | Circuit panel + SVG animation styles |
| `styles/features/what-i-build.scss` | Domain tiles styles |
| `styles/features/contact-cta.scss` | CTA strip styles |

## Modified Files

| File | Change |
|---|---|
| `app/page.tsx` | Import + render new sections; update Hero import |
| `modules/Hero/HeroSection.tsx` | 2-col layout, larger name, eyebrow text, import CircuitBoard |
| `modules/Testimonials/TestimonialsSection.tsx` | Fix opacity:0 animation |
| `styles/features/hero.scss` | Split layout, name size + glow, panel container |
| `styles/pages/home.scss` | `fw-index` color nudge |

---

## Constraints

- No `backdrop-filter` anywhere
- No `opacity: 0` hardcoded on content — `animation-fill-mode: both` or skip `initial` entirely
- No infinite animations on full-height/full-width background containers
- All colors via CSS custom properties (rgba() alpha variations acceptable)
- No inline `style={{}}` except dynamic runtime values
- TypeScript strict — no `any`
- Files stay under 400 lines
- Build must pass after implementation
