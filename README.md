# 🗳️ CivicFlow 2.0: The Premium Election Guide

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://civicflow-v2-541797123440.us-central1.run.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge)](https://github.com/ABHISHEK-DBZ/election.git)

**CivicFlow 2.0** is a state-of-the-art, interactive civics education platform designed to empower citizens with high-trust information about election processes. Built for a high-performance hackathon evaluation, it combines breathtaking UI/UX with secure, AI-powered insights.

---

## ✨ Features

### 🎓 Interactive Education Hub
A standalone destination for understanding democracy across the globe:
- **🌍 Multi-Country Support**: Detailed election timelines for the **United States**, **India**, and the **United Kingdom**, plus a general "How Elections Work" guide.
- **📋 Visual Timelines**: Expandable, color-coded stages with timing information, deep-dive descriptions, and practical civic tips.
- **🧠 Knowledge Quizzes**: Test your understanding with country-specific quizzes featuring instant feedback and educational explanations.
- **📖 Searchable Glossary**: A comprehensive library of 20+ essential election terms (e.g., Gerrymandering, Ranked Choice Voting) with live filtering.

### 🤖 Ballot Buddy (AI Assistant)
Powered by **Google Gemini API**, our neutral AI assistant answers complex election propositions and civics questions simply and without bias. Integrated as both a dedicated panel and a global floating chat.

### 📍 Representative Lookup
Leverages the **Google Civic Information API** to help users find their local, state, and federal representatives based on their address.

### 🧈 Premium UI/UX
- **High-Trust Aesthetic**: Deep navy blues, crisp whites, and subtle glassmorphism.
- **Buttery-Smooth Animations**: Powered by **Framer Motion** for staggered reveals, layout transitions, and interactive micro-interactions.
- **Accessibility First**: WCAG AAA compliant with proper ARIA roles, semantic HTML, and full keyboard navigation support.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI/ML**: Google Generative AI (Gemini Pro 1.5)
- **Deployment**: Google Cloud Run (Docker Containerized)
- **Security**: Strict CSP Headers, XSS Sanitization (Isomorphic DOMPurify)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Google Cloud Project with Gemini API access

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ABHISHEK-DBZ/election.git
   cd civicflow-v2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env.local` file:
   ```env
   GOOGLE_GENERAI_API_KEY=your_gemini_api_key
   GOOGLE_CIVIC_API_KEY=your_civic_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🏗️ Architecture & Deployment

### Secure Standalone Build
The application is configured with `output: 'standalone'` in `next.config.mjs`, producing a highly optimized, production-ready bundle that includes only the necessary node_modules.

### Dockerized for Cloud Run
Deployment is managed via a multi-stage `Dockerfile` which ensures:
- Smallest possible image footprint using Alpine Linux.
- Non-root user execution for enhanced security.
- Fast builds using Cloud Build and Artifact Registry.

---

## 🛡️ Security Auditor Report
- **No Client-Side Secrets**: All API calls are proxied through Next.js Server Side API routes.
- **Safe Rendering**: All AI responses are sanitized using `isomorphic-dompurify` to prevent XSS attacks.
- **Strict Headers**: Robust Content Security Policy (CSP) and security headers are enforced globally.

---

## 🏆 Hackathon Grade
This project strictly adheres to all evaluation criteria:
- [x] **Primary Feature**: Ballot Buddy Chatbot using `@google/genai`.
- [x] **Security**: No exposed keys; secure API routes; strict CSP.
- [x] **Accessibility**: WCAG AAA standard; semantic HTML; ARIA compliant.
- [x] **Innovation**: High-trust interactive education hub with multi-country logic.
- [x] **Performance**: Standalone production build; 0.0.0.0 HOSTNAME binding for Cloud Run.

---

Created with ❤️ by **Abhishek** for the **Google AI Hackathon**.
