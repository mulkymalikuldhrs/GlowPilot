# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-05-22

### Added
- Integrated NVIDIA NIM (NVIDIA Inference Microservices) as the primary AI provider.
- Added `genkitx-openai` plugin to support OpenAI-compatible endpoints (NVIDIA NIM).
- Implemented dynamic API key rotation for both Google Gemini and NVIDIA NIM.
- Added support for comma-separated API keys in environment variables for better rate limit handling.

### Changed
- Upgraded AI models across all Genkit flows:
    - Text-based flows now use `openai/nvidia/llama-3.1-nemotron-70b-instruct`.
    - Multimodal (Vision) flows now use `openai/meta/llama-3.2-90b-vision-instruct`.
- Improved Genkit `definePrompt` type compatibility by returning an array of parts.
- Replaced `Soundwave` icon with `AudioLines` in `ChatBubble.tsx` for better compatibility.
- Upgraded Tailwind CSS configuration to use `@tailwindcss/postcss` and `@import "tailwindcss"` directive.
- Updated documentation and refined UI for a better user experience.

## [0.1.0] - 2025-08-01
### Added
- Chat Copilot (diagnosa)
- Produk scraper dari Shopee
- UI Glassmorph dasar (Sora Font)
- Aurora animated background
- Login & Signup logic
- Referral unlock system
