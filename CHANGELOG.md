# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-05-22

### Added
- Integrated **NVIDIA NIM** (NVIDIA Inference Microservices) for improved AI inference performance.
- Support for **Multimodal Diagnosis** using `llama-3.2-90b-vision-instruct`.
- Advanced text generation using `llama-3.1-nemotron-70b-instruct`.
- Dynamic API key rotation for both Google AI and NVIDIA NIM.
- New `.env` configuration support for `NVIDIA_API_KEY`.

### Changed
- Migrated core AI flows (Diagnosis, Onboarding, Catalog, etc.) from Gemini to NVIDIA NIM models.
- Upgraded `genkitx-openai` plugin to support OpenAI-compatible NVIDIA endpoints.
- Updated `ChatBubble` component to use `AudioLines` icon for better UI consistency.
- Standardized `ThemeProvider` imports and fixed various TypeScript type resolution issues.

### Fixed
- Resolved circular dependencies and type visibility issues in AI flows.
- Fixed `catalog-flow` dynamic prompt resolution.
- Corrected `CatalogPage` parameter passing for product queries.
- Fixed `tailwind.config.ts` darkMode strategy syntax.
