# 🚀 DSA OS - The Ultimate Local Developer Environment

> A hyper-polished, developer-grade operating system for mastering Data Structures, Algorithms, and System Design. Built for serious engineers who demand control, privacy, and performance.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## ✨ Features

### 🧠 Spaced Repetition System
- **3-State Cycle**: `todo` → `solved` → `review`
- **Difficulty-Based Scheduling**: Rate problems as Hard (1 day), Good (3 days), or Easy (7 days)
- **Daily Dispatch Queue**: Automatically surfaces problems due for review
- **Local-First Storage**: Your progress stays on your machine, no cloud dependencies

### 📊 Activity Heatmap
- **365-Day Visualization**: GitHub-style contribution graph
- **5 Intensity Levels**: Track your consistency with glowing emerald tiles
- **Real-Time Updates**: See your streak build as you solve problems

### 🎯 Curated Problem Sheets
- **Striver's A2Z DSA Sheet**: 357 problems across 18 steps
- **Blind 75**: The most frequently asked FAANG questions
- **NeetCode 150**: Expanded patterns for deep mastery
- **System Design**: HLD, LLD, gaming systems, and mobile backends (75 topics)

### 🔧 Customization
- **Add Custom Problems**: Extend any sheet with your own problems, videos, or articles straight from the Dashboard UI
- **Dynamic Action Buttons**: "Solve" for code, "Watch" for videos, "Read" for articles
- **Collapse/Expand Sections**: Focus on what matters with collapsible step sections

### 🎨 Beast Mode UI
- **Pitch Black Theme**: Pure black backgrounds with white/10 borders
- **Glowing Effects**: Emerald, amber, and indigo accents with shadow glows
- **Glassmorphic Cards**: Backdrop blur and subtle transparency

### 🔍 Search & Keyboard Shortcuts
- **Global Search**: `Ctrl+K` to instantly focus the search bar
- **Real-Time Filtering**: Search across all problems in any sheet

### 🌐 Chrome Extension (Included)
- **Zero-Friction Auto-Sync**: Automatically marks problems as solved on your local dashboard when you get an "Accepted" on LeetCode.
- **Visual Confirmation**: Injects a sleek, temporary glassmorphic toast notification so you know it synced.
- **Privacy First**: No external APIs, no data collection. It just talks to your `localhost`.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Storage**: File-based JSON (local-first via `fs.promises`)

---

## 📦 Installation

### Prerequisites
- **Node.js**: v20 or higher
- **npm**: v10 or higher

### Step 1: Clone the Repository
```bash
git clone [https://github.com/vivekTiw120303/dsa-os.git](https://github.com/vivekTiw120303/dsa-os.git)
cd dsa-os