---
name: verify
description: Launch the dev server and use the Playwright MCP to screenshot key pages of this portfolio site, checking for visual regressions or broken layouts. Use after making visual/layout changes to confirm everything renders correctly.
---

Verify the site is working correctly:

1. Check if `npm run dev` is already running (look for a process on port 3000). If not, start it with `npm run dev` in the background and wait for "Ready" in output.
2. Use the Playwright MCP browser tools to visit and screenshot these pages:
   - http://localhost:3000 (home — intro sequence, hero, diagnostics panel)
   - http://localhost:3000/about
   - http://localhost:3000/portfolio
   - http://localhost:3000/gallery
   - http://localhost:3000/experience
   - http://localhost:3000/contact
3. For each page, check:
   - No blank/white sections where content should be
   - Theme CSS variables are applied (page should not be unstyled)
   - Console has no uncaught JS errors (check browser_console_messages)
4. Report a summary: pages checked, any issues found, screenshots for the pages where issues exist.

If the dev server was started by this skill, leave it running — don't kill it.
