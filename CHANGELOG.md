# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-05-15

### Added
- Integrated NVIDIA NIM (National Institute of Standards and Technology Inference Microservices) using the `genkitx-openai` plugin.
- Added support for dynamic NVIDIA API key rotation via the `NVIDIA_API_KEY` environment variable.
- Configured NVIDIA NIM base URL to `https://integrate.api.nvidia.com/v1`.

### Changed
- Upgraded the AI model for skin condition diagnosis to `openai/meta/llama-3.2-90b-vision-instruct` (NVIDIA NIM) for improved vision-based analysis.
- Upgraded conversational diagnosis, anti-aging, skin nutrition, and product catalog flows to use `openai/nvidia/llama-3.1-nemotron-70b-instruct` (NVIDIA NIM) for enhanced text reasoning and personalization.
- Refactored `ai.definePrompt` definitions in all flows to use function-based prompts for better compatibility with NVIDIA NIM and Genkit type safety.
- Updated `src/ai/genkit.ts` to support multiple providers (Google AI and NVIDIA NIM).

### Technical
- Installed `genkitx-openai` dependency.
- Optimized API key retrieval logic to support comma-separated keys for both Gemini and NVIDIA.
- Fixed TypeScript errors in Genkit prompt definitions by ensuring they return part objects instead of raw strings when using functions.
