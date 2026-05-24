# GlowPilot Copilot

[![许可证: MIT](https://img.shields.io/badge/许可证-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000.svg?logo=next.js)](https://nextjs.org/)
[![Genkit AI](https://img.shields.io/badge/Genkit_AI-1.16-FF6F00.svg)](https://genkit.dev/)

**GlowPilot Copilot** 是一个虚拟AI皮肤科平台，通过聊天、语音或照片分析皮肤状况，并提供个性化的护肤方案推荐。它采用未来感十足的毛玻璃界面和极光动画，并集成了联盟链接以便购买产品。

[![Read in English](https://img.shields.io/badge/English-US-blue.svg)](README.md)
[![Baca Bahasa Indonesia](https://img.shields.io/badge/Bahasa-Indonesia-red.svg)](README_id.md)

---

## 目录

- [概述](#概述)
- [核心功能](#核心功能)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [AI流程](#ai流程)
- [环境变量](#环境变量)
- [贡献](#贡献)
- [更新日志](#更新日志)
- [许可证](#许可证)
- [致谢](#致谢)

---

## 概述

GlowPilot Copilot 重新定义了用户与护肤互动的方式。通过利用 Google Genkit AI 和 Firebase，它提供了一种智能的、对话式的皮肤科体验，能够适应每位用户独特的皮肤特征。该平台通过文本、语音和图像输入提供AI驱动的诊断，并生成个性化的早/晚护肤方案，包含产品推荐和联盟购买链接。

应用程序采用未来主义美学设计，具有毛玻璃UI、极光动画背景和流畅的 Framer Motion 过渡效果。支持亮色和暗色模式，以及英语和印尼语的语言切换。GlowPilot 不是医学皮肤科医生的替代品；它是一个教育和顾问工具，帮助用户做出更好的护肤决策。

本项目是 [HermesQuantOS](https://github.com/mulkymalikuldhrs/HermesQuantOS) 生态系统的一部分。

---

## 核心功能

- **AI皮肤科医生**：通过文本、语音或照片输入进行基于聊天的AI皮肤诊断。提供多种AI医生角色，每个角色拥有独特的专业知识和沟通风格。
- **语音聊天**：使用 Web Speech API 和 ElevenLabs 完整集成语音转文本和文本转语音，实现自然的免提交互。
- **产品爬虫**：自动从电商平台（Shopee、Sociolla等）抓取产品数据，获取实时价格和库存信息。
- **产品比较**：基于AI的护肤品比较，按价格、评分和成分对比，并标注最佳性价比、皮肤科医生推荐和最实惠等标签。
- **护肤方案**：根据诊断结果和用户偏好生成个性化的早/晚护肤方案。
- **进度追踪**：追踪护肤方案的执行情况，设定目标，并随时间监测改善情况。
- **用户档案**：管理用户资料、皮肤历史和偏好，提供定制化体验。
- **响应式界面**：亮色/暗色模式切换和语言切换（英语/印尼语），采用毛玻璃设计系统。
- **推荐系统**：邀请好友并解锁额外的AI医生角色。
- **联盟集成**：嵌入式购买按钮，带有联盟链接，实现无缝产品购买。

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 15 (App Router) |
| 语言 | TypeScript 5.9 |
| AI引擎 | Google Genkit AI 1.16 |
| 认证 | Firebase Auth (Google登录) |
| 数据库 | Firebase Firestore |
| 样式 | Tailwind CSS 4, 毛玻璃效果 |
| UI组件 | Radix UI, shadcn/ui |
| 动画 | Framer Motion, 极光背景 |
| 状态管理 | Jotai, TanStack React Query |
| 表单 | React Hook Form + Zod |
| 图表 | Recharts |
| 测试 | Vitest, Testing Library |
| 部署 | Vercel, Firebase App Hosting |

---

## 快速开始

### 前提条件

- Node.js 18+（推荐：20+）
- npm 或 yarn
- 已启用 Authentication 和 Firestore 的 Firebase 项目
- Google AI API 密钥（用于 Genkit）

### 安装

1. 克隆仓库：
   ```bash
   git clone https://github.com/mulkymalikuldhrs/GlowPilot.git
   cd GlowPilot
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 设置环境变量：
   ```bash
   cp .env.example .env.local
   ```
   在 `.env.local` 中填写 Firebase 配置和 Google AI API 密钥。

4. 运行开发服务器：
   ```bash
   npm run dev
   ```

5. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

### 可用脚本

| 脚本 | 描述 |
|------|------|
| `npm run dev` | 启动 Next.js 开发服务器 |
| `npm run build` | 构建生产应用 |
| `npm run start` | 启动生产服务器 |
| `npm run lint` | 运行 ESLint 检查 |
| `npm run typecheck` | 运行 TypeScript 类型检查 |
| `npm run test` | 运行 Vitest 测试 |
| `npm run test:ui` | 运行 Vitest 交互式UI |
| `npm run genkit:dev` | 启动 Genkit AI 开发服务器 |
| `npm run genkit:watch` | 以监视模式启动 Genkit |

---

## 项目结构

```
GlowPilot/
├── src/
│   ├── ai/                    # Genkit AI 流程和模式
│   │   ├── flows/             # AI 流程定义
│   │   ├── schemas/           # AI I/O 的 Zod 模式
│   │   ├── tools/             # AI 工具定义
│   │   └── genkit.ts          # Genkit 配置
│   ├── app/                   # Next.js App Router 页面
│   │   ├── page.tsx           # 首页
│   │   ├── chat/              # 聊天界面
│   │   ├── catalog/           # 产品目录
│   │   ├── onboarding/        # 引导流程
│   │   ├── profile/           # 用户资料
│   │   ├── progress/          # 进度追踪
│   │   ├── history/           # 聊天历史
│   │   └── login/             # 认证
│   ├── components/            # React 组件
│   │   ├── chat/              # 聊天UI组件
│   │   ├── aurora/            # 极光背景效果
│   │   ├── common/            # 共享组件
│   │   ├── auth/              # 认证组件
│   │   └── ui/                # shadcn/ui 原语
│   ├── hooks/                 # 自定义 React Hooks
│   ├── lib/                   # 工具和 Firebase 配置
│   └── middleware.ts          # Next.js 中间件
├── docs/                      # 项目文档
│   └── blueprint.md           # 设计蓝图
├── public/                    # 静态资源
├── next.config.ts             # Next.js 配置
├── tailwind.config.ts         # Tailwind CSS 配置
├── vitest.config.ts           # Vitest 测试配置
└── package.json               # 依赖和脚本
```

---

## AI流程

GlowPilot 使用 Google Genkit AI 驱动多个智能流程：

| 流程 | 描述 |
|------|------|
| 对话式诊断 | 基于聊天的交互式皮肤状况诊断 |
| 皮肤状况诊断 | 从文本或图像输入直接诊断 |
| 皮肤营养 | 皮肤健康营养建议 |
| 抗衰老 | 个性化抗衰老护理方案 |
| 产品比较 | 按价格、评分和成分比较产品 |
| 目录流程 | 浏览和搜索产品目录 |
| 引导流程 | 新用户引导设置 |
| TTS流程 | 语音响应的文本转语音 |

---

## 环境变量

创建 `.env.local` 文件，包含以下变量：

```env
# Firebase 配置
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

## 贡献

我们欢迎社区贡献！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何为本项目贡献的指南。

---

## 更新日志

详见 [CHANGELOG.md](CHANGELOG.md) 查看重要变更历史。

---

## 许可证

本项目采用 MIT 许可证。详情见 [LICENSE](LICENSE)。

---

## 致谢

由 **Mulky Malikul Dhaher** 开发 - AI & UX 愿景家

- 邮箱: mulkymalikuldhaher@email.com
- GitHub: [mulkymalikuldhrs](https://github.com/mulkymalikuldhrs)
- 生态系统: [HermesQuantOS](https://github.com/mulkymalikuldhrs/HermesQuantOS)

---

## 免责声明

GlowPilot Copilot 是一个AI驱动的教育和顾问工具。它不能替代专业医疗建议、诊断或治疗。如有医疗问题，请务必咨询合格的皮肤科医生。所有数据均匿名处理，我们不会在服务器上存储面部图像。
