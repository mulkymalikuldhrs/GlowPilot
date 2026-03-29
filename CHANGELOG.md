# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-03-30

### Added
- Integrated **NVIDIA NIM** (NVIDIA Inference Microservices) for enhanced AI performance.
- Configured dynamic API key rotation for both Google Gemini and NVIDIA NIM.
- Added support for multimodal input using `openai/meta/llama-3.2-90b-vision-instruct`.
- Updated all text-based flows to use `openai/nvidia/llama-3.1-nemotron-70b-instruct`.

### Changed
- Upgraded to **Tailwind CSS 4.0** with enhanced performance and modern features.
- Replaced the deprecated `Soundwave` icon with the updated `AudioLines` icon from `lucide-react`.
- Optimized `ThemeProvider` configuration by updating its type import from `next-themes`.
- Standardized AI flow model definitions across the application.
- Improved AI flow prompts for better Indonesian language responses.

### Fixed
- Fixed TypeScript errors related to dynamic Genkit plugin configurations.
- Corrected a schema mismatch in `catalog-flow.ts` that caused build-time errors.
- Improved prompt template compatibility with Genkit types in `catalog-flow.ts`.

## [0.1.0] - Initial Release
- Initial release of GlowPilot Copilot.
