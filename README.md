# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. Powered by **NVIDIA NIM** and **Genkit**, it features a futuristic interface with glassmorphism and aurora animations.

## Core Features

- **AI Dermatologist**: Advanced diagnosis and personalized skincare routines using **NVIDIA Llama 3.2 90B Vision** and **Nemotron 70B**.
- **Product Scraper**: Automatically finds relevant skincare products with affiliate links.
- **Voice Chat**: STT + TTS (Gemini-powered) for a hands-free experience.
- **Next.js 15 & Tailwind 4**: Built with the latest web technologies for speed and modern styling.
- **Responsive UI**: Glassmorphic design with Light/Dark mode and language toggle (🇮🇩/🇺🇸).
- **Progress Tracking**: Set goals and track your skincare journey.

## AI Infrastructure

This project leverages **NVIDIA NIM** for high-performance AI inference:
- **Vision Tasks**: `meta/llama-3.2-90b-vision-instruct`
- **Text Tasks**: `nvidia/llama-3.1-nemotron-70b-instruct`
- **Speech**: `googleai/gemini-2.5-flash-preview-tts`

## Getting Started

1.  Clone the repository:
    ```bash
    git clone https://github.com/mulkymalikuldhrs/GlowPilot_2.0.git
    ```
2.  Install dependencies:
    ```bash
    npm install --legacy-peer-deps
    ```
3.  Set up environment variables (`.env`):
    ```
    NVIDIA_API_KEY=your_key_here
    GEMINI_API_KEY=your_key_here
    NEXT_PUBLIC_FIREBASE_...=your_firebase_config
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Contributor

- **Mulky Malikul Dhaher** - AI & UX Visionary

## Contact

- Email: mulkymlikuldhr@mail.com
