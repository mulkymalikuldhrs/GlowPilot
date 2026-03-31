# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, and is integrated with affiliate links for product purchases.

## Core Features

- **AI Dermatologist**: Powered by NVIDIA NIM (Llama 3.2 Vision & Llama 3.1 Nemotron) for advanced diagnosis and personalized skincare routines.
- **Product Scraper**: Automatically scrapes product data from e-commerce sites.
- **Voice Chat**: STT + TTS (via Gemini 2.0 Flash) for a hands-free experience.
- **Responsive UI**: Light/Dark mode and language toggle (🇮🇩/🇺🇸).
- **Product Comparison**: Compare products by price, rating, and ingredients.
- **User Profile**: Manages user profiles and history for a personalized experience.
- **Progress Tracking**: Track your skincare routine progress and set goals.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **AI Orchestration**: Genkit
- **AI Models**:
  - NVIDIA NIM (Llama 3.2 90B Vision Instruct, Llama 3.1 Nemotron 70B Instruct)
  - Google AI (Gemini 2.0 Flash Preview TTS)
- **Database**: Firebase (Firestore & Auth)
- **Styling**: Tailwind CSS 4, Framer Motion

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
    NVIDIA_API_KEY=your_nvidia_api_key
    GEMINI_API_KEY=your_gemini_api_key
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
