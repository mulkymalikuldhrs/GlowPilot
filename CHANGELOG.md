# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-05-22

### Added
- Integrated **NVIDIA NIM** via `genkitx-openai` plugin for enhanced AI capabilities.
- Added support for NVIDIA multimodal models (`llama-3.2-90b-vision-instruct`) and text models (`llama-3.1-nemotron-70b-instruct`).
- Implemented dynamic API key rotation for both Google AI and NVIDIA NIM.

### Changed
- Upgraded AI flows (`skin-condition-diagnosis`, `conversational-diagnosis`, etc.) to use NVIDIA NIM models for improved accuracy and performance.
- Updated `tts-flow.ts` to use `gemini-2.0-flash-preview-tts`.
- Replaced `Soundwave` icon with `AudioLines` in `ChatBubble` component for better compatibility.
- Optimized Genkit prompts to support NVIDIA-specific requirements.

### Fixed
- Resolved TypeScript schema import issues across AI flows.
- Fixed `catalog-flow.ts` prompt function to return valid Genkit parts.

## [0.1.0] - Initial Release
- Basic AI dermatology platform with Google AI integration.
