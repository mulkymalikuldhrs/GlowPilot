# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-02-14

### Added
- Integration with **NVIDIA NIM** (NVIDIA Inference Microservices) using `genkitx-openai`.
- Support for **Meta Llama 3.2 90B Vision Instruct** for skin condition diagnosis with photo analysis.
- Support for **NVIDIA Llama 3.1 Nemotron 70B Instruct** for all text-based AI flows (anti-aging, catalog, conversational diagnosis, onboarding, nutrition).
- Dynamic API key rotation support for Gemini and NVIDIA API keys.
- `CHANGELOG.md` to track project evolution.

### Changed
- Upgraded the AI core to use NVIDIA's state-of-the-art models for improved accuracy and faster response times.
- Refactored AI prompt formats to support multimodal inputs more effectively.
- Updated UI icons for better compatibility and modern look (switched `Soundwave` to `AudioLines`).
- Improved TypeScript type safety across the application.
- Standardized AI flow output handling.
- **Upgraded to Tailwind CSS 4** for a more modern and performant styling engine.

### Fixed
- Various TypeScript resolution errors in frontend components.
- Path resolution for `next-themes` types.
- Missing `platform` parameter in catalog product fetching.
- Duplicated avatar rendering in `ChatBubble.tsx`.

## [0.1.0] - 2024-05-01

### Added
- Initial release of GlowPilot Copilot.
- AI Dermatologist Chat (Gemini 1.5 Flash).
- Product Catalog & Affiliate Link Generator.
- Voice Chat (STT + TTS).
- User Onboarding & Profile Management.
- Skin Condition Diagnosis via Photo.
- Skincare Routine Progress Tracking.
