# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-03-24

### Added
- Integration with NVIDIA NIM (NVIDIA Infrastructure Microservices) for AI models.
- Support for `openai/meta/llama-3.2-90b-vision-instruct` for multimodal skin diagnosis.
- Support for `openai/nvidia/llama-3.1-nemotron-70b-instruct` for text-based skincare flows.
- Dynamic API key rotation for NVIDIA NIM.

### Changed
- Migrated all primary AI flows from Google Gemini to NVIDIA NIM.
- Refactored `skin-condition-diagnosis-flow` to support multimodal input with NVIDIA models.
- Updated `package.json` with `genkitx-openai` plugin and corrected `zod` version.
- Improved Next.js 15 compatibility by wrapping `useSearchParams` in `Suspense`.
- Replaced `Soundwave` icon with `AudioLines` from `lucide-react`.

### Fixed
- Zod version compatibility issues.
- Missing `<Suspense>` boundary in login page for static generation.
