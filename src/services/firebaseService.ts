import { ref, get, set, update, remove, onValue, off } from 'firebase/database'
import { database } from './firebaseConfig'
import type { Activity, DayInfo } from '../App'

class FirebaseService {
  // Subscribe to real-time updates
  subscribeToActivities(callback: (data: DayInfo[]) => void, onError: (error: Error) => void) {
    try {
      const activitiesRef = ref(database, 'activities')

      const listener = onValue(
        activitiesRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const rawData = snapshot.val()
            const daysArray: DayInfo[] = Object.keys(rawData)
              .sort()
              .map((dayKey) => {
                const dayData = rawData[dayKey]
                const activitiesArray: Activity[] = dayData.activities
                  ? Object.values(dayData.activities)
                  : []
                return {
                  day: dayData.day,
                  date: dayData.date,
                  activities: activitiesArray,
                }
              })
            callback(daysArray)
          } else {
            callback([])
          }
        },
        (error) => {
          onError(new Error(`Firebase sync error: ${error.message}`))
        }
      )

      return () => {
        off(activitiesRef, 'value', listener)
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      onError(new Error(`Failed to subscribe to activities: ${errorMsg}`))
      return () => {} // Return noop unsubscribe
    }
  }

  // Get all activities (one-time fetch)
  async getAllActivities(): Promise<DayInfo[]> {
    try {
      const activitiesRef = ref(database, 'activities')
      const snapshot = await get(activitiesRef)

      if (!snapshot.exists()) {
        return []
      }

      const rawData = snapshot.val()
      const daysArray: DayInfo[] = Object.keys(rawData)
        .sort()
        .map((dayKey) => {
          const dayData = rawData[dayKey]
          const activitiesArray: Activity[] = dayData.activities
            ? Object.values(dayData.activities)
            : []
          return {
            day: dayData.day,
            date: dayData.date,
            activities: activitiesArray,
          }
        })

      return daysArray
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      throw new Error(`Failed to fetch activities: ${errorMsg}`)
    }
  }

  // Add a new activity
  async addActivity(dayNumber: number, activity: Activity): Promise<void> {
    try {
      const activityRef = ref(database, `activities/day${dayNumber}/activities/${activity.id}`)
      await set(activityRef, activity)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      throw new Error(`Failed to add activity: ${errorMsg}`)
    }
  }

  // Update an activity
  async updateActivity(
    dayNumber: number,
    activityId: string,
    updates: Partial<Activity>
  ): Promise<void> {
    try {
      const activityRef = ref(database, `activities/day${dayNumber}/activities/${activityId}`)
      await update(activityRef, updates)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      throw new Error(`Failed to update activity: ${errorMsg}`)
    }
  }

  // Delete an activity
  async deleteActivity(dayNumber: number, activityId: string): Promise<void> {
    try {
      const activityRef = ref(database, `activities/day${dayNumber}/activities/${activityId}`)
      await remove(activityRef)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      throw new Error(`Failed to delete activity: ${errorMsg}`)
    }
  }

  // Update day date
  async updateDayDate(dayNumber: number, newDate: string): Promise<void> {
    try {
      const dayRef = ref(database, `activities/day${dayNumber}/date`)
      await set(dayRef, newDate)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      throw new Error(`Failed to update day date: ${errorMsg}`)
    }
  }

  // Initialize default data if not present
  async initializeDefaults(): Promise<void> {
    try {
      const activitiesRef = ref(database, 'activities')
      const snapshot = await get(activitiesRef)

      if (!snapshot.exists()) {
        const defaultData = {
          day1: {
            day: 1,
            date: 'Thursday, July 2, 2026',
            activities: {},
          },
          day2: {
            day: 2,
            date: 'Friday, July 3, 2026',
            activities: {},
          },
          day3: {
            day: 3,
            date: 'Saturday, July 4, 2026',
            activities: {},
          },
        }
        await set(activitiesRef, defaultData)
      }
    } catch (error) {
      console.error('Failed to initialize defaults:', error)
    }
  }
}

export default new FirebaseService()
