# 📊 Google Sheets Configuration Guide

This guide explains how to structure your Google Sheet for the real-time collaborative app.

## Quick Overview

- **3 sheets** required: "Day 1", "Day 2", "Day 3"
- **6 columns** per sheet: `date`, `id`, `time`, `title`, `description`, `tags`
- **Column order matters** - must be in the exact order above
- **Tags are JSON** - must be valid JSON arrays

## Step-by-Step Setup

### 1. Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Blank" to create new sheet
3. Name it something like "Mammoth Lakes Trip 2026"

### 2. Create First Sheet

1. Right-click the default sheet tab at the bottom
2. Select "Rename"
3. Change to exactly: **`Day 1`**

### 3. Add Column Headers

In the first row, add these column headers in this exact order:

| Column A | Column B | Column C | Column D | Column E | Column F |
|----------|----------|----------|----------|----------|----------|
| date | id | time | title | description | tags |

### 4. Add Sample Data (Optional)

Here's an example row:

```
A: Thursday, July 2
B: day1-1
C: 3:00 PM - 5:00 PM
D: Check-in & Property Orientation
E: Arrive at the beautiful Meemac Manor property...
F: [{"label":"Family Time","type":"family-tag"},{"label":"Pets Welcome","type":"pet-tag"}]
```

**Important:** The `tags` column must contain valid JSON arrays!

### 5. Create Additional Sheets

Repeat for Day 2 and Day 3:
- Create sheet named exactly: **`Day 2`**
- Create sheet named exactly: **`Day 3`**
- Use same column headers for each

**Result:** Your Google Sheet should have 4 tabs at the bottom:
```
[Sheet1] [Day 1] [Day 2] [Day 3]
```

You can delete the default "Sheet1" if you want.

## Column Descriptions

### date (Column A)
**Purpose:** Display the day's date  
**Example:** `Thursday, July 2`  
**Format:** Any text format  
**Required:** Yes (appears once per day)

### id (Column B)
**Purpose:** Unique identifier for each activity  
**Example:** `day1-1`, `day2-4`, `day3-2`  
**Format:** Must be unique within the day  
**Required:** Yes

### time (Column C)
**Purpose:** Time range for the activity  
**Example:** `3:00 PM - 5:00 PM`  
**Format:** Any text (format as you like)  
**Required:** Yes

### title (Column D)
**Purpose:** Activity name/title  
**Example:** `Check-in & Property Orientation`  
**Format:** Text (up to 100 chars recommended)  
**Required:** Yes

### description (Column E)
**Purpose:** Detailed activity description  
**Example:** `Arrive at the beautiful property. Explore both buildings...`  
**Format:** Text (can contain line breaks)  
**Required:** Yes (can be empty string)

### tags (Column F)
**Purpose:** JSON array of tags/categories  
**Example:** `[{"label":"Family Time","type":"family-tag"}]`  
**Format:** Valid JSON array only!  
**Required:** Yes (can be empty array `[]`)

## Tags Format

Tags help organize and color-code activities. Each tag is a JSON object with:
- `label` - Display text
- `type` - CSS class for styling

### Predefined Tag Types (with default styles):

```
{ "label": "Family Time", "type": "family-tag" }        - Blue background
{ "label": "Couples' Time", "type": "couple-tag" }       - Pink background
{ "label": "Pet Friendly", "type": "pet-tag" }           - Green background
{ "label": "Adventure", "type": "family-tag" }           - Blue background
{ "label": "Dining", "type": "dining-tag" }              - Orange background
{ "label": "Important", "type": "important-tag" }        - Red background
```

### Complete Example Tag Array:

```json
[
  {"label":"Family Time","type":"family-tag"},
  {"label":"Pets Welcome","type":"pet-tag"},
  {"label":"Adventure","type":"family-tag"}
]
```

### Empty Tags:

If no tags, use empty array:
```json
[]
```

## Complete Example Sheet

### Day 1 Sheet:

