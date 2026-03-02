# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, and is integrated with affiliate links for product purchases.

## Core Features

- **AI Dermatologist Powered by NVIDIA NIM**: Enhanced AI Chat Dermatologist (Text & Voice) using `llama-3.1-nemotron-70b-instruct` for superior diagnosis and personalized skincare routines.
- **Product Scraper**: Automatically scrapes product data from e-commerce sites.
- **Voice Chat**: STT + TTS (using Gemini) for a hands-free experience.
- **Responsive UI**: Light/Dark mode and language toggle (🇮🇩/🇺🇸).
- **Product Comparison**: Compare products by price, rating, and ingredients.
- **User Profile**: Manages user profiles and history for a personalized experience.
- **Progress Tracking**: Track your skincare routine progress and set goals.

## Tech Stack

- **Framework**: Next.js 15
- **AI Orchestration**: Genkit
- **LLM Providers**: NVIDIA NIM (Llama 3.1 Nemotron), Google Gemini (TTS)
- **Styling**: Tailwind CSS 4, Radix UI
- **Database/Auth**: Firebase

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
3.  Set up environment variables in `.env`:
    ```env
    GEMINI_API_KEY=your_gemini_keys_separated_by_comma
    NVIDIA_API_KEY=your_nvidia_keys_separated_by_comma
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    # (other firebase vars)
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
