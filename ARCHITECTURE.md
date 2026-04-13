# 🎯 System Architecture & Data Flow

## High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     FAMILY MEMBERS                            │
│  (Jane, Bob, Sarah, etc. - anywhere in the world)            │
└──────────────────────┬───────────────────────────────────────┘
                       │
          ┌────────────┴────────────┬────────────┐
          │                         │            │
    ┌─────▼────┐            ┌──────▼──┐    ┌───▼──────┐
    │  iPhone  │            │ Laptop  │    │ Tablet   │
    │ Browser  │            │ Browser │    │ Browser  │
    └─────┬────┘            └──────┬──┘    └───┬──────┘
          │                         │            │
          │ WebBrowser         WebBrowser    WebBrowser
          │                         │            │
          └────────────┬────────────┴────────────┘
                       │
        ┌──────────────▼──────────────┐
        │  REACT APP (Vite)           │
        │  Frontend (Port 5173)       │
        │                             │
        │  • useActivities Hook       │
        │  • Optimistic UI Updates    │
        │  • Error Handling           │
        │  • Real-time Display        │
        └──────────────┬──────────────┘
                       │
                  HTTP/REST
                  (Axios)
                       │
        ┌──────────────▼──────────────┐
        │  EXPRESS.JS BACKEND         │
        │  (Node.js, Port 5000)       │
        │                             │
        │  • REST API Endpoints       │
        │  • CORS Middleware          │
        │  • Error Handling           │
        │  • Business Logic           │
        └──────────────┬──────────────┘
                       │
              Google Sheets API
          (OAuth 2.0 Service Account)
                       │
        ┌──────────────▼──────────────┐
        │  GOOGLE SHEETS              │
        │  (Cloud Database)           │
        │                             │
        │  • Day 1 Sheet              │
        │  • Day 2 Sheet              │
        │  • Day 3 Sheet              │
        │  • Real-time Sync           │
        └─────────────────────────────┘
```

## Data Flow - Creating an Activity

### Step 1: User Action
```
User clicks "Add Activity"
         │
         ↓
User fills form
         │
         ↓
User clicks "Save"
```

### Step 2: Frontend Processing
```
Save button clicked
         │
         ↓
useActivities.addActivity() called
         │
         ↓
React state updated IMMEDIATELY (Optimistic)
         │
         └─→ User sees change in UI instantly
         │
         ↓
API call dispatched (background)
POST /api/activities/day/1
{
  "activity": {
    "id": "day1-5",
    "time": "10:00 PM",
    "title": "Night Walk",
    "description": "...",
    "tags": [...]
  }
}
```

### Step 3: Backend Processing
```
Express receives POST request
         │
         ↓
Validate data
         │
         ↓
Call googleSheetsService.addActivity()
         │
         ↓
Service uses Google Sheets API
         │
         ↓
Row inserted into Google Sheet
```

### Step 4: Real-Time Sync (Other Users)
```
Other user's app (polling every 5 seconds)
         │
         ↓
GET /api/activities/day/1
         │
         ↓
Backend fetches latest from Google Sheets
         │
         ↓
Returns updated activities list
         │
         ↓
React hook detects changes
         │
         ↓
Updates state
         │
         ↓
OTHER USER SEES THE NEW ACTIVITY!
```

## Sync Timeline

```
User 1's Action         User 1's Device         Backend         Google Sheets       User 2's Device
──────────────          ───────────────         ───────         ──────────────      ───────────────

A) Creates activity
   ├─ 0ms: Click Save
   │
   ├─ 10ms: State updated
   │   (User 1 sees it)
   │
   ├─ 50ms: API request sent
   │____________________________________________→ ┌─ Received
   │                                              │ 
   │                                              ├─ 100ms: Write to Sheet
   │                                              │____________→ Activity added
   │                                              │
   │◄─ 200ms: Response OK ◄────────────────────────
   │ (Confirmed)
   │
   ├─ 201ms: Ready for more edits
   │
   │
   │
   │                                                            ┌─ 5000ms: Poll check
   │                                                            │
   │                                                            ├─ 5050ms: API called
   │                                                            │___→ Returns new data
   │                                                            │
   │                                                            ├─ 5100ms: State updated
   │                                                            │
   │                                                            └─ 5101ms: User 2 sees it!
```

## Component Communication

```
┌─────────────────────────────────────────────────────┐
│  App.tsx                                            │
│  - Renders: DaySchedule, Overview, Dining, etc.   │
│  - Uses useActivities hook                         │
└──────────────────────────┬──────────────────────────┘
                           │
                   useActivities Hook
                  (src/services/useActivities.ts)
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    useState()        useEffect()      useCallback()
         │                 │                 │
    daysData          Polling(5s)       updateActivity
    loading           Sync data         deleteActivity
    error                               addActivity
    lastSync                            updateDayDate
         │                 │                 │
         └─────────────────┼─────────────────┘
                           │
                           │ Calls
                           │
              ┌────────────▼────────────┐
              │ databaseService         │
              │ (src/services/          │
              │  databaseService.ts)    │
              │                         │
              │ Methods:                │
              │• getAllActivities()     │
              │• getDayActivities()     │
              │• addActivity()          │
              │• updateActivity()       │
              │• deleteActivity()       │
              │• updateDayDate()        │
              └────────────┬────────────┘
                           │
                      HTTP Fetch
                           │
              ┌────────────▼────────────┐
              │ BACKEND (Port 5000)     │
              │ /api/activities         │
              │ /api/day/:dayNumber     │
              └────────────┬────────────┘
                           │
                 Google Sheets API
                           │
              ┌────────────▼────────────┐
              │ Google Sheets           │
              │ (Persistent Storage)    │
              └─────────────────────────┘
