# Navbar Redesign — Neon Strip Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the floating pill navbar with a full-width neon strip — cyan glow bottom edge, magenta backlit active blocks, monospace link text.

**Architecture:** Pure CSS change. Rewrite `styles/features/navbar.scss` in place across 6 focused tasks. `HologramNavbar.tsx` requires no structural changes — class names are identical. Page-content padding-top updated to match new 60px bar height.

**Tech Stack:** SCSS, CSS custom properties (`--accent`, `--accent-alt`, `--bg`, `--font-mono`, `--font-display`), framer-motion (existing AnimatePresence — untouched)

## Global Constraints

- No `backdrop-filter` on large elements — use solid `rgba` bg only
- No infinite CSS animations on the navbar
- All color values via CSS custom properties — never hardcode hex
- No inline `style={{}}` props in TSX
- `@media (prefers-reduced-motion: reduce)` required for every transition block
- Build must pass after every task (`npm run build`)
- Files stay under 400 lines

---

### Task 1: Bar structure + page-content padding

**Files:**
- Modify: `styles/features/navbar.scss`

**Interfaces:**
- Produces: `.holo-navbar` — full-width strip, 60px tall, solid bg, cyan glow bottom border. `.nav-inner` — centered content with max-width 1280px.

- [ ] **Step 1: Replace `.holo-navbar` block**

In `styles/features/navbar.scss`, replace the existing `.holo-navbar` rule (currently lines 1–18):

```scss
.holo-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(11, 12, 20, 0.95);
  border-bottom: 1px solid var(--accent);
  box-shadow:
    0 2px 20px rgba(0, 229, 255, 0.35),
    0 1px 4px rgba(0, 229, 255, 0.7);
  z-index: 200;
  display: flex;
  align-items: center;
  overflow: visible;
}
```

- [ ] **Step 2: Replace `.nav-inner` block**

```scss
.nav-inner {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
}
```

- [ ] **Step 3: Add base nav-toggle hide**

After `.nav-inner`, add:

```scss
.nav-toggle {
  display: none;
}
```

- [ ] **Step 4: Update desktop page-content padding**

Replace the existing `#page-content, .page-content` block (currently `padding-top: 86px`):

```scss
#page-content,
.page-content {
  padding-top: 68px;
}
```

- [ ] **Step 5: Start dev server and confirm structure**

```bash
npm run dev
```

Open `http://localhost:3000`. Confirm:
- Navbar is full-width, edge-to-edge (no rounded pill, no side margins)
- Cyan glow line visible along the bottom of the bar
- Page content begins below the bar with no overlap

- [ ] **Step 6: Commit**

```bash
git add styles/features/navbar.scss
git commit -m "feat(navbar): full-width strip layout with cyan glow bottom edge"
```

---

### Task 2: Brand mark neon glow

**Files:**
- Modify: `styles/features/navbar.scss`

**Interfaces:**
- Consumes: `.holo-navbar` (Task 1)
- Produces: `.nav-brand` — Orbitron, cyan, with dual-layer neon text-shadow

- [ ] **Step 1: Replace `.nav-brand` block**

```scss
.nav-brand {
  font-family: var(--font-display), sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  text-decoration: none;
  flex-shrink: 0;
  text-shadow:
    0 0 8px var(--accent),
    0 0 22px rgba(0, 229, 255, 0.35);
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.75;
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}
```

- [ ] **Step 2: Verify brand glow in browser**

Open `http://localhost:3000`. Confirm "TANVEER SINGH" has a visible cyan glow radiating from the text — not flat lettering.

- [ ] **Step 3: Commit**

```bash
git add styles/features/navbar.scss
git commit -m "feat(navbar): neon text-shadow glow on brand mark"
```

---

### Task 3: Nav link states — mono font, block hover/active, no underline

**Files:**
- Modify: `styles/features/navbar.scss`

