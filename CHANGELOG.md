# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-02-14

### Added
- **NVIDIA NIM Integration:**
  - Configured `genkitx-openai` plugin to connect with NVIDIA Inference Microservices (NIM).
  - Implemented `openai/meta/llama-3.2-90b-vision-instruct` for vision-based skin diagnosis flows (`skin-condition-diagnosis` and `conversational-diagnosis-flow`).
  - Implemented `openai/nvidia/llama-3.1-nemotron-70b-instruct` for text-based flows (`anti-aging`, `catalog`, `onboarding`, `product-comparison`, and `skin-nutrition`).
  - Updated `getApiKey` utility to support comma-separated `NVIDIA_API_KEY` for basic key rotation.
- **Improved AI Flow Prompting:**
  - Migrated prompts from Handlebars templates to dynamic functions returning part objects for better compatibility with Genkit and Llama models.
  - Implemented dynamic MIME type extraction for photo data URIs in vision prompts.

### Changed
- **Tailwind CSS 4 Upgrade:**
  - Updated `postcss.config.mjs` to use `@tailwindcss/postcss`.
  - Refactored `src/app/globals.css` to use the new `@import "tailwindcss"` and `@theme` block structure.
- **Frontend Enhancements:**
  - Replaced the deprecated `Soundwave` icon with `AudioLines` in `ChatBubble`.
  - Fixed various TypeScript errors in `src/app/chat/[doctor]/page.tsx` and `src/app/onboarding/page.tsx`.
  - Improved theme provider by fixing the `next-themes` type import issue.

### Fixed
- Fixed missing `platform` property error in `src/app/catalog/page.tsx` when calling `getCatalogProducts`.
- Fixed implicit `any` type errors in several frontend components.
- Resolved type resolution errors for `ThemeProviderProps` in `src/components/theme-provider.tsx`.
