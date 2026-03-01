# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Integrated NVIDIA NIM via `genkitx-openai` plugin.
- Support for `NVIDIA_API_KEY` with dynamic key rotation.

### Changed
- Upgraded AI flows to use `openai/nvidia/llama-3.1-nemotron-70b-instruct` model for improved performance and reasoning:
  - `anti-aging-flow.ts`
  - `catalog-flow.ts`
  - `conversational-diagnosis-flow.ts`
  - `onboarding-flow.ts`
  - `product-comparison.ts`
  - `skin-condition-diagnosis.ts`
  - `skin-nutrition-flow.ts`
- Enhanced `getApiKey` utility in `src/ai/genkit.ts` to handle multiple environment variables.
