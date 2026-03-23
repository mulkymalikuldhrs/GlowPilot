# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-02-14

### Added
- **NVIDIA NIM Integration**: Upgraded the AI core to use NVIDIA NIM models (Llama 3.1 Nemotron 70B Instruct and Llama 3.2 90B Vision Instruct).
- **Dynamic API Key Rotation**: Implemented a higher-order function in `genkit.ts` to support comma-separated API keys for both Gemini and NVIDIA.
- **Multimodal AI Flows**: Updated `skin-condition-diagnosis` and `conversational-diagnosis` to support image inputs using Llama 3.2 90B Vision.
- **Improved UI Components**: Replaced `Soundwave` with `AudioLines` from Lucide React for better compatibility.

### Changed
- **Framework Upgrade**: Optimized for Next.js 15 and Tailwind CSS 4.
- **Schema Management**: Standardized AI flow outputs to import types from dedicated schema files.
- **Flow Refinement**: Updated all text-based flows to use the Llama 3.1 Nemotron 70B model for higher quality responses.

### Fixed
- **TypeScript Compliance**: Resolved several type errors in AI flows and UI components.
- **Plugin Configuration**: Fixed Genkit plugin configuration for NVIDIA NIM to avoid property assignment errors.
- **API Key Retrieval**: Ensured API keys are fetched dynamically on each request to allow for easier rotation and management.
