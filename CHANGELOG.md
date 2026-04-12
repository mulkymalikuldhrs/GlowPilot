# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2024-05-20

### Added
- Integration with **NVIDIA NIM** (NVIDIA Inference Microservices) via `genkitx-openai`.
- New AI models for enhanced performance:
    - `openai/meta/llama-3.2-90b-vision-instruct` for vision-based diagnosis.
    - `openai/nvidia/llama-3.1-nemotron-70b-instruct` for all text-based flows.
- Multi-key rotation support in `getApiKey` utility.
- Explicit type exports for all AI flows to improve frontend integration.

### Fixed
- Improved multimodal prompt handling in Genkit flows for compatibility with NVIDIA models.
- Fixed `ThemeProviderProps` import path from `next-themes`.
- Replaced deprecated/missing `Soundwave` icon with `AudioLines` in `ChatBubble.tsx`.
- Added proper type casting for doctor slugs in the chat page.
- Optimized dependency management using `--legacy-peer-deps` to avoid version conflicts.

### Security
- Enhanced API key management with environment variable support.
