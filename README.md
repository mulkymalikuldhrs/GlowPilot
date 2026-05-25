<div align="center">

<a href="https://github.com/mulkymalikuldhrs/GlowPilot">
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&duration=3000&pause=1000&color=FF6F00&center=true&vCenter=true&multiline=false&repeat=true&width=500&height=50&lines=GlowPilot+Copilot;AI+Dermatology+Platform;Skin+Care+%E2%80%A2+AI+%E2%80%A2+Beauty" alt="Typing SVG" />
</a>

<br/>

[![Version](https://img.shields.io/badge/version-2.0.0-FF6F00?style=for-the-badge&logo=semver)](https://github.com/mulkymalikuldhrs/GlowPilot)
[![Status](https://img.shields.io/badge/status-Production_Ready-brightgreen?style=for-the-badge)](https://github.com/mulkymalikuldhrs/GlowPilot)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Genkit AI](https://img.shields.io/badge/Genkit_AI-1.16-FF6F00?style=for-the-badge)](https://genkit.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Stars](https://img.shields.io/github/stars/mulkymalikuldhrs/GlowPilot?style=for-the-badge&logo=github&color=yellow)](https://github.com/mulkymalikuldhrs/GlowPilot/stargazers)

<br/>

**AI-powered virtual dermatology platform that analyzes skin conditions via chat, voice, or photo and provides personalized skincare recommendations.**

[🐛 Report Bug](https://github.com/mulkymalikuldhrs/GlowPilot/issues) &bull; [✨ Request Feature](https://github.com/mulkymalikuldhrs/GlowPilot/issues) &bull; [🤝 Contribute](CONTRIBUTING.md)

</div>

---

## 🇬🇧 English

### ✨ Overview

GlowPilot Copilot redefines the way users interact with skincare. By leveraging Google Genkit AI and Firebase, it delivers an intelligent, conversational dermatology experience that adapts to each user's unique skin profile. The platform provides AI-powered diagnosis through text, voice, and image inputs, and generates personalized AM/PM skincare routines complete with product recommendations and e-commerce search links.

> **Note:** GlowPilot is not a replacement for medical dermatologists; it serves as an educational and advisory tool.

### 🏗️ Architecture

```
┌────────────────────────────────────────────────────────────┐
│                  GlowPilot Architecture                     │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────────┐ │
│  │  Next.js │    │   Genkit     │    │   Firebase       │ │
│  │  Frontend│───▶│   AI Engine  │───▶│   Backend        │ │
│  │  (React) │    │  (8 Flows)   │    │  (Auth + Store)  │ │
│  └──────────┘    └──────────────┘    └──────────────────┘ │
│       │                  │                    │            │
│       ▼                  ▼                    ▼            │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────────┐ │
│  │ Glass/Aurora│  │  Product     │    │  User Profiles   │ │
│  │    UI      │    │  Recommender │    │  & Progress      │ │
│  └──────────┘    └──────────────┘    └──────────────────┘ │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 🎯 Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Dermatologist** | Chat-based diagnosis using text, voice, or photo input |
| 🎙️ **Voice Chat** | Speech-to-text & text-to-speech integration |
| 🛍️ **Product Comparison** | AI-powered product comparison by price, rating, ingredients |
| 🌅 **AM/PM Routines** | Personalized skincare routine generation |
| 📊 **Progress Tracking** | Track routine adherence and improvements |
| 🪟 **Glassmorphism UI** | Futuristic glass design with aurora animations |
| 🌓 **Light/Dark Mode** | Theme switching with language toggle |
| 🔐 **Firebase Auth** | Google login integration |
| 🔒 **Route Protection** | Middleware-based auth guards for protected pages |
| 🔄 **API Key Rotation** | Round-robin Gemini API key rotation for reliability |

### 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/mulkymalikuldhrs/GlowPilot.git

# Install dependencies
cd GlowPilot && npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your Firebase and Gemini API keys

# Start development server
npm run dev
```

### 🔧 Environment Setup

See `.env.example` for all required environment variables. Key requirements:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API Key | ✅ Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID | ✅ Yes |
| `GEMINI_API_KEY` | Google Gemini API Key (comma-separated for rotation) | ✅ Yes |
| `STRIPE_SECRET_KEY` | Stripe Secret Key (for payments) | ❌ Optional |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook Signing Secret | ❌ Optional |

---

## 🇮🇩 Bahasa Indonesia

### ✨ Gambaran Umum

GlowPilot Copilot mendefinisikan ulang cara pengguna berinteraksi dengan perawatan kulit. Dengan memanfaatkan Google Genkit AI dan Firebase, platform ini menghadirkan pengalaman dermatologi percakapan yang cerdas dan beradaptasi dengan profil kulit unik setiap pengguna. Platform menyediakan diagnosis bertenaga AI melalui teks, suara, dan gambar, serta menghasilkan rutinitas perawatan kulit AM/PM yang dipersonalisasi.

> **Catatan:** GlowPilot bukan pengganti dokter kulit medis; ini berfungsi sebagai alat edukasi dan saran.

### 🎯 Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 🤖 **Dokter Kulit AI** | Diagnosis berbasis chat menggunakan teks, suara, atau foto |
| 🎙️ **Obrolan Suara** | Integrasi speech-to-text dan text-to-speech |
| 🛍️ **Perbandingan Produk** | Perbandingan produk berdasarkan harga, rating, bahan |
| 🌅 **Rutinitas AM/PM** | Pembuatan rutinitas perawatan kulit yang dipersonalisasi |
| 📊 **Pelacakan Progres** | Lacak kepatuhan rutinitas dan perbaikan |
| 🪟 **UI Glassmorphism** | Desain kaca futuristik dengan animasi aurora |
| 🌓 **Mode Terang/Gelap** | Perpindahan tema dengan saklar bahasa |
| 🔒 **Perlindungan Rute** | Penjaga autentikasi berbasis middleware |
| 🔄 **Rotasi Kunci API** | Rotasi kunci API Gemini round-robin untuk keandalan |

### 🚀 Mulai Cepat

```bash
git clone https://github.com/mulkymalikuldhrs/GlowPilot.git
cd GlowPilot && npm install
cp .env.example .env.local
# Edit .env.local dengan kunci Firebase dan Gemini API Anda
npm run dev
```

---

## 🇨🇳 中文

### ✨ 概述

GlowPilot Copilot 重新定义了用户与护肤的互动方式。通过利用 Google Genkit AI 和 Firebase，它提供了一种智能的、对话式的皮肤科体验，能够适应每位用户独特的皮肤状况。平台通过文字、语音和图像输入提供AI驱动的诊断，并生成个性化的早晚护肤方案。

> **注意：** GlowPilot 不是医疗皮肤科医生的替代品；它作为教育和咨询工具。

### 🎯 主要功能

| 功能 | 描述 |
|------|------|
| 🤖 **AI皮肤科医生** | 基于聊天的诊断，支持文字、语音或照片输入 |
| 🎙️ **语音聊天** | 语音转文字和文字转语音集成 |
| 🛍️ **产品比较** | 按价格、评分、成分进行AI驱动的产品比较 |
| 🌅 **早晚护肤方案** | 个性化护肤方案生成 |
| 📊 **进度追踪** | 追踪护肤方案执行情况和改善 |
| 🪟 **玻璃拟态UI** | 未来感玻璃设计与极光动画 |
| 🌓 **明暗模式** | 主题切换与语言切换 |
| 🔒 **路由保护** | 基于中间件的身份验证守卫 |
| 🔄 **API密钥轮换** | Gemini API密钥轮询轮换，提高可靠性 |

### 🚀 快速开始

```bash
git clone https://github.com/mulkymalikuldhrs/GlowPilot.git
cd GlowPilot && npm install
cp .env.example .env.local
# 使用您的Firebase和Gemini API密钥编辑.env.local
npm run dev
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| ![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js) | Framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white) | Type Safety |
| ![Genkit AI](https://img.shields.io/badge/Genkit_AI-1.16-FF6F00) | AI Engine |
| ![Firebase](https://img.shields.io/badge/Firebase-Auth+Store-FFCA28?logo=firebase) | Backend |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white) | Styling |
| ![shadcn/ui](https://img.shields.io/badge/shadcn-UI-000000) | Components |
| ![Vitest](https://img.shields.io/badge/Vitest-2.0-6E9F18) | Testing |

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details. We welcome pull requests, bug reports, and feature suggestions from the community.

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 👤 Author & Contact

**Mulky Malikul Dhaher**

[![GitHub](https://img.shields.io/badge/GitHub-mulkymalikuldhrs-181717?style=flat&logo=github)](https://github.com/mulkymalikuldhrs)
[![Email](https://img.shields.io/badge/Email-mulkymalikuldhaher@email.com-EA4335?style=flat&logo=gmail&logoColor=white)](mailto:mulkymalikuldhaher@email.com)

---

## ⚠️ Disclaimer

### 🇬🇧 English

> **⚠️ For Education Purpose Only**
> This project is provided strictly for educational and research purposes. The authors and contributors assume **no responsibility or liability** for any damages, losses, or risks arising from the use of this software. **We do not bear any responsibility or risk** for how this software is used. GlowPilot is not a substitute for professional medical advice, diagnosis, or treatment.
> **Contact:** Mulky Malikul Dhaher | mulkymalikuldhaher@email.com

### 🇮🇩 Bahasa Indonesia

> **⚠️ Hanya untuk Tujuan Pendidikan**
> Proyek ini disediakan secara ketat untuk tujuan pendidikan dan penelitian. Penulis dan kontributor **tidak bertanggung jawab atau berkewajiban** atas kerusakan, kerugian, atau risiko yang timbul dari penggunaan perangkat lunak ini. **Kami tidak menanggung tanggung jawab atau risiko** apa pun untuk penggunaan perangkat lunak ini. GlowPilot bukan pengganti nasihat, diagnosis, atau perawatan medis profesional.
> **Kontak:** Mulky Malikul Dhaher | mulkymalikuldhaher@email.com

### 🇨🇳 中文

> **⚠️ 仅供教育目的**
> 本项目严格仅供教育和研究目的提供。作者和贡献者对因使用本软件而产生的任何损害、损失或风险**不承担任何责任或义务**。**我们不承担任何责任或风险**对于本软件的使用方式。GlowPilot不能替代专业的医疗建议、诊断或治疗。
> **联系方式:** Mulky Malikul Dhaher | mulkymalikuldhaher@email.com

---

<div align="center">

Made with ❤️ by Mulky Malikul Dhaher

**For Education Purpose Only**

</div>
