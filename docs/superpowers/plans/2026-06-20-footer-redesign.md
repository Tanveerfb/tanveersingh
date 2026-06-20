# Footer Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the decorative "power core" footer with a functional 3-column sitemap footer wired to a CSS circuit-bus rail, matching the cyberpunk-glass hero and removing the old footer's perf violations and dead code.

**Architecture:** A new server component `SiteFooter.tsx` renders three columns (Brand / Navigate / Connect) plus a bottom bar, with contact data sourced from `content/profile.json`. The circuit motif (top bus rail, per-column solder-pad nodes, vertical connectors, one gliding packet) is built in pure CSS in a new `styles/features/footer.scss`. The old `PowerCoreFooter.tsx` and `footer-powercore.scss` are deleted and their references updated.

**Tech Stack:** Next.js 16 App Router (React server component), SCSS partials with CSS custom-property design tokens, `react-icons/fa6`.

## Global Constraints

- Files stay under 400 lines.
- TypeScript strict mode; no `any`.
- `@/` import aliases only — no relative imports.
- No inline `style={{}}` unless the value is dynamic at runtime (none here).
- No `console.log`.
- Colors come from CSS custom-property tokens (`--accent` `#00e5ff`, `--accent-alt` `#ff2daa`, `--bg`, `--panel`, `--text`, `--text-muted`, `--border`). Raw `rgba()` allowed ONLY for glow/shadow alpha tints, never as a flat accent fill.
- No `backdrop-filter` on the footer (full-width element) — use a translucent solid background.
- The only animation permitted in the footer is the single rail packet (a small bounded element). No other `infinite` animations.
- Every animation block must have a `@media (prefers-reduced-motion: reduce)` counterpart.
- `npm run build` must pass (12 static pages) and `npm run lint` must stay clean (the one pre-existing `PosterCard.tsx` `<img>` warning is the only allowed warning) after every task.
- Footer copy byline must read exactly: `Built with Next.js, assisted by Claude Opus`.
- Connect column = GitHub, LinkedIn, Email only (no Discord). Navigate column = Home, About, Experience, Portfolio, Contact (no Blog).
- No test suite exists; the verification gate per task is build + lint + the stated visual expectation.

---

### Task 1: SiteFooter component + content + layout wiring + base styles (replace old footer)

**Files:**
- Create: `modules/Footer/SiteFooter.tsx`
- Create: `styles/features/footer.scss`
- Modify: `app/layout.tsx:5` (import) and `app/layout.tsx:98` (tag)
- Modify: `styles/globals.scss:15` (`@import` swap)
- Delete: `modules/Footer/PowerCoreFooter.tsx`
- Delete: `styles/features/footer-powercore.scss`

**Interfaces:**
- Consumes: `content/profile.json` fields — `name` (string), `role` (string), `location` (string), `email` (string), `github` (string), `linkedin` (string).
- Produces: `SiteFooter` default-exported server component returning a `<footer class="site-footer">`. CSS class contract used by Tasks 2 & 3: `.site-footer`, `.footer-inner`, `.footer-rail`, `.footer-packet`, `.footer-grid`, `.footer-col`, `.footer-col--brand`, `.footer-col--nav`, `.footer-col--connect`, `.footer-node`, `.footer-brand-name`, `.footer-brand-role`, `.footer-brand-loc`, `.footer-brand-tag`, `.footer-col-head`, `.footer-list`, `.footer-link`, `.footer-bottom`, `.footer-copy`, `.footer-built`, `.footer-top`.

- [ ] **Step 1: Create the component**

Create `modules/Footer/SiteFooter.tsx`:

