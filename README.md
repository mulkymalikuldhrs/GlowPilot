# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, and is integrated with affiliate links for product purchases.

## Core Features

- **AI Dermatologist**: AI Chat Dermatologist (Text & Voice) powered by NVIDIA NIM for diagnosis and personalized skincare routines.
- **Multimodal Analysis**: Advanced skin condition diagnosis using vision-based AI models.
- **Product Scraper**: Automatically scrapes product data from e-commerce sites.
- **Voice Chat**: STT + TTS (Google AI) for a hands-free experience.
- **Responsive UI**: Next.js 15 + Tailwind CSS 4 with glassmorphism and light/dark mode.
- **Product Comparison**: Compare products by price, rating, and ingredients using specialized AI flows.
- **User Profile**: Manages user profiles and history for a personalized experience.
- **Progress Tracking**: Track your skincare routine progress and set goals.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **AI Engine**: Genkit
- **AI Models**:
  - **NVIDIA NIM**: Llama 3.1 Nemotron (Text), Llama 3.2 Vision (Multimodal)
  - **Google AI**: Gemini (TTS/STT)
- **Styling**: Tailwind CSS 4
- **Backend**: Firebase (Auth, Firestore, Storage)
- **State Management**: Jotai, TanStack Query

## Getting Started

To run the project locally:

1.  Clone the repository:
    ```bash
    git clone https://github.com/mulkymalikuldhrs/GlowPilot_2.0.git
    ```
2.  Install dependencies:
    ```bash
    npm install --legacy-peer-deps
    ```
3.  Set up environment variables in `.env`:
    ```env
    GEMINI_API_KEY=your_key1,your_key2
    NVIDIA_API_KEY=your_key
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    ...
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributor

- **Mulky Malikul Dhaher** - AI & UX Visionary

## Contact

- Email: mulkymlikuldhr@mail.com
