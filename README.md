# GlowPilot Copilot 2.0

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations.

## 🚀 Version 2.0 Upgrade
This version introduces high-performance AI inference powered by **NVIDIA NIM**, enabling faster and more accurate skin analysis.

### New Features
- **NVIDIA NIM Integration**: Utilizes `llama-3.1-nemotron-70b-instruct` and `llama-3.2-90b-vision-instruct` for superior diagnosis.
- **Tailwind CSS 4**: Modernized styling engine for a smoother, faster UI.
- **Dynamic Key Rotation**: Enhanced reliability with multi-key support for AI providers.
- **Enhanced Vision**: Improved photo analysis for more accurate preliminary diagnoses.

## Core Features
- **AI Dermatologist**: AI Chat Dermatologist (Text & Voice) for diagnosis and personalized skincare routines.
- **Product Scraper**: Automatically structures product data from e-commerce sites.
- **Voice Chat**: STT + TTS for a hands-free experience.
- **Responsive UI**: Glassmorphism and aurora animations with light/dark mode support.
- **Product Comparison**: Compare products by price, rating, and ingredients.
- **Progress Tracking**: Track your skincare routine progress and set goals.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **AI Engine**: Genkit
- **AI Models**: NVIDIA NIM (Llama 3.1 & 3.2), Google Gemini
- **Styling**: Tailwind CSS 4
- **Database**: Firebase (Firestore & Auth)

## Getting Started

1.  Clone the repository:
    ```bash
    git clone https://github.com/mulkymalikuldhrs/GlowPilot_2.0.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables in `.env`:
    ```env
    NVIDIA_API_KEY=your_nvidia_api_key
    GEMINI_API_KEY=your_gemini_api_key
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

## Contributor
- **Mulky Malikul Dhaher** - AI & UX Visionary
