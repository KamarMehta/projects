# 👨‍💻 Developer Guide - Code Architecture & Patterns

This guide explains the code structure and how to modify it.

## Frontend Code Structure

### `src/App.tsx` - Main Component
```tsx
function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const { daysData, loading, error, updateActivity, ... } = useActivities()
  
  // Shows loading state while syncing
  if (loading) return <LoadingScreen />
  
  // Shows error if something failed
  if (error) return <ErrorScreen />
  
  // Main app
  return <div>...</div>
}
```

**Key points:**
- Uses `useActivities` hook for all data
- Passes callback functions to child components
- Handles loading and error states

### `src/services/useActivities.ts` - React Hook
```tsx
export const useActivities = () => {
  const [daysData, setDaysData] = useState<DayInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Fetch on mount
  useEffect(() => {
    fetchAllActivities()
    const syncInterval = setInterval(fetchAllActivities, 5000)
    return () => clearInterval(syncInterval)
  }, [fetchAllActivities])
  
  // Optimistic update + sync to backend
  const updateActivity = useCallback(async (dayNumber, activityId, updates) => {
    // 1. Update state immediately (optimistic)
    setDaysData(prev => /* update data */)
    
    // 2. Sync to backend in background
    try {
      await databaseService.updateActivity(dayNumber, activityId, updates)
    } catch (err) {
      // On error, refetch to restore consistency
      await fetchAllActivities()
    }
  }, [])
  
  return { daysData, loading, error, updateActivity, ... }
}
```

