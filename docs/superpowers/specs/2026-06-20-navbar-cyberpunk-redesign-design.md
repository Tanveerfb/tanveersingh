# Navbar Cyberpunk 2077 Redesign — Design Spec

**Date:** 2026-06-20
**Status:** Approved (pending implementation plan)

## Goal

Reskin the top navbar into an unmistakably Cyberpunk 2077-style HUD bar — angular
notched tabs, interaction-driven glitch (RGB-split), a neon-sign active block — while
keeping it a usable, accessible, responsive global navigation and respecting the
project's performance rules (no always-on full-bar animation).

## Decisions locked during brainstorming

- **Structure:** keep the horizontal top bar; radical reskin only (no layout/placement
  change).
- **Palette:** cyan/magenta only (site tokens). CP2077 feel comes from FORM, not new
  colors. No yellow/red.
- **Motion:** glitch on hover/focus (RGB-split + jitter, one-shot per hover), a subtle
  persistent flicker on the active tab only, and one boot glitch on page load. Idle is
  completely still. No always-on full-bar animation.
- **Shape vocabulary:** notched parallelogram tabs (Approach A) — skewed, corner-cut
  `clip-path` tabs with counter-skewed (upright) labels.
- **Brand text:** keep full `TANVEER SINGH` (not shortened to `TS//SINGH`).

## Current state

- `modules/Navbar/HologramNavbar.tsx` — client component. `NAV_ITEMS` = Home `/`,
  About `/about`, Experience `/experience`, Portfolio `/portfolio`, Contact `/contact`.
  Brand `TANVEER SINGH` linking `/`. Desktop `.nav-links` row + mobile hamburger
  (`.nav-toggle`) opening a framer-motion `.nav-mobile-panel`. Active state via
  `usePathname`. Admin link rendered only when `useAuth().user` is truthy.
- `styles/features/navbar.scss` — `.holo-navbar` (fixed, 60px), `.nav-brand`,
  `.nav-links`, `.nav-item` (mono uppercase; `.active` = magenta block), tablet/mobile
  breakpoints, mobile panel, `:focus-visible` rings, `prefers-reduced-motion` block.

All component LOGIC is retained. Only markup classes/attributes and the stylesheet
change.

## Design

### The bar

- Fixed top, height 60px (unchanged), dark translucent background (keep current
  `rgba(11,12,20,0.95)`), cyan edge glow retained.
- **Angular bottom edge:** replace the straight `border-bottom` with a notched/angular
  edge rendered via a `::after` pseudo-element using `clip-path` (a shallow zig or
  cut), glowing cyan. The straight 1px border is removed.
- **Static scanline texture:** a `repeating-linear-gradient` overlay (~3–4% opacity
  cyan lines, ~3px pitch) on the bar. STATIC — no animation.

### Tabs (nav links)

Each `.nav-item` becomes a skewed parallelogram tab:

- **Shape:** `clip-path` polygon giving a parallelogram with one cut corner (CP2077
  signature). The tab is skewed (`transform: skewX(-12deg)`); the label is
  counter-skewed (`skewX(12deg)`) so text stays upright. (Equivalent pure-`clip-path`
  implementation without `skew` is acceptable as long as the visual matches.)
- **Idle:** transparent fill, 1px cyan outline (drawn so it follows the clip — e.g. a
  pseudo-element border or `outline`), label `--text-muted`, mono uppercase.
- **Hover/focus:** faint cyan fill (`rgba(0,229,255,0.10)`), label → `--text`, plus an
  **RGB-split glitch**: the label is duplicated via a `data-text` attribute into
  `::before` (cyan, translated left ~2px) and `::after` (magenta, translated right
  ~2px); on hover a one-shot `~300ms` jitter keyframe runs (small translate/clip
  steps). Fires once per hover — not looping.
- **Active:** solid cyan neon block (`background: var(--accent)`), **dark label
  (`var(--bg)`)** — the neon sign; this dark-on-cyan combination passes WCAG AA
  (≈8:1) and intentionally resolves the prior magenta-block contrast problem. Cut
  corner retained. A subtle persistent flicker animates ONLY the active tab's
  glow/opacity (a small, bounded element) — low cost, slow, disabled under reduced
  motion.

