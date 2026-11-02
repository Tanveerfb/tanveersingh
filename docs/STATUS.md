# tanveersingh — status

## Start here

**State:** Rebuild on the `rebuild` branch (first commit 2026-11-02). Fresh Next.js 16 on fleet
v3.8.0. Design phase complete: motif, tokens, core kit and signature components all locked —
see *What exists*. The app itself is a holding page; no real components or pages yet.
**Next:** Build the kit — `shadcn init` without losing our `@theme`, add `motion`, then the
core kit and signature components on a hidden preview route (Open item 1).
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
`src/lib/env.ts` and `src/lib/server-env.ts`. `zod`, `server-only`.

**Standard:** fleet v3.8.0 — `project-rules.md`, `.claude/skills/`, `.claude/fleet/`,
`.githooks/pre-commit`, shell-write hook in `.claude/settings.json`.

**Docs:** `CLAUDE.md`, `conventions.md`, `decisions.md`, `design-system.md`, this file.

---

## Open items

1. **Build the kit** — `shadcn init` (it edits `globals.css`; keep our `@theme`), add
   `motion`; build core kit + signature components on a hidden preview route; write
   `components.md`; see reduced motion working in a real browser setting
2. **Content files** — typed content from `about-tanveer.md`; copy drafted, owner approves
3. **Home page** — composed from the kit, following `motif.html` and the picks
4. **Contact form** — Server Action → Discord webhook; `environment.md` once the webhook exists
5. **Light scheme** — the manga-page scheme needs its own mockup round before light tokens
6. **Vitest** wired to `npm test`
7. **Filename lint rule** offered (§NAMING)
8. **Owner questions** — photo (`public/images/profile.png`?), domain, interests to show,
   language levels, whether the beam struggle's pink opposing beam stays
9. **`npm audit`** advisories reviewed
10. **Live-site source** — find which repo/Vercel project serves tanveersingh22.vercel.app
    before any merge

(Renumbered this checkpoint: navigation, base components and the first commit are done or
folded into item 1.)

---

## Verified this checkpoint, by measurement

- `npm run build` passes clean with tokens and fonts (2 static routes) — 2026-11-02
- `npx tsc --noEmit` and `npm run lint` clean
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
- Reduced-motion fallbacks in the mockups — written, never seen (the pane cannot emulate it)

---

## Session log

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