**Key patterns:**
- Optimistic UI updates (instant feedback)
- Background API sync (doesn't block UI)
- Error recovery (refetch on failure)
- Polling (every 5 seconds)

### `src/services/databaseService.ts` - API Client
```tsx
class DatabaseService {
  async getAllActivities(): Promise<DayInfo[]> {
    const response = await fetch(`${API_BASE_URL}/activities`)
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data || []
  }
  
  async updateActivity(dayNumber, activityId, updates) {
    const response = await fetch(
      `${API_BASE_URL}/activities/day/${dayNumber}/${activityId}`,
      { method: 'PUT', body: JSON.stringify(updates) }
    )
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
  }
}
```

**Pattern:**
- One method per API endpoint
- Always check `success` flag
- Throw errors for callers to handle
- Simple, predictable interface

## Backend Code Structure

### `backend/src/server.ts` - Express App
```typescript
async function startServer() {
  // Initialize Google Sheets connection
  await googleSheetsService.initialize()
  
  // Add routes
  app.use('/api', routes)
  
  // Error handling
  app.use((err, req, res, next) => {
    console.error('Error:', err)
    res.status(500).json({ success: false, error: err.message })
  })
  
  // Start listening
  app.listen(PORT)
}
```

**Key points:**
- Initializes Google Sheets on startup
- Mounts routes at `/api`
- Centralized error handling
- Logs all errors

### `backend/src/services/googleSheetsService.ts` - Data Layer
```typescript
class GoogleSheetsService {
  async initialize() {
    // Create JWT auth with service account
    this.serviceAccountAuth = new JWT({...})
    // Load spreadsheet
    this.doc = new GoogleSpreadsheet(sheetId)
  }
  
  async getAllActivities(): Promise<DayInfo[]> {
    // Iterate through sheets
    // Parse rows
    // Return structured data
  }
  
  async updateActivity(dayNumber, activityId, updates) {
    const sheet = this.doc.sheetsByTitle[`Day ${dayNumber}`]
    const rows = await sheet.getRows()
    const row = rows.find(r => r.get('id') === activityId)
    row.set('time', updates.time)
    await row.save()
  }
}

export default new GoogleSheetsService()
```

**Pattern:**
- Singleton pattern (one instance)
- Methods return typed data
- Each method is focused
- Error handling for each operation

### `backend/src/api/routes.ts` - API Handlers
```typescript
router.put(
  '/activities/day/:dayNumber/:activityId',
  asyncHandler(async (req: Request, res: Response) => {
    const { dayNumber, activityId } = req.params
    const updates = req.body
    
    // Validate
    if (!dayNumber || !activityId) {
      return res.status(400).json({ success: false, error: 'Missing params' })
    }
    
    // Call service
    await googleSheetsService.updateActivity(
      parseInt(dayNumber), 
      activityId, 
      updates
    )
    
    // Return response
    res.json({ success: true, message: 'Activity updated' })
  })
)
```

**Pattern:**
- Use `asyncHandler` wrapper for error handling
- Validate inputs first
- Call service layer
- Return consistent response format

## Modifying the Code

### Adding a New Field to Activities

1. **Update types** (`src/App.tsx`):
   ```tsx
   export interface Activity {
     id: string
     time: string
     title: string
     description: string
     tags: Array<{ label: string; type: string }>
     location?: string  // NEW
   }
   ```

2. **Update Google Sheet**:
   - Add new column `location`
   - Fill in values

3. **Update service** (`backend/src/services/googleSheetsService.ts`):
   ```tsx
   const activity = {
     id: row.get('id'),
     time: row.get('time'),
     title: row.get('title'),
     description: row.get('description'),
     tags: JSON.parse(row.get('tags')),
     location: row.get('location')  // NEW
   }
   ```

4. **Update API** (`backend/src/api/routes.ts`):
   ```tsx
   await sheet.addRow({
     id: activity.id,
     time: activity.time,
     title: activity.title,
     description: activity.description,
     tags: JSON.stringify(activity.tags),
     location: activity.location  // NEW
   })
   ```

5. **Update components** (e.g., `ActivityEditor.tsx`):
   ```tsx
   <div className="editor-field">
     <label>Location</label>
     <input
       type="text"
       value={location}
       onChange={(e) => setLocation(e.target.value)}
     />
   </div>
   ```

### Adding a New API Endpoint

1. **Create handler** in `routes.ts`:
   ```tsx
   router.get('/health', (req, res) => {
     res.json({ success: true, status: 'OK' })
   })
   ```

2. **Add to frontend service** (`databaseService.ts`):
   ```tsx
   async getHealth(): Promise<boolean> {
     const response = await fetch(`${API_BASE_URL}/health`)
     const data = await response.json()
     return data.success
   }
   ```

3. **Use in component**:
   ```tsx
   const isHealthy = await databaseService.getHealth()
   ```

### Changing Sync Interval

**File:** `src/services/useActivities.ts`

```tsx
// Find this line:
const syncInterval = setInterval(fetchAllActivities, 5000)

// Change 5000 to different milliseconds:
// 1 second:   1000
// 10 seconds: 10000
// 30 seconds: 30000
```

### Handling Conflicts

Currently uses "last-write-wins" strategy. To modify:

**File:** `src/services/useActivities.ts`

```tsx
// Current: Any update overwrites
await databaseService.updateActivity(dayNumber, activityId, updates)

// Could add: Timestamp comparison
const backendData = await databaseService.getDayActivities(dayNumber)
const backendActivity = backendData.activities.find(a => a.id === activityId)

if (backendActivity.updatedAt > localActivity.updatedAt) {
  // Backend is newer, don't overwrite
  await fetchAllActivities()
}
```

### Adding Database Logging

**File:** `backend/src/services/googleSheetsService.ts`

```tsx
async updateActivity(dayNumber, activityId, updates) {
  console.log(`[${new Date().toISOString()}] Updating activity ${activityId}`)
  console.log('Updates:', updates)
  
  // ... rest of code
  
  console.log(`✅ Updated ${activityId}`)
}
```

### Adding Request Logging

**File:** `backend/src/server.ts`

```tsx
app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`)
  })
  next()
})
```

## Testing Changes

### Test API Endpoints

**Using curl:**
```bash
# Get all activities
curl http://localhost:5000/api/activities

# Add activity
curl -X POST http://localhost:5000/api/activities/day/1 \
  -H "Content-Type: application/json" \
  -d '{"activity":{"id":"test-1","time":"10:00 AM","title":"Test","description":"Test","tags":[]}}'

