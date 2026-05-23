# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-03-24

### Added
- Integration with **NVIDIA NIM** (NVIDIA Inference Microservices) using `genkitx-openai` plugin.
- Added `nvidia/llama-3.1-nemotron-70b-instruct` for text-based diagnostic flows.
- Added `meta/llama-3.2-90b-vision-instruct` for vision-based skin analysis.
- Multi-key rotation support for NVIDIA NIM and Gemini API keys.
- Tailwind CSS 4 integration with `@tailwindcss/postcss`.
- Added missing production dependencies: `@genkit-ai/firebase`, `@opentelemetry/exporter-jaeger`, and `@opentelemetry/winston-transport`.

### Changed
- Upgraded AI flows to utilize NVIDIA NIM models for enhanced diagnostic performance.
- Re-architected `src/ai/genkit.ts` to support multiple AI providers (Google AI and OpenAI/NVIDIA).
- Updated Next.js 15 page components to correctly unwrap `params` and `searchParams` using the `use()` hook and `<Suspense>` boundaries.
- Migrated `globals.css` to Tailwind CSS 4 syntax with `@theme` block.
- Standardized `ChatBubble` and `ChatWindow` components for better type safety and icon consistency.
- Fixed various TypeScript errors across the codebase.

### Fixed
- Fixed Next.js 15 build errors related to synchronous access of `params` and `searchParams`.
- Fixed missing `platform` argument in `getCatalogProducts` call within `CatalogPage`.
- Resolved `next-themes` type import issues.
- Fixed `Soundwave` icon reference to `AudioLines`.

## [0.1.0] - 2025-03-20
- Initial release of GlowPilot Copilot.
- Core features: AI Dermatologist, Product Scraper, Voice Chat, Progress Tracking.
