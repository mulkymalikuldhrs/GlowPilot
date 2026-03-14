# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, and is integrated with affiliate links for product purchases.

## Core Features

- **AI Dermatologist**: AI Chat Dermatologist (Text & Voice) powered by **NVIDIA NIM (Llama 3.1/3.2)** for diagnosis and personalized skincare routines.
- **Vision AI**: Advanced skin analysis using **Llama 3.2 90B Vision Instruct** to provide preliminary observations from photos.
- **Product Scraper**: Automatically finds and recommends skincare products from e-commerce sites like Shopee and Tokopedia.
- **Voice Chat**: STT + TTS for a hands-free experience.
- **Responsive UI**: Light/Dark mode and language toggle (🇮🇩/🇺🇸).
- **Product Comparison**: Compare products by price, rating, and ingredients.
- **User Profile**: Manages user profiles and history for a personalized experience.
- **Progress Tracking**: Track your skincare routine progress and set goals.

## Tech Stack

- **Framework**: Next.js 15
- **AI Orchestration**: Genkit
- **LLM Providers**: NVIDIA NIM (Llama 3.1 70B & 3.2 90B Vision), Google Gemini
- **Database/Auth**: Firebase & Firestore
- **Styling**: Tailwind CSS 4 & Shadcn UI
- **Icons**: Lucide React

## Getting Started

To run the project locally:

1.  Clone the repository:
    ```bash
    git clone https://github.com/mulkymalikuldhaher/GlowPilot_2.0.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables:
    Create a `.env` file with:
    - `GEMINI_API_KEY`
    - `NVIDIA_API_KEY`
    - Firebase configuration variables
4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributor

- **Mulky Malikul Dhaher** - AI & UX Visionary

## Contact

- Email: mulkymlikuldhr@mail.com
