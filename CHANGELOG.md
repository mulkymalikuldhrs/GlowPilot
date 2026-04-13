# Changelog

## [2.0.1] - 2025-05-22

### Upgraded
- **NVIDIA NIM Integration**: Migrated AI models from Google Gemini to NVIDIA NIM for enhanced performance.
    - Text flows now use `llama-3.1-nemotron-70b-instruct`.
    - Vision-based flows use `llama-3.2-90b-vision-instruct`.
- **Tailwind CSS 4**: Upgraded the styling engine to Tailwind CSS 4, utilizing the new `@theme` block and improved PostCSS integration.
- **Frontend Audit**: Performed a comprehensive audit of React components.
    - Updated `ThemeProvider` for better type compatibility with `next-themes`.
    - Replaced deprecated `Soundwave` icons with `AudioLines` from `lucide-react`.
    - Improved TypeScript safety across various pages and components.

### Fixed
- Resolved Genkit prompt part compatibility issues for NVIDIA models.
- Fixed layout and theme variables to align with Tailwind 4 standards.
- Corrected various TypeScript errors related to dynamic doctor slugs and Firestore data mapping.
