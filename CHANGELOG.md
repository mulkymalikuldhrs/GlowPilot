# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2025-05-22

### Added
- Integrated NVIDIA NIM (NVIDIA Inference Microservices) for AI flows.
- Added `genkitx-openai` plugin to support NVIDIA NIM models.
- Implemented dynamic API key rotation for `NVIDIA_API_KEY` in `src/ai/genkit.ts`.

### Changed
- Upgraded text-based flows to use `openai/nvidia/llama-3.1-nemotron-70b-instruct`:
  - `anti-aging-flow.ts`
  - `catalog-flow.ts`
  - `onboarding-flow.ts`
  - `product-comparison.ts`
  - `skin-nutrition-flow.ts`
- Upgraded vision-based flows to use `openai/meta/llama-3.2-90b-vision-instruct`:
  - `skin-condition-diagnosis.ts`
  - `conversational-diagnosis-flow.ts`
- Refactored prompt definitions in vision flows to use function-based prompts with dynamic `contentType` detection for images.
- Updated `README.md` with new model information and configuration requirements.

### Technical Details
- Base URL for NVIDIA NIM: `https://integrate.api.nvidia.com/v1`
- Plugins updated: `genkit`, `@genkit-ai/googleai`, `genkitx-openai`
