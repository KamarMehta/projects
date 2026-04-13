# 🏕️ Mammoth Lakes Family Trip Planner

**Real-Time Collaborative Travel Planning for Families**

Your family trip planner app with real-time synchronization! All family members can edit events, and changes appear across all devices in seconds. No waiting, no confusion—everyone stays on the same page.

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Install everything
npm run backend:install && npm install

# 2. Set up Google Cloud (credentials)
# See QUICKSTART.md for details

# 3. Start backend (Terminal 1)
npm run backend

# 4. Start frontend (Terminal 2)
npm run dev

# 5. Open http://localhost:5173
```

👉 **Full instructions:** [QUICKSTART.md](QUICKSTART.md)

## ✨ Features

✅ **Real-Time Collaboration**
- Multiple family members editing simultaneously
- Changes visible to everyone in ~5 seconds
- No conflicts or overwrites

✅ **Google Sheets Backend**
- All data stored in shared Google Sheet
- Easy for non-technical family members
- Automatic backup and version history

✅ **Optimistic UI**
- Changes appear instantly in your app
- Syncs to Google Sheets in background
- Works even if connection is slow

✅ **Edit Everything**
- Create new activities
- Update times and descriptions
- Delete activities
- Edit day dates

✅ **Share with Family**
- One Google Sheet shared by everyone
- View same data on all devices
- Track who changed what (via Google Sheets)

✅ **Mobile Friendly**
- Works on iPhone, iPad, Android
- Responsive design
- Touch-friendly interface

## 📁 What's Included

### Backend (New!)
```
backend/
├── src/server.ts              # Express server
├── src/services/              # Google Sheets API
├── src/api/routes.ts          # REST endpoints
└── package.json
```

### Frontend (Updated!)
```
src/
├── services/databaseService.ts    # API client
├── services/useActivities.ts      # React hook
└── App.tsx                        # Updated for real-time
```

### Documentation
- 📖 **QUICKSTART.md** - Fast 5-minute setup
- 📚 **BACKEND_SETUP.md** - Complete setup guide
- 🔧 **GOOGLE_SHEETS_CONFIG.md** - Sheet structure
- 🎯 **ARCHITECTURE.md** - How it all works
- 💻 **IMPLEMENTATION.md** - Tech details

## 📋 How It Works

```
You Edit Something
    ↓
React App Updates Instantly
    ↓
Sends to Backend
    ↓
Backend Writes to Google Sheet
    ↓
Other Family Members' Apps Poll (every 5 seconds)
    ↓
They See Your Change!
```

**Latency:** ~5 seconds for all users to see changes

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19 + TypeScript + Vite |
| **Backend** | Node.js + Express + TypeScript |
| **Database** | Google Sheets (API) |
| **Real-Time** | Polling (5-second intervals) |
| **Deployment** | Vercel (Frontend) + Railway/Heroku (Backend) |

## 🎯 Setup Overview

### Step 1: Google Cloud Setup (10 mins)
1. Create Google Cloud Project
2. Enable Sheets API & Drive API
3. Create Service Account
4. Download credentials JSON

👉 Detailed: [BACKEND_SETUP.md](BACKEND_SETUP.md)

### Step 2: Create Google Sheet (5 mins)
1. Create Google Sheet
2. Add sheets: "Day 1", "Day 2", "Day 3"
3. Add columns: date, id, time, title, description, tags
4. Share with service account email

👉 Details: [GOOGLE_SHEETS_CONFIG.md](GOOGLE_SHEETS_CONFIG.md)

### Step 3: Configure App (5 mins)
1. Copy credentials to `backend/.env`
2. Copy Sheet ID to `backend/.env`
3. Set `VITE_API_URL` in root `.env`
4. Install dependencies
5. Start backend & frontend

👉 Auto-setup: Run the included `setup.sh` script

### Step 4: Test (2 mins)
1. Open app in 2 browser windows
2. Edit something in window 1
3. Watch it update in window 2

Done! 🎉

## 📖 Documentation

Click any link to learn more:

| Document | Purpose | Time |
|----------|---------|------|
| [QUICKSTART.md](QUICKSTART.md) | Fast setup | 5 min |
| [BACKEND_SETUP.md](BACKEND_SETUP.md) | Complete setup guide | 20 min |
| [GOOGLE_SHEETS_CONFIG.md](GOOGLE_SHEETS_CONFIG.md) | Sheet structure & examples | 10 min |
| [ARCHITECTURE.md](ARCHITECTURE.md) | How the system works | 15 min |
| [IMPLEMENTATION.md](IMPLEMENTATION.md) | Technical details | 10 min |
| [backend/README.md](backend/README.md) | Backend documentation | 5 min |

## 🚀 Running the App

### Development

**Terminal 1 - Backend:**
```bash
npm run backend

