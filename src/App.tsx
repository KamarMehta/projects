import { useState } from 'react'
import './App.css'
import { TabNav } from './components/TabNav'
import { Overview } from './components/tabs/Overview'
import { DaySchedule } from './components/tabs/DaySchedule'
import { Dining } from './components/tabs/Dining'
import { Shopping } from './components/tabs/Shopping'
import { useActivities } from './services/useActivities'

type TabType = 'overview' | 'day1' | 'day2' | 'day3' | 'dining' | 'shopping'

export interface Activity {
  id: string
  time: string
  title: string
  description: string
  tags: Array<{ label: string; type: string }>
}

export interface DayInfo {
  day: number
  date: string
  activities: Activity[]
}

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const {
    loading,
    error,
    lastSync,
    updateActivity,
    deleteActivity,
    addActivity,
    updateDayDate,
    getDayData,
  } = useActivities()

  if (loading) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>🏕️ July 2026 Family Adventure</h1>
          <p>Loading your collaborative trip planner...</p>
        </header>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>⏳ Syncing with Firebase...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>🏕️ July 2026 Family Adventure</h1>
          <p>Error loading data</p>
        </header>
        <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
          <p>❌ {error}</p>
          <p>Please check your internet connection and try again</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🏕️ July 2026 Family Adventure</h1>
        <p>Mammoth Caves & Nolin Lake, Kentucky</p>
        <p className="subtitle">July 2-4, 2026</p>
        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
          <span>🔄 Real-time Sync • Last updated: {lastSync.toLocaleTimeString()}</span>
        </div>
      </header>

      <div className="trip-info">
        <div className="info-card">
          <h3>👨‍👩‍👧‍👦 Group Size</h3>
          <p>9 Family Members</p>
        </div>
        <div className="info-card">
          <h3>🏡 Location</h3>
          <p>Clarkson, Kentucky</p>
        </div>
        <div className="info-card">
          <h3>🗓️ Duration</h3>
          <p>3 Days / 2 Nights</p>
        </div>
        <div className="info-card">
          <h3>🐕 Furry Friends</h3>
          <p>1 Golden Retriever + 1 Maltipoo</p>
        </div>
      </div>

      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="content">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'day1' && (
          <DaySchedule 
            dayData={getDayData(1)!}
            onUpdateActivity={(activityId, updates) => updateActivity(1, activityId, updates)}
            onDeleteActivity={(activityId) => deleteActivity(1, activityId)}
            onAddActivity={(activity) => addActivity(1, activity)}
            onUpdateDate={(date) => updateDayDate(1, date)}
          />
        )}
        {activeTab === 'day2' && (
          <DaySchedule 
            dayData={getDayData(2)!}
            onUpdateActivity={(activityId, updates) => updateActivity(2, activityId, updates)}
            onDeleteActivity={(activityId) => deleteActivity(2, activityId)}
            onAddActivity={(activity) => addActivity(2, activity)}
            onUpdateDate={(date) => updateDayDate(2, date)}
          />
        )}
        {activeTab === 'day3' && (
          <DaySchedule 
            dayData={getDayData(3)!}
            onUpdateActivity={(activityId, updates) => updateActivity(3, activityId, updates)}
            onDeleteActivity={(activityId) => deleteActivity(3, activityId)}
            onAddActivity={(activity) => addActivity(3, activity)}
            onUpdateDate={(date) => updateDayDate(3, date)}
          />
        )}
        {activeTab === 'dining' && <Dining />}
        {activeTab === 'shopping' && <Shopping />}
      </div>

      <footer className="app-footer">
        <p>🏠 Meemac Manor - Mammoth Caves Area, Clarkson, Kentucky</p>
        <p>July 2-4, 2026 | A Family-First Adventure 👨‍👩‍👧‍👦</p>
        <p>Made with ❤️ for our Punjabi Family getaway</p>
      </footer>
    </div>
  )
}

export default App
