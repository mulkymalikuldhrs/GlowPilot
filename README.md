# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, and is integrated with affiliate links for product purchases.

## Core Features

- **AI Dermatologist**: Powered by NVIDIA NIM and Gemini for high-performance skin diagnosis and personalized skincare routines.
- **Vision Analysis**: Advanced skin condition detection using `llama-3.2-90b-vision-instruct`.
- **Conversational Intelligence**: Natural multi-turn dialogue powered by `llama-3.1-nemotron-70b-instruct`.
- **Product Scraper**: Automatically scrapes product data from e-commerce sites.
- **Voice Chat**: STT + TTS for a hands-free experience.
- **Responsive UI**: Light/Dark mode and language toggle (🇮🇩/🇺🇸).
- **Product Comparison**: Compare products by price, rating, and ingredients.
- **User Profile**: Manages user profiles and history for a personalized experience.
- **Progress Tracking**: Track your skincare routine progress and set goals.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **AI Integration**: Genkit
- **LLM Providers**: NVIDIA NIM (Llama 3.1 & 3.2), Google Gemini
- **Database**: Firebase (Firestore & Storage)
- **Styling**: Tailwind CSS 4
- **State Management**: Jotai

## Getting Started

To run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mulkymalikuldhrs/GlowPilot_2.0.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Environment Setup:**
    Create a `.env` file and add your API keys (supports comma-separated keys for rotation):
    ```env
    GEMINI_API_KEY=your_gemini_key
    NVIDIA_API_KEY=your_nvidia_key
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
5.  **Open [http://localhost:3000](http://localhost:3000)** with your browser to see the result.

## Contributor

- **Mulky Malikul Dhaher** - AI & UX Visionary

## Contact

- Email: mulkymlikuldhr@mail.com
