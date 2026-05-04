# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-03-24

### Added
- Integrated NVIDIA NIM AI models for enhanced performance and accuracy.
- Added `genkitx-openai` plugin to support NVIDIA NIM integration.
- Added dynamic API key rotation for both Google AI and NVIDIA NIM.
- Implemented Tailwind CSS 4 for modernized styling and performance.
- Added `onboardUser` alias in onboarding flows for better compatibility.

### Changed
- Upgraded vision-based flows to `openai/meta/llama-3.2-90b-vision-instruct`.
- Upgraded text-based flows to `openai/nvidia/llama-3.1-nemotron-70b-instruct`.
- Updated TTS flow to `googleai/gemini-2.0-flash-preview-tts`.
- Replaced `Soundwave` icon with `AudioLines` from `lucide-react`.
- Updated `ThemeProviderProps` import for compatibility with latest `next-themes`.
- Wrapped `LoginPage` in `<Suspense>` boundary to comply with Next.js 15 requirements.

### Fixed
- Downgraded `zod` to `^3.24.1` to resolve dependency version conflicts.
- Fixed PostCSS configuration for Tailwind CSS 4 compatibility.
- Resolved various TypeScript and build warnings.
