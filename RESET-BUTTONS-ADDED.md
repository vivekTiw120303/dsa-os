# Reset Buttons Added ✅

## Summary
Individual reset buttons have been added to each sheet page, allowing users to reset progress for specific sheets without clearing all data.

---

## Changes Made

### 1. ✅ `src/hooks/use-progress.ts` (UPDATED)

**Added Function**:
```typescript
const clearSheetProgress = useCallback((sheetName: string, problemIds: string[]) => {
    setProgressState((prev) => {
        const updated = { ...prev };
        // Remove progress for all problems in this sheet
        problemIds.forEach(id => {
            delete updated[id];
        });
        saveProgressToStorage(updated);
        return updated;
    });
    return true;
}, []);
```

**Exported**:
- Added `clearSheetProgress` to the return object

---

### 2. ✅ `app/sheets/a2z/page.tsx` (UPDATED)

**Changes**:
- Added `RotateCcw` icon import
- Added `clearSheetProgress` to hook destructuring
- Added `handleResetSheet` function
- Added Reset button next to progress stats

**Reset Button**:
```tsx
<button
    onClick={handleResetSheet}
    className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 transition-all hover:border-red-500/50 hover:bg-red-500/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]"
    title="Reset this sheet"
>
    <RotateCcw className="h-3.5 w-3.5" />
    Reset
</button>
```

**Confirmation Dialog**:
```typescript
const handleResetSheet = () => {
    const confirmed = window.confirm(
        "Are you sure you want to reset all progress for Striver's A2Z Sheet? This action cannot be undone."
    );

    if (confirmed) {
        const problemIds = problems.map(p => p.id);
        clearSheetProgress("a2z", problemIds);
        window.location.reload();
    }
};
```

---

### 3. ✅ `app/sheets/blind75/page.tsx` (UPDATED)

**Changes**: Same as A2Z
- Added Reset button
- Confirmation message: "Are you sure you want to reset all progress for Blind 75?"
- Calls `clearSheetProgress("blind75", problemIds)`

---

### 4. ✅ `app/sheets/neetcode150/page.tsx` (UPDATED)

**Changes**: Same as A2Z
- Added Reset button
- Confirmation message: "Are you sure you want to reset all progress for NeetCode 150?"
- Calls `clearSheetProgress("neetcode150", problemIds)`

---

### 5. ✅ `app/sheets/system-design/page.tsx` (UPDATED)

**Changes**: Same as A2Z
- Added Reset button
- Confirmation message: "Are you sure you want to reset all progress for System Design?"
- Calls `clearSheetProgress("system-design", problemIds)`
- Button positioned next to "Topics" count (not "Problems")

---

## Button Styling

### Beast Mode Design
- **Border**: `border-red-500/30` with hover `border-red-500/50`
- **Background**: `bg-red-500/10` with hover `bg-red-500/20`
- **Text**: `text-red-400` (red theme for danger action)
- **Glow**: `hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]`
- **Icon**: `RotateCcw` from lucide-react
- **Size**: Small (`text-xs`, `px-3 py-1.5`)

### Button Position
Located in the progress bar section, next to the problem count:
```
[Progress %] [Complete]     [X / Y Problems] [Reset Button]
```

---

## User Flow

### Reset Individual Sheet
1. Navigate to any sheet (A2Z, Blind 75, NeetCode 150, System Design)
2. Look at the progress bar section
3. Click the red "Reset" button next to the problem count
4. Confirm the action in the dialog
5. Page reloads with progress cleared for that sheet only

### Reset All Sheets
1. Navigate to `/sheets` (sheets directory page)
2. Scroll to "Danger Zone" section at the bottom
3. Click "Reset All Progress"
4. Confirm the action
5. All progress across all sheets is cleared

---

## Comparison

### Before
- Only global "Reset All Progress" button on sheets directory page
- No way to reset individual sheets
- Had to clear all progress to start a sheet over

### After
- ✅ Global "Reset All Progress" on sheets directory page
- ✅ Individual "Reset" button on each sheet page
- ✅ Granular control over which sheets to reset
- ✅ Can reset one sheet without affecting others

---

## Technical Details

### How It Works
1. User clicks Reset button on a sheet
2. `handleResetSheet()` is called
3. Confirmation dialog appears
4. If confirmed:
   - Collects all problem IDs from that sheet
   - Calls `clearSheetProgress(sheetName, problemIds)`
   - Function removes those specific IDs from progressState
   - Updates localStorage
   - Page reloads to show cleared progress

### localStorage Impact
```typescript
// Before reset (example)
{
  "two-sum": { status: "solved", ... },
  "count-digits": { status: "solved", ... },
  "design-twitter": { status: "review", ... }
}

// After resetting Blind 75 (only removes Blind 75 problems)
{
  "count-digits": { status: "solved", ... },  // A2Z - preserved
  "design-twitter": { status: "review", ... }  // System Design - preserved
}
```

---

## Testing Checklist

### Individual Sheet Reset
- [ ] Navigate to A2Z sheet
- [ ] Mark some problems as solved
- [ ] Click Reset button
- [ ] Confirm the dialog
- [ ] Verify page reloads
- [ ] Verify A2Z progress is cleared
- [ ] Navigate to another sheet
- [ ] Verify other sheet progress is preserved

### All Sheets
- [ ] Test reset button on A2Z
- [ ] Test reset button on Blind 75
- [ ] Test reset button on NeetCode 150
- [ ] Test reset button on System Design
- [ ] Verify each only clears its own progress

### Global Reset
- [ ] Mark problems on multiple sheets
- [ ] Go to `/sheets`
- [ ] Click "Reset All Progress"
- [ ] Verify all sheets are cleared

---

## UI/UX Improvements

### Visual Feedback
- Red color scheme indicates danger action
- Hover effects provide clear interactivity
- Icon (RotateCcw) clearly communicates reset action
- Small size doesn't dominate the UI

### Safety
- Confirmation dialog prevents accidental resets
- Clear warning message in dialog
- "This action cannot be undone" warning
- Separate from main actions (not near solve buttons)

### Accessibility
- `title` attribute for tooltip
- Clear button text ("Reset")
- High contrast red color
- Keyboard accessible

---

## Future Enhancements (Optional)

### Possible Additions
1. **Undo Feature**: Store last reset in a temporary variable for 10 seconds
2. **Partial Reset**: Reset only specific categories/steps within a sheet
3. **Reset Statistics**: Show how many problems will be reset before confirming
4. **Export Before Reset**: Automatically export backup before resetting
5. **Reset History**: Track when sheets were last reset

---

<div align="center">
  <strong>Reset Buttons Complete! 🔄</strong>
  <br />
  <sub>Granular control. Safe confirmations. Beast Mode styling.</sub>
</div>
