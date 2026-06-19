# Navbar Redesign — Design Spec
**Date:** 2026-06-19  
**Status:** Approved  
**Author:** Tanveer Singh

---

## Goal

Replace the generic floating pill navbar with a full-width neon strip that reads unmistakably cyberpunk — neon signage aesthetic, glowing tube light-bleed along the bottom edge, magenta backlit active segments.

---

## Visual Direction

- **Reference:** Neon signage — neon tube lettering, light bleed, magenta/cyan contrast
- **Form:** Full-width edge-to-edge bar (no pill, no margin)
- **Active state:** Solid magenta (`--accent-alt`) background block — backlit sign segment
- **Brand:** Neon tube glow on "TANVEER SINGH" in cyan Orbitron

---

## Bar Structure

| Property | Value |
|---|---|
| Position | `fixed; top: 0; left: 0; right: 0` |
| Height | 60px desktop / 52px mobile |
| Background | `rgba(11, 12, 20, 0.95)` — solid, no `backdrop-filter` |
| Bottom edge | `border-bottom: 1px solid var(--accent)` |
| Glow bleed | `box-shadow: 0 2px 20px rgba(0,229,255,0.35), 0 1px 4px rgba(0,229,255,0.7)` |
| No top, left, right borders | Tube mounted flush at viewport top |
| z-index | 200 |

`page-content` padding-top: `68px` desktop, `60px` mobile.

---

## Brand Mark

- Font: Orbitron (`--font-display`), `0.82rem`, `letter-spacing: 0.18em`, uppercase
- Color: `var(--accent)` (cyan `#00e5ff`)
- Glow: `text-shadow: 0 0 8px var(--accent), 0 0 22px rgba(0,229,255,0.35)`
- Hover: `opacity: 0.75` — glow stays

---

## Nav Links

- Font: `--font-mono` (Share Tech Mono) — replaces `--font-body`
- Size: `0.74rem` desktop, `0.68rem` tablet
- Case: uppercase, `letter-spacing: 0.1em`
- Padding: `4px 10px`, `border-radius: 3px`
- No `::after` underline — block is the indicator

### States

| State | Background | Text color | Shadow |
|---|---|---|---|
| Default | none | `var(--text-muted)` | none |
| Hover | `rgba(0,229,255,0.10)` | `var(--text)` | none |
| Active | `var(--accent-alt)` (#ff2daa) | `var(--bg)` | `0 0 10px rgba(255,45,170,0.4)` |

Transitions: `background 0.15s ease, color 0.15s ease`

---

## Responsive Behavior

| Viewport | Layout |
|---|---|
| >900px | Brand left · links right · `gap: 2rem` |
| 641–900px | Same layout · `gap: 1.25rem` · link font `0.68rem` |
| ≤640px | Brand left · hamburger right · links hidden |

---

## Mobile Panel

- Attached directly below bar (no gap), `top: 52px`
- Background: `rgba(11, 12, 20, 0.97)` solid
- `border-bottom: 1px solid var(--border)`
- `max-height: calc(100dvh - 52px)` + `overflow-y: auto`
- Links: stacked, full-width, `min-height: 48px` (touch target)
- Active: full-width magenta block (same treatment as desktop)
- Animation: existing `AnimatePresence` fade+slide (`opacity 0 → 1, y -6 → 0`, `0.16s easeOut`)
- Close triggers: Escape key, pathname change, resize >640px (all existing logic kept)

---

## Accessibility

- `aria-label="Primary"` on `<nav>` (existing)
- `aria-current="page"` on active links (existing)
- `aria-expanded` + `aria-label` on hamburger toggle (existing)
- `:focus-visible` outline: `2px solid var(--accent)`, `outline-offset: 2px` on all links and toggle
- Touch targets: mobile links `min-height: 48px` (WCAG 2.5.5)

---

## Performance

- No `backdrop-filter` — solid semi-transparent bg only
- No infinite animations — glow is static CSS shadow, not animated
- `@media (prefers-reduced-motion: reduce)`: all transitions `0s`, `text-shadow` on brand simplified to flat cyan

---

## Files Changed

| File | Change |
|---|---|
| `styles/features/navbar.scss` | Full rewrite — strip layout, glow, link states, mobile panel |
| `modules/Navbar/HologramNavbar.tsx` | Minimal — class names only if needed, no structural change |
| `app/layout.tsx` | No change — navbar already imported |

---

## Out of Scope

- Navigation structure (links, order) — unchanged
- Admin link behavior — unchanged
- Theme switcher integration — unchanged
- Any page content below the navbar
