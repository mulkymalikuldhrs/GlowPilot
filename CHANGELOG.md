# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2024-05-20
### Added
- Integrated NVIDIA NIM AI core via `genkitx-openai` plugin.
- Added support for NVIDIA NIM text and vision models.
- Implemented API key rotation for both Gemini and NVIDIA NIM providers.

### Changed
- Upgraded AI flows to use high-performance NVIDIA NIM models:
  - Text-based flows: `openai/nvidia/llama-3.1-nemotron-70b-instruct`
  - Vision-based flows: `openai/meta/llama-3.2-90b-vision-instruct`
- Updated `ai.definePrompt` configuration in all flows for better compatibility with Genkit and NVIDIA NIM.
- Refactored `LoginPage` to include `<Suspense>` boundary for Next.js 15 compatibility.

### Fixed
- Potential build errors related to `useSearchParams()` in static generation.
