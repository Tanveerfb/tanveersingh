# Decisions — tanveersingh

Why each non-obvious choice was made. **Append only.** A decision that turns out wrong gets a
**new entry reversing it, not an edit**.

Required by [`project-rules.md`](./project-rules.md) §DOCS. Started 2026-11-02, the day of the
rebuild.

---

## 2026-11-02 — Rebuild from scratch, in place, on a branch

**The old portfolio is replaced entirely. All UI, UX and code are new; only facts are
salvaged.** The rebuild happens on the `rebuild` branch of this same repository, with every
old file removed and a fresh `create-next-app` scaffold in its place.

The old site predates the fleet standard (its rules file was v1.0.0) and the owner has
"leveled up hundreds of times" since. Adopting it through `adopting-the-standard.md` was the
alternative; the owner chose a new project instead. A separate new repository was also
offered and declined — same repo keeps the existing Vercel project and URL. The old code
stays in `master`'s history until the branch merges.

Salvaged: `public/images/profile.png` (a possible photo — not yet confirmed for use) and
`public/images/muhammad-mustafa.png` (goes with his approved Truqorun quote). The old
`content/*.json` is **not** salvaged — it was out of date. Facts come from
`project-plans/plans/portfolio/about-tanveer.md` instead.

---

## 2026-11-02 — Stack

**Next.js 16 App Router, TypeScript strict, Tailwind v4, zod, on Vercel. No Firebase, no
zustand, no AI features.**

- **No Firebase.** The owner: contact-form submissions go to Discord channels, "no need for
  firebase there". A portfolio has no stored data to justify a backend
- **Contact form → Discord webhook**, sent from a Server Action so the webhook URL stays
  server-only
- **zod** for environment checking (§RUNTIME) and the contact form (§FORMS). Added with
  `server-only`
- **No zustand** — almost no shared client state on a portfolio (§STATE)
- **Node 24.x**, Vercel's current default LTS; Node 20 was retired on Vercel on 2026-10-01.
  Local Node is v24.21.0. `@types/node` moved to 24 to match
- Motion library not yet chosen — decided at the mockup stage (§MOTION)

---

## 2026-11-02 — Contact details and projects cleared to show