**Interfaces:**
- Consumes: `.holo-navbar` (Task 1)
- Produces: `.nav-links`, `.nav-item`, `.nav-item.active`, `.nav-item:hover`, `.nav-item--admin`

- [ ] **Step 1: Replace `.nav-links` block**

```scss
.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: auto;
}
```

- [ ] **Step 2: Replace entire `.nav-item` block**

Remove the existing `.nav-item` rule including all `::after`, `&:hover`, `&.active` sub-rules. Replace with:

```scss
.nav-item {
  position: relative;
  color: var(--text-muted);
  font-family: var(--font-mono), monospace;
  font-size: 0.74rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 3px;
  white-space: nowrap;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    color: var(--text);
    background: rgba(0, 229, 255, 0.10);
  }

  &.active {
    color: var(--bg);
    background: var(--accent-alt);
    box-shadow: 0 0 10px rgba(255, 45, 170, 0.4);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}
```

- [ ] **Step 3: Replace `.nav-item--admin` block**

```scss
.nav-item--admin {
  opacity: 0.45;
  font-size: 0.65rem;

  &:hover,
  &.active {
    opacity: 1;
  }
}
```

- [ ] **Step 4: Verify link states in browser**

Open `http://localhost:3000`. Confirm:
- Default links: muted color, no underline, monospace font
- Hovered link: subtle cyan background tint
- Active page link (Home): solid magenta block, dark text, visible glow
- Navigate to `/about` — magenta block moves to About link

- [ ] **Step 5: Commit**

```bash
git add styles/features/navbar.scss
git commit -m "feat(navbar): monospace links with magenta active block — remove underline"
```

---

### Task 4: Responsive breakpoints

**Files:**
- Modify: `styles/features/navbar.scss`

**Interfaces:**
- Consumes: `.holo-navbar`, `.nav-links`, `.nav-item` (Tasks 1–3)
- Produces: Tablet and mobile layout — no overflow at any viewport

- [ ] **Step 1: Replace tablet breakpoint**

Replace existing `@media (max-width: 900px) and (min-width: 641px)` block:

```scss
@media (max-width: 900px) and (min-width: 641px) {
  .nav-inner {
    padding: 0 1.25rem;
  }

  .nav-links {
    gap: 0.1rem;
  }

  .nav-item {
    font-size: 0.68rem;
    padding: 4px 8px;
  }
}
```

- [ ] **Step 2: Replace mobile breakpoint — bar and toggle**

Replace existing `@media (max-width: 640px)` block with:

```scss
@media (max-width: 640px) {
  .holo-navbar {
    height: 52px;
  }

  .nav-links {
    display: none;
  }

  .nav-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    margin-left: auto;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text);
    border-radius: 8px;
    cursor: pointer;
    flex-shrink: 0;
    transition: border-color 0.18s ease;

    &:hover {
      border-color: rgba(0, 229, 255, 0.4);
    }

    &:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
  }

  .nav-toggle-bars {
    position: relative;
    width: 18px;
    height: 12px;
  }

  .nav-toggle-bars .bar {
    position: absolute;
    left: 0;
    width: 100%;
    height: 1.5px;
    background: currentColor;
    border-radius: 99px;
    transition:
      transform 0.2s ease,
      top 0.2s ease,
      opacity 0.15s ease;
  }

  .bar-1 { top: 0; }
  .bar-2 { top: 5px; }
  .bar-3 { top: 10px; }

  .nav-toggle.is-open .bar-1 {
    top: 5px;
    transform: rotate(45deg);
  }

  .nav-toggle.is-open .bar-2 {
    opacity: 0;
  }

  .nav-toggle.is-open .bar-3 {
    top: 5px;
    transform: rotate(-45deg);
  }

  #page-content,
  .page-content {
    padding-top: 60px;
  }
}
```

- [ ] **Step 3: Verify at tablet width (768px)**

In browser DevTools set viewport to 768px. Confirm:
- All 5 nav links still visible, no horizontal overflow
- Brand and links don't collide

