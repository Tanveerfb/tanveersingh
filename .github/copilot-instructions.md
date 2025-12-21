# Copilot instructions (tanveersingh)

## Project overview

- Next.js App Router site (`app/`) with React 19 + TypeScript.
- Pages are thin route components (e.g. `app/about/page.tsx`) that compose UI from `modules/*`.
- Global “OS shell” lives in `app/layout.tsx` (theme provider + cursor + console + meltdown + navbar + footer).

## Content/data conventions

- Treat `content/siteData.json` as the primary source of truth for profile text, experience entries, projects, etc.
- Prefer importing JSON directly in routes/components (pattern: `import siteData from "@/content/siteData.json";`) rather than adding new APIs.
- Keep route logic minimal; do light mapping/shaping in the page when needed (see `app/portfolio/page.tsx` building `tags` and `description`).

## Components & interactivity

- Components that use hooks, `window`, `document`, audio, or `localStorage` must be Client Components (`"use client"`). Examples: `modules/Hero/HeroSection.tsx`, `modules/Console/MatrixConsole.tsx`.
- Prefer event-driven/DOM patterns with correct cleanup:
  - Use `useEffect` to add listeners and always remove them on cleanup.
  - For frequent UI updates (mouse move), throttle with `requestAnimationFrame` (see `HeroSection`).
- Small cross-component “event bus” patterns already exist:
  - `modules/Chaos/Meltdown.tsx` exposes module-level state + `subscribeMeltdownState()` and emits `CustomEvent("duke-meltdown-log")`.
  - `modules/Intro/IntroSequence.tsx` uses `localStorage` key `duke_intro_played` and exports `triggerReboot()`.

## Styling & theming

- Styling is primarily SCSS, imported globally from `app/layout.tsx` via `styles/globals.scss`.
- Theme tokens are CSS variables in `styles/variables.scss`; theme switching is via `data-theme` set on `document.documentElement` in `theme/ThemeProvider.tsx`.
- Feature-specific styles live under `styles/features/*.scss` and shared primitives like `.panel` are in `styles/components.scss`.
- Note: `app/globals.css` contains Tailwind v4 directives, but it is not the active global stylesheet (SCSS is).

## Assets

- Static assets are served from `public/` (e.g. `public/videos/home-bg.mp4`, `public/sfx/*`, `public/posters/*`).
- Use `next/image` for images when appropriate (see `modules/Portfolio/ProjectCard.tsx`).

## Commands / workflows

- Dev server: `npm run dev`
- Build: `npm run build` | Prod: `npm run start`
- Lint: `npm run lint` (ESLint v9 config in `eslint.config.mjs`)
