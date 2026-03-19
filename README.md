# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that leverages high-performance AI models, including NVIDIA NIM (NVIDIA Inference Microservices), to analyze skin conditions (via chat, voice, or photo) and provide personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, and is integrated with affiliate links for product purchases.

## AI Infrastructure

This project uses **NVIDIA NIM** (NVIDIA Inference Microservices) and **Google Genkit** to power its AI capabilities:
- **Vision Models**: `meta/llama-3.2-90b-vision-instruct` (NVIDIA NIM) for precise skin condition diagnosis from photos.
- **Text Models**: `nvidia/llama-3.1-nemotron-70b-instruct` (NVIDIA NIM) for empathetic, natural-language conversations and expert skincare advice.
- **Dynamic API Rotation**: Built-in support for comma-separated API keys in environment variables to ensure high availability and rotation.

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
3.  Configure environment variables in `.env`:
    ```bash
    NVIDIA_API_KEY=your_nvidia_api_key_1,your_nvidia_api_key_2
    GEMINI_API_KEY=your_gemini_api_key
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributor

- **Mulky Malikul Dhaher** - AI & UX Visionary

## Contact

- Email: mulkymlikuldhr@mail.com