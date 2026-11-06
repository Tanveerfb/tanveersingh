# Environment — tanveersingh

Every environment variable and external account, with its owner (`project-rules.md` §DOCS). Names
only, never values. Update this when a credential or account appears. The starting point for a
fresh clone is `.env.example`.

| Variable | For | Scope | Owner |
| --- | --- | --- | --- |
| `DISCORD_CONTACT_WEBHOOK_URL` | Where the contact form sends enquiries. Unset, the form says the message wasn't sent | Server only: anyone holding it can post to the channel | Tanveer's Discord server |
| `NEXT_PUBLIC_SITE_URL` | The public origin, for canonical URLs and metadata | Client | Tanveer |

`DISCORD_CONTACT_WEBHOOK_URL` is set on Vercel for Production and Preview (2026-11-06).

**Left over from the old site, set on Vercel, unused by this code:** `NEXT_PUBLIC_FIREBASE_*` (seven
variables), `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_RAWG_KEY`. Remove them at release.

| Account | For | Owner |
| --- | --- | --- |
| Vercel | Hosting and deploys | Tanveer |
| Discord | The channel that receives enquiries | Tanveer |
