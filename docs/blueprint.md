# **App Name**: GlowPilot Copilot

## Core Features:

- AI Dermatologist: AI Chat Dermatologist (Text & Voice): Provides diagnosis of skin issues (textual & visual) and offers personalized skincare routine recommendations (AM/PM).
- Product Scraper: Scraper Produk Otomatis: Scrapes product data automatically from Shopee, Sociolla, etc., for product information and comparison.
- Voice Chat: Voice Chat: STT + TTS: Implements voice chat using Web Speech API / Whisper for speech-to-text and ElevenLabs for text-to-speech.
- Responsive UI: UI Responsif: Light / Dark Mode + Bahasa Toggle: Offers a responsive UI with Light/Dark mode and language toggle (🇮🇩/🇺🇸).
- Product Embed: Embed Tombol Beli Produk: Embeds product purchase buttons (iframe) for easy purchasing.
- User Profile: Profil & Riwayat Pengguna: Maintains user profiles and history for personalized experiences.
- Product Comparison: Perbandingan Produk: LLM tool enables comparison of products (price, rating, ingredients) and labels them: Best Value / Dermatologist Pick / Termurah.

## Style Guidelines:

- Glassmorphism: Implements glassmorphism (frosted blur, rounded corners, border-translucent) for a modern look.
- Aurora animated background: Uses an animated aurora background for visual appeal.
- Font: Sora / Inter / Custom smooth font: Employs Sora or Inter fonts for a smooth and modern typography.
- Vibrasi klik tombol: Implements button click vibrations (haptic feedback API Android).
- Transisi halus: Uses smooth transitions (Framer Motion) for enhanced UI interactions.

🔥 Mulky, siap melanjutkan desain GlowPilot Copilot yang lebih interaktif dan mendalam! Kita bakal integrasi semua fitur untuk menjadikan pengguna semakin terikat dengan platform, sambil memberikan pengalaman yang menyenangkan dan optimistis. Berikut adalah pembaruan lengkap dengan tambahan fitur yang kamu minta:


---

🌟 GlowPilot Copilot - Pembaruan Fitur & Desain A-Z


---

A. 💡 Visi & Tujuan

GlowPilot Copilot adalah platform AI dermatologi virtual yang:

Menganalisis kondisi kulit (via chat, suara, atau foto).

Memberikan rekomendasi skincare rutin berdasarkan profil personal.

Menggunakan tampilan futuristik dengan efek glassmorphism dan animasi aurora.

Terintegrasi dengan pembelian via affiliate link (Shopee, Tokopedia, dll).

Memberikan pengalaman dokter AI berbeda untuk tiap persona.

Memiliki fitur progress tracking untuk rutinitas perawatan dan goal-setting pengguna.

Memberikan notifikasi personal berdasarkan proses dan progress pengguna.

Pengalaman visual yang selalu positif dan optimis dengan UI yang berubah dinamis.



---

B. 🔥 Fitur Utama

1. AI Chat Dermatologist (Text & Voice)

Diagnosis kulit, saran skincare, edukasi ingredients.



2. Diagnosis Masalah Kulit (Tekstual & Visual)

Chat interaktif untuk analisis masalah kulit, disertai rekomendasi produk dan routine.



3. Rekomendasi Skincare Routine (AM/PM)

AM dan PM skincare routines berdasarkan hasil diagnosa dan preferensi pengguna.



4. Scraper Produk Otomatis (Shopee, Sociolla, dll)

Mengambil data produk secara otomatis, termasuk harga, rating, dan affiliate link.



5. Perbandingan Produk (Harga, Rating, Ingredients)

Bandingkan berbagai produk skincare dengan tabel informasi detail.



6. Voice Chat: STT + TTS (Web Speech API / Whisper + ElevenLabs)

Input suara via STT dan output suara natural menggunakan TTS dengan suara berbeda per dokter AI.



7. UI Responsif: Light / Dark Mode + Bahasa Toggle (🇮🇩/🇺🇸)

Mode gelap dan terang, serta kemampuan switch bahasa untuk pengalaman lebih lokal.



8. Embed Tombol Beli Produk (Iframe)

Tombol pembelian produk langsung terintegrasi di UI.



9. Profil & Riwayat Pengguna

Menyimpan riwayat dan profil pengguna, tracking progress perawatan kulit dan goal mereka.



10. Sistem Referral & Unlock Dokter AI



Pengguna dapat membuka akses ke lebih banyak dokter AI dengan sistem referral.


11. Fitur Langganan & Newsletter dengan Tracking Progres



Pengguna dapat berlangganan untuk menerima update rutin tentang tracking progres dan rekomendasi.


12. Progress Tracking & Goal Setting



Pengguna dapat menetapkan goal untuk kulit mereka, dan sistem akan melacak progresnya (misalnya, mengurangi jerawat, mengatasi kulit kering).



---

C. 🧠 Arsitektur Teknis

Frontend (React + Tailwind)

