# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, and is integrated with affiliate links for product purchases.

## AI Engine

GlowPilot is powered by **Genkit** and integrated with **NVIDIA NIM** (NVIDIA Inference Microservices) and **Google Gemini** for high-performance AI inference.

- **Vision Models**: Uses `meta/llama-3.2-90b-vision-instruct` via NVIDIA NIM for advanced skin analysis from photos.
- **Text Models**: Uses `nvidia/llama-3.1-nemotron-70b-instruct` via NVIDIA NIM for conversational diagnosis and routine generation.
- **Multimodal**: Integrated with Google Gemini for advanced reasoning and specialized tasks.
- **Dynamic Key Rotation**: Supports multiple API keys for both NVIDIA and Google Gemini to ensure high availability and scalability.

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

## Contributor

- **Mulky Malikul Dhaher** - AI & UX Visionary

## Contact

- Email: mulkymlikuldhr@mail.com