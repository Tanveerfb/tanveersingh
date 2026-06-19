# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build
- `npm run lint` — ESLint flat config (eslint.config.mjs, not .eslintrc)
- `node scripts/fetchPosters.js` — fetch RAWG data, update data/gallery.json, download posters to public/posters/
- `node scripts/scanLocalPosters.js` — scan local posters directory and sync gallery.json

No test suite configured.

## Project Rules

`project-rules.md` in repo root is authoritative. Key points:
- Files must stay under 400 lines
- TypeScript strict mode always; no `any`
- `@/` aliases only — no relative imports
- Never use inline `style={{}}` props unless the value is dynamic at runtime
- No `console.log` before completing a task
- Always try-catch async operations
- Build must pass after every medium/major change

## Styling Architecture

Two parallel systems — do not conflate:

- **Tailwind v4** — `@import "tailwindcss"` in `app/globals.css`. No tailwind.config file; uses v4 defaults and CSS-first configuration.
- **SCSS** — entry point `styles/globals.scss` imports all feature/page/theme partials. Design tokens are CSS custom properties, not Tailwind theme values.

SCSS layout:
- `styles/variables.scss` — all CSS custom props (`--bg`, `--text`, `--accent`, `--accent-alt`, `--glow-strong`, `--glow-soft`, `--border`, etc.)
- `styles/features/` — per-effect partials (animations, page-shell, hero, navbar, cursor, etc.)
- `styles/pages/` — page-specific styles (home.scss, etc.)
- `styles/themes/` — per-theme CSS var overrides and component overrides

## Color Palette (Cyberpunk — default theme)

| Token | Value | Role |
|---|---|---|
| `--accent` | `#00e5ff` | Electric Cyan — primary interactive color |
| `--accent-alt` | `#ff2daa` | Neon Magenta — secondary / highlights |
| `--bg` | `#0b0c14` | Deep blue-black background |
| `--bg-alt` | `#10121e` | Slightly lighter surface |
| `--panel` | `#161928` | Card/panel background |
| `--text` | `#e8eaf0` | Cool-tinted body text |
| `--text-muted` | `#8892a4` | Secondary text |
| `--border` | `#1e2235` | Subtle border |
| `--glow-strong` | `rgba(0,229,255,0.4)` | Cyan glow |
| `--glow-soft` | `rgba(255,45,170,0.25)` | Magenta glow |

Do not hardcode color values — always use CSS custom properties.

## Theme System

Three themes: **cyberpunk** (dark, default), **genshin** (light stub), **starrail** (dark stub). Applied via `data-theme` attribute on the root element. Context + provider live in `theme/ThemeContext.tsx` and `theme/ThemeProvider.tsx`. New theme variables go in `styles/variables.scss` inside the corresponding `[data-theme="..."]` block.

## Content

All page copy is JSON-driven from `content/`. Edit the JSON to change content — not the components.

| File | Purpose |
|---|---|
| `content/profile.json` | Name, role ("Developer & Programmer"), location, summary, contact |
| `content/skills.json` | Skills by category: `web`, `frameworks`, `languages`, `cloud`, `tools`, `ai` |
| `content/experience.json` | Work history (real job titles — do not rename to "Developer & Programmer") |
| `content/projects.json` | Portfolio projects with status, tech stack, links |
| `content/education.json` | Education entries |
| `content/testimonials.json` | Testimonial entries for homepage |
| `content/hero.json` | Hero section CTA labels |
| `content/about.json` | About page supplementary content |
| `data/gallery.json` | Game poster metadata — refreshed by fetchPosters.js |

## Performance Rules

- **No `backdrop-filter: blur()` on large/full-height elements** — causes GPU compositor thrash. Use solid semi-transparent `background` instead.
- **No `infinite` CSS animations on background elements** — scanlines, flickers, and sweep effects on fixed/full-height containers run continuously on the compositor thread and tank FPS.
- **No `opacity: 0` hardcoded on stagger children** — use `animation-fill-mode: both` so content is visible if animation never fires (hidden tab, headless renderer, reduced-motion).
- **Always include `@media (prefers-reduced-motion: reduce)`** for animation blocks.
- Use `duke-fade-up` / `duke-stagger` from `styles/features/dukeos-animations.scss` for page entrance animations — both now use `fill-mode: both` (safe).
- `duke-scan` (scrolling highlight band) is fine on small, contained elements; never apply it to full-page shells.

## Removed Modules

These were deleted and must not be re-imported:
- `modules/Chaos/Meltdown.tsx`
- `modules/Console/MatrixConsole.tsx`
- `modules/EasterEggs/KonamiCode.tsx`
- `modules/Navbar/AnnouncementBar.tsx`
- `app/services/page.tsx` (services page removed)
- `content/creator.json`, `content/navbar.json`, `content/siteData.json`, `content/tiles.json`

## Path Alias

`@/*` resolves to the repository root (configured in tsconfig.json).

## Environment Variables

- `NEXT_PUBLIC_RAWG_KEY` — RAWG video game API key. Required for poster/gallery scripts. Set in `.env.local` (gitignored, never commit).

## Deployment

Vercel. `git push master` triggers auto-deploy. No CI/CD workflows configured.
