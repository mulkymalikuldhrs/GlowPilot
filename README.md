# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, and is integrated with affiliate links for product purchases.

## Core Features

- **AI Dermatologist (Powered by NVIDIA NIM)**: Advanced AI analysis using `llama-3.1-nemotron-70b-instruct` and `llama-3.2-90b-vision-instruct` for highly accurate diagnoses and personalized routines.
- **Vision-Based Analysis**: Analyze skin conditions directly from photos using state-of-the-art vision models.
- **Conversational Diagnosis**: Empathetic multi-turn chat to understand your skin concerns deeply.
- **Product Scraper & Catalog**: Automatically finds relevant products from Indonesian e-commerce (Shopee, Tokopedia) with affiliate link generation.
- **Voice Chat**: Hands-free experience with STT and TTS (powered by Gemini).
- **Progress Tracking**: Set and track skin health goals with AI-guided milestones.
- **Responsive UI**: Modern, futuristic design with Tailwind CSS 4, Glassmorphism, and Aurora effects.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **AI Orchestration**: Genkit
- **AI Models**: NVIDIA NIM (Llama 3.1 & 3.2), Google AI (Gemini)
- **Styling**: Tailwind CSS 4
- **Backend/DB**: Firebase (Firestore, Auth)
- **State Management**: Jotai

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
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
    NEXT_PUBLIC_FIREBASE_APP_ID=...
    GEMINI_API_KEY=...
    NVIDIA_API_KEY=...
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
