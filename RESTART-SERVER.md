# Quick Fix: Restart Dev Server

## The Problem
You're seeing 404 errors because Next.js hasn't picked up the new route files yet.

## The Solution (2 steps)

### Step 1: Stop and Clear Cache
In your terminal where `npm run dev` is running:
1. Press `Ctrl+C` to stop the server
2. Run this command to clear the cache:
   ```bash
   rm -rf .next
   ```
   Or on Windows PowerShell:
   ```powershell
   Remove-Item -Recurse -Force .next
   ```

### Step 2: Restart Server
```bash
npm run dev
```

### Step 3: Hard Refresh Browser
Once the server restarts:
- Press `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
- Or clear browser cache

## What You Should See

After restarting, navigate to http://localhost:3000/sheets

You should now see **4 cards**:
1. ✅ Striver's A2Z Sheet (emerald theme)
2. ✅ Blind 75 (emerald theme) - NEW!
3. ✅ NeetCode 150 (emerald theme) - NEW!
4. ✅ System Design (indigo/purple theme) - NEW!

All cards should be clickable and lead to their respective pages.

## Files Created
All these files exist and are ready:
- `app/sheets/page.tsx` (updated)
- `app/sheets/blind75/page.tsx` (138 lines)
- `app/sheets/neetcode150/page.tsx` (138 lines)
- `app/sheets/system-design/page.tsx` (138 lines)

The issue is just that Next.js needs to restart to recognize the new routes!
