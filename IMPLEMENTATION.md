# 🏕️ Real-Time Collaborative Backend Implementation

## Summary

Your Mammoth Lakes Trip Planner app now has a complete real-time collaborative backend! Family members can edit events simultaneously, and all changes sync across devices within seconds.

## What Was Added

### ✅ Backend System (Node.js + Express)

Located in `/backend`:

- **Google Sheets Integration** - All data stored in Google Sheets, shared with all family members
- **REST API** - 7 endpoints for CRUD operations
- **Real-time Sync** - Automatic polling every 5 seconds
- **CORS Support** - Safe communication between frontend and backend
- **Error Handling** - Robust error management and logging

### ✅ Frontend Integration

Updated React app:

- **`useActivities` Hook** - Manages all data syncing with optimistic updates
- **`databaseService`** - API communication layer
- **Real-time Status** - Shows last sync time in header
- **Loading States** - Shows progress while syncing
- **Error Handling** - User-friendly error messages

## File Structure

```
MammothLakesKY/
├── backend/                          # NEW: Backend server
│   ├── src/
│   │   ├── server.ts                # Express server
│   │   ├── services/
│   │   │   └── googleSheetsService.ts   # Google Sheets API
│   │   └── api/
│   │       └── routes.ts            # API endpoints
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                         # Firebase credentials (create this)
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
├── src/
│   ├── services/                    # NEW: Frontend services
│   │   ├── databaseService.ts       # API client
│   │   └── useActivities.ts         # React hook
│   ├── components/                  # Existing components
│   └── App.tsx                      # Updated to use hook
├── .env                             # NEW: Frontend config
├── .env.example
├── package.json                     # Updated with backend scripts
├── QUICKSTART.md                    # Quick setup guide (5-10 mins)
├── BACKEND_SETUP.md                 # Detailed setup guide
├── GOOGLE_SHEETS_CONFIG.md          # Google Sheets instructions
└── setup.sh                         # Automated setup script
```

## How It Works

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Family Members                         │
│  (Multiple browsers/devices anywhere in the world)       │
└──────────┬──────────────────────────────────────┬────────┘
           │                                      │
     ┌─────▼──────────┐              ┌────────────▼─────┐
     │ Browser Window │              │  Browser Window  │
     │  (User Jane)   │              │  (User Bob)      │
     └─────┬──────────┘              └────────┬─────────┘
           │                                   │
           │    React App                      │
           │    (useActivities hook)           │
           │    Optimistic updates             │
           │                                   │
           └──────────────┬────────────────────┘
                          │
                    ┌─────▼──────┐
                    │  HTTP API   │
                    │ localhost   │
                    │  :5000      │
                    └─────┬───────┘
                          │
              ┌───────────▼────────────┐
              │  Node.js Backend       │
              │  Express + TypeScript  │
              │  (Running on port 5000)│
              └───────────┬────────────┘
                          │
              ┌───────────▼────────────┐
              │  Google Sheets API     │
              │  (Cloud)               │
              │  Persistent Storage    │
              │  Shared by all users   │
              └────────────────────────┘
```

### Real-Time Sync Flow

#### When User Edits:
1. User makes change in React app
2. State updates immediately (optimistic)
3. Change sent to backend API
4. Backend writes to Google Sheet
5. All users' apps poll for changes (every 5 seconds)
6. Other users see update within 5 seconds

#### Data Flow:
```
Edit in App
    ↓
React State (instant)
    ↓
POST to Backend
    ↓
Write to Google Sheet (instant)
    ↓
Other users poll
    ↓
They see the change (5-second latency)
```

## Setup - Quick Version (5 minutes)

### 1. Install Dependencies
```bash
npm run backend:install  # Install backend packages
npm install             # Install frontend packages
```

### 2. Create .env Files
```bash
# Create backup of example files
cp backend/.env.example backend/.env
cp .env.example .env
```

### 3. Get Google Credentials
- Go to Google Cloud Console
- Create Service Account
- Download JSON key
- Paste into `backend/.env`

### 4. Create Google Sheet
- Create sheet with "Day 1", "Day 2", "Day 3"
- Share with service account email
- Copy Sheet ID to `backend/.env`

### 5. Start Everything
```bash
# Terminal 1
npm run backend

