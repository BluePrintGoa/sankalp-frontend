# Northstar Health

SvelteKit frontend for the Sankalp Medical Records API. Patient, clinician, appointment, file, and authentication requests are made through the service layer with the backend's cookie-based session.

See [AGENTS.md](AGENTS.md) for the service boundaries and frontend contracts. Backend setup and deployment preparation are documented in `../sankalp-backend/README.md` and `../sankalp-backend/DEPLOYMENT.md`.

## Local Development

Install dependencies and start the local application:

```sh
pnpm install
Copy-Item .env.example .env
pnpm dev
```

Start the API separately from `../sankalp-backend` and set `COOKIE_SECURE=false` in its local `.env` when using plain HTTP. The seeded doctor can sign in as `maya.patel@northstar.health` / `doctor123`; seeded patients use their fixture email and `patient123`. These credentials and records are for local development only.

Run the Svelte/TypeScript checks and production compilation locally:

```sh
pnpm check
pnpm build
```

## Development Data

Run `python -m scripts.seed` in the backend to load demonstration records. Do not use real patient information locally. See the backend deployment checklist before exposing either application publicly.
