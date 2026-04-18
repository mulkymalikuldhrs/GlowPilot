# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. Powered by **NVIDIA NIM** and **Google Gemini**, it features a futuristic interface with glassmorphism and aurora animations.

## Core Features

- **AI Dermatologist**: AI Chat Dermatologist (Text & Voice) for diagnosis and personalized skincare routines.
- **Product Scraper**: Automatically scrapes product data from e-commerce sites.
- **Voice Chat**: STT + TTS for a hands-free experience.
- **Responsive UI**: Light/Dark mode and language toggle (🇮🇩/🇺🇸).
- **Product Comparison**: Compare products by price, rating, and ingredients.
- **User Profile**: Manages user profiles and history for a personalized experience.
- **Progress Tracking**: Track your skincare routine progress and set goals.

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
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

The following environment variables are required:

- `GEMINI_API_KEY`: Your Google AI API key(s).
- `NVIDIA_API_KEY`: Your NVIDIA NIM API key(s).
- `NEXT_PUBLIC_FIREBASE_*`: Your Firebase project configuration.

## Tech Stack

- **Framework**: Next.js 15
- **AI Orchestration**: Firebase Genkit
- **LLMs**: NVIDIA NIM (Llama 3.1/3.2), Google Gemini 2.0 Flash
- **Styling**: Tailwind CSS 4
- **Database**: Firebase Firestore
- **Icons**: Lucide React

## Contributor

- **Mulky Malikul Dhaher** - AI & UX Visionary

## Contact

- Email: mulkymlikuldhr@mail.com