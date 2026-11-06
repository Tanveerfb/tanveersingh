# Conventions — tanveersingh

**What this file is:** the choices specific to this project, and every place it
**deliberately diverges from [`project-rules.md`](./project-rules.md)**.

**Audited against v3.8.0.** Rebuilt as a new project on 2026-11-02; nothing predates the
standard.

**What this file is not:** a copy of how to work in this repo. That is
[`CLAUDE.md`](./CLAUDE.md).

**Precedence.** `project-rules.md` §SCOPE: where the fleet rules and this file disagree, **stop
and ask.** Neither wins by default.

---

## Divergences from `project-rules.md` — granted

None.

---

## Open against the fleet rules — not yet decided

| Rule | Gap | Tracked as |
| --- | --- | --- |
| §NAMING | Filename lint rule (`check-file` or `unicorn/filename-case`) offered, not yet added | `docs/STATUS.md` open items |
| §TESTING | Vitest not installed; no `npm test` | `docs/STATUS.md` open items |

---

## Fully compliant — worth stating

- §DATA — no backend, so no data adapter. Content is typed files in the repo. If a store is
  ever added, the adapter comes with it
- §STATE — no zustand: a portfolio holds almost no shared client state. zod is in use for
  the environment and the contact form
- §FIREBASE — not used, by the owner's decision (2026-11-02)
- §AI — no AI features planned
- §DESIGN — motif locked and recorded in `design-system.md`; tokens in `@theme`; every
  text-on-colour pair checked
- §SHADCN — kit built from the locked designs on `radix-ui` behaviour; see `components.md`
- §TRELLO — no board, by the owner's decision

---

## §DOCS Document set — mapped, not duplicated

| §DOCS document | Here |
| --- | --- |
| `conventions.md` | this file |
| `decisions.md` | [`decisions.md`](./decisions.md) |
| `design-system.md` | [`design-system.md`](./design-system.md) |
| `components.md` | [`components.md`](./components.md) |
| `data-model.md` | not needed — no stored entities |
| `environment.md` | not yet — written when the Discord webhook exists |
| `status.md` | [`docs/STATUS.md`](./docs/STATUS.md) |
| `issues.md` | not yet |
| `roadmap.md` | not yet |
