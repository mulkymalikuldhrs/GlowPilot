# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2024-05-22

### Added
- Integrated NVIDIA NIM for AI flows using `genkitx-openai`.
- Configured dynamic API key rotation for both Google AI and NVIDIA NIM.
- Added comprehensive TypeScript audit and fixed several critical type errors across the application.
- Improved product catalog tool to be more robust with platform requirements.

### Changed
- Migrated vision-based flows (Diagnosis) to `openai/meta/llama-3.2-90b-vision-instruct`.
- Migrated text-based flows (Onboarding, Comparison, Nutrition, Anti-Aging) to `openai/nvidia/llama-3.1-nemotron-70b-instruct`.
- Refactored `src/ai/genkit.ts` for better extensibility and security.
- Replaced `Soundwave` icon with `AudioLines` from `lucide-react`.
- Updated `README.md` with new technology stack and setup instructions.

### Fixed
- Resolved multiple TypeScript errors in `src/app/catalog/page.tsx`, `src/app/chat/[doctor]/page.tsx`, and `src/app/onboarding/page.tsx`.
- Corrected theme provider type issues with `next-themes`.
- Fixed missing `platform` parameter in `getCatalogProducts` calls.

## [0.1.0] - 2024-05-20
### Initial Release
- Core AI dermatology platform functionality.
- Next.js 15, Genkit, and Firebase integration.
