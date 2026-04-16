# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2025-03-24

### Added
- Integrated NVIDIA NIM for AI flows.
- Added support for `meta/llama-3.2-90b-vision-instruct` in skin diagnosis.
- Added support for `nvidia/llama-3.1-nemotron-70b-instruct` in text-based conversational flows.
- Implemented dynamic API key rotation for NVIDIA and Gemini keys.
- Added automatic `contentType` extraction for image processing in Genkit.

### Changed
- Migrated all primary AI flows from Google AI to NVIDIA NIM for better performance and specialization.
- Updated `genkitx-openai` plugin to the latest version.
- Improved TypeScript type safety across the application.
- Refactored `getApiKey` utility to support multiple environment variables.
- Updated `AudioLines` icon for better UI consistency in `ChatBubble`.

### Fixed
- Resolved multiple TypeScript compilation errors in `src/app/chat/[doctor]/page.tsx` and `src/app/onboarding/page.tsx`.
- Fixed missing `platform` argument in catalog product retrieval.
- Corrected `ThemeProviderProps` import source.
- Fixed indexing issues with dynamic doctor slugs.

### Infrastructure
- Updated `README.md` with new tech stack and configuration details.
