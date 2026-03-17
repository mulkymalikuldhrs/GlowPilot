# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Integrated NVIDIA NIM for AI flows.
- Added `genkitx-openai` plugin to support NVIDIA NIM.
- Configured dynamic API key rotation for NVIDIA NIM.

### Changed
- Migrated `skin-condition-diagnosis` flow to use NVIDIA NIM Llama 3.2 90B Vision model.
- Migrated text-based flows to use NVIDIA NIM Llama 3.1 70B Instruct model.
- Updated `src/ai/genkit.ts` to include NVIDIA NIM configuration.