```tsx
import type { JSX } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import profile from "@/content/profile.json";

interface FooterLink {
  label: string;
  href: string;
}

const NAV_LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="footer-inner">
        <div className="footer-rail" aria-hidden="true">
          <span className="footer-packet" />
        </div>

        <div className="footer-grid">
          <div className="footer-col footer-col--brand">
            <span className="footer-node" aria-hidden="true" />
            <p className="footer-brand-name">{profile.name}</p>
            <p className="footer-brand-role">{profile.role}</p>
            <p className="footer-brand-loc">{profile.location}</p>
            <p className="footer-brand-tag">
              Building reliable systems and web applications — end to end.
            </p>
          </div>

          <nav
            className="footer-col footer-col--nav"
            aria-label="Footer navigation"
          >
            <span className="footer-node" aria-hidden="true" />
            <p className="footer-col-head">{"// navigate"}</p>
            <ul className="footer-list">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-col--connect">
            <span className="footer-node" aria-hidden="true" />
            <p className="footer-col-head">{"// connect"}</p>
            <ul className="footer-list">
              <li>
                <a
                  className="footer-link"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub aria-hidden focusable={false} />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  className="footer-link"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin aria-hidden focusable={false} />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="footer-link"
                  href={`mailto:${profile.email}`}
                >
                  <FaEnvelope aria-hidden focusable={false} />
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} {profile.name}
          </p>
          <p className="footer-built">
            Built with Next.js, assisted by Claude Opus
          </p>
          <a className="footer-top" href="#page-content">
            ↑ Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
```

Note: this is a server component — no `"use client"`, no hooks. The `// navigate`
and `// connect` headers are wrapped as string expressions (`{"// navigate"}`) to
avoid the `react/jsx-no-comment-textnodes` lint error.

- [ ] **Step 2: Create the base stylesheet**

Create `styles/features/footer.scss` (Tasks 2 and 3 append the rail and responsive
blocks; this task lays out the columns and bottom bar):

```scss
/* ── Site Footer ── */

.site-footer {
  width: 100%;
  margin-top: 5rem;
  border-top: 1px solid var(--border);
  /* Near-opaque tint: a hint of the city video shows through, but link/copy text
     stays legible (translucent solid background — no backdrop-filter). */
  background: rgba(13, 15, 24, 0.86);
  color: var(--text);
}

.footer-inner {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.75rem 1.5rem 1.5rem;
}

/* ── Columns ── */

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 2.5rem;
}

.footer-col {
  position: relative;
}

.footer-brand-name {
  font-family: var(--font-display), sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text);
  margin: 0 0 0.5rem;
}

.footer-brand-role {
  font-size: 0.82rem;
  color: var(--accent);
  margin: 0 0 0.25rem;
}

.footer-brand-loc {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin: 0 0 0.9rem;
}

.footer-brand-tag {
  font-size: 0.82rem;
  line-height: 1.6;
  color: var(--text-muted);
  max-width: 34ch;
  margin: 0;
}

.footer-col-head {
  font-family: var(--font-mono), monospace;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 1rem;
}

.footer-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--text-muted);
  font-family: var(--font-body), sans-serif;
  font-size: 0.85rem;
  text-decoration: none;
  transition: color 0.18s ease, transform 0.18s ease;

  &:hover {
    color: var(--accent);
    transform: translateX(3px);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }
}

/* ── Bottom bar ── */

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border);
  font-family: var(--font-mono), monospace;
  font-size: 0.72rem;
  color: var(--text-muted);
}

.footer-copy,
.footer-built {
  margin: 0;
}

.footer-top {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.18s ease;

  &:hover {
    color: var(--accent);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }
}
```

- [ ] **Step 3: Wire the component into the layout**

In `app/layout.tsx`, change the import on line 5:

```tsx
import SiteFooter from "@/modules/Footer/SiteFooter";
```

and the usage (around line 98):

```tsx
<SiteFooter />
```

- [ ] **Step 4: Swap the stylesheet import**

In `styles/globals.scss`, replace line 15:

```scss
@import "./features/footer.scss";
```

(was `@import "./features/footer-powercore.scss";`)

