# Northstar Health Frontend Guide

## Phase 1 Scope

This repository is a frontend-first SvelteKit application. All records and authentication are mock data held in browser memory. There is no backend, persistent database, or real authentication in this phase. Do not treat the sample records as real patient information.

## Frontend Architecture

- `src/routes/+page.svelte` is the current workspace route. It contains the dashboard views for overview, patient records, schedule, and profiles. Shared data access must go through service functions, not fixture imports or direct browser storage access from the UI.
- `src/lib/services/models.ts` defines the shared TypeScript contracts.
- `src/lib/services/mock-data.ts` contains the Phase 1 fixtures.
- `src/lib/services/mock-delay.ts` simulates asynchronous network latency and clone-on-read behavior.
- `src/lib/services/patient-service.ts` owns patient lookup and updates plus attached-file metadata.
- `src/lib/services/doctor-service.ts` owns clinician profile reads and updates.
- `src/lib/services/appointment-service.ts` owns the daily schedule and appointment edits.
- `src/lib/services/auth-service.ts` owns the mock role switch (`doctor` or `patient`).

The route uses Svelte 5 runes (`$state`, `$derived`) for reactive UI state and `onMount` for client-side initial loading. Keep future UI changes behind the same service interfaces. When a backend is introduced, replace the implementation inside `src/lib/services/` with API/database calls while preserving the service method contracts; components should not need to know the persistence mechanism.

## Mock Service Strategy

Service methods return promises and simulate latency with `mockDelay`. They keep mutable mock records in module-local memory for the current browser session. Reloading the app resets changes. Do not add direct fixture imports to route components. Current entry points include `PatientService.getAll/getById/update/getFiles/addFile/removeFile`, `DoctorService.getProfile/updateProfile`, `AppointmentService.getDaily/update`, and `AuthService.getRole/setRole`.

File uploads use `URL.createObjectURL` and service-held metadata only; no file is uploaded or persisted remotely. Revoke object URLs when files are removed. Patient QR images are rendered through the free QR Server endpoint and encode only the unique patient ID, not the full health record. The endpoint requires a network connection and is a Phase 1 convenience, not an access-control mechanism.

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

## Deployment Hold

Deployment workflows and hosting configuration are intentionally paused. Do not add Vercel, GitHub Pages, or other deployment instructions/configuration until Phase 2 (backend and real authentication) is fully implemented and reviewed.