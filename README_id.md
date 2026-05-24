# GlowPilot Copilot

[![Lisensi: MIT](https://img.shields.io/badge/Lisensi-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000.svg?logo=next.js)](https://nextjs.org/)
[![Genkit AI](https://img.shields.io/badge/Genkit_AI-1.16-FF6F00.svg)](https://genkit.dev/)

**GlowPilot Copilot** adalah platform dermatologi virtual berbasis AI yang menganalisis kondisi kulit melalui chat, suara, atau foto, serta memberikan rekomendasi rutinitas skincare yang dipersonalisasi. Platform ini menampilkan antarmuka futuristik dengan efek glassmorphism dan animasi aurora, serta terintegrasi dengan link afiliasi untuk pembelian produk.

[![Read in English](https://img.shields.io/badge/English-US-blue.svg)](README.md)
[![阅读中文](https://img.shields.io/badge/Chinese-中文-green.svg)](README_zh.md)

---

## Daftar Isi

- [Gambaran Umum](#gambaran-umum)
- [Fitur Utama](#fitur-utama)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Memulai](#memulai)
- [Struktur Proyek](#struktur-proyek)
- [Alur AI](#alur-ai)
- [Variabel Lingkungan](#variabel-lingkungan)
- [Berkontribusi](#berkontribusi)
- [Catatan Perubahan](#catatan-perubahan)
- [Lisensi](#lisensi)
- [Kredit](#kredit)

---

## Gambaran Umum

GlowPilot Copilot mendefinisikan ulang cara pengguna berinteraksi dengan perawatan kulit. Dengan memanfaatkan Google Genkit AI dan Firebase, platform ini menghadirkan pengalaman dermatologi cerdas dan konversasional yang menyesuaikan dengan profil kulit unik setiap pengguna. Platform menyediakan diagnosis berbasis AI melalui input teks, suara, dan gambar, serta menghasilkan rutinitas skincare AM/PM yang dipersonalisasi lengkap dengan rekomendasi produk dan link pembelian afiliasi.

Aplikasi ini dirancang dengan estetika futuristik yang menampilkan UI glassmorphism, latar belakang aurora beranimasi, dan transisi Framer Motion yang halus. Mendukung mode terang dan gelap, serta toggle bahasa untuk Inggris dan Bahasa Indonesia. GlowPilot bukan pengganti dokter kulit medis; ini adalah alat edukasi dan advisory yang memberdayakan pengguna untuk membuat keputusan skincare yang lebih baik.

Proyek ini merupakan bagian dari ekosistem [HermesQuantOS](https://github.com/mulkymalikuldhrs/HermesQuantOS).

---

## Fitur Utama

- **Dokter Kulit AI**: Diagnosis kondisi kulit berbasis chat menggunakan input teks, suara, atau foto. Tersedia berbagai persona dokter AI dengan keahlian dan gaya komunikasi yang unik.
- **Chat Suara**: Integrasi speech-to-text dan text-to-speech penuh menggunakan Web Speech API dan ElevenLabs untuk interaksi natural tanpa tangan.
- **Scraper Produk**: Mengambil data produk secara otomatis dari platform e-commerce (Shopee, Sociolla, dll.) untuk harga dan ketersediaan terkini.
- **Perbandingan Produk**: Perbandingan produk skincare berbasis AI berdasarkan harga, rating, dan bahan aktif dengan label seperti Best Value, Pilihan Dokter, dan Termurah.
- **Rutinitas Skincare**: Menghasilkan rutinitas skincare AM/PM yang dipersonalisasi berdasarkan hasil diagnosis dan preferensi pengguna.
- **Pelacakan Progres**: Lacak kepatuhan rutinitas skincare, tetapkan tujuan, dan pantau peningkatan dari waktu ke waktu.
- **Profil Pengguna**: Kelola profil pengguna, riwayat kulit, dan preferensi untuk pengalaman yang disesuaikan.
- **UI Responsif**: Toggle mode Terang/Gelap dan pengganti bahasa (Inggris/Bahasa Indonesia) dengan sistem desain glassmorphism.
- **Sistem Referral**: Undang teman dan buka kunci persona dokter AI tambahan.
- **Integrasi Afiliasi**: Tombol pembelian tertanam dengan link afiliasi untuk pembelian produk yang mulus.

---

## Teknologi yang Digunakan

| Kategori | Teknologi |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Bahasa | TypeScript 5.9 |
| Mesin AI | Google Genkit AI 1.16 |
| Autentikasi | Firebase Auth (Google Login) |
| Database | Firebase Firestore |
| Styling | Tailwind CSS 4, Glassmorphism |
| Komponen UI | Radix UI, shadcn/ui |
| Animasi | Framer Motion, Aurora Background |
| Manajemen State | Jotai, TanStack React Query |
| Formulir | React Hook Form + Zod |
| Grafik | Recharts |
| Pengujian | Vitest, Testing Library |
| Deployment | Vercel, Firebase App Hosting |

---

## Memulai

### Prasyarat

- Node.js 18+ (disarankan: 20+)
- npm atau yarn
- Proyek Firebase dengan Authentication dan Firestore aktif
- Kunci API Google AI (untuk Genkit)

### Instalasi

1. Clone repositori:
   ```bash
   git clone https://github.com/mulkymalikuldhrs/GlowPilot.git
   cd GlowPilot
   ```

2. Install dependensi:
   ```bash
   npm install
   ```

3. Siapkan variabel lingkungan:
   ```bash
   cp .env.example .env.local
   ```
   Isi konfigurasi Firebase dan kunci API Google AI di `.env.local`.

4. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### Skrip yang Tersedia

| Skrip | Deskripsi |
|-------|-----------|
| `npm run dev` | Mulai server pengembangan Next.js |
| `npm run build` | Build aplikasi produksi |
| `npm run start` | Mulai server produksi |
| `npm run lint` | Jalankan pengecekan ESLint |
| `npm run typecheck` | Jalankan pengecekan tipe TypeScript |
| `npm run test` | Jalankan pengujian Vitest |
| `npm run test:ui` | Jalankan Vitest dengan UI interaktif |
| `npm run genkit:dev` | Mulai server pengembangan Genkit AI |
| `npm run genkit:watch` | Mulai Genkit dengan mode watch |

---

## Struktur Proyek

```
GlowPilot/
├── src/
│   ├── ai/                    # Alur dan skema Genkit AI
│   │   ├── flows/             # Definisi alur AI
│   │   │   ├── conversational-diagnosis-flow.ts
│   │   │   ├── skin-condition-diagnosis.ts
│   │   │   ├── skin-nutrition-flow.ts
│   │   │   ├── anti-aging-flow.ts
│   │   │   ├── product-comparison.ts
│   │   │   ├── catalog-flow.ts
│   │   │   ├── onboarding-flow.ts
│   │   │   └── tts-flow.ts
│   │   ├── schemas/           # Skema Zod untuk I/O AI
│   │   ├── tools/             # Definisi alat AI
│   │   └── genkit.ts          # Konfigurasi Genkit
│   ├── app/                   # Halaman Next.js App Router
│   │   ├── page.tsx           # Landing page
│   │   ├── chat/              # Antarmuka chat
│   │   ├── catalog/           # Katalog produk
│   │   ├── onboarding/        # Alur onboarding
│   │   ├── profile/           # Profil pengguna
│   │   ├── progress/          # Pelacakan progres
│   │   ├── history/           # Riwayat chat
│   │   └── login/             # Autentikasi
│   ├── components/            # Komponen React
│   │   ├── chat/              # Komponen UI chat
│   │   ├── aurora/            # Efek latar aurora
│   │   ├── common/            # Komponen bersama
│   │   ├── auth/              # Komponen autentikasi
│   │   └── ui/                # Primitif shadcn/ui
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilitas dan konfigurasi Firebase
│   └── middleware.ts          # Middleware Next.js
├── docs/                      # Dokumentasi proyek
│   └── blueprint.md           # Blueprint desain
├── public/                    # Aset statis
├── next.config.ts             # Konfigurasi Next.js
├── tailwind.config.ts         # Konfigurasi Tailwind CSS
├── vitest.config.ts           # Konfigurasi pengujian Vitest
└── package.json               # Dependensi dan skrip
```

---

## Alur AI

GlowPilot menggunakan Google Genkit AI untuk menggerakkan beberapa alur cerdas:

| Alur | Deskripsi |
|------|-----------|
| Diagnosis Konversasional | Diagnosis kondisi kulit interaktif berbasis chat |
| Diagnosis Kondisi Kulit | Diagnosis langsung dari input teks atau gambar |
| Nutrisi Kulit | Rekomendasi nutrisi untuk kesehatan kulit |
| Anti-Aging | Rutinitas perawatan anti-aging yang dipersonalisasi |
| Perbandingan Produk | Bandingkan produk berdasarkan harga, rating, dan bahan |
| Alur Katalog | Jelajahi dan cari katalog produk |
| Alur Onboarding | Pengaturan terpandu untuk pengguna baru |
| Alur TTS | Text-to-speech untuk respons suara |

---

## Variabel Lingkungan

Buat file `.env.local` dengan variabel berikut:

```env
# Konfigurasi Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Google AI (Genkit)
GOOGLE_GENAI_API_KEY=
```

---

## Berkontribusi

Kami menyambut kontribusi dari komunitas! Silakan baca [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan cara berkontribusi pada proyek ini.

---

## Catatan Perubahan

Lihat [CHANGELOG.md](CHANGELOG.md) untuk riwayat perubahan penting.

---

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT. Lihat [LICENSE](LICENSE) untuk detailnya.

---

## Kredit

Dikembangkan oleh **Mulky Malikul Dhaher** - AI & UX Visionary

- Email: mulkymalikuldhaher@email.com
- GitHub: [mulkymalikuldhrs](https://github.com/mulkymalikuldhrs)
- Ekosistem: [HermesQuantOS](https://github.com/mulkymalikuldhrs/HermesQuantOS)

---

## Disclaimer

GlowPilot Copilot adalah alat edukasi dan advisory berbasis AI. Ini bukan pengganti saran, diagnosis, atau perawatan medis profesional. Selalu konsultasikan dengan dokter kulit yang berkualifikasi untuk masalah medis. Semua data ditangani secara anonim, dan gambar wajah tidak pernah disimpan di server kami.