# Output:
# ✅ Google Sheets connected successfully
# 🚀 Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
npm run dev

# Output:
# ➜  Local:   http://localhost:5173/
```

**Or both together:**
```bash
npm run dev:all
```

### Production

See [BACKEND_SETUP.md](BACKEND_SETUP.md) → Deployment section

## 📊 API Reference

```
GET    /api/activities                    Get all
GET    /api/activities/day/:dayNumber     Get day
POST   /api/activities/day/:dayNumber     Create
PUT    /api/activities/day/:dayNumber/:id Update
DELETE /api/activities/day/:dayNumber/:id Delete
PUT    /api/day/:dayNumber/date           Update date
GET    /api/health                        Health check
```

Full details in [IMPLEMENTATION.md](IMPLEMENTATION.md) → API Reference

## 🐛 Troubleshooting

### "Backend won't start"
```
Error: GOOGLE_SHEETS_CREDENTIALS is not set
```
→ Check `backend/.env` has valid credentials from Google

### "Sheet 'Day 1' not found"
→ Verify sheet names are exactly: "Day 1", "Day 2", "Day 3"

### "Can't reach backend from frontend"
→ Backend running on port 5000?
→ Check `VITE_API_URL=http://localhost:5000/api` in `.env`

### "Changes not syncing"
→ Both frontend and backend running?
→ Check browser console (F12) for errors
→ Check backend terminal for error messages

👉 More help: [BACKEND_SETUP.md](BACKEND_SETUP.md) → Troubleshooting

## 📚 Project Structure

```
MammothLakesKY/
├── backend/                       # Node.js/Express backend
│   ├── src/
│   │   ├── server.ts  
│   │   ├── services/googleSheetsService.ts
│   │   └── api/routes.ts
│   ├── package.json
│   ├── .env                      # Create from .env.example
│   └── README.md
├── src/                          # React frontend
│   ├── services/
│   │   ├── databaseService.ts
│   │   └── useActivities.ts      # Real-time hook
│   ├── components/
│   └── App.tsx                   # Updated for real-time
├── .env                          # Create from .env.example
├── package.json
├── QUICKSTART.md                 # START HERE
├── BACKEND_SETUP.md
├── GOOGLE_SHEETS_CONFIG.md
├── ARCHITECTURE.md
└── IMPLEMENTATION.md
```

## 🎓 Learning Resources

New to the concepts? Here's how to learn:

### Real-Time Apps
- [What is real-time?](https://en.wikipedia.org/wiki/Real-time_computing)
- [Web polling explained](https://en.wikipedia.org/wiki/Polling_(computer_science))

### Google Sheets API
- [Google Sheets API Docs](https://developers.google.com/sheets/api)
- [Service Accounts Guide](https://cloud.google.com/docs/authentication/serviceaccount)

### React Hooks
- [React Hooks Documentation](https://react.dev/reference/react)
- [useEffect Hook Guide](https://react.dev/reference/react/useEffect)
- [useState Hook Guide](https://react.dev/reference/react/useState)

## 🤝 Contributing

Found a bug or want to improve something?
- Check [ISSUES.md](ISSUES.md) for known issues
- Ready to help? Submit improvements!

## 📝 License

This project is for the Mehta family trip planning. Feel free to use and modify for your own family!

## ❤️ Made With Love

Created with ❤️ for collaborative family planning.

Designed for:
- 🏠 Multi-generational families
- 📱 Multiple devices
- 🌍 Anywhere in the world
- 👨‍👩‍👧‍👦 Group decision making
- 🎯 No technical overhead

## 🎯 Next Steps

1. **Read:** [QUICKSTART.md](QUICKSTART.md) (5 minutes)
2. **Setup:** Follow the 4-step setup process
3. **Configure:** Add Google credentials
4. **Test:** Try with 2 browsers
5. **Share:** Give family members the app URL
6. **Enjoy:** Collaborative trip planning! 🎉

---

**Questions?** Check the docs or open an issue!

**Questions about Google Setup?** See [BACKEND_SETUP.md](BACKEND_SETUP.md)

**Questions about Sheet Structure?** See [GOOGLE_SHEETS_CONFIG.md](GOOGLE_SHEETS_CONFIG.md)

**Technical Details?** See [ARCHITECTURE.md](ARCHITECTURE.md) or [IMPLEMENTATION.md](IMPLEMENTATION.md)

Happy planning! 🏕️✈️🗺️
