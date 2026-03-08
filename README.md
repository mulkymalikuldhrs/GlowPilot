# GlowPilot Copilot

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, and is integrated with affiliate links for product purchases.

## Core Features

- **NVIDIA NIM Integration**: Powered by NVIDIA's high-performance inference microservices for fast and accurate AI responses.
- **AI Dermatologist**: AI Chat Dermatologist (Text & Voice) for diagnosis and personalized skincare routines.
- **Vision-Powered Diagnosis**: Multimodal AI for preliminary skin issue analysis using Llama 3.2 90B Vision.
- **Product Scraper**: Automatically scrapes product data from e-commerce sites.
- **Voice Chat**: STT + TTS for a hands-free experience.
- **Responsive UI**: Light/Dark mode and language toggle (🇮🇩/🇺🇸) with Tailwind CSS 4.
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
3.  Set up environment variables in `.env`:
    ```env
    NVIDIA_API_KEY=your_nvidia_api_key_here
    GEMINI_API_KEY=your_gemini_api_key_here (optional, for some specific flows)
    ```
    *Note: You can provide multiple keys separated by commas for dynamic rotation.*
4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack
- **Next.js 15** (App Router)
- **Firebase** (Authentication & Firestore)
- **Genkit** (AI Framework)
- **NVIDIA NIM** (LLM Provider)
- **Tailwind CSS 4**
- **Lucide React** (Icons)
- **Framer Motion** (Animations)

## Contributor

- **Mulky Malikul Dhaher** - AI & UX Visionary

## Contact

- Email: mulkymlikuldhr@mail.com
