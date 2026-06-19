# Tanveer Singh — Portfolio

Personal portfolio site for Tanveer Singh, Developer & Programmer based in Greater Sydney, Australia.

Built with Next.js 16 App Router, SCSS, Tailwind v4, Firebase, and framer-motion.

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, featured projects, testimonials |
| `/about` | Skills, education, profile summary |
| `/experience` | Work history timeline |
| `/portfolio` | Full project grid |
| `/contact` | Contact channels and enquiry form |
| `/admin` | Firebase-authenticated admin dashboard |

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, static generation)
- **Language:** TypeScript (strict)
- **Styling:** SCSS + Tailwind v4 (dual system — see below)
- **Animation:** framer-motion
- **Database/Auth:** Firebase (Auth · Firestore · Storage · AI Logic)
- **Fonts:** Orbitron · Rajdhani · Share Tech Mono (via `next/font`)
- **Deployment:** Vercel (auto-deploy on `git push master`)

---

## Content

All page copy is JSON-driven — edit the files below, not the components.

| File | Purpose |
|---|---|
| `content/profile.json` | Name, role, location, summary, contact links |
| `content/skills.json` | Skills by category: `web`, `frameworks`, `languages`, `cloud`, `tools`, `ai` |
| `content/experience.json` | Work history (use real job titles) |
| `content/projects.json` | Portfolio projects — status, stack, links |
| `content/education.json` | Education entries |
| `content/testimonials.json` | Homepage testimonials |
| `content/hero.json` | Hero CTA button labels |
| `content/about.json` | About page supplementary content |
| `data/gallery.json` | Game poster metadata (auto-generated — do not edit manually) |

---

## Styling Architecture

Two parallel systems — do not conflate:

**SCSS** (primary) — entry point `styles/globals.scss`
- `styles/variables.scss` — all CSS custom props (design tokens)
- `styles/features/` — per-effect partials (animations, navbar, hero, page-shell, etc.)
- `styles/pages/` — page-specific styles
- `styles/themes/` — per-theme token overrides

**Tailwind v4** — utility classes in JSX, no config file

**Color tokens (cyberpunk default theme):**

| Token | Value | Role |
|---|---|---|
| `--accent` | `#00e5ff` | Electric Cyan — primary |
| `--accent-alt` | `#ff2daa` | Neon Magenta — secondary |
| `--bg` | `#0b0c14` | Background |
| `--panel` | `#161928` | Card/panel surface |
| `--text` | `#e8eaf0` | Body text |
| `--text-muted` | `#8892a4` | Secondary text |

Never hardcode color values — always use CSS custom properties.

---

## Theme System

Three themes: `cyberpunk` (dark, default), `genshin` (light stub), `starrail` (dark stub).

Applied via `data-theme` attribute on the root element. Provider in `theme/ThemeProvider.tsx`.

---

## Commands

```bash
npm run dev          # dev server at localhost:3000
npm run build        # production build
npm run lint         # ESLint (flat config — eslint.config.mjs)

node scripts/fetchPosters.js      # fetch RAWG data → data/gallery.json + public/posters/
node scripts/scanLocalPosters.js  # sync local posters → gallery.json
```

---

## Environment Variables

Create `.env.local` (gitignored — never commit):

```
NEXT_PUBLIC_RAWG_KEY=           # RAWG API key — required for gallery scripts
```

Firebase config is embedded via Firebase SDK initialisation in `lib/firebase.ts`.

---

## Performance Rules

- No `backdrop-filter: blur()` on large/full-height elements — GPU compositor cost
- No `infinite` CSS animations on background/fixed elements
- No `opacity: 0` hardcoded on stagger children — use `animation-fill-mode: both`
- Always include `@media (prefers-reduced-motion: reduce)` for animation blocks

---

## Path Alias

`@/*` resolves to the repository root (`tsconfig.json`).

---

## Deployment

Vercel. Auto-deploys on `git push master`. No CI/CD pipeline configured.
