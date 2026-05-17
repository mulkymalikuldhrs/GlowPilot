# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, powered by NVIDIA NIM and Genkit.

## Core Features

- **AI Dermatologist (NVIDIA NIM)**: AI Chat Dermatologist (Text & Voice) for diagnosis and personalized skincare routines using \`llama-3.1-nemotron-70b-instruct\` and \`llama-3.2-90b-vision-instruct\`.
- **Product Scraper**: Automatically scrapes product data from e-commerce sites.
- **Voice Chat**: STT + TTS for a hands-free experience.
- **Responsive UI**: Next.js 15 + Tailwind CSS 4 with Light/Dark mode and language toggle (🇮🇩/🇺🇸).
- **Product Comparison**: Compare products by price, rating, and ingredients.
- **User Profile**: Manages user profiles and history for a personalized experience.
- **Progress Tracking**: Track your skincare routine progress and set goals.

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS 4
- **AI Orchestration**: Genkit
- **AI Models**: NVIDIA NIM (Llama 3.1 & 3.2)
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
3.  Set up environment variables:
    Create a \`.env\` file with the following:
    ```
    GEMINI_API_KEY=your_gemini_key
    NVIDIA_API_KEY=your_nvidia_key
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    ...
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
