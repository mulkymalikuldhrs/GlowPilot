# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, and is integrated with affiliate links for product purchases.

## Core Features

- **AI Dermatologist**: Powered by **NVIDIA NIM** (`llama-3.1-nemotron-70b-instruct` and `llama-3.2-90b-vision-instruct`) for expert-level diagnosis and personalized skincare routines.
- **Product Scraper**: AI-powered product discovery and catalog generation.
- **Voice Chat**: STT + TTS for a hands-free experience.
- **Responsive UI**: Light/Dark mode and language toggle (🇮🇩/🇺🇸).
- **Product Comparison**: Compare products by price, rating, and ingredients.
- **User Profile**: Manages user profiles and history for a personalized experience.
- **Progress Tracking**: Track your skincare routine progress and set goals.

## Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4, Radix UI.
- **AI Framework**: Genkit.
- **AI Models**:
    - **NVIDIA NIM** for multimodal analysis and reasoning.
    - **Google AI** for Text-to-Speech (TTS).
- **Backend**: Firebase (Firestore, Auth, App Hosting).

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
    Create a `.env.local` file with:
    ```bash
    GEMINI_API_KEY=your_gemini_api_key
    NVIDIA_API_KEY=your_nvidia_api_key
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
