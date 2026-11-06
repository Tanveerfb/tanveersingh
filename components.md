# Components — tanveersingh

What exists (`project-rules.md` §COMPONENTS). Updated in the same commit as any component added,
moved or removed. Verify against `src/components/` before building; this is an index.

**See them all:** `npm run dev`, then `/kit`. That route answers 404 in production.

**Locked designs:** `docs/design/components-core-kit.html`, `components-core-kit-revisions.html`,
`components-signature.html`; picks in `decisions.md`. Behaviour comes from `radix-ui` where a
primitive exists; everything visible is ours (§SHADCN).

## Core kit — `src/components/ui/`

| File | Exports | Design | Notes |
| --- | --- | --- | --- |
| `button.tsx` | `Button` | A, cel slab | `primary` / `secondary` / `ghost`; `sm` / `md` / `lg`; `loading`, `fullWidth`, icons, `asChild` for links |
| `capsule-dock.tsx` | `CapsuleDock` | C, capsule dock | Fixed at the bottom; marks the current section; jumps by instant transmission |
| `field.tsx` | `InputField`, `TextareaField` | B, speech balloon (revised) | Rest balloon, error shout with narration box, disabled thought balloon; count from `maxLength` |
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
| `scouter.tsx` | `Scouter`, `ScouterReading` | A, green lens | Readings passed in: real facts only; `overload` sets off the ボン |
| `specimen-tube.tsx` | `SpecimenTube` | B, capsule chamber | Fills on view; boils on hover |
| `manga-panel.tsx` | `MangaPage`, `MangaPanel`, `MangaPanelTitle`, `MangaPanelText`, `MangaActionPanel` | A, black and white | Panels slide in with speed lines; `from`, `order`, `wide` |
| `beam.tsx` | `Beam` | B, flowing beam | Fires on view. New `key` fires again. Its drawing stretches to fit, so the orb goes oval on very wide layouts |

## Supporting code

| File | Job |
| --- | --- |
| `src/app/motif.css` | The kit's drawn shapes, screentones and keyframes, as Tailwind utilities |
| `src/hooks/use-reveal.ts` | Plays an entrance once in view; the server renders the final frame |
| `src/hooks/use-active-section.ts` | The section crossing the middle of the screen |
| `src/hooks/use-instant-transmission.ts` | Streak out, jump, streak in; immediate under reduced motion |
| `src/hooks/use-toast.ts` | Shows a toast |
| `src/lib/class-names.ts` | `cn` |
| `src/lib/flame-path.ts`, `aura-flame.ts`, `beam-geometry.ts` | Pure drawing geometry |
| `src/features/kit-preview/` | The `/kit` page's contents; sample text from the mockups |

## Not built yet

Page-level sequences from `motif.html`, built with the home page: the hero transformation (rumble,
flash), ki meter, transformation scroll, beam struggle, charge to send.
