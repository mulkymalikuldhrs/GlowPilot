# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, and is integrated with affiliate links for product purchases.

## Core Features

- **AI Dermatologist**: Powered by NVIDIA NIM and Google Gemini for precise diagnosis and personalized skincare routines.
- **Advanced AI Models**:
  - **Text**: Llama 3.1 Nemotron 70B Instruct (via NVIDIA NIM)
  - **Vision**: Llama 3.2 90B Vision Instruct (via NVIDIA NIM)
  - **TTS**: Gemini 2.0 Flash (via Google AI)
- **Product Scraper**: Automatically scrapes product data from e-commerce sites.
- **Voice Chat**: STT + TTS for a hands-free experience.
- **Responsive UI**: Next.js 15 with Tailwind CSS 4, glassmorphism, and aurora animations.
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
3.  Set up environment variables:
    Create a `.env` file with:
    ```env
    GEMINI_API_KEY=your_gemini_api_key
    NVIDIA_API_KEY=your_nvidia_api_key
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **AI Core**: Genkit with NVIDIA NIM & Google AI
- **Styling**: Tailwind CSS 4, Framer Motion
- **Database/Auth**: Firebase
- **State Management**: Jotai

## Contributor

- **Mulky Malikul Dhaher** - AI & UX Visionary

## Contact

- Email: mulkymlikuldhr@mail.com