- [ ] **Step 4: Verify at mobile width (375px)**

Set viewport to 375px. Confirm:
- Only brand + hamburger visible
- Bar is 52px tall
- Page content starts at correct offset (no overlap)

- [ ] **Step 5: Commit**

```bash
git add styles/features/navbar.scss
git commit -m "feat(navbar): responsive breakpoints — tablet compression, mobile bar height"
```

---

### Task 5: Mobile panel

**Files:**
- Modify: `styles/features/navbar.scss`

**Interfaces:**
- Consumes: `.nav-item` states (Task 3), mobile breakpoint (Task 4)
- Produces: `.nav-mobile-panel` — full-width dropdown, flush below bar, magenta active blocks, scroll-safe

- [ ] **Step 1: Add `.nav-mobile-panel` inside `@media (max-width: 640px)` block**

At the end of the mobile breakpoint, before the closing `}`, add:

```scss
  .nav-mobile-panel {
    position: absolute;
    top: 52px;
    left: 0;
    right: 0;
    max-height: calc(100dvh - 52px);
    overflow-y: auto;
    padding: 0.4rem;
    background: rgba(11, 12, 20, 0.97);
    border-bottom: 1px solid var(--border);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
    z-index: 199;

    .nav-item {
      display: flex;
      align-items: center;
      min-height: 48px;
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 6px;
      font-size: 0.78rem;

      &:hover {
        background: rgba(0, 229, 255, 0.05);
        color: var(--text);
      }

      &.active {
        background: var(--accent-alt);
        color: var(--bg);
        box-shadow: 0 0 10px rgba(255, 45, 170, 0.35);
      }
    }
  }
```

- [ ] **Step 2: Verify mobile panel at 375px**

Click hamburger. Confirm:
- Panel appears flush below bar (zero gap)
- Each link is at least 48px tall
- Active link shows full-width magenta block
- Panel closes when: link is clicked, Escape is pressed, viewport resizes >640px

- [ ] **Step 3: Commit**

```bash
git add styles/features/navbar.scss
git commit -m "feat(navbar): mobile panel flush below bar with 48px touch targets"
```

---

### Task 6: Focus rings + reduced motion + build sign-off

**Files:**
- Modify: `styles/features/navbar.scss`

**Interfaces:**
- Consumes: All navbar classes (Tasks 1–5)
- Produces: Keyboard-accessible focus states; zero motion for `prefers-reduced-motion`

- [ ] **Step 1: Replace reduced-motion block at bottom of file**

Replace existing `@media (prefers-reduced-motion: reduce)` block:

```scss
@media (prefers-reduced-motion: reduce) {
  .nav-item,
  .nav-brand,
  .nav-toggle {
    transition: none;
  }

  .nav-brand {
    text-shadow: none;
  }

  .nav-toggle-bars .bar {
    transition: none;
  }
}
```

- [ ] **Step 2: Keyboard navigation test**

Tab through the page. Confirm:
- Every nav link shows a cyan `outline` on `:focus-visible`
- Hamburger button shows a cyan outline on `:focus-visible`
- No interactive element is unreachable by keyboard

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Expected: all 12 pages generate, zero TypeScript or build errors. Pre-existing Sass `@import` deprecation warnings are acceptable.

- [ ] **Step 4: Run lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 5: Visual check across all routes**

Visit each route in dev server (`npm run dev`):
- `/` — bar full-width, cyan glow visible, Home link: magenta active block
- `/about` — About: magenta active block
- `/experience` — Experience: magenta active block
- `/portfolio` — Portfolio: magenta active block
- `/contact` — Contact: magenta active block

At each: no layout shift, no content hidden behind bar, brand glow visible.

- [ ] **Step 6: Final commit**

```bash
git add styles/features/navbar.scss
git commit -m "feat(navbar): neon strip redesign complete — focus rings, reduced motion"
```
