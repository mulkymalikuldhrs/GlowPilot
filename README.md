# GlowPilot Copilot 2.0

GlowPilot Copilot is a virtual AI dermatology platform that analyzes skin conditions (via chat, voice, or photo) and provides personalized skincare routine recommendations. It features a futuristic interface with glassmorphism and aurora animations, and is integrated with affiliate links for product purchases.

## Core Features

- **AI Dermatologist**: AI Chat Dermatologist (Text & Voice) powered by **NVIDIA NIM** for diagnosis and personalized skincare routines.
- **Advanced Vision Analysis**: Uses `llama-3.2-90b-vision-instruct` via NVIDIA NIM for precise skin condition analysis from photos.
- **Smart Conversational Diagnosis**: Multi-turn AI chat powered by `llama-3.1-nemotron-70b-instruct` to understand user concerns deeply.
- **Product Scraper**: Automatically scrapes product data from e-commerce sites.
- **Voice Chat**: STT + TTS for a hands-free experience.
- **Responsive UI**: Next.js 15, Tailwind CSS 4, glassmorphism design, and light/dark mode support.
- **Product Comparison**: Compare products by price, rating, and ingredients with AI-driven insights.
- **User Profile**: Manages user profiles and history for a personalized experience.
- **Progress Tracking**: Track your skincare routine progress and set goals.

## Technical Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS 4, Lucide React.
- **AI Framework**: Genkit 1.x.
- **AI Models**:
    - **NVIDIA NIM**: `llama-3.2-90b-vision-instruct` (Vision), `llama-3.1-nemotron-70b-instruct` (Chat/Text).
    - **Google AI**: `gemini-2.0-flash-preview-tts` (TTS).
- **Backend/Database**: Firebase (Firestore, Auth).
- **State Management**: Jotai, TanStack Query.

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
3.  Configure environment variables:
    Create a `.env` file with:
    ```
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
