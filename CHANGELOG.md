# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-05-21

### Added
- Integration with **NVIDIA NIM** (NVIDIA Inference Microservices).
- Support for **Llama 3.1 Nemotron 70B** for text-based conversational flows.
- Support for **Llama 3.2 90B Vision** for skin condition diagnosis using images.
- New `genkitx-openai` plugin to handle NVIDIA NIM API calls.
- Automated API key rotation support for `NVIDIA_API_KEY`.
- `<Suspense>` boundaries for `useSearchParams()` in compliance with Next.js 15 requirements.
- `AudioLines` icon for better UI representation of audio features.

### Changed
- Migrated AI model from Google Gemini to NVIDIA NIM for core flows (except TTS).
- Updated `ThemeProvider` to use direct types from `next-themes`.
- Improved catalog flow to always specify a default platform (Shopee).
- Refactored `getApiKey` utility to support multiple providers (Google and NVIDIA).
- Updated `tailwind.config.ts` to use string-based `darkMode`.

### Fixed
- TypeScript errors in doctor chat pages regarding indexing and missing exports.
- Build issues related to Next.js 15 static generation requirements.
- Icon name mismatch for voice-related features.
