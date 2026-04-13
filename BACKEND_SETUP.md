# 🏕️ Real-Time Collaborative Backend Setup Guide

This guide will help you set up the real-time collaborative backend for your family trip planning app using Google Sheets and Node.js.

## Features

- ✅ Real-time synchronization across all devices
- ✅ All family members see updates instantly (5-second sync)
- ✅ Google Sheets as persistent database
- ✅ Automatic conflict resolution
- ✅ Backend API for reliable updates

## Prerequisites

- Node.js 16+ installed
- Google Cloud Project
- Google Sheets document

## Step 1: Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project: "Mammoth Lakes Trip"
3. Enable the following APIs:
   - Google Sheets API
   - Google Drive API

## Step 2: Create Service Account

1. In Google Cloud Console, go to **Service Accounts**
2. Click **Create Service Account**
3. Name it: `mammoth-lakes-backend`
4. Click **Create and Continue**
5. Click **Grant this service account access to project**
6. Add role: **Editor**
7. Click **Create Key** → **JSON**
8. Save the JSON file securely

## Step 3: Create Google Sheet

1. Go to [Google Sheet Templates](#google-sheet-template) section below
2. Create a new Google Sheet
3. Set up sheets for each day: "Day 1", "Day 2", "Day 3"
4. For each sheet, create columns:
   - `date` - Day date (e.g., "Thursday, July 2")
   - `id` - Activity ID (e.g., "day1-1")
   - `time` - Time range (e.g., "3:00 PM - 5:00 PM")
   - `title` - Activity title
   - `description` - Activity description
   - `tags` - JSON array (e.g., `[{"label":"Family Time","type":"family-tag"}]`)

5. Share the sheet with the service account email (from the JSON file)
6. Copy the Sheet ID from the URL: `docs.google.com/spreadsheets/d/SHEET_ID/edit`

## Step 4: Install Backend Dependencies

```bash
cd backend
npm install
```

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in:
   ```
   GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}
   GOOGLE_SHEET_ID=your_sheet_id_here
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

   **For GOOGLE_SHEETS_CREDENTIALS:**
   - Paste the entire JSON from the service account key
   - Replace newlines in the private_key with `\n` (literal backslash-n)
   - Or use an env file parser that handles multi-line JSON

## Step 6: Start Backend Server

```bash
npm run dev
```

You should see:
```
✅ Google Sheets connected successfully
🚀 Server running on http://localhost:5000
```

## Step 7: Configure Frontend

1. In the root directory, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Ensure it has:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

## Step 8: Start Frontend

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## How It Works

### Real-Time Sync Flow

```
User Edit → React State (Optimistic) → Backend API → Google Sheets
    ↓         ↓                           ↓
  Display  Auto-sync              Persistent DB
    ↑         ↑                           ↑
    └─────────┴───────────────────────────┘
       5-second polling
```

### Example: Adding an Activity

1. User clicks "Add Activity" in the app
2. Activity is added optimistically to React state
3. Request sent to backend: `POST /api/activities/day/1`
4. Backend writes to Google Sheet
5. Every 5 seconds, app polls for updates
6. All family members see the new activity

## API Endpoints

### Get All Activities
```bash
GET /api/activities
```

### Get Day Activities
```bash
GET /api/activities/day/:dayNumber
```

### Add Activity
```bash
POST /api/activities/day/:dayNumber
Body: { activity: { id, time, title, description, tags } }
```

### Update Activity
```bash
PUT /api/activities/day/:dayNumber/:activityId
Body: { time?, title?, description?, tags? }
```

### Delete Activity
```bash
DELETE /api/activities/day/:dayNumber/:activityId
```

### Update Day Date
```bash
PUT /api/day/:dayNumber/date
Body: { date: "Thursday, July 2" }
```

## Google Sheet Template

### Day 1 Sheet Sample

| date | id | time | title | description | tags |
|------|-----|------|-------|-------------|------|
| Thursday, July 2 | day1-1 | 3:00 PM - 5:00 PM | Check-in & Property Orientation | Arrive at the beautiful... | [{"label":"Family Time","type":"family-tag"}] |
| | day1-2 | 5:00 PM - 6:30 PM | Walk Around Property | Take the dogs for a walk... | [{"label":"Pet Friendly","type":"pet-tag"}] |

## Troubleshooting

### "Google Sheets not initialized"
- Check `GOOGLE_SHEETS_CREDENTIALS` in `.env`
- Verify service account email has sheet access
- Check `GOOGLE_SHEET_ID` is correct

### "Sheet 'Day 1' not found"
- Make sure sheets are named exactly: `Day 1`, `Day 2`, `Day 3`
- Column headers must match exactly: `date`, `id`, `time`, `title`, `description`, `tags`

### Changes not syncing
- Check backend is running: `http://localhost:5000/api/health`
- Check browser console for errors
- Verify `VITE_API_URL` in frontend `.env`
- Check CORS settings if running on different domains

### Connection refused
- Make sure backend is running on port 5000
- Check firewall doesn't block localhost:5000
- Try: `curl http://localhost:5000/api/health`

## Deploying to Production

For Vercel deployment:

1. **Backend**: Deploy to Vercel/Railway/Heroku
   ```bash
   cd backend
   npm run build
   # Deploy using platform's CLI or GitHub integration
   ```

2. **Frontend**: Deploy to Vercel
   ```bash
   # Add production API URL to env
   VITE_API_URL=https://your-backend-url/api
   npm run build
   ```

3. Update CORS in backend for production domain

## Tips for Family Collaboration

- All family members should have the same app open
- Changes sync within 5 seconds across all devices
- If someone's offline, edits sync when they reconnect
- Always verify your changes appear on others' screens
- For sensitive info, use the description field with private notes

---

Made with ❤️ for your Punjabi Family getaway! 👨‍👩‍👧‍👦
