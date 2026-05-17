# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Integrated **NVIDIA NIM API** for high-performance AI models.
- Support for `nvidia/llama-3.1-nemotron-70b-instruct` (text) and `meta/llama-3.2-90b-vision-instruct` (vision) models.
- New `CHANGELOG.md` to track project evolution.
- Added `@tailwindcss/postcss`, `@genkit-ai/firebase`, `@opentelemetry/exporter-jaeger`, and `@opentelemetry/winston-transport` for production stability.

### Changed
- Migrated core AI flows from Google Gemini to **NVIDIA NIM** models for specialized performance.
- Upgraded to **Tailwind CSS 4** for modern styling and improved performance.
- Refactored `src/ai/genkit.ts` to support dynamic API key rotation and NVIDIA plugin configuration.
- Updated `src/app/login/page.tsx` with `<Suspense>` for Next.js 15 compatibility.
- Replaced `Soundwave` icon with `AudioLines` from `lucide-react`.

### Fixed
- Resolved build-time errors related to Tailwind CSS 4 syntax and PostCSS configuration.
- Fixed missing exports and type errors in AI flows and page components.
- Corrected search params usage in client components to meet Next.js 15 requirements.
- Fixed model selection logic to use vision models only for multi-modal prompts.
