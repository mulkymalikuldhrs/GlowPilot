# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-03-24

### Added
- **NVIDIA NIM Integration**: Integrated NVIDIA NIM models into the Genkit AI framework.
- **Dynamic API Key Rotation**: Implemented a higher-order function in `src/ai/genkit.ts` for rotating multiple API keys (Gemini & NVIDIA) on each request.
- **New AI Models**:
    - Switched text-based flows to `llama-3.1-nemotron-70b-instruct`.
    - Switched vision-based flows to `llama-3.2-90b-vision-instruct`.

### Fixed
- **TypeScript Type Safety**: Resolved multiple type errors in AI flows and frontend components.
- **UI Icon Compatibility**: Replaced `Soundwave` icon with `AudioLines` from `lucide-react` for better compatibility.
- **Prompt Part Handling**: Updated `ai.definePrompt` to return an array of parts for better compatibility with Genkit types.

### Changed
- **Flow Upgrades**: Refactored `skin-condition-diagnosis.ts` and `conversational-diagnosis-flow.ts` to support multi-modal input with dynamic MIME type detection.
- **Documentation**: Updated `README.md` to include NVIDIA NIM setup instructions.
