---
name: update-posters
description: Refresh the gallery poster data. Runs fetchPosters.js to pull latest data from RAWG API and update data/gallery.json, then downloads any missing poster images to public/posters/. Use when the gallery looks stale or after adding new games to the data.
disable-model-invocation: true
---

Run the poster update workflow:

1. Check that `NEXT_PUBLIC_RAWG_KEY` is set in `.env.local`. If missing, tell the user and stop.
2. Run `node scripts/fetchPosters.js` and show the output.
3. If the script exits successfully, run `node scripts/scanLocalPosters.js` to verify local poster files match gallery.json.
4. Report: how many entries are in data/gallery.json, and whether any posters are missing from public/posters/.