### Brand

`TANVEER SINGH` as a glitch logotype: cyan neon text-shadow (keep), with a `data-text`
attribute enabling an RGB-split (`::before`/`::after`) that triggers on hover only. An
optional `//` data-glyph may precede or split the text but the readable brand text
stays `TANVEER SINGH`.

### Glitch mechanics (all perf-bounded)

- **Boot glitch:** a one-shot CSS keyframe on `.holo-navbar` (or an inner wrapper) that
  plays once on load — `animation-iteration-count: 1`, `animation-fill-mode: both` — a
  brief clip-reveal + RGB jitter (~600ms). No JS, no loop.
- **Hover glitch:** RGB-split + jitter on the hovered/focused tab and on the brand;
  interaction-only.
- **Active flicker:** subtle opacity flicker on the active tab's glow layer only;
  bounded to one small element.
- **Idle:** no animation anywhere.

### Mobile

- Hamburger `.nav-toggle` → framer-motion `.nav-mobile-panel` retained.
- Panel rows reskinned as full-width angular/clipped tabs, 48px minimum touch targets
  (unchanged), active row = cyan block with dark text.
- Boot/hover glitch simplified on mobile (hover glitch is irrelevant on touch; the
  panel reveal keeps the existing motion). No new continuous animation.
- Tablet (641–900px) and mobile (≤640px) breakpoints retained and adapted to the new
  tab shapes (compress tab padding/skew as needed so labels don't collide).

### Accessibility

- `prefers-reduced-motion: reduce` disables the boot glitch, hover jitter, RGB-split
  animation, and active flicker — leaving a clean, static, angular bar that is fully
  usable. The duplicated `::before`/`::after` text is decorative (`aria-hidden` via
  pseudo-elements; the real label remains the accessible text).
- All existing semantics kept: `aria-label="Primary"`, `aria-current="page"` on the
  active item, `aria-expanded`/`aria-label` on the toggle, `role` attributes on the
  lists.
- `:focus-visible` outlines retained (an angular/cyan focus indicator that remains
  clearly visible against the bar).
- Active label dark-on-cyan meets WCAG AA.

### Performance

- No always-on full-bar animation. Scanline is static. RGB-split pseudo-elements
  animate only on hover. Boot glitch runs once. The only persistent animation is the
  subtle active-tab flicker on a single small element (disabled under reduced motion).
- No `backdrop-filter` added to the bar.
- `clip-path`, `transform`, and `opacity` are the animated properties (compositor
  friendly); avoid animating layout properties.

### Files

- **Modify:** `modules/Navbar/HologramNavbar.tsx` — markup only: wrap labels for the
  tab shape, add `data-text={label}` on tabs and brand for RGB-split, add any
  boot-glitch class hook. No change to routing, active detection, mobile toggle state,
  or the admin-link logic.
- **Modify (overhaul):** `styles/features/navbar.scss` — new tab shapes, glitch
  keyframes, scanline, angular edge, reskinned mobile panel, updated reduced-motion
  block. Keep the file under 400 lines.

## Out of scope

- No change to navbar structure/placement (stays a top bar).
- No new colors (no CP2077 yellow/red).
- No change to `NAV_ITEMS`, routes, or the admin-auth behavior.
- No new component files; no new dependencies.

## Success criteria

- `npm run build` passes (12 static pages); `npm run lint` clean (only the pre-existing
  `PosterCard.tsx` `<img>` warning allowed).
- Desktop: angular notched tabs; hover produces RGB-split + jitter once; active tab is a
  cyan block with dark, AA-contrast text; one boot glitch on load; idle is still.
- Mobile: hamburger panel works, rows are angular, 48px targets, active = cyan block.
- `prefers-reduced-motion` yields a static, clean, fully usable bar with no glitch/
  flicker.
- No always-on full-bar animation; no `backdrop-filter` on the bar; navbar.scss < 400
  lines; all existing aria/focus semantics intact.
