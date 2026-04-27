# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-03-24

### Added
- Integrated NVIDIA NIM AI models for enhanced skin analysis and conversational capabilities.
- Added `genkitx-openai` plugin to support NVIDIA NIM.
- Implemented dynamic API key rotation for `NVIDIA_API_KEY`.

### Changed
- Upgraded `skin-condition-diagnosis` flow to use `meta/llama-3.2-90b-vision-instruct` (multimodal).
- Upgraded conversational and specialized flows to use `nvidia/llama-3.1-nemotron-70b-instruct`.
- Wrapped `LoginPage` in `<Suspense>` for Next.js 15 compatibility.
- Replaced `Soundwave` icon with `AudioLines` in `ChatBubble` component.
- Updated `ThemeProviderProps` import to use the top-level `next-themes` package.

### Security
- Added support for multiple `NVIDIA_API_KEY`s and `GEMINI_API_KEY`s via comma-separated environment variables.
