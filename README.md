# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, and is integrated with affiliate links for product purchases.

## Core Features

- **AI Dermatologist**: Powered by **NVIDIA NIM** (Llama 3.1 & 3.2), offering advanced text and vision-based diagnosis.
- **Product Scraper**: Automatically generates product data and affiliate links for e-commerce sites like Shopee.
- **Voice Chat**: STT + TTS for a hands-free experience.
- **Responsive UI**: Next.js 15 with Tailwind CSS 4, supporting Light/Dark mode and language toggle (🇮🇩/🇺🇸).
- **Product Comparison**: Compare products by price, rating, and ingredients.
- **User Profile**: Manages user profiles and history for a personalized experience.
- **Progress Tracking**: Track your skincare routine progress and set goals.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **AI Orchestration**: [Firebase Genkit](https://github.com/firebase/genkit)
- **AI Models**: NVIDIA NIM (Llama 3.1 Nemotron 70B, Llama 3.2 90B Vision)
- **Database/Auth**: [Firebase](https://firebase.google.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Jotai](https://jotai.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

- `GEMINI_API_KEY`: Google AI API key (for fallback/TTS)
- `NVIDIA_API_KEY`: NVIDIA NIM API key
- `NEXT_PUBLIC_FIREBASE_API_KEY`: Firebase API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Firebase Auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Firebase project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: Firebase storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: Firebase messaging sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID`: Firebase app ID

## Getting Started

1.  Clone the repository:
    ```bash
    git clone https://github.com/mulkymalikuldhrs/GlowPilot_2.0.git
    ```
2.  Install dependencies:
    ```bash
    npm install --legacy-peer-deps
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributor

- **Mulky Malikul Dhaher** - AI & UX Visionary

## Contact

- Email: mulkymlikuldhr@mail.com