# Update activity
curl -X PUT http://localhost:5000/api/activities/day/1/test-1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'
```

### Test Frontend

1. Open DevTools (F12)
2. Go to Console tab
3. Check for errors
4. Go to Network tab
5. Click and watch requests

### Test React Hook

**In browser console:**
```javascript
// Add to App.tsx temporarily:
window.testHook = { daysData, updateActivity, ... }

// Then in console:
window.testHook.daysData
window.testHook.updateActivity(1, 'day1-1', { title: 'New Title' })
```

## Performance Optimization

### Reduce API Calls

**Current:** Polls every 5 seconds

**Better:** Only fetch changed data
```tsx
const [lastModified, setLastModified] = useState<Date | null>(null)

const fetchChanges = useCallback(async () => {
  // Only fetch if data might have changed
  const newData = await databaseService.getAllActivities()
  
  if (JSON.stringify(newData) !== JSON.stringify(daysData)) {
    setDaysData(newData)
  }
}, [daysData])
```

### Cache Data

```tsx
const cache = new Map()

const getDayActivities = useCallback(async (dayNumber) => {
  if (cache.has(dayNumber)) {
    return cache.get(dayNumber)
  }
  const data = await databaseService.getDayActivities(dayNumber)
  cache.set(dayNumber, data)
  return data
}, [])
```

### Lazy Load Days

```tsx
// Only load the day being viewed
const visibleDay = daysData.find(d => d.day === visibleDayNumber)
if (!visibleDay) {
  await fetchDayData(visibleDayNumber)
}
```

## Debugging

### Enable Debug Logging

**Frontend:**
```tsx
// In useActivities.ts, add:
const DEBUG = true

const fetchAllActivities = useCallback(async () => {
  if (DEBUG) console.log('[useActivities] Fetching...')
  const activities = await databaseService.getAllActivities()
  if (DEBUG) console.log('[useActivities] Fetched:', activities)
  setDaysData(activities)
}, [])
```

**Backend:**
```tsx
// In googleSheetsService.ts, add:
const DEBUG = process.env.DEBUG === 'true'

async updateActivity(dayNumber, activityId, updates) {
  if (DEBUG) {
    console.log(`[updateActivity] Day ${dayNumber}, ID ${activityId}`)
    console.log('[updateActivity] Updates:', updates)
  }
  // ... rest of code
}
```

Run with:
```bash
DEBUG=true npm run dev
```

## Code Style

### TypeScript
- Use interfaces for data types
- Add return types to functions
- Avoid `any` type
- Use strict mode

### React
- Use hooks, avoid class components
- Memoize functions in hooks with `useCallback`
- Memoize dependencies correctly
- Clean up effects

### Naming
- Variables: `camelCase`
- Constants: `UPPER_CASE`  
- Components: `PascalCase`
- Files: `kebab-case` or `PascalCase` for components

### Comments
```tsx
// Use comments for WHY, not WHAT
// Good:
// Debounce API calls to reduce server load
setInterval(fetchData, 5000)

// Bad:
// Fetch data every 5 seconds
setInterval(fetchData, 5000)
```

## Common Patterns

### Optimistic Updates
```tsx
// Update state immediately
setDaysData(prev => /* new state */)

// Sync to backend
try {
  await api.update(data)
} catch (err) {
  // Revert on error
  await refetch()
}
```

### Error Handling
```tsx
try {
  const result = await api.call()
  setSuccess(true)
} catch (err) {
  setError(err.message)
  // Recover
  await refetch()
}
```

### Loading States
```tsx
const [loading, setLoading] = useState(true)

useEffect(() => {
  setLoading(true)
  fetch().then(data => {
    setData(data)
    setLoading(false)
  })
}, [])

if (loading) return <Spinner />
return <Content />
```

## Resources

### Documentation
- React Docs: https://react.dev
- Express Docs: https://expressjs.com
- TypeScript: https://www.typescriptlang.org
- Google Sheets API: https://developers.google.com/sheets

### Debugging Tools
- Browser DevTools (F12)
- VS Code Debugger
- Console logging
- Network inspector

---

**Questions about the code?** Check:
- The inline comments in each file
- ARCHITECTURE.md for system design
- IMPLEMENTATION.md for technical details
- browser DevTools for frontend issues
- `npm run backend` terminal for backend issues
