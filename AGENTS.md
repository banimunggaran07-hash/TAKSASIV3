# AGENTS.md

Smart Taksasi V2.1.3 — self-contained Node.js/Express + SPA app. This file records
only the non-obvious things needed to run and verify it here.

## Running in the sandbox

```bash
docker compose -f docker-compose.base44.yml up -d --build   # first boot installs deps (~1-2 min)
docker compose -f docker-compose.base44.yml ps
docker compose -f docker-compose.base44.yml logs -f web
curl -s localhost:3000/health
```

Single service, single origin, host port 3000. `tsx watch` restarts the server on
edits to `server.ts` and `src/**` — no rebuild needed. `node_modules` lives in a
named volume (`--no-package-lock`, because the repo's real lockfile is `bun.lock`
and the committed `package-lock.json` is an empty stub).

## Non-obvious points

- **No database or credentials are required.** With `SQL_HOST`/`SQL_USER`/`SQL_PASSWORD`/`SQL_DB_NAME`
  unset, `src/db/repo.ts` falls back to the JSON store `data_store.json` in the repo
  root (seeded from `seed_data.ts` when missing). Cloud SQL is opt-in only.
- **`data_store.json` is the live database and it is committed** to the repo. Any write
  through the UI/API rewrites that file, so verification that creates records must delete
  them again (or the diff is not empty).
- **Do NOT run `npm run build`.** It regenerates `public/assets/auth-gatekeeper.bundle.js`
  from `src/client/auth-gatekeeper.ts`; the committed bundle carries the working Firebase
  web config, while `firebase-applet-config.json` in the repo has a masked `apiKey`.
  The main SPA bundle (`public/assets/index-r5o_qhl4.js`) has no source in this repo and
  is served as-is.
- **`firebase-admin` initialises with a projectId only** (no service account), so ID-token
  verification against real Firebase fails; the server accepts locally-registered sessions
  via `POST /api/auth/session`. The login screen's **"Masuk Cepat Petugas"** button uses
  that path and needs no credentials at all.
- Server binds `0.0.0.0:3000` and uses permissive `cors()`; no host/origin allowlist, so
  the preview proxy host works unchanged.
- **Every read route falls back to the JSON store when the query returns nothing** (the
  `/api/.../entities/:entity` list, `count` and `:id` routes). This is what makes the
  no-database mode show seeded data; without it the UI renders all zeros.

## Verifying it works

1. `curl -s localhost:3000/health` → JSON with `"status":"ok"`.
2. Sign in with "Masuk Cepat Petugas" (local session, no Firebase needed) and confirm the
   dashboard renders with seeded data.
3. Spot-check the API directly, e.g. `curl -s localhost:3000/api/entities/OtrPrice | head`.

There is no test suite in this repo; `npm run lint` only runs `tsc --noEmit` (and ignores
errors).
