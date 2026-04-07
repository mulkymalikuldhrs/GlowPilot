# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, and is integrated with affiliate links for product purchases.

## New in Version 0.2.0: NVIDIA NIM Integration

GlowPilot now leverages **NVIDIA NIM** (NVIDIA Inference Microservices) to provide faster, more accurate, and more secure AI-driven dermatology insights.

- **Advanced Vision Analysis:** Using `meta/llama-3.2-90b-vision-instruct` for superior skin condition diagnosis from photos.
- **Improved Conversational Intelligence:** Powered by `nvidia/llama-3.1-nemotron-70b-instruct` for more empathetic and precise text-based consultations.
- **Hybrid AI Architecture:** Optimized performance using a combination of NVIDIA NIM for core logic and Google Gemini for specialized tasks like Text-to-Speech (TTS).

## Core Features

- **AI Dermatologist**: AI Chat Dermatologist (Text & Voice) for diagnosis and personalized skincare routines.
- **NVIDIA NIM Powered**: State-of-the-art LLMs for better analysis and faster responses.
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
3.  Set up your environment variables:
    - `GEMINI_API_KEY`: For TTS functionality.
    - `NVIDIA_API_KEY`: For core AI logic and vision analysis.
4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributor

- **Mulky Malikul Dhaher** - AI & UX Visionary

## Contact

- Email: mulkymlikuldhr@mail.com
