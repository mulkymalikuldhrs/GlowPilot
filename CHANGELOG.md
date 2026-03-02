# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-05-22

### Added
- Integrated **NVIDIA NIM** (API Catalog) via Genkit OpenAI plugin.
- Added support for `NVIDIA_API_KEY` with dynamic key rotation in `src/ai/genkit.ts`.
- Switched core AI flows to use `openai/nvidia/llama-3.1-nemotron-70b-instruct` for enhanced diagnostic and recommendation capabilities.

### Changed
- Updated `src/ai/flows/` (anti-aging, onboarding, skin-condition-diagnosis, etc.) to utilize NVIDIA NIM models.
- Refactored `getApiKey` utility to support multiple API providers (Gemini and NVIDIA).

### Fixed
- Resolved multiple TypeScript compilation errors across the project.
- Fixed prop type mismatches in `ChatWindow` and `ChatBubble` components.
- Corrected UI component issues in `calendar.tsx` and `chart.tsx` to align with the latest library versions.
- Fixed `next-themes` type imports in `theme-provider.tsx`.

## [0.1.0] - 2025-05-20
- Initial release of GlowPilot Copilot.
