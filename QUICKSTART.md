# 🚀 Quick Start: Real-Time Collaborative Backend

Your app is now set up with real-time synchronization! Here's how to get started:

## Step 1: Set Up Google Cloud (5 minutes)

1. Go to https://console.cloud.google.com
2. Create a new project called "Mammoth Lakes Trip"
3. Enable APIs:
   - Google Sheets API
   - Google Drive API
4. Create a Service Account:
   - Navigate to "Service Accounts"
   - Click "Create Service Account"
   - Name: `mammoth-lakes-backend`
   - Grant "Editor" role
   - Create JSON key and download it
5. Share a Google Sheet with the service account email

## Step 2: Configure Backend (5 minutes)

```bash
# Install backend dependencies
npm run backend:install

# Copy environment template
cd backend
cp .env.example .env

# Edit .env file and add:
# - GOOGLE_SHEETS_CREDENTIALS (paste entire JSON from service account key)
# - GOOGLE_SHEET_ID (from your Google Sheet URL)
```

**Finding your Sheet ID:**
- Open your Google Sheet
- URL: `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f/edit`
- Sheet ID: `1a2b3c4d5e6f`

## Step 3: Create Google Sheet Structure

Create a Google Sheet with these columns and sheet names:

### Sheet: "Day 1"
| date | id | time | title | description | tags |
|------|-----|------|-------|-------------|------|
| Thursday, July 2 | day1-1 | 3:00 PM - 5:00 PM | Check-in | ... | [{"label":"Family Time","type":"family-tag"}] |

Repeat for "Day 2" and "Day 3"

**Important:** 
- Sheet names MUST be exactly: "Day 1", "Day 2", "Day 3"
- Column headers MUST match exactly: `date`, `id`, `time`, `title`, `description`, `tags`
- Tags must be valid JSON arrays

## Step 4: Start the Application

**Terminal 1 - Start Backend:**
```bash
npm run backend
```

Expected output:
```
✅ Google Sheets connected successfully
🚀 Server running on http://localhost:5000
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```

Open http://localhost:5173

## Step 5: Test Real-Time Sync

1. Open the app in two browser windows/tabs
2. Edit an activity in one window
3. Watch it update in the other window (within 5 seconds)
4. All family members can edit simultaneously!

## How It Works

```
You -----> App (React) -----> Backend (Node.js) -----> Google Sheets
 ↑                                                           |
 └──────────────── Auto-sync every 5 seconds ──────────────┘
```

When you:
- **Create** an activity → Added to Google Sheet immediately
- **Edit** an activity → Changed in Google Sheet immediately  
- **Delete** an activity → Removed from Google Sheet immediately
- **View the app** → Polls Google Sheet every 5 seconds for updates

Other family members see your changes within 5 seconds!

## Architecture

### Files Created:

**Backend:**
- `backend/src/server.ts` - Main server
- `backend/src/services/googleSheetsService.ts` - Google Sheets integration
- `backend/src/api/routes.ts` - API endpoints
- `backend/.env` - Configuration (create from .env.example)

**Frontend:**
- `src/services/databaseService.ts` - API communication
- `src/services/useActivities.ts` - React hook for syncing
- Updated `src/App.tsx` - Uses real-time hook

### API Endpoints:

```
GET    /api/activities                  - Get all days/activities
GET    /api/activities/day/:dayNumber   - Get specific day
POST   /api/activities/day/:dayNumber   - Add activity
PUT    /api/activities/day/:dayNumber/:id - Update activity
DELETE /api/activities/day/:dayNumber/:id - Delete activity
PUT    /api/day/:dayNumber/date         - Update day date
GET    /api/health                      - Check if running
```

## Troubleshooting

### Backend won't start
```
❌ Error: "GOOGLE_SHEETS_CREDENTIALS" is not set
```
→ Make sure `.env` file exists in `backend/` with credentials

### "Sheet 'Day 1' not found"
→ Check your Google Sheet has sheets named exactly: "Day 1", "Day 2", "Day 3"

### Frontend shows "Error loading data"
→ Backend isn't running. Make sure you ran `npm run backend` in Terminal 1

### Changes not syncing
→ Check `VITE_API_URL` in root `.env` matches backend URL

## Next Steps

- ✅ Set up Google Cloud credentials
- ✅ Create Google Sheet with proper structure
- ✅ Run backend and frontend
- ✅ Test with multiple browser windows
- ✅ Share sheet URL with family members
- ✅ Deploy to production (see BACKEND_SETUP.md for details)

## Questions?

See detailed guide: [BACKEND_SETUP.md](BACKEND_SETUP.md)

---

**Your app is now collaborative! Family members in different locations can edit the trip plan together, and everyone sees updates in real-time.** 🎉

Made with ❤️ for your Punjabi Family getaway! 👨‍👩‍👧‍👦
