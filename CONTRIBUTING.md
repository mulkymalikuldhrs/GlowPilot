# Contributing to GlowPilot Copilot

First off, thank you for considering contributing to GlowPilot Copilot! It is people like you who make this project a great tool for skincare education and advisory. This document provides guidelines and instructions for contributing to the project.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [AI Flow Development](#ai-flow-development)
- [Community](#community)

---

## Code of Conduct

This project and everyone participating in it is governed by a commitment to creating a welcoming and inclusive environment. By participating, you are expected to uphold this standard. Please be respectful, constructive, and professional in all interactions.

---

## How Can I Contribute?

There are many ways to contribute to GlowPilot Copilot:

### Reporting Bugs

Bug reports help us improve the application. When filing a bug report, please include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior versus actual behavior
- Screenshots or screen recordings if applicable
- Your browser and operating system information
- Any relevant console errors or logs

### Suggesting Enhancements

Enhancement suggestions are welcome. Please provide:

- A clear description of the proposed feature
- The use case or problem it solves
- Any relevant examples from other applications
- Mockups or design suggestions if available

### Contributing Code

We welcome pull requests for bug fixes, new features, and improvements. Please follow the development setup and coding standards below.

### Improving Documentation

Documentation improvements, corrections, and translations are always appreciated. Whether it is fixing a typo, adding examples, or translating content into additional languages, your help is valued.

---

## Development Setup

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm or yarn
- Git
- A Firebase project for testing (or use the provided development configuration)
- Google AI API key for Genkit

### Local Setup

1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/GlowPilot.git
   cd GlowPilot
   ```
3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/mulkymalikuldhrs/GlowPilot.git
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required values in `.env.local`.
6. Start the development server:
   ```bash
   npm run dev
   ```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with interactive UI
npm run test:ui

# Run type checking
npm run typecheck

# Run linter
npm run lint
```

---

## Coding Standards

### TypeScript

- Use TypeScript for all new code. Avoid `any` types whenever possible.
- Define proper interfaces and types for all data structures.
- Use Zod schemas for validating AI flow inputs and outputs.
- Keep type definitions close to where they are used, or in dedicated type files for shared types.

### React Components

- Use functional components with hooks.
- Follow the component structure: imports, types, component, exports.
- Use shadcn/ui components as building blocks when possible.
- Keep components focused on a single responsibility.
- Extract reusable logic into custom hooks.

### Styling

- Use Tailwind CSS utility classes for styling.
- Follow the glassmorphism design system for visual consistency.
- Ensure all UI is responsive and works on mobile devices.
- Support both light and dark modes.

### AI Flows

- Define all AI flows in the `src/ai/flows/` directory.
- Create corresponding Zod schemas in `src/ai/schemas/`.
- Document the purpose, inputs, and outputs of each flow.
- Test flows using the Genkit development server before integration.

### File Naming

- Use kebab-case for file names: `skin-condition-diagnosis.ts`
- Use PascalCase for React component files: `ChatWindow.tsx`
- Use camelCase for utility functions and hooks: `useUser.tsx`

---

## Commit Guidelines

We follow conventional commit messages for clear and consistent history:

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without feature changes or bug fixes
- `test`: Adding or updating tests
- `chore`: Build process, tooling, or dependency changes

### Examples

```
feat(chat): add voice input support for AI diagnosis
fix(auth): resolve Google login redirect issue
docs(readme): update installation instructions
refactor(components): extract reusable glassmorphism styles
test(flows): add unit tests for skin nutrition flow
```

---

## Pull Request Process

1. Create a new branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Make your changes and commit them following the commit guidelines.
3. Ensure all tests pass:
   ```bash
   npm run test
   npm run typecheck
   npm run lint
   ```
4. Push your branch to your fork:
   ```bash
   git push origin feat/your-feature-name
   ```
5. Open a Pull Request against the `main` branch of the upstream repository.
6. Include a clear description of the changes in your PR.
7. Reference any related issues in the PR description.
8. Be responsive to code review feedback and make requested changes.

### PR Requirements

- All tests must pass
- No TypeScript errors
- No linting errors
- Code must be properly documented
- New features must include corresponding tests
- UI changes must support both light and dark modes
- Changes to AI flows must include updated schemas

---

## Reporting Bugs

Please open a GitHub Issue with the following information:

1. **Title**: A concise description of the bug
2. **Description**: Detailed explanation of the issue
3. **Reproduction Steps**: Numbered steps to reproduce
4. **Expected Behavior**: What you expected to happen
5. **Actual Behavior**: What actually happened
6. **Environment**: Browser, OS, Node.js version
7. **Screenshots**: If applicable
8. **Additional Context**: Any other relevant information

---

## Suggesting Features

Please open a GitHub Issue with the feature request template:

1. **Problem**: What problem does this feature solve?
2. **Proposed Solution**: How should this feature work?
3. **Alternatives Considered**: Any alternative approaches
4. **Additional Context**: Mockups, examples, or references

---

## AI Flow Development

When developing new AI flows for GlowPilot:

1. Create the flow definition in `src/ai/flows/`
2. Define Zod input/output schemas in `src/ai/schemas/`
3. Register the flow in `src/ai/genkit.ts`
4. Test the flow using `npm run genkit:dev`
5. Integrate the flow into the UI components
6. Add tests for the flow logic
7. Document the flow purpose and usage

### Flow Structure

```typescript
import { genkit, z } from 'genkit';

const yourFlow = genkit.defineFlow({
  name: 'yourFlowName',
  inputSchema: z.object({ /* input schema */ }),
  outputSchema: z.object({ /* output schema */ }),
}, async (input) => {
  // Flow logic
  return result;
});
```

---

## Community

- **Author**: Mulky Malikul Dhaher
- **Email**: mulkymalikuldhaher@email.com
- **GitHub**: [mulkymalikuldhrs](https://github.com/mulkymalikuldhrs)
- **Ecosystem**: [HermesQuantOS](https://github.com/mulkymalikuldhrs/HermesQuantOS)

Thank you for contributing to GlowPilot Copilot! Your efforts help make skincare education and advisory more accessible to everyone.

---

**⚠️ For Education Purpose Only** — This project is provided strictly for educational and research purposes. The authors and contributors assume **no responsibility or liability** for any damages, losses, or risks arising from the use of this software. **We do not bear any responsibility or risk** for how this software is used.
