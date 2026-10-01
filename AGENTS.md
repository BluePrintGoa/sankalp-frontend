# Northstar Health Frontend Guide

## Current Scope

This SvelteKit application integrates with the FastAPI backend in `../sankalp-backend`. Authentication, records, schedules, QR codes, and medical files are loaded through the service layer. The demo records remain synthetic and must not be replaced with real patient information in local development.

## Frontend Architecture

- `src/routes/+page.svelte` is the current workspace route. It contains the dashboard views for overview, patient records, schedule, and profiles. Shared data access must go through service functions, not fixture imports or direct browser storage access from the UI.
- `src/lib/services/models.ts` defines the shared TypeScript contracts.
- `src/lib/services/api-client.ts` owns API base URL resolution, cookie credentials, CSRF headers, and access-token refresh.
- `src/lib/services/patient-service.ts` owns patient lookup and updates plus attached-file metadata.
- `src/lib/services/doctor-service.ts` owns clinician profile reads and updates.
- `src/lib/services/appointment-service.ts` owns the daily schedule and appointment edits.
- `src/lib/services/auth-service.ts` owns the mock role switch (`doctor` or `patient`).

The route uses Svelte 5 runes (`$state`, `$derived`) for reactive UI state and `onMount` for client-side session loading. Keep data access behind the service interfaces and never use UI state as an authorization boundary.

## Service Contracts

Service methods return promises and map to authenticated API requests. File uploads use multipart `FormData`; file URLs point to the protected API download endpoint. QR images are fetched from the API and encode only the patient ID. `AuthService` derives role from `/auth/me`; the frontend must never switch roles locally or embed account credentials.

## Data Schema

- `Patient`: `id`, `name`, `dateOfBirth`, `sex`, `bloodGroup`, `heightCm`, `weightKg`, `phone`, `email`, `conditions[]`, `allergies[]`, `medications[]`, and `lastVisit`.
- `Doctor`: `id`, `name`, `specialty`, `license`, `phone`, `email`, `clinic`, `workingDays[]`, `startTime`, and `endTime`.
- `Appointment`: `id`, `patientId`, `patientName`, `time`, `durationMinutes`, `type`, and `status` (`Scheduled`, `Checked in`, or `Completed`).
- `MedicalFile`: `id`, `name`, `type`, `size`, `url`, and `addedAt`. The URL is a temporary local object URL in Phase 1.
- `Role`: `doctor` or `patient`. The mock patient session is associated with `PT-2048`.

Keep IDs stable and treat them as opaque identifiers. Phase 2 must define server-side authorization and validate every patient/doctor relationship; hiding controls in the frontend is only a demo permission boundary.

## UI Permission Rules

- Doctor preview can search records, edit conditions/allergies/medications, upload/remove files, view a QR code, edit appointment time/status, and edit clinician availability.
- Patient preview is view-only for the patient record and has no schedule/record mutation controls. The role selector is a Phase 1 mock and is not authentication.

## Local Development

Use `pnpm install`, `pnpm check`, `pnpm build`, and `pnpm dev` from the repository root.

## Environment

Set `PUBLIC_API_BASE_URL` in the frontend `.env` file. For local HTTP development, set `COOKIE_SECURE=false` only in the backend's local `.env`. Before deployment, follow `../sankalp-backend/DEPLOYMENT.md`; this API is not yet certified or configured for real patient data.