- [ ] **Step 5: Delete the old footer files**

```bash
git rm modules/Footer/PowerCoreFooter.tsx styles/features/footer-powercore.scss
```

- [ ] **Step 6: Verify build + lint**

Run: `npm run build`
Expected: exit 0, "Generating static pages (12/12)", route table prints.

Run: `npm run lint`
Expected: 0 errors. Only the pre-existing `modules/ui/PosterCard.tsx` `<img>`
warning may appear. If any error references `meltdown`, `core-`, `powercore`, or a
missing `PowerCoreFooter` import, a reference was missed — fix it.

Visual expectation: footer shows three text columns (Brand / `// navigate` /
`// connect`) and a bottom bar with copyright, the build byline, and "↑ Back to
top". No reactor orb. No styling for the rail yet (added in Task 2).

- [ ] **Step 7: Commit**

```bash
git add modules/Footer/SiteFooter.tsx styles/features/footer.scss app/layout.tsx styles/globals.scss
git commit -m "feat(footer): sitemap footer replacing power-core orb"
```

---

### Task 2: Circuit bus rail, node pads, connectors, and the single packet animation

**Files:**
- Modify: `styles/features/footer.scss` (append rail + node + packet + reduced-motion blocks)

**Interfaces:**
- Consumes: the markup and class names from Task 1 (`.footer-inner`, `.footer-rail`, `.footer-packet`, `.footer-node` inside each `.footer-col`).
- Produces: the visual circuit rail. No new classes for later tasks; Task 3 only adds responsive overrides.

- [ ] **Step 1: Add the bus rail and packet styles**

Append to `styles/features/footer.scss`:

```scss
/* ── Circuit bus rail ── */

.footer-rail {
  position: absolute;
  top: 0;
  left: 1.5rem;
  right: 1.5rem;
  height: 2px;
  overflow: hidden;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--accent) 14%,
    var(--accent) 86%,
    transparent 100%
  );
  opacity: 0.65;
  box-shadow: 0 0 8px rgba(0, 229, 255, 0.4);
}

.footer-packet {
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 2px;
  transform: translateX(-30px);
  background: linear-gradient(90deg, transparent, var(--accent));
  box-shadow: 0 0 10px rgba(0, 229, 255, 0.9);
  animation: footerPacket 7s linear infinite;
}

/* Single packet glides the rail. Rail has overflow:hidden so the fixed end
   translate (1250px > max rail width ≈ 1140px) is clipped at both ends. */
@keyframes footerPacket {
  0% {
    transform: translateX(-30px);
    opacity: 0;
  }
  4% {
    opacity: 1;
  }
  96% {
    opacity: 1;
  }
  100% {
    transform: translateX(1250px);
    opacity: 0;
  }
}

/* ── Node pads + vertical connectors ── */

.footer-node {
  position: absolute;
  top: -1.4rem;
  left: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent-alt);
  box-shadow: 0 0 8px rgba(255, 45, 170, 0.85);
}

.footer-node::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translateX(-50%);
  width: 1px;
  height: 1.4rem;
  background: linear-gradient(var(--accent), transparent);
  opacity: 0.55;
}
```

Geometry note: `.footer-inner` has `padding-top: 2.75rem`; the rail sits at its
`top: 0`. Each `.footer-node` is `top: -1.4rem` relative to its column content
(columns begin ~2.75rem below the rail), placing the pad partway up, and the
`::before` connector (`height: 1.4rem`) bridges the pad up to the rail.

- [ ] **Step 2: Add the reduced-motion guard**

Append to `styles/features/footer.scss`:

```scss
/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .footer-packet {
    animation: none;
    display: none;
  }
}
```

- [ ] **Step 3: Verify build + lint**

Run: `npm run build`
Expected: exit 0, 12/12 static pages.

Run: `npm run lint`
Expected: 0 errors (only the pre-existing `PosterCard.tsx` warning).

