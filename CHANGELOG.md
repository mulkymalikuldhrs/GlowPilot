# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-05-15

### Added
- Integrated NVIDIA NIM (NVIDIA Inference Microservices) models for enhanced AI capabilities.
- Added `genkitx-openai` plugin to support NVIDIA NIM integration.
- Registered `nvidia/llama-3.1-nemotron-70b-instruct` for text-based flows.
- Registered `meta/llama-3.2-90b-vision-instruct` for vision-based flows.
- Implemented dynamic API key rotation for both Gemini and NVIDIA.
- Added `@opentelemetry` packages for better observability and production stability.

### Changed
- Migrated all AI flows (Diagnosis, Onboarding, Anti-Aging, Nutrition, Catalog, Comparison) to use NVIDIA NIM models.
- Updated vision-based prompts to dynamically extract `contentType` from Data URIs.
- Upgraded `zod` to version `3.24.1` for improved type safety and stability.
- Updated `ThemeProvider` to use type-only imports for `next-themes` compatibility.
- Refactored `globals.css` to use Tailwind CSS 4 custom variants for dark mode.
- Replaced `Soundwave` icon with `AudioLines` in chat UI.
- Improved TypeScript safety across various components (Catalog, Onboarding, Doctor Chat).
- Wrapped search-params dependent components in `Suspense` for Next.js 15 compatibility.

### Fixed
- Fixed missing `platform` parameter in `getCatalogProducts` calls.
- Resolved TypeScript assignment errors in `genkit.ts` by using appropriate type casting.
- Fixed `darkMode` configuration in `tailwind.config.ts`.
- Corrected `.gitignore` to prevent committing log files.
