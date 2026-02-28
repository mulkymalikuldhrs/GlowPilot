# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-02-28

### Added
- Integrated NVIDIA NIM (Inference Microservices) for enhanced AI capabilities.
- Added `genkitx-openai` plugin to support OpenAI-compatible APIs (NVIDIA NIM).
- Configured NVIDIA's base URL: `https://integrate.api.nvidia.com/v1`.
- Introduced `NVIDIA_API_KEY` environment variable.

### Changed
- Migrated all LLM-based Genkit flows to use the `openai/nvidia/llama-3.1-nemotron-70b-instruct` model.
- Updated `src/ai/genkit.ts` to support dynamic API key rotation for both Gemini and NVIDIA.
- Enhanced all Genkit flows with robust error handling (try-catch blocks) and localized (Indonesian) error messages.

### Fixed
- Improved resilience of AI-driven diagnosis and recommendations by adding validation for model outputs.
- Corrected potential runtime errors in Genkit flows by ensuring non-null responses.
