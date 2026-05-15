# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2024-05-20

### Added
- Integrated **NVIDIA NIM** (NVIDIA Inference Microservices) for enhanced AI capabilities.
- Added support for **Llama 3.1 70B Instruct** (via NVIDIA NIM) for all text-based diagnosis and onboarding flows.
- Added support for **Llama 3.2 90B Vision Instruct** (via NVIDIA NIM) for multimodal skin condition diagnosis.
- Implemented dynamic API key rotation for NVIDIA and Gemini keys.
- Integrated **Tailwind CSS 4** for faster builds and a modern styling engine.

### Changed
- Migrated Genkit flows from Google Gemini to NVIDIA NIM models.
- Upgraded project dependencies including `genkitx-openai`, `zod`, and `lucide-react`.
- Refactored `src/ai/genkit.ts` for multi-provider support.
- Updated UI components to be compatible with Tailwind 4.
- Improved TypeScript type safety across the application.

### Fixed
- Fixed missing `platform` property in catalog product fetching.
- Resolved icon resolution issues in `lucide-react`.
- Fixed `ThemeProviderProps` resolution errors.
- Improved component hydration and suspense handling.

## [1.0.0] - Initial Release
- AI Dermatologist Chat & Voice.
- Product Scraper and Catalog.
- Glassmorphism & Aurora UI.
