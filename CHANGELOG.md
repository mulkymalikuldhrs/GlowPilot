# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2024-03-20

### Added
- Integrated NVIDIA NIM AI models via `genkitx-openai` plugin.
- Dynamic API key rotation for Gemini and NVIDIA NIM.
- Support for `llama-3.1-nemotron-70b-instruct` (text) and `llama-3.2-90b-vision-instruct` (vision) models.

### Changed
- Migrated all AI flows (diagnosis, anti-aging, catalog, onboarding, comparison, nutrition) to NVIDIA NIM.
- Updated Genkit prompt definitions to use part arrays for better compatibility with multimodal models.
- Replaced `Soundwave` icon with `AudioLines` in chat UI for better compatibility with installed `lucide-react` version.
- Updated `ThemeProvider` to use the correct `next-themes` import.

### Fixed
- Fixed TypeScript errors in AI flow calls and component props.
- Corrected missing parameters in `getCatalogProducts` call.
- Improved type safety for doctor slugs in chat pages.
