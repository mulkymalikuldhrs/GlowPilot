# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2024-05-20

### Added
- Integration with **NVIDIA NIM** (NVIDIA Inference Microservices) for enhanced AI capabilities.
- Support for `openai/meta/llama-3.2-90b-vision-instruct` in vision-based dermatology analysis.
- Support for `openai/nvidia/llama-3.1-nemotron-70b-instruct` in text-based flows.
- Dynamic API key rotation for both Gemini and NVIDIA NIM providers.
- Environment variable `NVIDIA_API_KEY` for NIM authentication.
- Automatic installation of `genkitx-openai` plugin.

### Changed
- Migrated all AI flows to utilize NVIDIA NIM models by default (except TTS).
- Upgraded project to **Tailwind CSS v4** with native PostCSS support.
- Updated `next-themes` integration for better compatibility.
- Improved TypeScript safety across the codebase, particularly in chat and catalog components.
- Wrapped search param usage in `Suspense` boundaries for Next.js 15 compatibility.

### Fixed
- Fixed build-time errors related to static generation and missing environment variables.
- Resolved various TypeScript type mismatches in flow outputs and UI components.
- Updated icon usage to `AudioLines` from `lucide-react`.

## [0.1.0] - 2024-05-15

### Added
- Initial release of GlowPilot Copilot.
- AI dermatology analysis and skincare routine generation.
- Product catalog with affiliate link generation.
- Voice chat capabilities (STT + TTS).
- User profile and progress tracking.
- Light/Dark mode support.