| date | id | time | title | description | tags |
|------|-----|------|-------|-------------|------|
| Thursday, July 2 | day1-1 | 3:00 PM - 5:00 PM | Check-in & Orientation | Arrive at Meemac Manor. Explore buildings and amenities. | [{"label":"Family Time","type":"family-tag"}] |
| | day1-2 | 5:00 PM - 6:30 PM | Dog Walk | Walk around property and let pets settle. | [{"label":"Pet Friendly","type":"pet-tag"}] |
| | day1-3 | 6:30 PM - 8:30 PM | Welcome Dinner | Prepare Punjabi-style dinner together. | [{"label":"Family Bonding","type":"family-tag"}] |
| | day1-4 | 8:30 PM - 10:00 PM | Game Night & Karaoke | Board games and singing! | [{"label":"Entertainment","type":"family-tag"}] |

**Notes:**
- Leave `date` column blank after first entry of the day
- Each row needs unique `id`
- Only change `title`, `description` if needed - don't edit structure

## JSON Validation

Your tags MUST be valid JSON. Use these resources to validate:
- https://jsonlint.com/
- https://www.json-formatter.com/

### ❌ Invalid Examples:
```json
{"label":"Family Time"}                    // Missing "type"
[{"label":'Family Time',"type":"tag"}]     // Single quotes not allowed
[{label:"Family Time",type:"tag"}]         // Missing quotes around keys
```

### ✅ Valid Examples:
```json
[]
[{"label":"Family Time","type":"family-tag"}]
[{"label":"Dinner","type":"dining-tag"},{"label":"Important","type":"important-tag"}]
```

## Sharing with Service Account

1. Copy service account email from `.env` (the `client_email` value)
2. In Google Sheet, click "Share" (top right)
3. Paste service account email
4. Give "Editor" permission
5. Uncheck "Notify people" if you want
6. Click "Share"

## Testing Your Sheet

Once configured:

1. Start backend: `npm run backend`
2. Start frontend: `npm run dev`
3. Open http://localhost:5173
4. If it says "Loading..." then goes to content, ✅ it works!
5. Edit an activity in the app
6. Check Google Sheet - changes should appear there too!

## Troubleshooting

### Error: "Sheet 'Day 1' not found"
❌ Check sheet names are exactly "Day 1", "Day 2", "Day 3" (no extra spaces)

### Error: "Invalid JSON in tags column"
❌ Make sure tags are valid JSON. Open the cell and check for:
- Missing quotes around keys or values
- Single quotes instead of double quotes
- Missing braces or brackets
- Trailing commas

### Activities not showing up
❌ Check:
1. Column headers are exactly: `date`, `id`, `time`, `title`, `description`, `tags`
2. No extra spaces in header names
3. Headers are in first row
4. Sheet is shared with service account

### Changes not syncing to Google Sheet
❌ Check:
1. Backend is running and connected to Google Sheets
2. Service account has Editor permission on sheet
3. No formula errors in Google Sheet
4. Check backend console for error messages

## Tips & Best Practices

1. **Don't delete or reorder columns** - App expects exact column order
2. **Use consistent date format** - Makes it cleaner (e.g., always "Thursday, July 2")
3. **Keep descriptions concise** - Very long text might not display well
4. **Test after big changes** - Make a test sheet first
5. **Backup your sheet** - Google Sheets auto-saves, but good to have copy
6. **Use meaningful IDs** - Format like `day#-#` makes them recognizable

## Advanced: Custom Tag Types

Looking to add new tag types? Edit [src/components/ActivityEditor.css](src/components/ActivityEditor.css):

```css
.tag.my-custom-tag {
  background-color: #your-color;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}
```

Then use in your tags:
```json
{"label":"My Label","type":"my-custom-tag"}
```

---

**Questions?** Check BACKEND_SETUP.md or QUICKSTART.md

Made with ❤️ for your Punjabi Family getaway! 👨‍👩‍👧‍👦