- [ ] **Step 4: Visual verification**

Start the dev server if not running (`npm run dev`) and load `http://localhost:3000`.
Expected at the footer:
- A glowing cyan horizontal rail across the top edge of the footer content.
- A magenta solder-pad node above each of the three columns, each joined to the
  rail by a thin vertical cyan connector line.
- One short cyan packet gliding left→right along the rail on a ~7s loop, fading in
  at the left and out at the right (clipped at the rail ends).
- With OS "reduce motion" enabled, the packet is gone and nothing else animates.

If the node pads or connectors don't visually reach the rail, adjust the
`.footer-node` `top` and `.footer-node::before` `height` together (keep them equal
in magnitude) until the connector meets the rail, then re-run build + lint.

- [ ] **Step 5: Commit**

```bash
git add styles/features/footer.scss
git commit -m "feat(footer): circuit bus rail, node pads, gliding packet"
```

---

### Task 3: Responsive breakpoints + accessibility/contrast sign-off

**Files:**
- Modify: `styles/features/footer.scss` (append responsive blocks)

**Interfaces:**
- Consumes: all classes from Tasks 1 and 2.
- Produces: final responsive + a11y-complete footer. Nothing downstream.

- [ ] **Step 1: Add responsive breakpoints**

Append to `styles/features/footer.scss`:

```scss
/* ── Responsive ── */
@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .footer-col--brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {
  .footer-inner {
    padding: 2.25rem 1.25rem 1.25rem;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }

  /* Rail collapses to a plain top divider: hide pads + connectors. */
  .footer-node {
    display: none;
  }

  .footer-bottom {
    justify-content: flex-start;
    gap: 0.5rem 1rem;
  }
}
```

- [ ] **Step 2: Verify build + lint**

Run: `npm run build`
Expected: exit 0, 12/12 static pages.

Run: `npm run lint`
Expected: 0 errors (only the pre-existing `PosterCard.tsx` warning).

- [ ] **Step 3: Visual + accessibility verification**

With the dev server running, check `http://localhost:3000` at three widths:
- **≥901px:** three columns (Brand wider) with the rail + three nodes.
- **560–900px:** Brand spans the full width on top; Navigate and Connect sit
  side-by-side below; rail still spans; nodes present on the columns that have them.
- **≤560px:** all three stack in one column; node pads and connectors are hidden
  (rail is a plain divider line); the bottom bar wraps left-aligned.

Accessibility checks:
- Tab through the footer: every link (`Navigate` items, GitHub/LinkedIn/Email,
  "Back to top") shows a visible cyan focus outline.
- "Back to top" jumps the page to the top (anchors to `#page-content`).
- External links open in a new tab and carry `rel="noreferrer"`.
- Confirm link/copy text is legible against the footer surface — link rest color is
  `--text-muted` on the `rgba(16,18,30,0.55)` surface; if any text looks too faint,
  it is acceptable to bump `.footer-link` rest color toward `--text`. Re-run build +
  lint after any change.

- [ ] **Step 4: Commit**

```bash
git add styles/features/footer.scss
git commit -m "feat(footer): responsive breakpoints + a11y sign-off"
```

---

## Notes for the implementer

- `react-icons/fa6` exports `FaGithub`, `FaLinkedin`, and `FaEnvelope` — all three
  are already-available icon names; `FaGithub`/`FaLinkedin` are used by the current
  footer, `FaEnvelope` is the standard fa6 solid envelope.
- Importing `profile.json` works in a server component (the homepage `ContactCTA`
  already imports it the same way; `resolveJsonModule` is enabled).
- Do not reintroduce `"use client"`, `useEffect`, `useRef`, the reactor-orb markup,
  the telemetry lines, or the `meltdown-mode` class — all are intentionally removed.
- Keep `styles/features/footer.scss` as the single footer stylesheet; do not re-add
  `footer-powercore.scss` to `globals.scss`.
