# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-02-17

### Added
- Integration with NVIDIA NIM (Microservices) for AI flows.
- Support for `llama-3.2-90b-vision-instruct` (multimodal) and `llama-3.1-nemotron-70b-instruct` models.
- New dependencies: `genkitx-openai`, `@tailwindcss/postcss`, and `@genkit-ai/firebase`.

### Changed
- Upgraded to Tailwind CSS 4 with optimized PostCSS configuration.
- Enhanced AI prompts to use function-based part objects for better reliability.
- Improved Next.js 15 compatibility by adding `Suspense` boundaries for components using `useSearchParams`.
- Refined doctor chat page with better type safety and fixed UI icons.
- Updated `ThemeProvider` to use top-level `next-themes` imports.

### Fixed
- Various TypeScript errors in chat and flow files.
- Missing `conductOnboarding` export in `onboarding-flow.ts`.
- Tailwind CSS 4 "unknown utility class" errors in `globals.css`.
- Firebase initialization check during build.
