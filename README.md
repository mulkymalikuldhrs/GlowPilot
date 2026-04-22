# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. Powered by **NVIDIA NIM** and **Google AI**, it features a futuristic interface with glassmorphism and aurora animations.

## Core Features

- **AI Dermatologist**: Advanced diagnosis and personalized skincare routines using **NVIDIA Llama 3.2 90B Vision** and **Llama 3.1 Nemotron 70B**.
- **Product Scraper**: Automatically scrapes product data from e-commerce sites.
- **Voice Chat**: STT + TTS (Google Gemini 2.0 Flash) for a hands-free experience.
- **Responsive UI**: Next.js 15, Tailwind CSS 4, Light/Dark mode, and language toggle (🇮🇩/🇺🇸).
- **Product Comparison**: Compare products by price, rating, and ingredients.
- **User Profile**: Manages user profiles and history for a personalized experience.
- **Progress Tracking**: Track your skincare routine progress and set goals.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **AI Integration**: Genkit with NVIDIA NIM & Google AI
- **Styling**: Tailwind CSS 4
- **Database/Auth**: Firebase
- **State Management**: Jotai & TanStack Query

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
3.  Set up environment variables:
    Create a `.env` file with:
    - `NVIDIA_API_KEY`: Your NVIDIA NIM API key.
    - `GEMINI_API_KEY`: Your Google AI API key.
    - `NEXT_PUBLIC_FIREBASE_*`: Your Firebase project credentials.
4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributor

- **Mulky Malikul Dhaher** - AI & UX Visionary

## Contact

- Email: mulkymlikuldhr@mail.com
