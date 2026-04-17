# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, and is integrated with affiliate links for product purchases.

## Core Features

- **Advanced AI Models**: Powered by NVIDIA NIM and Google Gemini.
    - **Llama 3.1 Nemotron 70B**: For highly accurate text-based diagnosis and advice.
    - **Llama 3.2 90B Vision**: For detailed analysis of skin condition photos.
    - **Gemini 2.0 Flash**: For high-quality text-to-speech (TTS) capabilities.
- **AI Dermatologist**: AI Chat Dermatologist (Text & Voice) for diagnosis and personalized skincare routines.
- **Product Scraper**: Automatically scrapes product data from e-commerce sites.
- **Voice Chat**: STT + TTS for a hands-free experience.
- **Responsive UI**: Light/Dark mode and language toggle (🇮🇩/🇺🇸).
- **Product Comparison**: Compare products by price, rating, and ingredients.
- **User Profile**: Manages user profiles and history for a personalized experience.
- **Progress Tracking**: Track your skincare routine progress and set goals.

## Tech Stack

- **Framework**: Next.js 15
- **AI Orchestration**: Genkit
- **Styling**: Tailwind CSS 4
- **Database/Auth**: Firebase
- **AI Providers**: NVIDIA NIM, Google AI

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
3.  Set up environment variables:
    Create a `.env` file with your `GEMINI_API_KEY` and `NVIDIA_API_KEY`.
4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributor

- **Mulky Malikul Dhaher** - AI & UX Visionary

## Contact

- Email: mulkymlikuldhr@mail.com
