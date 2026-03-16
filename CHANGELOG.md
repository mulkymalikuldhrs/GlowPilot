# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-05-23

### Changed
- **AI Engine Upgrade:** Migrated from Google Gemini models to NVIDIA NIM models via `genkitx-openai`.
  - Text-based flows now use `openai/nvidia/llama-3.1-nemotron-70b-instruct`.
  - Vision-based flows now use `openai/meta/llama-3.2-90b-vision-instruct`.
- **API Key Management:** Implemented dynamic API key rotation for both Gemini and NVIDIA API keys.
- **UI Improvements:** Replaced `Soundwave` icon with `AudioLines` in chat bubbles for better compatibility.

### Added
- Integration with NVIDIA NIM for high-performance AI inference.
- Support for `genkitx-openai` plugin in Genkit configuration.

## [0.1.0] - 2024-xx-xx
- Initial release of GlowPilot Copilot.
