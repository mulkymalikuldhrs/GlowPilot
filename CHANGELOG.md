# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-05-22

### Added
- Integration with NVIDIA NIM (Microservices) for AI models.
- Support for `genkitx-openai` plugin to connect with NVIDIA's OpenAI-compatible API.
- Dynamic API key rotation for `NVIDIA_API_KEY`.
- New AI models:
  - Vision: `meta/llama-3.2-90b-vision-instruct`
  - Text: `nvidia/llama-3.1-nemotron-70b-instruct`

### Changed
- Migrated all major AI flows from Google AI to NVIDIA NIM for better performance and specialization.
- Updated `ChatBubble` to use `AudioLines` icon from `lucide-react`.
- Improved TypeScript type safety across the application, especially in chat and onboarding flows.
- Refined `Catalog` flow to support platform-specific affiliate link generation more robustly.

### Fixed
- Fixed `ThemeProviderProps` resolution issue from `next-themes`.
- Resolved multiple TypeScript errors related to dynamic indexing and missing properties.
- Corrected `tailwind.config.ts` darkMode configuration.
- Cleaned up unused and broken imports in `src/lib/types.ts`.

## [0.1.0] - Initial Release
- Initial version of GlowPilot Copilot.
