# Northstar Health

Phase 1 frontend for a centralized medical patient record workspace. Patient, clinician, schedule, and authentication data are simulated in browser memory; changes reset when the application reloads.

See [AGENTS.md](AGENTS.md) for the architecture, service boundaries, schemas, and Phase 2 requirements.

## Local Development

Install dependencies and start the local application:

```sh
pnpm install
pnpm dev
```

Run the Svelte/TypeScript checks and production compilation locally:

```sh
pnpm check
pnpm build
```

## Phase 1 Limitations

- The role selector is mock UI state, not authentication or authorization.
- Patient records and uploads are not persisted to a database or server.
- QR images use the external QR Server API and encode the patient ID only.
- Deployment workflows are paused. Do not add deployment steps or configuration until Phase 2, including the backend and real authentication, is complete.
