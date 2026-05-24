# GlowPilot Copilot

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000.svg?logo=next.js)](https://nextjs.org/)
[![Genkit AI](https://img.shields.io/badge/Genkit_AI-1.16-FF6F00.svg)](https://genkit.dev/)

**GlowPilot Copilot** is a virtual AI dermatology platform that analyzes skin conditions via chat, voice, or photo, and provides personalized skincare routine recommendations. It features a futuristic glassmorphism interface with aurora animations, and is integrated with affiliate links for product purchases.

[![Read in Bahasa Indonesia](https://img.shields.io/badge/Bahasa-Indonesia-red.svg)](README_id.md)
[![阅读中文](https://img.shields.io/badge/Chinese-中文-green.svg)](README_zh.md)

---

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [AI Flows](#ai-flows)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)
- [Credits](#credits)

---

## Overview

GlowPilot Copilot redefines the way users interact with skincare. By leveraging Google Genkit AI and Firebase, it delivers an intelligent, conversational dermatology experience that adapts to each user's unique skin profile. The platform provides AI-powered diagnosis through text, voice, and image inputs, and generates personalized AM/PM skincare routines complete with product recommendations and affiliate purchase links.

The application is designed with a futuristic aesthetic featuring glassmorphism UI, aurora-animated backgrounds, and smooth Framer Motion transitions. It supports both light and dark modes, along with a language toggle for English and Bahasa Indonesia. GlowPilot is not a replacement for medical dermatologists; it serves as an educational and advisory tool that empowers users to make better skincare decisions.

This project is part of the [HermesQuantOS](https://github.com/mulkymalikuldhrs/HermesQuantOS) ecosystem.

---

## Core Features

- **AI Dermatologist**: Chat-based AI diagnosis for skin conditions using text, voice, or photo input. Multiple AI doctor personas are available, each with unique expertise and communication style.
- **Voice Chat**: Full speech-to-text and text-to-speech integration using Web Speech API and ElevenLabs for natural, hands-free interaction.
- **Product Scraper**: Automatically scrapes product data from e-commerce platforms (Shopee, Sociolla, etc.) for real-time pricing and availability.
- **Product Comparison**: AI-powered comparison of skincare products by price, rating, and ingredients with labels such as Best Value, Dermatologist Pick, and Most Affordable.
- **Skincare Routines**: Generates personalized AM/PM skincare routines based on diagnosis results and user preferences.
- **Progress Tracking**: Track skincare routine adherence, set goals, and monitor improvements over time.
- **User Profile**: Manage user profiles, skin history, and preferences for a tailored experience.
- **Responsive UI**: Light/Dark mode toggle and language switch (English/Bahasa Indonesia) with a glassmorphism design system.
- **Referral System**: Invite friends and unlock additional AI doctor personas.
- **Affiliate Integration**: Embedded purchase buttons with affiliate links for seamless product buying.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.9 |
| AI Engine | Google Genkit AI 1.16 |
| Authentication | Firebase Auth (Google Login) |
| Database | Firebase Firestore |
| Styling | Tailwind CSS 4, Glassmorphism |
| UI Components | Radix UI, shadcn/ui |
| Animations | Framer Motion, Aurora Background |
| State Management | Jotai, TanStack React Query |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Testing | Vitest, Testing Library |
| Deployment | Vercel, Firebase App Hosting |

---

## Architecture

For a detailed breakdown of the system architecture, data flow, and component design, see [ARCHITECTURE.md](ARCHITECTURE.md).

---

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm or yarn
- Firebase project with Authentication and Firestore enabled
- Google AI API key (for Genkit)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mulkymalikuldhrs/GlowPilot.git
   cd GlowPilot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Firebase configuration and Google AI API key in `.env.local`.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build the production application |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint checks |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run test` | Run Vitest tests |
| `npm run test:ui` | Run Vitest with interactive UI |
| `npm run genkit:dev` | Start Genkit AI development server |
| `npm run genkit:watch` | Start Genkit with watch mode |

---

## Project Structure

```
GlowPilot/
├── src/
│   ├── ai/                    # Genkit AI flows and schemas
│   │   ├── flows/             # AI flow definitions
│   │   │   ├── conversational-diagnosis-flow.ts
│   │   │   ├── skin-condition-diagnosis.ts
│   │   │   ├── skin-nutrition-flow.ts
│   │   │   ├── anti-aging-flow.ts
│   │   │   ├── product-comparison.ts
│   │   │   ├── catalog-flow.ts
│   │   │   ├── onboarding-flow.ts
│   │   │   └── tts-flow.ts
│   │   ├── schemas/           # Zod schemas for AI I/O
│   │   ├── tools/             # AI tool definitions
│   │   └── genkit.ts          # Genkit configuration
│   ├── app/                   # Next.js App Router pages
│   │   ├── page.tsx           # Landing page
│   │   ├── chat/              # Chat interface
│   │   ├── catalog/           # Product catalog
│   │   ├── onboarding/        # Onboarding flow
│   │   ├── profile/           # User profile
│   │   ├── progress/          # Progress tracking
│   │   ├── history/           # Chat history
│   │   └── login/             # Authentication
│   ├── components/            # React components
│   │   ├── chat/              # Chat UI components
│   │   ├── aurora/            # Aurora background effect
│   │   ├── common/            # Shared components
│   │   ├── auth/              # Authentication components
│   │   └── ui/                # shadcn/ui primitives
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities and Firebase config
│   └── middleware.ts          # Next.js middleware
├── docs/                      # Project documentation
│   └── blueprint.md           # Design blueprint
├── public/                    # Static assets
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── vitest.config.ts           # Vitest test configuration
└── package.json               # Dependencies and scripts
```

---

## AI Flows

GlowPilot uses Google Genkit AI to power several intelligent flows:

| Flow | Description |
|------|-------------|
| Conversational Diagnosis | Interactive chat-based skin condition diagnosis |
| Skin Condition Diagnosis | Direct diagnosis from text or image input |
| Skin Nutrition | Nutritional recommendations for skin health |
| Anti-Aging | Personalized anti-aging treatment routines |
| Product Comparison | Compare products by price, rating, and ingredients |
| Catalog Flow | Browse and search the product catalog |
| Onboarding Flow | Guided setup for new users |
| TTS Flow | Text-to-speech for voice responses |

---

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Google AI (Genkit)
GOOGLE_GENAI_API_KEY=
```

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of notable changes.
---

## 🤝 Contributing

Contributions are welcome! We encourage the community to help improve this project.

1. **Fork** the repository
2. Create a **feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. Open a **Pull Request**

Please make sure to update tests as appropriate and follow the existing code style.

---

## 📬 Contact

**Mulky Malikul Dhaher** — [mulkymalikuldhaher@email.com](mailto:mulkymalikuldhaher@email.com)

GitHub: [https://github.com/mulkymalikuldhrs](https://github.com/mulkymalikuldhrs)

---

## ⚠️ Disclaimer

**This project is for Education Purpose only.**

All content, code, and documentation provided in this repository are intended solely for educational and research purposes. Nothing in this repository constitutes financial, investment, legal, or professional advice.

**Risiko apapun tidak kita tanggung.** (We are not responsible for any risks or damages.)

Use at your own risk. The authors and contributors assume no liability for any losses, damages, or consequences arising from the use of this software or information provided herein.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

Copyright © Mulky Malikul Dhaher. All rights reserved.

