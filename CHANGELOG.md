# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-03-24

### Added
- Integrated NVIDIA NIM AI models for enhanced performance and accuracy.
- Added `genkitx-openai` plugin to support NVIDIA NIM.
- Implemented dynamic API key rotation for `NVIDIA_API_KEY` and `GEMINI_API_KEY`.

### Changed
- Upgraded text-based flows to use `openai/nvidia/llama-3.1-nemotron-70b-instruct`.
- Upgraded vision-based flows to use `openai/meta/llama-3.2-90b-vision-instruct`.
- Updated `tts-flow.ts` to use `googleai/gemini-2.0-flash-preview-tts`.
- Improved TypeScript type safety across the application.
- Replaced `Soundwave` icon with `AudioLines` from `lucide-react`.

### Fixed
- Resolved multiple TypeScript compilation errors in AI flows and UI components.
- Fixed missing `platform` parameter in catalog product fetching.
- Corrected `ThemeProviderProps` import from `next-themes`.
- Fixed Tailwind CSS 4 configuration compatibility.
