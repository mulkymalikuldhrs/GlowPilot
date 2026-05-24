# Changelog

All notable changes to GlowPilot Copilot will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-04

### Added

- 🎉 Official v1.0.0 release of GlowPilot Copilot
- Complete trilingual README (English, Bahasa Indonesia, 中文)
- Community files: CODE_OF_CONDUCT.md, SECURITY.md, CONTRIBUTING.md
- GitHub issue templates, PR template, and FUNDING.yml
- Branch cleanup and repository consolidation

## [0.1.0] - 2025-08-01

### Added

- **AI Chat Dermatologist**: Conversational diagnosis flow using Google Genkit AI with support for text, voice, and image-based skin condition analysis.
- **Multiple AI Doctor Personas**: Introduced distinct AI doctor profiles, each with unique expertise areas and communication styles for personalized consultation experiences.
- **Product Scraper**: Automatic product data scraping from e-commerce platforms (Shopee, Sociolla) for real-time pricing and availability information.
- **Glassmorphism UI**: Implemented the core glassmorphism design system with frosted blur effects, rounded corners, and translucent borders using Tailwind CSS.
- **Aurora Animated Background**: Added animated aurora background effect for a futuristic visual experience on the landing page and chat interface.
- **Voice Chat (STT + TTS)**: Integrated speech-to-text using Web Speech API and text-to-speech with ElevenLabs for natural, hands-free interaction with AI doctors.
- **Product Comparison**: AI-powered product comparison tool that evaluates skincare products by price, rating, and active ingredients, with labels (Best Value, Dermatologist Pick, Most Affordable).
- **Skincare Routine Generator**: Personalized AM/PM skincare routine generation based on diagnosis results, user skin profile, and preferences.
- **Firebase Authentication**: Google login integration using Firebase Auth for secure user authentication and session management.
- **User Profile & History**: User profile management with skin history tracking, preferences storage, and personalized experience across sessions.
- **Progress Tracking & Goal Setting**: Skincare routine adherence tracking with goal-setting features and visual progress indicators.
- **Referral System**: Invite friends and unlock additional AI doctor personas through a built-in referral mechanism.
- **Light/Dark Mode**: Theme switching support with next-themes for seamless light and dark mode transitions.
- **Language Toggle**: Bilingual support (English/Bahasa Indonesia) with language toggle component.
- **Onboarding Flow**: Guided onboarding experience for new users to set up their skin profile and preferences.
- **Product Catalog**: Browseable product catalog with search and filter capabilities powered by Genkit AI.
- **Anti-Aging Flow**: Specialized AI flow for personalized anti-aging treatment recommendations and routine planning.
- **Skin Nutrition Flow**: Nutritional recommendations and dietary advice for improved skin health.
- **Stripe Webhook Integration**: API route for Stripe webhook handling for subscription and payment management.
- **Vitest Testing Setup**: Testing infrastructure with Vitest and Testing Library for component and integration tests.
- **Responsive Mobile UI**: Mobile-first responsive design with bottom navigation for optimal mobile experience.

### Changed

- Migrated to Next.js 15 App Router for improved routing and server component support.
- Updated to Tailwind CSS 4 with the latest configuration format.
- Integrated shadcn/ui component library for consistent and accessible UI primitives.

### Technical Details

- **Framework**: Next.js 15 with App Router
- **AI Engine**: Google Genkit AI 1.16
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Styling**: Tailwind CSS 4 + Glassmorphism
- **Testing**: Vitest + Testing Library
- **State Management**: Jotai + TanStack React Query

---

## Release Notes

### v0.1.0 - Initial Release

This is the first public release of GlowPilot Copilot, an AI-powered dermatology and skincare advisory platform. The application provides intelligent skin condition diagnosis through text, voice, and image inputs, and generates personalized skincare routines with product recommendations. The platform features a futuristic glassmorphism UI with aurora animations and supports both light and dark modes with bilingual content (English/Bahasa Indonesia).

Key highlights include:
- Eight distinct AI flows for comprehensive skincare analysis
- Voice-enabled consultations for hands-free interaction
- Product comparison and catalog browsing with affiliate integration
- Progress tracking and goal setting for skincare routines
- Firebase-powered authentication and data persistence

This project is part of the [HermesQuantOS](https://github.com/mulkymalikuldhrs/HermesQuantOS) ecosystem, developed by Mulky Malikul Dhaher.
