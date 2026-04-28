# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Integration with NVIDIA NIM via `genkitx-openai` plugin.
- Support for `NVIDIA_API_KEY` with dynamic key rotation in `src/ai/genkit.ts`.

### Changed
- Upgraded AI flows to use NVIDIA NIM models:
    - Text-based flows now use `openai/nvidia/llama-3.1-nemotron-70b-instruct`.
    - Multimodal flows (Skin Condition Diagnosis) now use `openai/meta/llama-3.2-90b-vision-instruct`.
- Updated prompt functions in flows to be compatible with NVIDIA NIM (returning part objects instead of strings).
- Improved `getApiKey` utility to handle multiple environment variables.

### Fixed
- Compatibility issues with Genkit prompt functions and NVIDIA NIM.
