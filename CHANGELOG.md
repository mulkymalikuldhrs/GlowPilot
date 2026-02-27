# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2026-02-27

### Added
- Integrated **NVIDIA NIM** API for advanced AI reasoning.
- Support for `nvidia/llama-3.1-nemotron-70b-instruct` model via `genkitx-openai`.
- New `NVIDIA_API_KEY` environment variable.

### Improved
- **AI Diagnosis Quality**: Core flows (Conversational Diagnosis, Skin Condition Diagnosis, Skin Nutrition, Anti-Aging) now use NVIDIA's state-of-the-art Llama 3.1 Nemotron 70B model for more accurate and empathetic advice.
- **Glassmorphism UI**: Increased backdrop blur from 24px to 32px for a more premium "frosted glass" look.
- **Branding**: Enhanced the GlowPilot logo with a neon glow effect and metallic gradients.
- **Visual Feedback**: Added hover transitions to glass cards for better interactivity.

### Changed
- Migrated primary AI provider from Google AI (Gemini) to NVIDIA NIM for core dermatology analysis flows.
- Updated Genkit configuration to support multi-plugin architecture (Google AI + NVIDIA NIM).
