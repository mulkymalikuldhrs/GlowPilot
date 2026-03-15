# Changelog

## [0.2.0] - 2025-03-20

### Added
- Integrated NVIDIA NIM for AI flows.
- Added `NVIDIA_API_KEY` support with dynamic key rotation.
- Support for `llama-3.1-nemotron-70b-instruct` (text) and `llama-3.2-90b-vision-instruct` (vision) models.
- Updated `.env.example` with NVIDIA configuration.

### Changed
- Migrated AI flows to NVIDIA NIM via `genkitx-openai` plugin.
- Refactored all `ai.definePrompt` calls to use part arrays for better compatibility with Genkit and NVIDIA models.
- Enhanced multimodal prompts with dynamic content type extraction for images.
- Updated `ChatBubble` component: replaced `Soundwave` icon with `AudioLines` for better compatibility.

### Fixed
- Improved type safety in Genkit configuration for dynamic API key retrieval.
- Resolved potential issues with raw string prompts in Genkit flows.
