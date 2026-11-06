# Components — tanveersingh

What exists (`project-rules.md` §COMPONENTS). Updated in the same commit as any component added,
moved or removed. Verify against `src/components/` before building; this is an index.

**See them all:** `npm run dev`, then `/kit`. That route answers 404 in production.

**Locked designs:** `docs/design/components-core-kit.html`, `components-core-kit-revisions.html`,
`components-signature.html`, `fields-beam.html` (replaces the earlier fields and beam); picks in
`decisions.md`. Behaviour comes from `radix-ui` where a
primitive exists; everything visible is ours (§SHADCN).

## Core kit — `src/components/ui/`

| File | Exports | Design | Notes |
| --- | --- | --- | --- |
| `button.tsx` | `Button` | A, cel slab | `primary` / `secondary` / `ghost`; `sm` / `md` / `lg`; `loading`, `fullWidth`, icons, `asChild` for links |
| `capsule-dock.tsx` | `CapsuleDock` | C, capsule dock | Fixed at the bottom; marks the current section; jumps by instant transmission |
| `field.tsx` | `InputField`, `TextareaField` | Caption panel (`fields-beam.html`, option 2) | Paper panel with a caption tab; speed-line shadow, gold on focus, red on error; screentone when disabled; count below, from `maxLength` |
| `card.tsx` | `Card`, `CardTitle`, `CardMeta`, `CardBody`, `CardSkeleton` | A, cel card | `highlighted` adds the flame-tongue crest; give it `tabIndex={0}` if it should sway on focus |
| `chip.tsx` | `Chip` | C, sound-effect chip | The badge: tiers, tags, stack |
| `toast.tsx` | `ToastProvider`, `ToastContext` | B, scouter alert | Call through `useToast`; errors announce assertively and stay longer |
| `dialog.tsx` | `Dialog`, `DialogTrigger`, `DialogClose`, `DialogContent` | A, panel zoom | Radix dialog; title and description required |
| `tabs.tsx` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | A, ink tabs | Radix tabs; arrow keys move between them |
| `empty-state.tsx` | `EmptyState` | C, blank page | `message` says what to do next; optional `action` |
| `skeleton.tsx` | `Skeleton` | Screentone | `line` / `short` / `title` |
| `ki-loader.tsx` | `KiLoader` | Ki bar | For an action in progress; lists use a skeleton |

## Signature — `src/components/ui/`

| File | Exports | Design | Notes |
| --- | --- | --- | --- |
| `aura.tsx` | `Aura` | B, flowing flames | Canvas; blue, then gold; leans toward the cursor. New `key` replays |
| `scouter.tsx` | `Scouter`, `ScouterReading` | A, green lens | Lens beside grouped skill buttons; readings passed in: real facts only; `overload` sets off the ボン; `children` sit above the buttons |
| `specimen-tube.tsx` | `SpecimenTube` | B, capsule chamber | Fills on view; boils on hover |
| `manga-panel.tsx` | `MangaPage`, `MangaPanel`, `MangaPanelTitle`, `MangaPanelText`, `MangaActionPanel` | A, black and white | Panels slide in with speed lines; `from`, `order`, `wide` |
| `beam.tsx` | `Beam` | Impact frame (`fields-beam.html`, option B) | Canvas. Fires on view, then rests on its final still. New `key` fires again |

## Supporting code

| File | Job |
| --- | --- |
| `src/app/motif.css` | The kit's drawn shapes, screentones and keyframes, as Tailwind utilities |
| `src/hooks/use-reveal.ts` | Plays an entrance once in view; the server renders the final frame |
| `src/hooks/use-active-section.ts` | The section crossing the middle of the screen |
| `src/hooks/use-instant-transmission.ts` | Streak out, jump, streak in; immediate under reduced motion |
| `src/hooks/use-toast.ts` | Shows a toast |
| `src/lib/class-names.ts` | `cn` |
| `src/lib/flame-path.ts`, `aura-flame.ts`, `beam-impact.ts` | Pure drawing |
| `src/lib/css-duration.ts` | Reads a duration token in milliseconds, whichever unit the minifier left it in |
| `src/features/kit-preview/` | The `/kit` page's contents; sample text from the mockups |

## Home page — `src/features/home/`

Built from `docs/design/home.html`. Only `page.tsx` composes these; a second consumer moves one to
`components/` (§STRUCTURE).

| File | Job |
| --- | --- |
| `hero-section.tsx` | The transformation: resting style is the golden form, CSS holds the charging look |
| `about-section.tsx` | Photo in manga ink, and the resume facts |
| `career-section.tsx` | The power ladder, highest tier first |
| `lab-section.tsx`, `blueprint.tsx` | The AI lab and its self-drawing schematic |
| `beam-struggle.tsx` | The scroll-driven clash before the work |
| `work-section.tsx` | The manga chapter, with tabs by organisation |
| `contact-section.tsx`, `contact-form.tsx`, `contact-action.ts` | Reach details, the charge-to-send form, the Server Action that posts to Discord |
| `ki-meter.tsx` | Fills with page scroll |
| `section-heading.tsx` | A section's kicker and cel-lettered title |
