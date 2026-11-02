# Design system — tanveersingh

Binding for every visual change (`project-rules.md` §DESIGN). Tokens, typography, density and
motion are added here as mockup rounds settle them; until a value is recorded here it is a
proposal, not a token.

## Motif

**Universe-inspired — Dragon Ball Z, all-out homage.** Chosen 2026-11-02 via *bring your own*
(universe-inspired), after a hero shootout against a Cyberpunk 2077-inspired draft and a
Dragon Ball Super draft; see `decisions.md`. **Locked 2026-11-02:** the motif mockup is
[`docs/design/motif.html`](./docs/design/motif.html) (round 2). Refinement of individual
components happens in the component round, not by reopening the motif. The shootout that led
here is kept at `docs/design/hero-shootout.html`.

**The idea.** Tanveer's portfolio is a power-up story: someone who kept training and kept
reaching new forms. The site is an obvious, unapologetic homage that fans recognise at once,
crafted well enough that anyone else sees a striking, polished personal site. It is his own
project, not a company site: **go all out** on creativity, animation and transitions (owner,
2026-11-02), within the three §MOTION rules below.

- **Era:** the Z era — cel-shaded animation, the arcs of the 1990s series. Dragon Ball Super
  is out (owner, 2026-11-02).
- **Signature elements:**
  - **The transformation** — the hero powers up on load: screen shake, rumble lettering,
    rising debris, a flickering blue aura, a white flash, then the golden form with a jagged
    gold aura and crackling lightning. Replayable.
  - **Cel-shaded lettering** — display type with thick black outlines and hard offset
    shadows; original Japanese-style sound-effect lettering (ゴゴゴ, ドン, ボン) drawn as type.
  - **Energy beams** — charge-and-fire beams as dividers and transitions.
  - **Career as power tiers** — base form, powering up, full power; current roles at full
    power, Nobility Care Australia first, Tinker Together second.
  - **The Z-era scouter** — a green lens that reads real, dated facts only, and overloads
    when the reading is too high.
  - **Manga pages** — paper gutters and black-bordered panels, speed lines and screentone,
    for project case studies.
  - **The Android saga for AI** — the lab, the blueprints of artificial humans, the
    bio-android that absorbs and evolves, the warning from a ruined future: as concepts and
    atmosphere for the AI work, never as characters.
