# tanveersingh

Tanveer Singh's portfolio site — Next.js App Router, TypeScript, Tailwind v4, deployed on Vercel.

Rebuilt from scratch in November 2026 on the fleet standard. The previous site lives in `master`'s
git history, up to commit `0fa3e86`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

The kit preview is at `/kit` in development and answers 404 in production.

**Contact form:** copy `.env.example` to `.env.local` and set `DISCORD_CONTACT_WEBHOOK_URL` to send
real enquiries. Without it the form says the message wasn't sent. `environment.md` says what each
variable is for.

Agents and contributors: start with [`CLAUDE.md`](./CLAUDE.md).
