# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-02-14

### Added
- Integration with **NVIDIA NIM** (NVIDIA AI Enterprise) via `genkitx-openai` plugin.
- Added support for NVIDIA NIM models:
    - `meta/llama-3.2-90b-vision-instruct` (Multimodal/Vision)
    - `nvidia/llama-3.1-nemotron-70b-instruct` (Text-based flows)
- Implemented dynamic API key rotation for both Gemini and NVIDIA NIM providers.
- Added `AudioLines` icon for better UI representation of voice features.

### Changed
- Migrated all core AI flows from Google Gemini models to NVIDIA NIM models for enhanced performance and diagnostic accuracy.
- Updated AI flow prompt structures to be compatible with NVIDIA NIM (using function-based part returns).
- Improved TypeScript typing across the project, including `Message`, `Doctor`, and flow schemas.
- Standardized AI flow interfaces and parameters.

### Fixed
- Fixed several TypeScript errors in `src/app/catalog/page.tsx`, `src/app/chat/[doctor]/page.tsx`, `src/app/onboarding/page.tsx`, `src/lib/types.ts`, `src/components/theme-provider.tsx`, `src/components/chat/ChatBubble.tsx`, and `tailwind.config.ts`.
- Resolved import errors for `ThemeProviderProps` from `next-themes`.
- Fixed missing `platform` parameter in `getCatalogProducts` call.

## [0.1.0] - Initial Release
- Initial version of GlowPilot Copilot.
