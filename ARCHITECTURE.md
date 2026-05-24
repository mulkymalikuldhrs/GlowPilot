# GlowPilot Copilot - Architecture

This document provides a comprehensive overview of the GlowPilot Copilot system architecture, including component design, data flow, and technical decisions.

---

## Table of Contents

- [System Overview](#system-overview)
- [Architecture Layers](#architecture-layers)
- [Component Architecture](#component-architecture)
- [AI Flow Architecture](#ai-flow-architecture)
- [Data Flow](#data-flow)
- [Authentication & Authorization](#authentication--authorization)
- [Security Considerations](#security-considerations)
- [Technology Decisions](#technology-decisions)
- [Deployment Architecture](#deployment-architecture)

---

## System Overview

GlowPilot Copilot is a full-stack AI dermatology platform built on Next.js 15 with the App Router pattern. The application integrates Google Genkit AI for intelligent skin condition analysis and recommendations, Firebase for authentication and data persistence, and a glassmorphism-based UI system for an immersive user experience.

```
┌──────────────────────────────────────────────────────┐
│                    Client (Browser)                   │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │  React    │  │  Tailwind │  │  Framer Motion    │  │
│  │  19 UI    │  │  CSS 4    │  │  Animations       │  │
│  └────┬─────┘  └─────┬────┘  └────────┬──────────┘  │
│       │              │                │              │
│  ┌────▼──────────────▼────────────────▼──────────┐   │
│  │            Next.js 15 App Router               │   │
│  │  ┌─────────┐  ┌─────────┐  ┌──────────────┐  │   │
│  │  │  Pages   │  │  Server  │  │  Middleware   │  │   │
│  │  │  (App)   │  │  Actions │  │  (Auth Guard) │  │   │
│  │  └────┬────┘  └────┬────┘  └──────┬───────┘  │   │
│  └───────┼─────────────┼──────────────┼──────────┘   │
│          │             │              │               │
└──────────┼─────────────┼──────────────┼───────────────┘
           │             │              │
    ┌──────▼──────┐ ┌────▼──────┐ ┌────▼──────────┐
    │   Genkit    │ │  Firebase  │ │  Firebase     │
    │   AI Flows  │ │  Auth      │ │  Firestore    │
    │  (Google AI)│ │  (Google)  │ │  (Database)   │
    └─────────────┘ └───────────┘ └───────────────┘
```

---

## Architecture Layers

### 1. Presentation Layer

The presentation layer handles all user-facing interactions through React components organized within the Next.js App Router structure.

- **Pages**: Route-level components in `src/app/` that define the application's page hierarchy (landing, chat, catalog, onboarding, profile, progress, history, login).
- **UI Components**: Reusable primitives from shadcn/ui (`src/components/ui/`) providing accessible, styled form elements, dialogs, tabs, and data display components.
- **Feature Components**: Domain-specific components organized by feature area:
  - `chat/` - ChatWindow, ChatBubble, VoiceInput, MessageInput
  - `aurora/` - Aurora animated background effect
  - `common/` - ConsentModal, ThemeSwitcher
  - `auth/` - GoogleLoginButton
- **Styling**: Tailwind CSS 4 with custom glassmorphism design tokens, aurora gradient animations, and theme support via next-themes.

### 2. Application Logic Layer

This layer contains the core business logic, state management, and data orchestration.

- **State Management**: Jotai for atomic state management and TanStack React Query for server state synchronization and caching.
- **Custom Hooks**: `useUser`, `useToast`, `useMobile` for encapsulating reusable logic patterns.
- **Middleware**: Next.js middleware (`src/middleware.ts`) for authentication guards and route protection.
- **Context Providers**: ThemeProvider for light/dark mode, BookingContext-style patterns for feature state.

### 3. AI Integration Layer

The AI layer interfaces with Google Genkit to provide intelligent dermatology capabilities.

- **Genkit Configuration**: Central Genkit instance setup in `src/ai/genkit.ts` with Google AI plugin.
- **AI Flows**: Eight specialized flows in `src/ai/flows/`:
  - Conversational Diagnosis - Interactive chat-based diagnosis
  - Skin Condition Diagnosis - Direct text/image diagnosis
  - Skin Nutrition - Nutritional recommendations for skin health
  - Anti-Aging - Personalized anti-aging routines
  - Product Comparison - Compare products by price, rating, ingredients
  - Catalog Flow - Product catalog browsing and search
  - Onboarding Flow - New user setup and profile creation
  - TTS Flow - Text-to-speech for voice responses
- **Zod Schemas**: Type-safe input/output validation for each flow in `src/ai/schemas/`.
- **AI Tools**: Reusable tool definitions like `product-catalog-tool.ts` for structured AI data access.

### 4. Data Persistence Layer

Firebase provides the backend infrastructure for authentication and data storage.

- **Firebase Auth**: Google Sign-In integration for user authentication via `src/lib/firebase/client.ts` and `config.ts`.
- **Firestore**: NoSQL document database for storing user profiles, chat history, skin diagnosis records, progress tracking data, and product information.
- **Client SDK**: Firebase client-side SDK for real-time data synchronization and offline support.

---

## Component Architecture

### Page Hierarchy

```
/ (Landing Page)
├── /login              - Authentication page
├── /onboarding         - New user setup flow
├── /chat               - AI chat interface (doctor list)
│   └── /[doctor]       - Specific AI doctor chat
│       └── /history/[id] - Chat history detail
├── /catalog            - Product catalog browser
├── /profile            - User profile management
├── /progress           - Skincare progress tracker
├── /history            - Chat history overview
└── /scroll-video       - Scroll video demo page
```

### Component Communication

```
App Layout
├── ThemeProvider (context)
│   ├── Header / BottomNav
│   ├── Page Content
│   │   ├── ChatWindow → ChatBubble, MessageInput, VoiceInput
│   │   ├── CatalogPage → ProductCards
│   │   ├── ProgressPage → ProgressCharts
│   │   └── ProfilePage → UserSettings
│   └── Aurora Background
└── Toaster (notifications)
```

---

## AI Flow Architecture

### Flow Design Pattern

Each AI flow follows a consistent pattern:

```
User Input → Zod Schema Validation → Genkit Flow → Google AI Processing → Zod Output Validation → UI Response
```

### Flow Categories

**Diagnosis Flows**:
- `conversational-diagnosis-flow` - Multi-turn conversational diagnosis with follow-up questions
- `skin-condition-diagnosis` - Single-turn diagnosis from structured input

**Recommendation Flows**:
- `skin-nutrition-flow` - Nutritional advice based on skin profile
- `anti-aging-flow` - Anti-aging treatment recommendations
- `catalog-flow` - Product catalog search and filtering

**Utility Flows**:
- `product-comparison` - Side-by-side product comparison analysis
- `onboarding-flow` - Guided profile creation and initial assessment
- `tts-flow` - Convert text responses to speech output

### AI Tool Integration

AI flows can invoke tools for real-time data access:

- `product-catalog-tool` - Searches and retrieves product information from the catalog database

---

## Data Flow

### User Registration & Onboarding

1. User clicks Google Login button
2. Firebase Auth handles OAuth flow
3. On first login, user is redirected to onboarding
4. Onboarding flow collects skin type, concerns, and preferences
5. Profile data is saved to Firestore
6. User is redirected to main chat interface

### AI Chat Interaction

1. User sends a message (text, voice, or image) in the chat interface
2. Message is appended to the conversation state
3. The appropriate AI flow is invoked with the message and context
4. Genkit processes the input through Google AI models
5. AI may invoke tools (e.g., product catalog lookup) during processing
6. Structured response is validated against Zod output schema
7. Response is displayed in the chat interface with appropriate formatting
8. Conversation history is persisted to Firestore

### Product Comparison

1. User selects products to compare
2. Product data is fetched from the catalog
3. Comparison flow processes products through AI analysis
4. Results include price comparison, ingredient analysis, and labels
5. Comparison table is rendered in the UI with product cards

---

## Authentication & Authorization

- **Provider**: Firebase Authentication with Google Sign-In
- **Client Setup**: Firebase client SDK initialized in `src/lib/firebase/client.ts`
- **Configuration**: Firebase project settings in `src/lib/firebase/config.ts`
- **Route Protection**: Next.js middleware checks authentication state for protected routes
- **Session Management**: Firebase handles token refresh and session persistence automatically

---

## Security Considerations

- **Medical Disclaimer**: GlowPilot is explicitly positioned as a non-medical advisory tool. All diagnosis outputs include disclaimers and recommendations to consult a licensed dermatologist.
- **Data Privacy**: User data is stored in Firebase Firestore with appropriate security rules. Facial images used for skin analysis are processed transiently and not persisted on servers.
- **Consent Modal**: Users must acknowledge the advisory nature of the tool before using AI diagnosis features.
- **API Key Protection**: Sensitive API keys (Google AI, Firebase) are stored in environment variables and never exposed to the client bundle.
- **Input Validation**: All AI flow inputs are validated through Zod schemas before processing to prevent injection attacks.

---

## Technology Decisions

| Decision | Rationale |
|----------|-----------|
| Next.js 15 App Router | Server components, improved routing, built-in API routes |
| Google Genkit AI | Type-safe AI flow definitions, built-in tool integration, Google AI models |
| Firebase | Rapid backend setup, real-time sync, built-in auth, generous free tier |
| Jotai | Lightweight atomic state management, minimal boilerplate |
| TanStack React Query | Efficient server state management, caching, background updates |
| shadcn/ui | Accessible, customizable primitives, consistent design language |
| Tailwind CSS 4 | Utility-first styling, design system consistency, small bundle size |
| Zod | Runtime type validation, TypeScript integration, AI schema definitions |
| Vitest | Fast test runner, Vite-native, TypeScript support |

---

## Deployment Architecture

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐
│   Vercel     │     │   Firebase   │     │  Google AI    │
│   (Next.js)  │────▶│   (Auth +    │────▶│  (Genkit)     │
│   Hosting    │     │   Firestore) │     │  API          │
└─────────────┘     └──────────────┘     └───────────────┘
```

- **Frontend**: Deployed on Vercel with automatic builds from the main branch
- **Backend**: Firebase provides authentication and Firestore database services
- **AI Processing**: Google AI API handles all Genkit AI flow processing
- **Alternative**: Firebase App Hosting configuration available in `apphosting.yaml`

---

This project is part of the [HermesQuantOS](https://github.com/mulkymalikuldhrs/HermesQuantOS) ecosystem, developed by Mulky Malikul Dhaher.