- **Off-limits:**
  - characters, likenesses, character names in copy, and art of them; original illustration only
  - the Dragon Ball logo, the kanji on the gi, faction and company emblems (the Red Ribbon
    emblem, Capsule Corporation's logo), the dragon balls, traced art or screenshots
  - "over 9000" and any invented power level — **no number unless something measured it**
  - outlines, glow or motion on body text; text stays plainly readable
  - anything that makes Nobility Care Australia look unserious beside it
- **Colour schemes:** dark by default (night-blue sky, gold and orange), plus a light scheme —
  the manga page (paper, ink, screentone). Light scheme still to be mocked up.
- **Palette sources:** the training gi (orange and deep blue), the first golden
  transformation (gold, pale-gold core), blue ki and energy beams (blue to white core), the
  scouter (green lens, red alarm), manga paper and ink. Exact values are set in the mockup
  and recorded here once locked.

## Motion

Animation is a signature of this motif and is decided in the mockup loop (§MOTION). Three
things hold regardless:

- **`prefers-reduced-motion` is honoured** — transformations become the final golden frame,
  beams appear already fired, nothing essential is conveyed only by motion
- **Nothing waits on an animation** — content is readable and usable during and after every
  sequence
- **Smooth on a mid-range phone** — no infinite animations on full-page or background
  elements; effects run, then settle on a still frame

## Research and sources

From the motif research on 2026-11-02 (web; most sources are fan material, so treated as
directional, not specification):

- Z-era art: sharper lines, speed lines, dynamic camera angles and vivid colour to convey
  motion and power; Toriyama's mechanical-design and advertising background shows in clean
  shapes — "Dragon Ball: A Visual History" excerpts
- Colour signals transformation: gold hair and fiery aura for the golden form — fan
  palette analyses
- The scouter: a one-eye lens HUD showing numbers and symbols, commonly a green lens; it
  malfunctions or breaks when a reading is too high — Dragon Ball wiki, CBR
- **Not confirmed:** any official palette specification or exact scouter readout layout;
  values are original, tuned by eye and checked for contrast

## Signature moments in the locked mockup

| Moment | Where | Behaviour |
| --- | --- | --- |
| Transformation | Hero | On load: shake, rumble lettering, blue aura, flash, gold form; then the aura leans toward the cursor. Replayable |
| Ki meter | Fixed, left edge (top bar on phone) | Fills with page scroll; blue, turns gold past the career section |
| Transformation scroll | Career | Pinned scene; base form → powering up → full power, aura grows per stage |
| The lab | AI | Blueprint grid, self-drawing AI-core schematic, specimen tubes that fill on view |
| Beam struggle | Between the lab and the work | Scroll-driven clash; blue pushes through to a white-flash breakthrough |
| Manga chapter | The work | Paper page, black-bordered panels slide in with speed lines |
| Scouter | Skills | Hover or tap a skill to scan where it was used; the biggest overload the lens |
| Charge to send | Contact | Hold to charge a beam, release to fire; a click also sends |
| Instant transmission | Navigation | Streak out, jump, streak in |

## Tokens

In `@theme` in `src/app/globals.css` since 2026-11-02, derived from the locked mockup. That
file is the source of truth for values; this section says what each group is for. Tailwind
generates the utilities (`bg-gold`, `text-on-gold`, `font-display`, `shadow-cel`, `ease-snap`,
`duration-burst`…). **Components use these and nothing else** (§STYLING).

| Group | Tokens | Use |
| --- | --- | --- |
| Surfaces | `night`, `navy`, `line` | Page, raised panels, quiet borders |
| Ink and paper | `ink`, `paper`, `text`, `muted` | Outlines and shadows; manga page; body and secondary text |
| Training gi | `blue`, `orange`, `ember` | Secondary action; orange for decoration and display type on dark; `ember` when orange carries text |
| Golden form | `gold`, `gold-hi` | Primary action, full-power state, highlights |
| Ki | `ki`, `ki-soft`, `ki-pale` | Beams, charging, powering-up state |
| Scouter | `lens`, `lens-dark`, `lens-text`, `alarm` | The scouter only |
| The lab | `lab`, `lab-2`, `print` | The AI section only |
| Type | `display` (Bangers), `body` (Barlow), `jp` (Noto Sans JP 900), `mono` (Share Tech Mono) | Display lettering; running text; sound effects; readouts |
| Cel shading | `--cel-stroke-sm/–/lg` (2/4/6px), `shadow-cel-sm/–/lg` (3/5/8px offset), `--border-cel` (3px) | Outlined lettering, hard shadows, panel borders |
| Shape | `radius-none`, `radius-lens`, `radius-tube` | Square by default; the scouter lens and specimen tube shapes |
| Motion | `ease-snap`, `ease-beam`; `duration-press` 120 · `flash` 380 · `pop` 500 · `slide` 600 · `burst` 900 · `fill` 1400 · `transform` 3000ms; `--aura-flicker` 70ms | Every animation |
| Layout | `spacing-nav` 60px, `container-page` 1180px | Nav height, content width |

Fonts load through `next/font/google` in `src/app/layout.tsx`; Noto Sans JP is weight 900
only and not preloaded (decorative, large glyph set).

**Light scheme:** not yet designed — the manga-page scheme gets its own mockup round before
any light tokens exist.

## Text on colour

Every fill that carries text has an `on-` partner token. WCAG 2 ratios, computed 2026-11-02:

| Text | Fill | Ratio |
| --- | --- | --- |
| `on-gold` ink | `gold` | 13.31:1 |
| `on-blue` white | `blue` | 8.82:1 |
| `on-alarm` white | `alarm` `#c62828` (darkened from the mockup's `#e3262f`, 4.58:1) | 5.62:1 |
| `on-ember` white | `ember` | 5.18:1 |
| `on-lens` ink | `lens` | 11.58:1 |
| `on-ki-soft` ink | `ki-soft` | 9.21:1 |
| `on-muted` ink | `muted` | 10.97:1 |
| `on-paper` ink | `paper` | 18.61:1 |
| `text` | `night` / `navy` | 16.41 / 13.33:1 |
| `muted` | `night` / `navy` | 10.18 / 8.27:1 |
| `gold` (display type) | `night` | 12.35:1 |
| `orange` (display type) | `night` | 6.65:1 |
| `print` | `lab` | 10.09:1 |
| `lens-text` | `lens-dark` | 14.25:1 |
| `ember` (kicker on the manga page) | `paper` | 4.89:1 |

**Orange carries white text on `ember`** (owner, 2026-11-02). `orange` itself never carries
text; it stays decoration, outlines and display type on dark.
