# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. Powered by NVIDIA NIM and Genkit, it features a futuristic interface with glassmorphism and aurora animations.

## Core Features

- **AI Dermatologist**: AI Chat Dermatologist (Text & Voice) powered by **NVIDIA NIM** (Llama 3.1 & 3.2) for diagnosis and personalized skincare routines.
- **Multimodal Analysis**: Upload photos for visual skin analysis using Llama 3.2 90B Vision.
- **Product Scraper**: Automatically scrapes product data from e-commerce sites.
- **Voice Chat**: STT + TTS for a hands-free experience.
- **Responsive UI**: Light/Dark mode and language toggle (🇮🇩/🇺🇸).
- **Product Comparison**: Compare products by price, rating, and ingredients.
- **User Profile**: Manages user profiles and history for a personalized experience.
- **Progress Tracking**: Track your skincare routine progress and set goals.

## Technology Stack

- **Framework**: Next.js 15
- **AI Engine**: Google Genkit
- **AI Models**: NVIDIA NIM (Llama 3.1 Nemotron 70B, Llama 3.2 90B Vision)
- **Database/Auth**: Firebase
- **Styling**: Tailwind CSS 4, Shadcn/UI
- **Icons**: Lucide React

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
    Create a `.env` file with `NVIDIA_API_KEY`, `GEMINI_API_KEY`, and Firebase credentials.
4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributor

- **Mulky Malikul Dhaher** - AI & UX Visionary

## Contact

- Email: mulkymlikuldhr@mail.com