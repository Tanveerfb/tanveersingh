# Footer Redesign — Design Spec

**Date:** 2026-06-20
**Status:** Approved (pending implementation plan)

## Goal

Replace the decorative "power core" footer with a functional sitemap footer that
carries a circuit-board motif consistent with the redesigned homepage hero, while
removing the perf-rule violations and dead code the old footer carried.

## Motivation / Problems with the current footer

`modules/Footer/PowerCoreFooter.tsx` + `styles/features/footer-powercore.scss`:

- **Perf-rule violations:** three `infinite` animations on the reactor orb
  (`corePulse`, `ringSpin`, `centerPulse`) and a `backdrop-filter: blur(6px)` on a
  full-width element. Both contradict the project performance rules.
- **Gimmick content:** fake telemetry (`POWER_CORE_STATUS: STABLE`,
  `SESSION_UPTIME` counter driven by a `setInterval`) — no real value.
- **Dead code:** `meltdown-mode` class (the `Chaos/Meltdown` module was removed).
- **Off-palette:** hardcoded `rgba(0,255,255,…)` and `--accent-soft` instead of the
  design-token palette (`--accent` = `#00e5ff`, etc.).
- **Thin:** only an orb + two social links — no navigation, no contact, no
  copyright.
- `z-index: 9000` — unnecessarily high (navbar is 200).

## Design

### Structure

`<footer class="site-footer">` → `.footer-inner` constrained to the site container
width (max 1200px).

1. **Circuit bus rail** — the footer's top edge is a horizontal glowing trace with
   solder-pad nodes. Each column drops a short vertical connector from the rail, so
   the columns read as "wired" to the bus.
2. **3-column grid** — Brand (1.4fr) · Navigate (1fr) · Connect (1fr):
   - **Brand:** `TANVEER SINGH` (display font), `Developer & Programmer`,
     `Greater Sydney Region, NSW`, one-line tagline.
   - **Navigate:** mono header `// navigate`; links: Home, About, Experience,
     Portfolio, Contact.
   - **Connect:** mono header `// connect`; GitHub, LinkedIn, Email (icon + label).
3. **Bottom bar:** `© <year> Tanveer Singh` · `Built with Next.js, assisted by
   Claude Opus` · `↑ Back to top`.

### Content sources

- `content/profile.json` drives: `name`, `role`, `location`, `email`, `github`,
  `linkedin`. No hardcoded contact values.
- Navigate list: a local `const` array in the component (mirrors the navbar's
  `NAV_ITEMS` pattern): Home `/`, About `/about`, Experience `/experience`,
  Portfolio `/portfolio`, Contact `/contact`.
- Year: `new Date().getFullYear()` (evaluated at render; static build → build year).

### Circuit visual + motion

- Rail, vertical connectors, and node pads are **pure CSS** (lines via
  gradients/borders, nodes via small rounded spans) so the layout stays responsive
  with no fixed SVG coordinate math. No background SVG — the circuit motif is
  carried entirely by the rail, connectors, and node pads (keeps it CSS-only and
  perf-clean).
- Node pads use magenta (`--accent-alt`) to echo the hero circuit nodes; column
  headers use cyan (`--accent`) mono; links are `--text-muted` → `--accent` on
  hover with a subtle horizontal slide.
- **Exactly one animation:** a single cyan packet (small dot) glides along the bus
  rail (~7s, `transform: translateX`, compositor-friendly). Disabled under
  `prefers-reduced-motion`. No other infinite loops anywhere in the footer.
- Surface matches the hero glass language: a translucent **solid** background
  (`rgba` tint) — **no `backdrop-filter`** on this full-width element — with a 1px
  cyan rail and a top edge highlight.
- All colors come from palette tokens; no hardcoded hex/rgba accent values beyond
  shadow/glow alpha tints.

### Responsive

- **≤900px:** Brand spans full width on top; Navigate + Connect sit side-by-side
  (2-col) below. Rail spans full width.
- **≤560px:** single-column stack. Rail collapses to a plain top divider line
  (per-column node pads and vertical connectors hidden). Bottom bar wraps; back-to-
  top drops below the copyright line.

### Accessibility

- `<footer>` landmark with an appropriate `aria-label` (e.g. "Site footer").
- Navigate and Connect groups use list semantics.
- External links (`github`, `linkedin`): `target="_blank"` + `rel="noreferrer"`.
- Email is a `mailto:` link.
- Decorative rail/nodes/packet are `aria-hidden`.
- Visible focus states on every link (reuse existing focus-ring pattern;
  `:focus-visible` outline in `--accent`).
- Back-to-top is an anchor to `#page-content` (the layout's main landmark id).
- Color contrast: link text and copy meet WCAG AA against the footer surface
  (body/link text toward the `--text` end; muted only for non-essential meta).

### Component / file boundaries

- **New:** `modules/Footer/SiteFooter.tsx` — a **server component** (no
  `"use client"`, no `useEffect`; back-to-top is a plain anchor). Reads
  `content/profile.json`. Keeps under 400 lines (well within).
- **Delete:** `modules/Footer/PowerCoreFooter.tsx`.
- **Modify:** `app/layout.tsx` — swap the import and the `<PowerCoreFooter />` tag
  for `<SiteFooter />`.
- **New:** `styles/features/footer.scss`.
- **Delete:** `styles/features/footer-powercore.scss`.
- **Modify:** `styles/globals.scss` — replace the
  `@import "./features/footer-powercore.scss";` line with the new footer partial.

### Cleanup delivered as part of this change

Removes: the three infinite orb animations, the full-width `backdrop-filter`, the
fake-telemetry `setInterval`, the dead `meltdown-mode` class, hardcoded
`rgba(0,255,255)` / `--accent-soft` usage, and `z-index: 9000`.

## Out of scope

- No Blog link in the footer (live route, intentionally omitted, matching navbar).
- No Discord link.
- No new content JSON files; reuse `profile.json`.
- The homepage Contact CTA strip stays as-is; the footer does not duplicate it.

## Success criteria

- `npm run build` passes (12 static pages); `npm run lint` clean (no new
  warnings/errors).
- Footer renders the three columns + bus rail + bottom bar, content sourced from
  `profile.json`.
- Exactly one animation in the footer; `prefers-reduced-motion` disables it.
- No `backdrop-filter` on the footer; no `infinite` animation other than the single
  rail packet.
- Responsive behavior at ≤900px and ≤560px as specified.
- Old `PowerCoreFooter` component and `footer-powercore.scss` no longer exist or
  referenced.
