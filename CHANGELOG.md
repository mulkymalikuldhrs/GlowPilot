# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-03-04

### Added
- Integrated NVIDIA NIM for enhanced AI capabilities using the `genkitx-openai` plugin.
- Added support for `NVIDIA_API_KEY` with dynamic key rotation in `src/ai/genkit.ts`.

### Changed
- Upgraded text-based flows to use `openai/nvidia/llama-3.1-nemotron-70b-instruct`.
- Upgraded skin condition diagnosis flow to use `openai/meta/llama-3.2-90b-vision-instruct` for superior multimodal analysis.
- Refactored `getApiKey` in `src/ai/genkit.ts` to be more modular and support multiple environment variables.
- Updated `README.md` and `.env.example` to reflect the new AI configuration.
