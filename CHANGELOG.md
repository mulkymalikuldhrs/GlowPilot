# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-05-22

### Added
- Integration with NVIDIA NIM (NVIDIA Inference Microservices).
- Support for `openai/nvidia/llama-3.1-nemotron-70b-instruct` for text-based AI flows.
- Support for `openai/meta/llama-3.2-90b-vision-instruct` for multimodal (vision) skin diagnosis.
- Dynamic API key rotation support for both Gemini and NVIDIA NIM.

### Changed
- Migrated core AI logic from Google Gemini to NVIDIA NIM for improved performance and specialized skin diagnosis capabilities.
- Updated `src/ai/genkit.ts` to include the `openAI` plugin configured for NVIDIA NIM.
- Refactored `skin-condition-diagnosis.ts` to handle multimodal prompts using the NVIDIA Vision model with dynamic content type extraction.
- Standardized AI flow implementations to use specialized NVIDIA NIM models while retaining Gemini for TTS functionality.

### Fixed
- Improved reliability of product catalog and anti-aging advice generation using more advanced LLMs.
