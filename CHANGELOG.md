# Changelog

## [1.1.0] - 2024-05-20

### Added
- Integrated **NVIDIA NIM** as the primary AI provider for all dermatology flows.
- Added support for `openai/nvidia/llama-3.1-nemotron-70b-instruct` for text-based reasoning.
- Added support for `openai/meta/llama-3.2-90b-vision-instruct` for multimodal skin analysis.
- Implemented dynamic API key rotation for both Google AI and NVIDIA plugins in Genkit.
- Added `genkitx-openai` plugin to support NVIDIA NIM.

### Fixed
- Resolved multiple TypeScript errors across the codebase.
- Fixed an issue where the `platform` parameter was missing in `getCatalogProducts` calls.
- Updated `ThemeProvider` to use the correct `next-themes` import path.
- Fixed a bug in `catalog-flow.ts` where the prompt function returned a string instead of an array of parts.
- Corrected indexing issues in `DoctorChatPage` with dynamic doctor slugs.
- Replaced missing `Soundwave` icon with `AudioLines` in chat bubbles.

### Changed
- Migrated all primary AI models from Google AI to NVIDIA NIM for better performance and specialization.
- Updated `README.md` with the latest feature set and integration details.
- Refactored `getApiKey` utility to support generic environment variable retrieval with rotation.
