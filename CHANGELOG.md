# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2024-05-20
### Added
- Integrated NVIDIA NIM for AI flows using `genkitx-openai`.
- Registered `nvidia/llama-3.1-nemotron-70b-instruct` and `meta/llama-3.2-90b-vision-instruct` models.
- Support for dynamic API key rotation via `NVIDIA_API_KEY` and `GEMINI_API_KEY` environment variables.
- Next.js 15 compatibility improvements, including Suspense boundaries for `useSearchParams`.
- Tailwind CSS 4 integration with modern theme variables and PostCSS configuration.
- Enhanced UI icons, replacing `Soundwave` with `AudioLines` from Lucide.

### Changed
- Migrated `skin-condition-diagnosis` to use `openai/meta/llama-3.2-90b-vision-instruct`.
- Migrated all other text-based AI flows to use `openai/nvidia/llama-3.1-nemotron-70b-instruct`.
- Updated AI prompt formats to be more robust and compatible with NVIDIA models.
- Refined doctor configurations with explicit literal types for voices.

### Fixed
- Potential hydration and static generation errors in the login page by wrapping it in a Suspense boundary.
- Type mismatches in AI flows and components.

---
## [0.1.0] - 2024-05-15
### Initial Release
- Core AI dermatology platform functionality.
- AI chat, voice, and photo analysis.
- Product catalog and e-commerce integration.
- User profile and progress tracking.
