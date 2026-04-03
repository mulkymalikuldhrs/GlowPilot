# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2025-05-22

### Added
- Integrated **NVIDIA NIM** (Microservices) as the primary AI inference provider via the `genkitx-openai` plugin.
- Implemented **Multi-Model Dynamic API Key Rotation** for both NVIDIA and Google AI plugins in `src/ai/genkit.ts`.
- Advanced **Vision-Based Skin Diagnosis** using `openai/meta/llama-3.2-90b-vision-instruct`.
- Upgraded **Conversational & Text Flows** using `openai/nvidia/llama-3.1-nemotron-70b-instruct` for superior reasoning and Bahasa Indonesia responses.
- Added explicit support for multiple API keys in environment variables (comma-separated).

### Changed
- Refactored AI flow prompt definitions in `src/ai/flows/` to return part objects for enhanced compatibility with NVIDIA multimodal models.
- Updated `src/ai/flows/skin-condition-diagnosis.ts` to support dynamic content-type extraction for Base64 photo data.
- Replaced the deprecated `Soundwave` icon with the modern `AudioLines` icon from `lucide-react`.
- Corrected TypeScript import paths in `ChatBubble.tsx` to use the central `Message` type from `@/lib/types`.

### Improved
- Comprehensive documentation update in `README.md` reflecting the new technical stack and AI capabilities.
- Fixed several TypeScript type-safety issues in `genkit.ts` and UI components.
- Standardized AI flow output schema imports for better modularity.

## [2.0.0] - Initial Release
- AI Dermatology Copilot with glassmorphism UI.
- Chat-based diagnosis using Gemini.
- Product scraping and affiliate link generation.
- Voice chat (STT/TTS) integration.
- Skincare progress tracking and goal setting.
