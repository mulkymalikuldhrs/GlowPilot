# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-03-24

### Added
- Integrated NVIDIA NIM AI models for better performance and diagnosis accuracy.
- Added `genkitx-openai` plugin to support NVIDIA NIM.
- Added detailed AI flows for anti-aging, catalog, conversational diagnosis, onboarding, product comparison, skin condition diagnosis, and skin nutrition.

### Changed
- Switched from Google Gemini to NVIDIA NIM models:
  - Vision: `openai/meta/llama-3.2-90b-vision-instruct`
  - Text: `openai/nvidia/llama-3.1-nemotron-70b-instruct`
- Updated `zod` to `^3.24.1` for better schema validation.
- Improved `getApiKey` utility to support random key rotation for both Gemini and NVIDIA.
- Updated `postcss.config.mjs` for Tailwind CSS 4 compatibility using `@tailwindcss/postcss`.
- Replaced `Soundwave` icon with `AudioLines` from `lucide-react`.

### Fixed
- Wrapped `LoginPage` in `<Suspense>` to fix Next.js 15 build errors related to `useSearchParams()`.
- Fixed multiple TypeScript errors across AI flows and React components.
- Fixed product catalog fetching in `CatalogPage` to include required `platform` parameter.
- Corrected type imports for `Message` in `ChatBubble.tsx`.

## [0.1.0] - Initial Release
- Basic AI dermatology platform features.
- Firebase integration.
- Glassmorphism UI.
