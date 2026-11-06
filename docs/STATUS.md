# tanveersingh — status

## Start here

**State:** Rebuild on the `rebuild` branch. Next.js 16 on fleet v3.8.0. Design locked; the core
kit and signature components are built and visible at `/kit` in development (`components.md`).
The site itself is still a holding page.
**Next:** The owner looks over `/kit`. Then content files, drafted for his approval (Open item 1).
**Blocked on:** nothing.
**Don't trust:** which repo serves the live site. `about-tanveer.md` says
tanveersingh22.vercel.app is a React Three Fiber portfolio, but neither `master` nor `Beta`
here contains three.js. Check the Vercel project before merging `rebuild` anywhere.

> **Things that will save a session:** in Git Bash, `npx`/`npm` after a `cd` fails on the
> owner's `fnm` hook — run from the project root. The scratchpad path is too long for
> `create-next-app` on Windows. Mockups in `public/_mockups/` are cached by the browser — add
> `?v=N` to reload. The fleet hook blocks `node -e`; put scripts in a file.

---

## What this project is

Tanveer Singh's personal portfolio, rebuilt from scratch with an all-out Dragon Ball Z
homage. Facts come from `E:\Projects\project-plans\plans\portfolio\about-tanveer.md`; every
visual change goes through a mockup he approves.

---

## What exists

**Design (locked, `docs/design/`, committed, never deployed):**

| File | What |
| --- | --- |
| `motif.html` | The full-page motif mockup (round 2) |
| `components-core-kit.html` | Core kit options; picks in `decisions.md` |
| `components-core-kit-revisions.html` | Polished balloon fields; flame-tongue card crest |
| `components-signature.html` | Aura, scouter, tube, panel, beam options; picks in `decisions.md` |
| `hero-shootout.html` | The Cyberpunk vs Dragon Ball shootout that chose the motif |

Where `motif.html` and the component picks differ (hard aura, striped beam), the picks win.

**Code:** Next 16.4.3, React 19.3, TS strict, Tailwind v4. Tokens in `@theme` in
`src/app/globals.css`; fonts (Bangers, Barlow, Noto Sans JP 900, Share Tech Mono) via
`next/font` in `src/app/layout.tsx`; holding page `src/app/page.tsx`. Env checking in
`src/lib/env.ts` and `src/lib/server-env.ts`. `zod`, `server-only`, `radix-ui`, `motion`. The
kit is in `src/components/ui/`, its drawn parts in `src/app/motif.css`, its preview at `/kit`
(404 in production); registry in `components.md`.

**Standard:** fleet v3.8.0 — `project-rules.md`, `.claude/skills/`, `.claude/fleet/`,
`.githooks/pre-commit`, shell-write hook in `.claude/settings.json`.

**Docs:** `CLAUDE.md`, `conventions.md`, `decisions.md`, `design-system.md`, `components.md`,
this file.

---

## Open items

1. **Content files** — typed content from `about-tanveer.md`; copy drafted, owner approves
2. **Home page** — composed from the kit, following `motif.html` and the picks, with the
   page-level sequences (`components.md`, *Not built yet*)
3. **Contact form** — Server Action → Discord webhook; `environment.md` once the webhook exists
4. **Light scheme** — the manga-page scheme needs its own mockup round before light tokens
5. **Vitest** wired to `npm test`
6. **Filename lint rule** offered (§NAMING)
7. **Owner questions** — photo (`public/images/profile.png`?), domain, interests to show,
   language levels, whether the beam struggle's pink opposing beam stays
8. **`npm audit`** advisories reviewed
9. **Live-site source** — find which repo/Vercel project serves tanveersingh22.vercel.app
   before any merge
10. **Propose to fleet-standards:** drop Playwright from §TESTING (`decisions.md`, 2026-11-06)
11. **Reduced motion** — seen only partly; the owner to try `/kit` with the setting on

(Renumbered 2026-11-06: building the kit is done.)

---

## Verified this checkpoint, by measurement

- `npm run build`, `npx tsc --noEmit` and `npm run lint` pass clean with the kit — 2026-11-06
- `/kit` in the built-in browser at desktop and 375px: no horizontal scroll; dialog traps focus,
  closes on Escape and returns focus; toasts, scouter overload, tube fill, manga panels, beam and
  instant transmission all ran; arrow keys move between tabs. Toast swipe not exercised
- A production server answers 404 at `/kit` and 200 at `/` — 2026-11-06
- Reduced motion, by measurement only, with the setting emulated before the owner ruled out
  Playwright: aura paints gold, jump is immediate, scouter finishes at once, panels and beam are
  in their final frame. Not looked at by eye; tube liquid not measured (its height token was
  missing at the time)
- Token utilities render in the browser: `font-display` → Bangers, `text-gold` → `#ffcf1f`,
  body `#0c1233`
- All 17 token text-on-colour pairs computed with the WCAG 2 formula (`design-system.md`)
- Every mockup checked in the browser pane at desktop and 375px: no horizontal scroll, no
  console errors
- `origin/Beta` and `origin/master` contain no three.js (`git show …:package.json`)

**The mistake worth keeping.** The first round put Dragon Ball **Super** forward; the owner
rejected it outright. Z won only after a rebuild in cel style. Don't drift back to soft glows.

---

## Assumed, not verified

- Vercel's production branch is `master` (from the old `CLAUDE.md`)
- Reduced motion on the kit — partly measured, see above (the pane cannot emulate it)

---

## Session log

### 2026-11-06 — kit built

Built the core kit and signature components from the locked designs, with `/kit` as the preview.
`shadcn init` damaged the tokens and fonts, so its CSS and layout edits were reverted and the kit
uses `radix-ui` directly (`decisions.md`). Owner ruled out Playwright mid-session. Dev server left
running on :3000.

Owner's review of `/kit`: scouter, tube, manga panels, dock and buttons look good. Fixed: text
overlapped the jagged shout border (teeth now a fixed depth; text clipped clear of them). Still
open with him: unsure about the fields overall; the beam "could be made better".

### 2026-11-02 (1st session) — rebuild set up, design locked

First commit on `rebuild`, pushed (not `master`; nothing deploys).

Owner chose a from-scratch rebuild in place on a branch over adoption or a new repo. Stack,
contact details and cleared projects in `decisions.md`. Fleet plugin updated to v3.8.0
mid-session at the owner's request.

Motif: hero shootout — Dragon Ball Super vs Cyberpunk 2077 (Super rejected), then Dragon Ball
Z vs Cyberpunk (gap closed). Owner lifted restraint ("go all out"), chose Dragon Ball Z with
the Android saga for AI. Round 2 full page locked. Tokens into `@theme`. Component round: core
kit picks, revisions (balloon fields, flame-tongue crest), signature picks (flowing aura,
lens scouter, capsule chamber, black-and-white panels, flowing beam). Build decisions: shadcn
+ motion, white on `ember`, no Trello, kit first.
