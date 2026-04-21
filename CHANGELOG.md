# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-03-09

### Added
- Integration with **NVIDIA NIM** (Microservices) for AI models.
- Support for `meta/llama-3.2-90b-vision-instruct` for vision-based skin diagnosis.
- Support for `nvidia/llama-3.1-nemotron-70b-instruct` for high-performance text-based AI flows.
- Automated API key rotation support via comma-separated environment variables.

### Changed
- Upgraded Genkit AI flows to utilize NVIDIA NIM's high-performance models.
- Enhanced `skin-condition-diagnosis` flow with advanced vision capabilities.
- Refactored `getApiKey` utility for better flexibility across different providers.
- Improved `LoginPage` reliability by wrapping it in a `<Suspense>` boundary (Next.js 15 requirement).
- Updated UI icons: Replaced `Soundwave` with `AudioLines` from `lucide-react`.

### Fixed
- TypeScript indexing errors in `DoctorChatPage` when using dynamic slugs.
- Missing required parameters in `getCatalogProducts` calls.
- Inconsistent `Message` type imports across the codebase.
- Theme provider type resolution issue.

## [0.1.0] - Initial Release
- Initial release of GlowPilot Copilot.
- AI Chat Dermatologist integration.
- Product catalog and comparison features.
- User profile and progress tracking.