**Contact shown: LinkedIn, GitHub, hello@tinkertogether.studio, and the contact form.** No
personal email or phone number (owner's answer).

**Projects the owner cleared for the site, beyond the fact sheet's "Yes" rows:** NCA public
website, Cutscene, fleet-standards, Toll beta, sudoku-game, SimetrixDT website, Better Care
Supports. Not cleared: Jugaad, the telehealth prototype, the Element Clash story and wiki,
and the planned-only projects — ask before showing any of them.

---

## 2026-11-02 — Motif: Dragon Ball Z, all-out homage

**The site is designed around a universe-inspired Dragon Ball Z motif, as an obvious homage,
with creativity, animation and transitions taken all the way.** The brief is in
`design-system.md`.

How it was chosen: the owner named two worlds that shaped how he lives — Cyberpunk 2077 and
Dragon Ball Z/Super — and asked the agent to pick one. The agent picked Dragon Ball for its
fit with his "levelled up hundreds of times" story and its rarity. The owner was unsure it
could look as impressive as Cyberpunk, so a hero shootout was built
(`public/_mockups/hero-shootout.html`, same real copy in each):

- **Dragon Ball Super draft** (soft blue and silver glows, particle aura) — rejected outright:
  Cyberpunk "has the edge, and by a lot". Super is out
- **Cyberpunk 2077-inspired draft** (yellow slab, glitch, HUD, gigs and cyberdeck) — led
  throughout, finally "by a very small margin"
- **Dragon Ball Z draft** (cel-shaded gold transformation, beam, power tiers, exploding
  scouter, manga page) — closed the gap

The owner then lifted the restraint — "this is my portfolio… go all out" — and asked which
had more potential. The agent recommended Dragon Ball Z: its visual language is built on
motion, so going all out extends it where Cyberpunk's glitch vocabulary turns to noise; it is
almost never done, where Cyberpunk portfolios are common and the old site was one; and it
tells his story. The owner chose it: Dragon Ball Z "affected my whole life", and Cyberpunk
was the old site's look. **AI fits through the Android saga** — artificial humans, the lab,
the evolving bio-android, the warning from the future — as concepts, never characters (the
owner's idea).

Supersedes the earlier scoping answers for Super ("Super era", "signature places only"): the
era is Z, and the motif goes all out. §MOTION's three rules still hold.

---

## 2026-11-02 — Motif mockup locked: round 2

**`docs/design/motif.html` is the locked motif design.** The owner on round 2: "it looks
great so far", with refinement to come "via the components round". So the motif is not
reopened for detail changes; each component is refined in the component round (§SHADCN),
starting from this page.

Fixed during the round before it was shown: tube liquid hidden behind card text; the scroll
hint unreadable over the aura. Open at lock: reduced-motion fallbacks are written but were
not seen working (the browser pane cannot emulate the setting); the opposing beam's pink was
flagged to the owner as possibly too close to a specific villain, with no answer yet; all copy
is draft from `about-tanveer.md`, not yet approved.

Only the cleared projects appear. Jugaad stays out (not cleared).

---

## 2026-11-02 — Core kit picks (component round, part 1)

**From `public/_mockups/components-1.html`, the owner picked:**

| Component | Pick | Note |
| --- | --- | --- |
| Buttons | A — cel slab | As on the locked page |
| Navigation | C — capsule dock | Floating paper capsule at the bottom; over the ink bar and the scouter HUD |
| Form fields | B — speech balloon | "Needs a bit more polishing" — revision round |
| Cards | A — cel card | Highlighted crest to be a "more flowy aura rather than shapy" — revision round |
| Badges | C — sound-effect chip | |
| Toasts | B — scouter alert | |
| Dialogs | A — panel zoom | |
| Tabs | A — ink tabs | |
| Empty states | C — blank page | |

Still open: ink or white text on orange (the hero eyebrow still uses orange; badges no longer
do). The capsule dock replaces the locked page's top ink bar, so navigation moves to the
bottom of the screen on every width.

---

## 2026-11-02 — Core kit locked: revisions

**From `public/_mockups/components-1b.html`:** the highlighted card's crest is **1 — flame
tongues** (smooth curved flames in three layers, swaying on hover), over rising wisps and the
energy-flow outline. The polished speech-balloon fields (caption-box labels, unbroken tail,
pop on focus, jagged shout balloon for errors, dashed thought balloon when disabled, live
character count) drew no objection and are taken as approved — reopen if not.

The core kit is locked as `docs/design/components-core-kit.html` (all options, picks recorded
above) and `docs/design/components-core-kit-revisions.html`.

---

## 2026-11-02 — Signature components locked (component round, part 2)

**From `public/_mockups/components-2.html`, the owner picked:**

| Component | Pick | Instead of |
| --- | --- | --- |
| Aura | B — flowing flames: smooth tongues on a steady rhythm, leaning toward the cursor | A — hard flicker (the locked page's) |
| Scouter | A — green lens, readings type in, ボン overload | B — radar HUD |
| Specimen tube | B — capsule chamber: metal caps, glass, a core that forms when full, name plate, bubbles on hover | A — rounded glass tube |
| Manga panel | A — black and white panels sliding in with speed lines | B — ink wipe in halftone colour |
| Beam | B — flowing beam: taper, rippling edges, spiral core, spark ring | A — striped beam |

The pattern across both rounds: flowing over jagged for energy (aura, card crest, beam),
classic black-and-white for the manga, the Z-era green lens for the scouter. Locked as
`docs/design/components-signature.html`. The locked motif page (`docs/design/motif.html`)
still shows the older hard aura and striped beam; where they differ, these picks win.

---

## 2026-11-02 — Build decisions

- **Dependencies approved:** shadcn (its Radix behaviour primitives — dialog, tabs, toast — for
  keyboard, focus and ARIA) and `motion` for page and panel animation. Every visible part is
  still designed here (§SHADCN); the aura and beam stay on canvas and SVG as mocked
- **Text on orange: white on `ember`** (5.18:1), as the standard says — over ink on bright gi
  orange (7.17:1). Closes the open question from the tokens; no exception needed
- **No Trello board.** `docs/STATUS.md` is the only tracker
- **Build order: kit first, then pages.** The core kit and signature components are built
  with a hidden preview route, then the home page is composed from them

