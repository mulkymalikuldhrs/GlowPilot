# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, powered by state-of-the-art AI models including NVIDIA NIM and Google Gemini.

## Core Features

- **AI Dermatologist**: AI Chat Dermatologist (Text & Voice) for diagnosis and personalized skincare routines, powered by NVIDIA NIM (Llama 3.2 90B Vision & Llama 3.1 Nemotron).
- **Product Scraper**: Automatically generates product recommendations and structures data for the catalog.
- **Voice Chat**: STT + TTS (Gemini-based) for a hands-free experience.
- **Responsive UI**: Built with Tailwind CSS 4, featuring Light/Dark mode and glassmorphism.
- **Product Comparison**: Compare products by price, rating, and ingredients.
- **User Profile**: Manages user profiles and history for a personalized experience.
- **Progress Tracking**: Track your skincare routine progress and set goals.

## Tech Stack

- **Framework**: Next.js 15
- **AI Engine**: Genkit
- **LLM Providers**: NVIDIA NIM (Meta Llama 3.2 90B Vision, NVIDIA Llama 3.1 Nemotron 70B), Google AI (Gemini 2.5 Flash for TTS)
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
    npm install
    ```
3.  Configure environment variables:
    Create a `.env` file based on `.env.example` and provide your API keys.
4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

- `GEMINI_API_KEY`: API key for Google AI (multiple keys can be comma-separated for rotation).
- `NVIDIA_API_KEY`: API key for NVIDIA NIM.
- `NEXT_PUBLIC_FIREBASE_*`: Your Firebase configuration values.

## Contributor

- **Mulky Malikul Dhaher** - AI & UX Visionary

## Contact

- Email: mulkymlikuldhr@mail.com
