# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, and is integrated with affiliate links for product purchases.

## Core Features

- **AI Dermatologist**: AI Chat Dermatologist (Text & Voice) powered by **NVIDIA NIM** for diagnosis and personalized skincare routines.
- **Vision Integration**: Multi-modal analysis of skin photos using `llama-3.2-90b-vision-instruct`.
- **Product Scraper**: Automatically scrapes product data from e-commerce sites.
- **Voice Chat**: STT + TTS for a hands-free experience.
- **Responsive UI**: Light/Dark mode and language toggle (🇮🇩/🇺🇸). Built with **Tailwind CSS 4**.
- **Product Comparison**: Compare products by price, rating, and ingredients.
- **User Profile**: Manages user profiles and history for a personalized experience.
- **Progress Tracking**: Track your skincare routine progress and set goals.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **AI Engine**: Genkit with NVIDIA NIM
- **Styling**: Tailwind CSS 4
- **Database/Auth**: Firebase
- **State Management**: Jotai & React Query

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
    Create a `.env` file with the following:
    ```
    NVIDIA_API_KEY=your_nvidia_api_key
    GEMINI_API_KEY=your_gemini_api_key
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    # (Other Firebase vars)
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
