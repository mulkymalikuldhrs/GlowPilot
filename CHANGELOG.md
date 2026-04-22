# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2024-05-20

### Added
- Integration with **NVIDIA NIM API** for high-performance AI inference.
- Support for `openai/meta/llama-3.2-90b-vision-instruct` in vision-based diagnosis flows.
- Support for `openai/nvidia/llama-3.1-nemotron-70b-instruct` in text-based flows.
- API Key rotation support for `NVIDIA_API_KEY`.

### Changed
- Upgraded project to **Next.js 15** compliance (added Suspense boundaries for `useSearchParams`).
- Upgraded to **Tailwind CSS 4** (modernized `globals.css` and `postcss.config.mjs`).
- Migrated core AI flows from Google AI to NVIDIA NIM models.
- Enhanced `getApiKey` utility to support multiple providers.

### Fixed
- Fixed TypeScript export issues in AI flow files.
- Improved error handling for missing environment variables.
