# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2024-05-22

### Added
- Integrated NVIDIA NIM (NVIDIA Inference Microservices) for improved AI reasoning and vision capabilities.
- Support for Llama 3.1 70B Instruct (text) and Llama 3.2 90B Vision Instruct (multimodal) models via `genkitx-openai`.
- Dynamic API key rotation for both Gemini and NVIDIA NIM providers.
- `AudioLines` icon from Lucide React for a better voice interaction UI.

### Changed
- Migrated all skin diagnosis and consultation flows to NVIDIA NIM models.
- Updated Genkit configuration to support the `openai` provider with NVIDIA's base URL.
- Refactored prompt definitions to return part objects for better compatibility and flexibility.
- Fixed several TypeScript type mismatches in the chat and catalog pages.

### Fixed
- Fixed missing `platform` property in catalog product fetching.
- Resolved `Message` type import issues in `ChatBubble` component.
- Cleaned up voice configuration mapping in `tts-flow.ts`.
