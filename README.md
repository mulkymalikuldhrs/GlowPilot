# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, and is integrated with affiliate links for product purchases.

## 🚀 Recent Upgrades (v2.0)

- **NVIDIA NIM Integration**: Fully powered by NVIDIA NIM (Llama 3.1 & 3.2) for lightning-fast and accurate AI analysis.
- **Enhanced AI Flows**: Specialized models for different tasks:
    - **Text Analysis**: `llama-3.1-nemotron-70b-instruct`
    - **Vision/Multimodal**: `llama-3.2-90b-vision-instruct`
- **Genkit 1.16**: Upgraded to the latest Genkit for better reliability and performance.
- **Improved UI**: Refined glassmorphism effects and accessibility improvements.

## Core Features

- **AI Dermatologist**: AI Chat Dermatologist (Text & Voice) powered by NVIDIA NIM for diagnosis and personalized skincare routines.
- **Product Scraper**: Automatically scrapes product data from e-commerce sites (Shopee/Tokopedia).
- **Voice Chat**: STT + TTS (Gemini Flash 2.0) for a hands-free experience.
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
3.  Set up environment variables:
    Create a `.env` file and add your API keys:
    ```env
    NVIDIA_API_KEY=your_nvidia_api_key
    GEMINI_API_KEY=your_gemini_api_key
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
