# GlowPilot Copilot

GlowPilot Copilot is a next-generation AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, powered by NVIDIA NIM and Google AI.

## Core Features

- **AI Dermatologist Powered by NVIDIA NIM**: Advanced diagnosis and personalized skincare routines using `llama-3.1-nemotron-70b-instruct` and `llama-3.2-90b-vision-instruct`.
- **Intelligent Product Scraper**: Automatically identifies and provides data for high-quality skincare products.
- **Multimodal Interaction**: Chat via text, voice (STT + TTS), or photo analysis.
- **Modern UI/UX**: Built with Next.js 15, Tailwind CSS 4, and glassmorphic design principles.
- **Product Comparison & Tracking**: Compare products by ingredients and price, and track your skincare progress over time.

## Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **AI Orchestration**: [Genkit](https://firebase.google.com/docs/genkit)
- **AI Models**: NVIDIA NIM (Llama 3.1/3.2), Google AI (Gemini for TTS)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Backend/Auth**: [Firebase](https://firebase.google.com/)
- **State Management**: [Jotai](https://jotai.org/) & [TanStack Query](https://tanstack.com/query/latest)

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
    Create a `.env` file based on `.env.example` and add your `NVIDIA_API_KEY`, `GEMINI_API_KEY`, and Firebase credentials.
4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributor

- **Mulky Malikul Dhaher** - AI & UX Visionary

## Contact

- Email: mulkymlikuldhr@mail.com
