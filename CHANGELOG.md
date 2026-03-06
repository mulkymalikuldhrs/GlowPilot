# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Integrated NVIDIA NIM (NVIDIA Inference Microservices) using `genkitx-openai`.
- Support for API key rotation for both Gemini and NVIDIA API keys.
- New models: `meta/llama-3.2-90b-vision-instruct` for vision-based diagnosis and `nvidia/llama-3.1-nemotron-70b-instruct` for text-based flows.

### Changed
- Upgraded to Tailwind CSS 4 standards.
- Replaced `@tailwind` directives with `@import "tailwindcss"` in `globals.css`.
- Updated `postcss.config.mjs` to use `@tailwindcss/postcss`.
- Migrated all primary AI flows from Gemini 1.5 Flash to NVIDIA NIM models for improved performance and accuracy.
- Refined Genkit prompt definitions for better type compatibility.

### Fixed
- Improved response consistency in `catalog-flow.ts` by ensuring prompt functions return structured part objects.
