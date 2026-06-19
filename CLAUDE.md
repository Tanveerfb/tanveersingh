# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build
- `npm run lint` — ESLint flat config (eslint.config.mjs, not .eslintrc)
- `node scripts/fetchPosters.js` — fetch RAWG data, update data/gallery.json, download posters to public/posters/
- `node scripts/scanLocalPosters.js` — scan local posters directory and sync gallery.json

No test suite configured.

## Styling Architecture

Two parallel systems — do not conflate:

- **Tailwind v4** — `@import "tailwindcss"` in `app/globals.css`. No tailwind.config file; uses v4 defaults and CSS-first configuration.
- **SCSS** — entry point `styles/globals.scss` imports all feature/page/theme partials. Design tokens are CSS custom properties, not Tailwind theme values.

SCSS layout:
- `styles/variables.scss` — all CSS custom props (`--bg`, `--text`, `--accent`, `--glow-strong`, `--glow-soft`, etc.)
- `styles/features/` — per-effect partials (animations, glitch, cursor, matrix console, intro sequence, etc.)
- `styles/pages/` — page-specific overrides
- `styles/themes/` — per-theme CSS var overrides

## Theme System

Three themes: **cyberpunk** (dark, default), **genshin** (light), **starrail** (dark). Applied via `data-theme` attribute on the root element. Context + provider live in `theme/ThemeContext.tsx` and `theme/ThemeProvider.tsx`. New theme variables go in `styles/variables.scss` inside the corresponding `[data-theme="..."]` block.

## Content

All page copy is JSON-driven from `content/` (about.json, hero.json, portfolio.json, experience.json, etc.). Edit the JSON to change content — not the components. Gallery poster metadata lives in `data/gallery.json` and is refreshed by running fetchPosters.js.

## Path Alias

`@/*` resolves to the repository root (configured in tsconfig.json).

## Environment Variables

- `NEXT_PUBLIC_RAWG_KEY` — RAWG video game API key. Required for poster/gallery scripts. Set in `.env.local` (gitignored, never commit).

## Deployment

Vercel. `git push master` triggers auto-deploy. No CI/CD workflows configured.
