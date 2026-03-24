# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-03-24

### Added
- Integrated NVIDIA NIM (Inference Microservices) via `genkitx-openai` plugin.
- Support for NVIDIA text-based models: `openai/nvidia/llama-3.1-nemotron-70b-instruct`.
- Support for NVIDIA vision-based models: `openai/meta/llama-3.2-90b-vision-instruct`.
- Dynamic API key rotation for both Gemini and NVIDIA NIM.

### Changed
- Upgraded all AI flows to use NVIDIA NIM models for better performance and accuracy:
    - `skin-condition-diagnosis`: Switched to `llama-3.2-90b-vision-instruct` for superior image analysis.
    - `conversational-diagnosis-flow`: Switched to `llama-3.1-nemotron-70b-instruct` for natural conversations.
    - `anti-aging-flow`: Switched to `llama-3.1-nemotron-70b-instruct`.
    - `skin-nutrition-flow`: Switched to `llama-3.1-nemotron-70b-instruct`.
    - `catalog-flow`: Switched to `llama-3.1-nemotron-70b-instruct`.
    - `onboarding-flow`: Switched to `llama-3.1-nemotron-70b-instruct`.
    - `product-comparison`: Switched to `llama-3.1-nemotron-70b-instruct`.
- Improved prompt handling by switching to function-based prompts for better TypeScript compatibility and dynamic input processing.

### Fixed
- Various TypeScript type issues across the AI flows and components.
- Improved media part extraction from Data URIs in vision flows.
