# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-03-08

### Added
- Integrated **NVIDIA NIM** (NVIDIA Inference Microservices) as a primary AI provider.
- Added support for `NVIDIA_API_KEY` with dynamic key rotation in `src/ai/genkit.ts`.
- Implemented `meta/llama-3.2-90b-vision-instruct` for vision-based skin analysis.
- Implemented `nvidia/llama-3.1-nemotron-70b-instruct` for text-based conversational flows.
- Added dynamic key rotation for `GEMINI_API_KEY`.

### Changed
- Migrated all skin diagnosis and skincare routine flows from Google Gemini to NVIDIA NIM models for enhanced performance and accuracy.
- Updated `CatalogInputSchema` to make `platform` optional with a default value of 'Shopee'.
- Optimized AI prompts for better results in Bahasa Indonesia using Llama 3 models.

### Fixed
- Resolved various TypeScript errors across the codebase, including missing exports and incorrect type mappings in chat components.
- Fixed an issue where the `CatalogPage` would fail if the e-commerce platform was not specified.
- Replaced the missing `Soundwave` icon with `AudioLines` in `ChatBubble` to ensure UI stability.
