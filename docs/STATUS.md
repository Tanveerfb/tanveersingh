# tanveersingh — status

## Start here

**State:** Rebuild on the `rebuild` branch. Next.js 16 on fleet v3.8.0. Design locked; the core
kit and signature components are built (`/kit`, development only). The home page is built on
`rebuild` from `docs/design/home.html` and the owner's approved copy in `src/content/`.
**Next:** Ready to release on the owner's `git CPR`. `master` auto-deploys to
tanveersingh22.vercel.app and tanveer.truqorun.com; he decides whether the second stays.
**Blocked on:** nothing on the agent's side.
**Don't trust:** `about-tanveer.md` on the current portfolio: it says React Three Fiber, but the live
site is `master` here, with no three.js.

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
| `fields-beam.html` | Caption panel fields and impact frame beam, replacing the earlier picks |
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

1. **Vercel Node version** — the project setting says 22.x, `package.json` says 24.x; the `rebuild`
   previews build. Confirm which it uses and align the setting at release
2. **Check on the real site after release** — hold to charge the send button, and the beam firing
   on send
3. **Reduced motion** — seen only partly; the owner to try the site with the setting on
4. **Domain** — tanveersingh22.vercel.app, tanveer.truqorun.com (attached now) or
   `tanveer.tinkertogether.studio`; decide at launch.
   `NEXT_PUBLIC_SITE_URL` and share metadata follow from it
5. **Light scheme** — the manga-page scheme needs its own mockup round before light tokens
6. **Vitest** wired to `npm test`; `contact-schema.ts` is the first thing to test
7. **Filename lint rule** offered (§NAMING)
8. **`npm audit`** advisories reviewed
9. **Propose to fleet-standards:** drop Playwright from §TESTING (`decisions.md`, 2026-11-06)
10. **Contact rate limit** — none yet; add one if spam arrives

(Renumbered 2026-11-06: the kit, content files, home page and contact form are done.)

---

## Verified this checkpoint, by measurement

- `npm run build`, `npx tsc --noEmit` and `npm run lint` pass clean with the kit — 2026-11-06
- `/kit` in the built-in browser at desktop and 375px: no horizontal scroll; dialog traps focus,
  closes on Escape and returns focus; toasts, scouter overload, tube fill, manga panels, beam and
  instant transmission all ran; arrow keys move between tabs. Toast swipe not exercised
- A production server answers 404 at `/kit` and 200 at `/` — 2026-11-06
- On Vercel: project `tanveersingh` is linked to this repo; production serves `master` at `0fa3e86`;
  the `rebuild` preview of `6fecad0` is READY. Previews sit behind Vercel login — 2026-11-06
- Home page in the built-in browser at desktop and 375px: no horizontal scroll; hero settles on
  gold; ladder, lab, struggle, work and contact seen; dock tracks and keeps the current section
  in sight. Scouter overload on desktop by measurement
- Contact form on a production build: validation errors keep what was typed; a send reached a local
  stand-in for Discord with mentions off; with no webhook it shows the "not sent" message. No client
  bundle mentions the webhook variable
- A real message from the `2f70318` preview landed in the owner's #portfolio-submissions channel;
  he confirmed it with a screenshot — 2026-11-06
- Not exercised by hand: holding to charge the send button, the beam fired on send
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

- Reduced motion on the kit — partly measured, see above (the pane cannot emulate it)

---

## Session log

### 2026-11-06 — kit built

Built the core kit and signature components from the locked designs, with `/kit` as the preview.
`shadcn init` damaged the tokens and fonts, so its CSS and layout edits were reverted and the kit
uses `radix-ui` directly (`decisions.md`). Owner ruled out Playwright mid-session. Dev server left
running on :3000.

Owner's review of `/kit`: scouter, tube, manga panels, dock and buttons look good. The balloon
fields' jagged error overlapped its text and he was unsure of them; the beam "could be made
better". A new mockup round chose caption panel fields and the impact frame beam, both now built.
The aura and beam were reading duration tokens in the wrong unit once minified (`css-duration.ts`
fixes it), so the aura had been cutting its animation short.

Copy approved after researching `E:\Projects`; the owner calls himself a web developer and AI
integrator, and wants the site read as a glorified resume. Home page locked and built with the
contact form. A stale Toll Wiki service worker sits on localhost:3001 in the browser pane, which
hijacks anything tested on that port; use another.

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
