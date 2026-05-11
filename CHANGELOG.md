# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-05-11

### Added
- Integrated NVIDIA NIM for AI model inference.
- Added support for dynamic API key rotation for NVIDIA and Gemini.
- Added `NVIDIA_API_KEY` to `.env.example`.

### Changed
- Upgraded AI flows to use NVIDIA NIM models:
  - `openai/nvidia/llama-3.1-nemotron-70b-instruct` for text-based tasks.
  - `openai/meta/llama-3.2-90b-vision-instruct` for vision-based tasks.
- Improved `src/ai/genkit.ts` with explicit type casting and support for both `googleAI` and `openAI` plugins.
- Updated `package.json` with correct versions for `genkitx-openai` and `zod`.
- Refined `catalog-flow.ts` to support valid JSON part responses for NVIDIA models.

### Fixed
- Resolved Zod versioning issues by downgrading to `^3.24.1`.
- Standardized AI model provider prefixes for consistent API usage.

## [0.1.0] - 2025-05-10

### Added
- Initial project structure for GlowPilot Copilot.
- Integration with Genkit and Google AI.
- Basic AI flows for diagnosis, onboarding, and catalog.
- Next.js 15 frontend with Tailwind CSS 4.