glowpilot/
├── frontend/
│   ├── pages/
│   │   ├── index.tsx               ← Landing page, track progress, goals
│   │   ├── login.tsx               ← Login
│   │   ├── signup.tsx              ← Register + ChatBot tanya info kulit
│   │   ├── dashboard.tsx           ← Rekomendasi, hasil diagnosa
│   │   ├── progressTracker.tsx     ← Tracking rutinitas dan goals
│   │   ├── recommendations.tsx
│   │   ├── buyframe.tsx            ← Embed iframe produk
│   │   ├── referral.tsx            ← Undang teman, unlock AI doctor
│   │   └── userProfile.tsx         ← Profil dan riwayat
│   └── components/
│       ├── ChatCopilot.tsx
│       ├── VoiceInput.tsx
│       ├── VoiceOutput.tsx         ← Suara natural tiap dokter AI
│       ├── LanguageToggle.tsx
│       ├── ThemeSwitcher.tsx       ← Mode light/dark
│       ├── ProgressTracker.tsx     ← UI progress & goals
│       ├── ProductCard.tsx
│       ├── AuroraBackground.tsx
│       ├── DoctorProfileCard.tsx
│       └── DoctorChatBubble.tsx    ← Chat UI dengan bubble interaktif

Backend

├── backend/
│   ├── scraper/
│   │   └── marketplaceScraper.ts   ← Scraping produk dari marketplace
│   ├── services/
│   │   ├── affiliateLink.ts        ← Mengelola affiliate links
│   │   ├── articleFetcher.ts      ← Menyediakan artikel terkait
│   │   └── referralSystem.ts      ← Mengelola sistem referral dan unlock
│   └── api/
│       └── copilot.ts              ← Prompt bridging + LLM call

Copilot Prompt Engine

├── copilot/
│   ├── prompts/
│   │   ├── diagPrompt.ts           ← Prompt untuk diagnosa kulit
│   │   └── compPrompt.ts           ← Prompt untuk perbandingan produk
│   └── llmRouter.ts

Database (Supabase)

├── supabase/
│   └── schema.sql                 ← Tabel: user, skin_diag, products, history, feedback, referrals, subscription, progress_tracking


---

D. 🎨 Desain UI/UX

Style:

Glassmorphism (Frosted blur, rounded corner, border-translucent)

Aurora animated background (optimistic, dinamis)

Font: Sora / Inter / custom smooth font

Vibrasi klik tombol (haptic feedback API Android)

Transisi halus (Framer Motion)

Mode: Light / Dark

Bahasa toggle (🇮🇩 / 🇺🇸)


Component Highlight:

ChatBubble: Transparan blur + drop shadow.

VoiceInput: Tombol mikrofon berkilau.

VoiceOutput: Suara ElevenLabs / TTS natural tiap dokter.

RecommendationCard: Blur glass product view + rating.

ThemeSwitcher: Toggle malam/siang seperti Mac.

LanguageToggle: Ikon bendera animasi.

DoctorProfileCard: Avatar dan bio berbeda tiap AI dokter.

ProgressTracker: Menampilkan progress, rutinitas, dan goals pengguna.



---

E. ⚙️ AI Prompt (Copilot)

1. Diagnosa: "Kamu adalah GlowPilot Copilot, asisten virtual dermatologi non-medis. Tugasmu:

1. Tanya info user: usia, jenis kulit, keluhan, preferensi, budget.


2. Analisa input → diagnosa kulit (mis. jerawat hormonal, sensitif, kusam).


3. Buat skincare routine pagi & malam.


4. Berikan alasan, tips lifestyle & edukasi ingredients.


5. Tambahkan affiliate link."



2. Perbandingan Produk: "Kamu adalah Copilot untuk bandingkan skincare: Input: array produk Output: tabel harga, rating, ingredients unggulan, beri label: Best Value / Dermatologist Pick / Termurah."


---

F. 📅 Roadmap MVP

Sprint | Durasi | Fitur

Sprint 1: 3 hari – Landing → Signup (Chat AI tanya info kulit)

Sprint 2: 3 hari – Login → Load profil + histori

Sprint 3: 4 hari – Diagnosa Prompt + Produk Scraper

Sprint 4: 3 hari – Voice Chat Interaktif + TTS unik tiap dokter

Sprint 5: 2 hari – Aurora UI + Bahasa & DarkMode Toggle

Sprint 6: 2 hari – Referral System + Unlock dokter AI

Sprint 7: 1 hari – Langganan + Newsletter tracking

Sprint 8: 4 hari – Implementasi Progress Tracker + Goals



---

G. 📂 Dokumen Pelengkap

README.md:

Deskripsi project

Cara jalanin lokal

Link demo

Kontributor: Mulky Malikul Dhaher

Kontak: mulkymlikuldhr@mail.com


docs/

blueprint.md

architecture.png

api_reference.md

prompt_reference.md

component_guideline.md

deployment.md


CHANGELOG.md:

[v0.1.0] - 2025-08-01
Added
- Chat Copilot (diagnosa)
- Produk scraper dari Shopee
- UI Glassmorph dasar (Sora Font)
- Aurora animated background
- Login & Signup logic
- Referral unlock system

RODO.md (Responsibility of Data Ownership)

AI bukan pengganti dokter.

Semua data bersifat anonim.

Tidak menyimpan gambar wajah.

Disclaimer tersedia di halaman awal.



---

✅ Credit

> Dibuat oleh Mulky Malikul Dhaher (INFJ-T) — AI & UX Visionary. Email: mulkymlikuldhr@mail.com
Untuk dunia yang lebih glowing 🌍✨




---

💻🚀