```

## State Management Flow

```
USER INTERACTION (Edit Activity)
        │
        ↓
Component calls updateActivity()
        │
        ↓
useActivities Hook
        │
        ├─→ setDaysData() [OPTIMISTIC]
        │   └─→ UI updates immediately
        │       (User sees change right away)
        │
        ├─→ databaseService.updateActivity()
        │   └─→ HTTP PUT request to backend
        │       └─→ Backend updates Google Sheet
        │
        └─→ Every 5 seconds: Polling
            └─→ GET /api/activities/day/1
                └─→ Fetch latest from Google Sheet
                    └─→ Update state if changed
                        └─→ UI updates
```

## Error & Conflict Resolution

```
EDIT SUBMITTED TO BACKEND
        │
        ↓
BACKEND PROCESSES
        │
        ├─ SUCCESS
        │  ├─→ Update confirmed
        │  └─→ Return 200 OK
        │
        └─ ERROR
           ├─→ Database error
           ├─→ Conflict detected  
           └─→ Return error response
                │
                ↓
           FRONTEND ERROR HANDLER
           ├─→ Set error state
           ├─→ Show error message
           ├─→ Trigger re-fetch
           │   └─→ Restore data from Google Sheet
           └─→ User can retry
```

## Real-Time Updates Polling

```
useEffect runs on mount
        │
        ↓
Calls fetchAllActivities()
        │
        ├─→ GET /api/activities
        ├─→ Stores data in state
        └─→ Sets lastSync time

        │
        ↓
Sets interval: every 5000ms (5 seconds)
        │
        ├─→ Call fetchAllActivities() again
        ├─→ Compare with previous state
        ├─→ If different: Update React state
        └─→ Components re-render with new data

        │
        ↓
When component unmounts
        │
        └─→ Clear interval
            └─→ Stop polling
```

## Google Sheets API Integration

```
SERVICE ACCOUNT
        │
        ├─ Credentials
        │  ├─ client_email
        │  ├─ private_key
        │  └─ project_id
        │
        ↓
OAuth 2.0 Authentication
        │
        ├─ Sign request with private key
        │
        ├─ Google Sheets API
        │  ├─ Verify signature
        │  └─ Grant access
        │
        ↓
SPREADSHEET ACCESS
        │
        ├─ Load sheet info
        ├─ Read() rows
        ├─ addRow() new activity
        ├─ row.set() update fields
        ├─ row.save() commit changes
        └─ row.delete() remove activity
```

## Data Structure

### React State (daysData)
```typescript
[
  {
    day: 1,
    date: "Thursday, July 2",
    activities: [
      {
        id: "day1-1",
        time: "3:00 PM - 5:00 PM",
        title: "Check-in",
        description: "...",
        tags: [
          { label: "Family Time", type: "family-tag" },
          { label: "Pets", type: "pet-tag" }
        ]
      },
      // ... more activities
    ]
  },
  // ... more days
]
```

### Google Sheet Row
```
| date | id | time | title | description | tags |
|------|-----|------|-------|-------------|------|
| Thursday, July 2 | day1-1 | 3:00 PM - 5:00 PM | Check-in | ... | [{"label":"Family Time","type":"family-tag"}] |
```

### API Request/Response
```json
Request:
{
  "activity": {
    "id": "day1-5",
    "time": "10:00 PM",
    "title": "Night Walk"
  }
}

Response:
{
  "success": true,
  "message": "Activity added"
}
```

## Performance Characteristics

| Operation | Duration | Notes |
|-----------|----------|-------|
| User action → UI update | ~50ms | Optimistic, instant |
| UI update → Backend | ~100ms | HTTP roundtrip |
| Backend → Google Sheet | ~200ms | API latency |
| Other users see change | ~5000ms | Poll interval |
| **Total latency** | ~5-6 seconds | Expected, acceptable |

## Scalability

```
Single Device
├─ React app
├─ HTTP requests
└─ Works great

Multiple Devices (3-4 people)
├─ React apps on each device
├─ All polling Google Sheets
├─ All can edit independently
└─ 5-second sync = acceptable latency

Many Devices (large organization)
├─ Consider WebSocket for < 1 second
├─ Consider Supabase for real-time
├─ Consider dedicated database
└─ Google Sheets still works fine

Server Load
├─ Backend: ~1 request per user per 5 seconds
├─ 3 users = 36 requests per minute
├─ 100 users = 1200 requests per minute
├─ Still very low load
└─ Can add caching if needed
```

## Deployment Architecture

### Development
```
Localhost:3000 (Frontend) ←→ Localhost:5000 (Backend) ←→ Google Sheets
```

### Production
```
Vercel/Netlify (Frontend) ←→ Railway/Heroku (Backend) ←→ Google Sheets
```

## Made with ❤️

This architecture is designed for simplicity, reliability, and family collaboration!

Questions? Check the documentation files:
- QUICKSTART.md - Fast setup
- BACKEND_SETUP.md - Detailed guide  
- GOOGLE_SHEETS_CONFIG.md - Sheet structure
- IMPLEMENTATION.md - Full explanation
