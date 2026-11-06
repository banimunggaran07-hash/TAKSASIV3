# AGENTS.md

Smart Taksasi V2.1.3 — a single self-contained Node.js/Express server (`server.ts`)
that serves the SPA (`index.html` + `public/`) and its REST/WebSocket API on one
port. This file records only the non-obvious things needed to run and verify it here.

## Running in the sandbox

```bash
docker compose -f docker-compose.base44.yml up -d --build   # first boot installs deps
docker compose -f docker-compose.base44.yml ps
docker compose -f docker-compose.base44.yml logs -f web
curl -s localhost:3000/health
```

One service, one origin, host port 3000. `tsx watch server.ts` live-reloads edits
to `server.ts`, `src/**` and `seed_data.ts`. Dependencies are installed on startup
with `bun install --frozen-lockfile` (`bun.lock` is the real lockfile; the committed
`package-lock.json` is an empty stub).

## Non-obvious points

- **No database or credentials are required.** With `SQL_HOST`/`SQL_USER`/`SQL_PASSWORD`/`SQL_DB_NAME`
  unset, `src/db/repo.ts` reports `isDatabaseConfigured === false` and the server
  serves the JSON store `data_store.json` from the repo root (re-seeded from
  `seed_data.ts` when the file is missing). Cloud SQL is opt-in only.
- **`listEntity()` returns `[]` when no database is configured** — it does not throw.
  Every read route must therefore treat an empty result as "no database" and fall
  back to `getFallback(entity)` from the JSON store. Omitting that check makes the
  whole app render zeros even though the seed data is present.
- **`data_store.json` is the live database and it is committed.** Any write through
  the UI/API rewrites that file, so verification that creates records must delete
  them again to keep the diff clean.
- **Do NOT regenerate `public/assets/auth-gatekeeper.bundle.js` needlessly.** It is
  built from `src/client/auth-gatekeeper.ts` by `npm run build`; the committed
  bundle is byte-identical to a fresh build today, but the Firebase web config in
  `firebase-applet-config.json` carries a masked `apiKey`, so real Firebase
  sign-in (Google / email+password) cannot work in this environment.
- **Use the "Masuk Cepat Petugas" button to sign in.** It calls `POST /api/auth/session`
  and registers a local session, needing no Firebase credentials. `firebase-admin`
  is initialised with a projectId only, so real ID-token verification fails.
- The main SPA bundle `public/assets/index-r5o_qhl4.js` (and its `.bak`) has no
  source in this repo and is served as-is; only the gatekeeper/import-hub scripts
  under `src/client/` are buildable.
- Server binds `0.0.0.0:3000` with permissive `cors()` and no host allowlist, so the
  preview proxy host works unchanged (no `BASE44_PREVIEW_MODE` override needed).
- Seeded `Target`/`Taksasi` rows are dated 2026-10. The dashboard aggregates for the
  *current* month, so a later month legitimately shows zeros while Rekap Taksasi and
  Pencarian OTR still show the seeded records.
- `require('child_process')` inside the `/download-apk` route is invalid in this ESM
  module; it is caught and the route returns 404 (no APK asset is committed).
- **`npm ci` cannot work here**: the committed `package-lock.json` is an empty stub
  (`"name": "applet"`, no packages) and aborts with `EUSAGE`. `bun.lock` is the
  authoritative lockfile; use `bun install --frozen-lockfile` (as the compose file
  does) or plain `npm install`.

## Verifying it works

1. `curl -s localhost:3000/health` → JSON with `"status":"ok"`.
2. `curl -s localhost:3000/api/entities/OtrPrice/count` → `{"count":49}` (JSON-store fallback).
3. In the app: "Masuk Cepat Petugas" → dashboard renders, Pencarian OTR shows
   "49 data tersedia", Rekap Taksasi lists 3 deals.
4. There is no test suite; `bunx tsc --noEmit` is the only static check and passes.
