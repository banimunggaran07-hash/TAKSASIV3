# AGENTS.md — Smart Taksasi V2.1.3 (Base44 sandbox)

Non-obvious things about running this repo here. Manifests/README already cover the rest.

## Run it
- One command: `docker compose -f docker-compose.base44.yml up -d` — three services: `db` (Postgres), one-shot `migrate`, and `web` (host port 3000).
- The app is ONE Node process: `server.ts` (Express + `ws`) serves the SPA (`index.html` + `public/`) and the REST API (`/api/...`) on the same origin. There is no separate frontend/backend split, so no CORS/proxy wiring is needed and the SPA's API base is `window.location.origin`.
- Dev command is the project's own `tsx server.ts`, run as `tsx watch server.ts` for reload. Edits to `server.ts`, `seed_data.ts` or `src/**` are picked up by the watcher; `index.html`/`public/**` are read from disk per request.

## Postgres is required for data to show
- `src/db/index.ts` activates the Postgres/Drizzle path only when all of `SQL_HOST`, `SQL_USER`, `SQL_PASSWORD`, `SQL_DB_NAME` are set. **Do not omit them**: `repo.ts#listEntity` returns `[]` when the DB is unconfigured, and the list routes return that array directly (`if (Array.isArray(rows)) return res.json(rows)`), so the JSON fallback is never reached and every data page renders empty. The README's "Zero-Setup JSON" mode therefore does not actually serve the entity lists.
- Compose therefore ships `db` (postgres:16-alpine, creds `smart` / `smart_dev_password` / `smart_taksasi` — local infra values, not secrets) and a one-shot `migrate` service that runs `npx drizzle-kit push --force --config=src/db/drizzle.config.ts` to create the tables from `src/db/schema.ts`. `web` waits for it, then seeds via `seedInitialDataIfEmpty()` on boot.
- `src/db/drizzle.config.ts` reads `SQL_ADMIN_USER`/`SQL_ADMIN_PASSWORD` (not `SQL_USER`/`SQL_PASSWORD`), so `migrate` sets both spellings.
- Writes are dual: the server inserts into Postgres *and* unshifts into `data_store.json` (a repo file) — so API writes still rewrite that file. Keep test records cleaned up so app data does not end up in commits.
- `Notification` is not in `repo.ts`'s `entityTableMap`, so those records always land in `data_store.json`. Merely opening the SPA therefore shows up as a `data_store.json` change (generated notifications) — expected, not a bug.

## Auth / external services
- The UI is behind `public/assets/auth-gatekeeper.bundle.js` (source: `src/client/auth-gatekeeper.ts`). `#root` stays hidden until it grants access.
- `firebase-applet-config.json` ships with a **redacted** `apiKey` (`"******"`), so Google / email-password sign-in cannot work here. The gatekeeper's own **"Masuk Cepat Petugas (Bani Munggaran)"** button creates a local demo session (`POST /api/auth/session`) with no Firebase call and unlocks the whole app — use it to verify signed-in screens.
- Backend token checks in `src/middleware/auth.ts` are `optionalAuth` on the data routes, so a demo/absent token still gets data (`/api/users/me` returns the guest profile).
- No environment variable or secret is required to boot. `firebase-admin` is initialized with `projectId` only, and every verification failure is caught, so its absence is non-fatal.

## Gotchas
- `PORT`/`HOST` are hardcoded in `server.ts` (3000 / 0.0.0.0); the compose `environment:` entries are documentation, not the source of truth.
- `package-lock.json` is a stub from another project (`"name": "applet"`), so npm must run with `--no-package-lock` to avoid rewriting it. The real lockfile is `bun.lock`.
- `server.ts` APK self-heal shells out to `python3` (not present in the image), so `/SmartTaksasi.apk` returns 404 unless `public/SmartTaksasi.apk` is extracted manually from `SMART_TAKSASI_BASE_APK.zip`.
- `npm run build` only regenerates `public/assets/auth-gatekeeper.bundle.js` from `src/client/`; the main SPA bundle (`public/assets/index-*.js`) is a committed build artifact with no source in this repo — do not look for its sources.
