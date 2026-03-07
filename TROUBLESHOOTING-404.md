# Troubleshooting 404 Errors for New Sheets

## Issue
The new sheets (Blind 75, NeetCode 150, System Design) are showing 404 errors even though the files exist.

## Root Cause
Next.js dev server needs to restart to pick up new route files, or browser cache is showing old version.

## Solution Steps

### Step 1: Restart the Dev Server
1. Stop the current dev server (Ctrl+C in the terminal)
2. Clear Next.js cache:
   ```bash
   rm -rf .next
   ```
3. Restart the dev server:
   ```bash
   npm run dev
   ```

### Step 2: Hard Refresh Browser
After restarting the server:
1. Open the browser
2. Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac) to hard refresh
3. Or open DevTools (F12) → Network tab → Check "Disable cache"

### Step 3: Verify Files Exist
All these files should exist:
- ✅ `app/sheets/page.tsx` (updated with all 4 cards)
- ✅ `app/sheets/blind75/page.tsx`
- ✅ `app/sheets/neetcode150/page.tsx`
- ✅ `app/sheets/system-design/page.tsx`

### Step 4: Check Routes
After restart, these routes should work:
- http://localhost:3000/sheets (should show 4 cards)
- http://localhost:3000/sheets/a2z (existing, should work)
- http://localhost:3000/sheets/blind75 (new)
- http://localhost:3000/sheets/neetcode150 (new)
- http://localhost:3000/sheets/system-design (new)

## Verification Checklist

### Sheets Directory Page (`/sheets`)
- [ ] Shows 4 cards (A2Z, Blind 75, NeetCode 150, System Design)
- [ ] All cards are clickable (no "Coming Soon" or disabled state)
- [ ] System Design card has indigo/purple theme
- [ ] All cards have "Active" badge

### Blind 75 Page (`/sheets/blind75`)
- [ ] Page loads without 404
- [ ] Shows "Blind 75" badge with trophy icon
- [ ] Title: "The Most Frequently Asked FAANG Questions"
- [ ] Progress bar shows 0/75 initially
- [ ] Search bar works (Ctrl+K)
- [ ] Problems grouped by category (Arrays, Binary, etc.)

### NeetCode 150 Page (`/sheets/neetcode150`)
- [ ] Page loads without 404
- [ ] Shows "NeetCode 150" badge
- [ ] Title: "Expanded Algorithmic Patterns for Deep Mastery"
- [ ] Progress bar shows 0/150 initially
- [ ] Problems grouped by topic

### System Design Page (`/sheets/system-design`)
- [ ] Page loads without 404
- [ ] Shows indigo/purple theme (not emerald)
- [ ] Badge uses Layers icon with indigo colors
- [ ] Title: "Master High-Level and Low-Level System Scalability"
- [ ] Progress bar has indigo-to-purple gradient
- [ ] Problems show "Watch" buttons (indigo) for videos
- [ ] Problems show "Read" buttons (purple) for articles

## If Still Not Working

### Check Next.js Config
Verify `next.config.ts` doesn't have any custom routing that might interfere.

### Check File Permissions
Ensure all new files have read permissions:
```bash
ls -la app/sheets/blind75/
ls -la app/sheets/neetcode150/
ls -la app/sheets/system-design/
```

### Check Console for Errors
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for any import errors or module not found errors
4. Check Network tab for failed requests

### Manual Verification
Run these commands to verify files:
```bash
# Check if files exist
ls app/sheets/blind75/page.tsx
ls app/sheets/neetcode150/page.tsx
ls app/sheets/system-design/page.tsx

# Check file contents (should not be empty)
wc -l app/sheets/blind75/page.tsx
wc -l app/sheets/neetcode150/page.tsx
wc -l app/sheets/system-design/page.tsx
```

## Expected Behavior After Fix

1. Navigate to `/sheets` → See 4 active cards
2. Click "Blind 75" → Loads page with 75 problems
3. Click "NeetCode 150" → Loads page with 150 problems
4. Click "System Design" → Loads page with indigo theme and 75 topics
5. All pages have search, progress tracking, and collapse/expand functionality
6. System Design shows "Watch" and "Read" buttons instead of "Solve"
