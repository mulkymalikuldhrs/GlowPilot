# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Integrated NVIDIA NIM AI models for enhanced skin diagnosis and skincare advice.
- Added `genkitx-openai` plugin to support OpenAI-compatible providers like NVIDIA NIM.
- Added `NVIDIA_API_KEY` to environment variables for secure API access and rotation.

### Changed
- Migrated vision-based flows (`skin-condition-diagnosis`, `conversational-diagnosis-flow`) to use `openai/meta/llama-3.2-90b-vision-instruct`.
- Migrated text-based flows (`onboarding-flow`, `catalog-flow`, `product-comparison`, `anti-aging-flow`, `skin-nutrition-flow`) to use `openai/nvidia/llama-3.1-nemotron-70b-instruct`.
- Updated `src/ai/genkit.ts` to support multiple AI providers and dynamic API key rotation for both Google AI and NVIDIA NIM.

### Fixed
- Improved robustness of API key retrieval with error handling for missing keys.
