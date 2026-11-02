---
name: mockup-check
description: Use after writing or editing a mockup in public/_mockups/ and before showing it to the owner — e.g. "check the mockup", "verify the mockup", "does it work on phone", "look at the mockup". Opens it through the dev server in the built-in browser, sees every band after its animations, checks phone width for overflow and names the culprit, reads the console, and resets the viewport.
---

# Mockup check

Every mockup is seen working at desktop and phone width before the owner sees it
(`project-rules.md` §TESTING, §OWNER). This is the check that was repeated, by hand, through
every mockup round of the first session.

## Steps

1. **Dev server.** `npm run dev` in the background from the project root (never after a `cd`
   in Git Bash — the owner's `fnm` hook breaks `npm` there). `preview_start` by name can fail
   when the session moved folders; then use `preview_start` with
   `url: http://localhost:3000/_mockups/<file>.html`.
2. **Always cache-bust.** Load `…/<file>.html?v=N`, incrementing `N` on every reload. The
   browser caches files in `public/`, and a stale page looks exactly like an edit that did not
   apply.
3. **Console first.** `read_console_messages` with `onlyErrors: true`. A script error can
   silently leave a whole section blank.
4. **Every band, after its animation.** Scroll each section into view with
   `scrollIntoView()` from `javascript_tool`, **wait longer than its animation** (load
   sequences run about 3s; scroll-triggered fills and beams 1.5–3s), then screenshot. A
   screenshot taken mid-animation shows an empty tube or an unfired beam and looks like a bug.
   If something looks wrong, read its computed style or class before changing code — it may
   simply not have finished.
5. **Scroll-driven scenes:** set the position directly —
   `scrollTo(0, el.offsetTop + (el.offsetHeight - innerHeight) * p)` for `p` in 0.15 / 0.5 /
   0.9 — rather than wheel-scrolling and guessing.
6. **Phone width.** `resize_window` preset `mobile`, reload with a new `?v=`, then compare
   `document.documentElement.scrollWidth` with `innerWidth`. If wider, name the culprit:
   `[...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1)`.
   Usual causes: an SVG with only `left`/`right` set (give it an explicit `width`); an
   element's pre-animation offset (`translateX` start state — clip its container); a decorative
   burst with a negative `right`. On a phone, the browser widens the whole layout instead of
   scrolling, so the number to watch is `innerWidth` growing past 375.
7. **Reset.** `resize_window` preset `desktop`, then navigate to the mockup's top for the
   owner.

## Traps

- **The pane's screenshot frame is not the page width.** It crops a 1043px page to an 800px
  frame; content cut off at the right edge of a screenshot is usually fine. Check
  `innerWidth` and element rects before "fixing" it.
- **Reduced motion cannot be emulated in the pane.** Say it is unverified; don't claim it.
- **The pane may say it could not show the file** after a Write — that refers to opening
  the raw file, not the dev-server URL. Use the URL.
- **CSS `transform` on an SVG element overrides its `transform` attribute.** Animate an inner
  `<g>` and position the outer one.