# Terminal 2
npm run dev
```

👉 See **QUICKSTART.md** for full instructions

## Setup - Detailed Version

See **BACKEND_SETUP.md** for:
- Step-by-step Google Cloud setup
- Service account creation
- Google Sheet configuration
- Environment variable setup
- Troubleshooting guide
- Production deployment

## Google Sheets Configuration

See **GOOGLE_SHEETS_CONFIG.md** for:
- Exact column structure
- JSON tag format
- Data examples
- Common errors
- Advanced customization

## API Reference

### Base URL
```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/activities` | Get all activities |
| GET | `/activities/day/:dayNumber` | Get day activities |
| POST | `/activities/day/:dayNumber` | Add activity |
| PUT | `/activities/day/:dayNumber/:id` | Update activity |
| DELETE | `/activities/day/:dayNumber/:id` | Delete activity |
| PUT | `/day/:dayNumber/date` | Update day date |
| GET | `/health` | Health check |

### Example: Add Activity
```bash
curl -X POST http://localhost:5000/api/activities/day/1 \
  -H "Content-Type: application/json" \
  -d '{
    "activity": {
      "id": "day1-5",
      "time": "10:00 PM - 11:00 PM",
      "title": "Nighttime Stroll",
      "description": "Evening walk around the property",
      "tags": [{"label":"Outdoor","type":"family-tag"}]
    }
  }'
```

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- CSS (vanilla)

### Backend
- Node.js
- Express.js
- TypeScript
- Google Sheets API
- google-spreadsheet library

### Database
- Google Sheets (no separate DB needed!)
- Collaborative by default
- Real-time updates for all users

### Deployment Ready
- Backend: Vercel, Railway, Heroku
- Frontend: Vercel, Netlify, any static hosting
- Database: Google Sheets (free!)

## Key Features

### ✅ Real-Time Collaboration
- Multi-user editing
- Changes visible in 5 seconds
- Optimistic UI updates

### ✅ No Server Database Needed
- Google Sheets is the database
- Built-in sharing with family
- No database maintenance

### ✅ Conflict Resolution
- Last-write-wins
- Automatic retry on errors
- Data consistency checks

### ✅ Offline Support (Future)
- App continues to work offline
- Changes sync when reconnected
- Optimistic updates with sync queue

### ✅ Security
- Service account for API access
- No credentials exposed to frontend
- Environment variables for secrets

## Running the App

### Start Backend
```bash
npm run backend

# Output:
# ✅ Google Sheets connected successfully
# 🚀 Server running on http://localhost:5000
```

### Start Frontend
```bash
npm run dev

# Output:
# VITE v5.0.0  ready in 123 ms
# ➜  Local:   http://localhost:5173/
```

### Or Run Both Together
```bash
npm run dev:all
```

### Test Real-Time Sync
1. Open app in 2 browser windows
2. Edit activity in window 1
3. Watch it update in window 2 (within 5 seconds)

## Troubleshooting

### Backend won't start
```
Error: GOOGLE_SHEETS_CREDENTIALS is not set
```
→ Check `backend/.env` has valid credentials

### "Sheet 'Day 1' not found"
→ Ensure sheets are named exactly: "Day 1", "Day 2", "Day 3"

### Frontend can't reach backend
```
Error: Failed to fetch from http://localhost:5000
```
→ Make sure backend is running on port 5000
→ Check `VITE_API_URL` in `.env`

### Changes not syncing
→ Check both frontend and backend are running
→ Open browser console (F12) for errors
→ Check backend console for API errors

## Deployment Checklist

- [ ] Backend running on production server
- [ ] `FRONTEND_URL` set to production domain
- [ ] Google Sheets API enabled
- [ ] Service account has sheet access
- [ ] Environment variables set on server
- [ ] CORS configured for production domain
- [ ] Frontend .env has production API URL
- [ ] Frontend built and deployed
- [ ] Test with multiple users

## Environment Variables Checklist

### `backend/.env`
```
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account"...}
GOOGLE_SHEET_ID=1a2b3c4d5e6f
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### `.env`
```
VITE_API_URL=http://localhost:5000/api
```

Production:
```
VITE_API_URL=https://your-backend.com/api
```

## Next Steps

1. ✅ Read QUICKSTART.md (5 minutes)
2. ✅ Follow BACKEND_SETUP.md steps
3. ✅ Configure Google Sheets (GOOGLE_SHEETS_CONFIG.md)
4. ✅ Test with multiple users
5. ✅ Deploy to production

## Support & Questions

- Check BACKEND_SETUP.md for detailed setup
- Check GOOGLE_SHEETS_CONFIG.md for sheet structure
- Review API endpoints in this file
- Check browser console (F12) for errors
- Check backend console for server errors

## Made with ❤️

Created for your Punjabi family trip planning. Designed for collaboration, built for reliability!

👨‍👩‍👧‍👦 July 2026 - Mammoth Caves, Kentucky
