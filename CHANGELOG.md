# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-05-22

### Added
- Integration with **NVIDIA NIM API** for enhanced AI capabilities.
- Added support for NVIDIA model rotation and dynamic API key management.
- Registered `meta/llama-3.2-90b-vision-instruct` for vision-based skin diagnosis.
- Registered `nvidia/llama-3.1-nemotron-70b-instruct` for general text-based skincare flows.

### Changed
- Upgraded all primary AI flows to utilize NVIDIA NIM models.
- Updated `Skin Condition Diagnosis` flow to use Llama 3.2 90B Vision.
- Updated `Anti-Aging`, `Catalog`, `Conversational Diagnosis`, `Onboarding`, `Product Comparison`, and `Skin Nutrition` flows to use Llama 3.1 Nemotron 70B.
- Refined `Catalog` flow prompt handling for better compatibility with Genkit types.
- Switched to `AudioLines` icon in `ChatBubble` for better compatibility.

### Fixed
- Multiple TypeScript type errors in chat pages, onboarding, and catalog pages.
- Resolved `next-themes` type import issues.
- Fixed `tailwind.config.ts` dark mode configuration.
- Removed broken Supabase type exports.
- Improved error handling in `genkit.ts` for environment variables.
