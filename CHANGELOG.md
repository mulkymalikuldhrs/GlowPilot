# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-03-04

### Added
- Integration with NVIDIA NIM (NVIDIA Inference Microservices) for AI processing.
- New `genkitx-openai` plugin integration in `src/ai/genkit.ts`.

### Changed
- Upgraded AI models to NVIDIA NIM preferred models:
    - Vision tasks: `openai/meta/llama-3.2-90b-vision-instruct`
    - Text-only tasks: `openai/nvidia/llama-3.1-nemotron-70b-instruct`
- Updated `src/ai/genkit.ts` to support dynamic API key rotation for both Gemini and NVIDIA API keys.
- Switched to `AudioLines` icon in `ChatBubble.tsx` for better compatibility.
- Improved TypeScript types and imports across various components.

### Fixed
- Fixed missing `platform` property in `getCatalogProducts` call in Catalog page.
- Fixed `ThemeProviderProps` import in `theme-provider.tsx`.
- Resolved several TypeScript type assignment errors in `genkit.ts` and chat pages.
