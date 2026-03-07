# Quick Start Guide

## For Users

### Installation (3 steps)
```bash
# 1. Clone the repo
git clone https://github.com/yourusername/dsa-os.git
cd dsa-os

# 2. Install dependencies
npm install

# 3. Run the app
npm run dev
```

Open http://localhost:3000

### Adding Custom Problems
1. Go to Dashboard
2. Click "Add Problem" button
3. Fill in the form:
   - Select a sheet (A2Z, Blind 75, NeetCode 150, System Design)
   - Enter problem name
   - Enter URL
   - Select type (Code/Video/Article)
   - Select difficulty (Easy/Medium/Hard)
4. Click "Add Problem"
5. Done! Your problem appears in the selected sheet

---

## For Contributors

### Development Setup
```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR-USERNAME/dsa-os.git
cd dsa-os
npm install
npm run dev
```

### Making Changes
```bash
# Create a new branch
git checkout -b feature/your-feature-name

# Make your changes, then:
git add .
git commit -m "Add your feature"
git push origin feature/your-feature-name

# Open a Pull Request on GitHub
```

### Project Structure
- `app/` - Next.js pages and API routes
- `components/` - React components
- `src/data/` - Problem sheets (JSON files)
- `src/hooks/` - Custom React hooks
- `extension/` - Chrome extension (optional)

### Key Files
- `app/dashboard/page.tsx` - Main dashboard
- `components/shared/add-problem-modal.tsx` - Add problem modal
- `app/api/problems/route.ts` - API for adding problems
- `src/hooks/use-progress.ts` - Progress tracking logic

---

## Features at a Glance

✅ **Spaced Repetition**: Smart review scheduling
✅ **4 Problem Sheets**: A2Z, Blind 75, NeetCode 150, System Design
✅ **Activity Heatmap**: 365-day contribution graph
✅ **Custom Problems**: Add your own problems to any sheet
✅ **Search**: Ctrl+K to search across all problems
✅ **Local-First**: No cloud dependencies, your data stays on your machine
✅ **Beast Mode UI**: Pitch black theme with glowing effects

---

## Need Help?

- 📖 Read the full [README.md](README.md)
- 🐛 Report bugs: [GitHub Issues](https://github.com/yourusername/dsa-os/issues)
- 💬 Ask questions: [GitHub Discussions](https://github.com/yourusername/dsa-os/discussions)
- 🤝 Contribute: See [Contributing Guidelines](README.md#-contributing)
