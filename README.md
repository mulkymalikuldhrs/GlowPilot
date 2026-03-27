# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, and is integrated with affiliate links for product purchases.

## Tech Stack
- **Next.js 15 (App Router)**
- **Tailwind CSS 4**
- **Genkit 1.16**
- **NVIDIA NIM (NVIDIA AI Enterprise)**
- **Google Gemini (TTS & Multimodal)**
- **Firebase/Firestore**
- **Lucide React Icons**

## Core Features

- **AI Dermatologist**: AI Chat Dermatologist (Text & Voice) powered by **NVIDIA NIM** models for diagnosis and personalized skincare routines.
- **Vision-Based Diagnosis**: Analyzes skin conditions from user-uploaded photos using `llama-3.2-90b-vision-instruct`.
- **Advanced Text Generation**: High-quality skincare recommendations powered by `llama-3.1-nemotron-70b-instruct`.
- **Product Scraper**: Automatically scrapes product data from e-commerce sites like Shopee and Tokopedia.
- **Voice Chat**: STT + TTS for a hands-free experience using Google Gemini.
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
3.  Set up your environment variables (create a `.env` file):
    ```env
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
