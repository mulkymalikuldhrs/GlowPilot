# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-02-14

### Added
- Integrated NVIDIA NIM for AI model inference using `genkitx-openai` plugin.
- Added support for multiple API keys with random rotation for both Gemini and NVIDIA.

### Changed
- Upgraded `skin-condition-diagnosis` flow to use `meta/llama-3.2-90b-vision-instruct` via NVIDIA NIM.
- Upgraded `conversational-diagnosis`, `anti-aging`, `skin-nutrition`, `onboarding`, and `catalog` flows to use `nvidia/llama-3.1-nemotron-70b-instruct` via NVIDIA NIM.
- Updated UI components to handle `AudioLines` from `lucide-react` instead of deprecated or unavailable icons.
- Improved TypeScript type safety across the application, especially in AI flow integrations and doctor configurations.
- Fixed `ThemeProvider` import issue from `next-themes`.
- Updated `tailwind.config.ts` for better compatibility.

### Fixed
- Resolved various TypeScript errors in `ChatBubble`, `DoctorChatPage`, and `OnboardingPage`.
- Fixed missing `platform` property in `getCatalogProducts` call in `CatalogPage`.
