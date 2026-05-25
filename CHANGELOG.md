# Changelog

All notable changes to GlowPilot Copilot will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-03-05

### Fixed — Critical Bugs

- **Removed broken Supabase import** from `types.ts` — `Database` type export referenced non-existent `./types/supabase` file; project uses Firebase, not Supabase
- **Removed `ignoreBuildErrors` and `ignoreDuringBuilds`** from `next.config.ts` — these were masking all TypeScript and ESLint errors during builds
- **Fixed fragile cross-module `Message` type import** in `ChatBubble.tsx` — now correctly imports from shared `@/lib/types` instead of `@/app/chat/[doctor]/page`
- **Fixed Image component handling** — replaced `next/image` `<Image>` with native `<img>` for data URI sources (user-attached images) and replaced remote avatar `<Image>` components with `AvatarFallback` initial-based avatars

### Fixed — Mock/Dummy Data Removed

- **Replaced all `placehold.co` doctor avatars** with color-coded `AvatarFallback` initial-based avatars (each doctor has unique initials and color)
- **Removed fabricated testimonials** — deleted fake "Alya Putri" and "Rizky Pratama" testimonials with placeholder images
- **Removed fabricated rating** — deleted fake "5.0 dari 2,187 ulasan" rating display
- **Replaced landing page hero placeholder image** with gradient placeholder featuring GlowPilot branding
- **Fixed catalog AI flow** — no longer instructs LLM to generate fake affiliate links or `placehold.co` images; now generates e-commerce search URLs instead
- **Updated catalog UI** — product cards show `Package` icon placeholder for missing images and "Cari di E-commerce" search button instead of fake "Beli Sekarang" buttons

### Fixed — Config & Security

- **Populated `.env.example`** with all required keys, descriptions, and setup instructions (Firebase config, Gemini API, Stripe)
- **Added route protection middleware** — basic auth cookie check for protected routes (`/chat`, `/catalog`, `/onboarding`, `/history`, `/progress`, `/profile`)
- **Removed `.windsurfrules` and `CLAUDE.md`** — these were AI agent rule files not meant for production
- **Fixed API key rotation** — replaced `Math.random()` with proper round-robin rotation in `genkit.ts` for even distribution across API keys
- **Updated Stripe webhook** — added proper signature verification skeleton with event type handling (checkout, subscription, payment failures) instead of placeholder
- **Removed `placehold.co` from `next.config.ts` remote patterns** — no longer needed

### Changed

- Updated README to v2.0.0 with Production Ready badge
- Added trilingual disclaimer (EN/ID/CN) emphasizing GlowPilot is not a substitute for professional medical advice
- Added contributor welcome section and contact info
- Added environment setup table to README
- Removed unused `AvatarImage` import from chat page

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
- **Product Catalog**: Browseable product catalog with search and filter capabilities powered by Genkit AI.
- **Glassmorphism UI**: Implemented the core glassmorphism design system with frosted blur effects, rounded corners, and translucent borders using Tailwind CSS.
- **Aurora Animated Background**: Added animated aurora background effect for a futuristic visual experience on the landing page and chat interface.
- **Voice Chat (STT + TTS)**: Integrated speech-to-text using Web Speech API and text-to-speech for natural, hands-free interaction with AI doctors.
- **Product Comparison**: AI-powered product comparison tool that evaluates skincare products by price, rating, and active ingredients.
- **Skincare Routine Generator**: Personalized AM/PM skincare routine generation based on diagnosis results, user skin profile, and preferences.
- **Firebase Authentication**: Google login integration using Firebase Auth for secure user authentication and session management.
- **User Profile & History**: User profile management with skin history tracking, preferences storage, and personalized experience across sessions.
- **Progress Tracking & Goal Setting**: Skincare routine adherence tracking with goal-setting features and visual progress indicators.
- **Light/Dark Mode**: Theme switching support with next-themes for seamless light and dark mode transitions.
- **Language Toggle**: Bilingual support (English/Bahasa Indonesia) with language toggle component.
- **Onboarding Flow**: Guided onboarding experience for new users to set up their skin profile and preferences.
- **Anti-Aging Flow**: Specialized AI flow for personalized anti-aging treatment recommendations and routine planning.
- **Skin Nutrition Flow**: Nutritional recommendations and dietary advice for improved skin health.
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

### v2.0.0 - Production Ready Release

This is the first production-ready release of GlowPilot Copilot. All critical bugs have been fixed, mock/dummy data has been removed, and security configurations have been hardened. The platform now uses proper avatar initials instead of placeholder images, search-based e-commerce links instead of fabricated affiliate URLs, and includes middleware-based route protection with round-robin API key rotation.

### v0.1.0 - Initial Release

This is the first public release of GlowPilot Copilot, an AI-powered dermatology and skincare advisory platform. The application provides intelligent skin condition diagnosis through text, voice, and image inputs, and generates personalized skincare routines with product recommendations.

This project is part of the [HermesQuantOS](https://github.com/mulkymalikuldhrs/HermesQuantOS) ecosystem, developed by Mulky Malikul Dhaher.
