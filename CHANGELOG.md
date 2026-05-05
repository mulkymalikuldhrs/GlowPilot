# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-03-24

### Added
- Integration with NVIDIA NIM for AI flows.
- Generic `getApiKey` utility in `src/ai/genkit.ts` to support dynamic key rotation for both Google AI and NVIDIA (OpenAI plugin).
- `@tailwindcss/postcss` for Tailwind CSS 4 compatibility.

### Changed
- Switched all AI flows (except TTS) to NVIDIA NIM models:
    - Text-based flows now use `openai/nvidia/llama-3.1-nemotron-70b-instruct`.
    - Vision-based flows (Skin Diagnosis and Conversational Diagnosis) now use `openai/meta/llama-3.2-90b-vision-instruct`.
- Updated `src/ai/genkit.ts` to use `genkitx-openai` for NVIDIA NIM integration.
- Modernized `src/app/globals.css` to use Tailwind CSS 4 `@theme` and `@import` directives.
- Improved TypeScript type safety across several components and flows.
- Wrapped `LoginPage` in a `Suspense` boundary to handle `useSearchParams()` in Next.js 15.
- Replaced `Soundwave` icon with `AudioLines` from `lucide-react`.

### Fixed
- TypeScript errors in `src/ai/genkit.ts`, `src/ai/flows/catalog-flow.ts`, and other components.
- Build error in `LoginPage` due to missing `Suspense` boundary.
- PostCSS configuration for Tailwind CSS 4.
