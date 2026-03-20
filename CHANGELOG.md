# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-05-23

### Added
- Integrated **NVIDIA NIM** for improved AI-powered skin condition diagnosis and recommendations.
- Implemented **dynamic API key rotation** for both Gemini and NVIDIA plugins in Genkit to ensure high availability.
- Support for `openai/meta/llama-3.2-90b-vision-instruct` for superior multimodal skin condition analysis.
- Support for `openai/nvidia/llama-3.1-nemotron-70b-instruct` for fast and accurate text-based skincare flows.
- Added `genkitx-openai` and `@tailwindcss/postcss` plugins to the project dependencies.

### Changed
- Migrated all primary AI flows (`skin-condition-diagnosis`, `onboarding`, `anti-aging`, `skin-nutrition`, `catalog`, `conversational-diagnosis`, `product-comparison`) to use NVIDIA NIM models.
- Updated Genkit prompt definitions to use dynamic functions for better compatibility with NVIDIA NIM and type safety.
- **Upgraded to Tailwind CSS 4** for a more modern and performant styling architecture.
- Improved TypeScript type safety across the application, especially in the chat and onboarding components.
- Standardized UI icons, replacing deprecated `Soundwave` with `AudioLines` from `lucide-react`.

### Fixed
- Resolved multiple TypeScript errors related to missing types, incorrect imports, and schema mismatches.
- Corrected `next-themes` type imports for Next.js 15 compatibility.
- Fixed product catalog search parameters to ensure consistent results.
- Fixed Tailwind CSS compilation errors and PostCSS configuration for version 4.
