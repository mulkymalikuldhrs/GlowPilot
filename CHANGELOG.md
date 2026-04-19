# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2024-04-19

### Added
- Integrated **NVIDIA NIM** API for high-performance AI inference.
- Added `genkitx-openai` plugin to support OpenAI-compatible NVIDIA endpoints.
- New `getApiKey` utility in `src/ai/genkit.ts` for rotating multiple API keys and supporting both Gemini and NVIDIA.

### Changed
- Upgraded AI models across all flows:
  - **Skin Diagnosis**: Switched to `openai/meta/llama-3.2-90b-vision-instruct` for superior multimodal analysis.
  - **Conversational Flows**: Upgraded to `openai/nvidia/llama-3.1-nemotron-70b-instruct` for better reasoning and chat quality.
  - **Catalog & Comparison**: Now powered by NVIDIA NIM for faster and more accurate product matching.
- Updated `catalog-flow.ts` to support specific platform requirements (Shopee/Tokopedia).
- Replaced deprecated `Soundwave` icon with `AudioLines` from Lucide React.
- Fixed TypeScript errors in `ChatWindow`, `ChatBubble`, and `Catalog` page.
- Optimized `ThemeProvider` import to resolve build issues.

### Fixed
- Corrected Zod version compatibility issues (`zod@3.24.1`).
- Resolved missing type definitions for `DiagnosisConversationOutput`.
- Fixed implicit `any` types and indexing issues in doctor chat pages.
- Standardized `Message` type imports across the codebase.

## [0.1.0] - Initial Release

### Added
- Core GlowPilot platform with AI Dermatology features.
- Initial Genkit flows with Google AI (Gemini).
- Firebase integration for user data and consultations.
- Responsive UI with Tailwind CSS 4.
