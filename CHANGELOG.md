# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-03-20

### Added
- Integration with NVIDIA NIM (NVIDIA Inference Microservices).
- `CHANGELOG.md` for tracking project history.
- Dynamic API key rotation for NVIDIA NIM.

### Changed
- Switched AI models to NVIDIA NIM:
    - Primary Diagnosis: `openai/meta/llama-3.2-90b-vision-instruct` (Vision support).
    - Text flows (Onboarding, Catalog, etc.): `openai/nvidia/llama-3.1-nemotron-70b-instruct`.
- Upgraded `genkitx-openai` to version `0.30.0`.
- Refactored all Genkit prompts to use the function format for better type safety and dynamic parts.
- Improved Next.js 15 compatibility by wrapping `useSearchParams` components in `<Suspense>`.
- Updated UI icons: Switched to `AudioLines` from `lucide-react`.

### Fixed
- TypeScript errors related to `doctorSlug` indexing.
- Missing `platform` parameter in catalog flow calls.
- `ThemeProvider` type import resolution.
- `darkMode` configuration in `tailwind.config.ts`.
