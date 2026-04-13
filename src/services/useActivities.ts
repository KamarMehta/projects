import { useState, useEffect, useCallback } from 'react'
import type { Activity, DayInfo } from '../App'
import firebaseService from './firebaseService'

export const useActivities = () => {
  const [daysData, setDaysData] = useState<DayInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastSync, setLastSync] = useState<Date>(new Date())

  // Fetch all activities from Firebase (one-time load)
  const fetchAllActivities = useCallback(async () => {
    try {
      setError(null)
      const activities = await firebaseService.getAllActivities()
      setDaysData(activities)
      setLastSync(new Date())
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load activities'
      setError(errorMessage)
      console.error('Error fetching activities:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial load and subscribe to real-time updates
  useEffect(() => {
    // Initialize Firebase with default data
    firebaseService.initializeDefaults().catch(console.error)

    // Subscribe to real-time updates
    const unsubscribe = firebaseService.subscribeToActivities(
      (data) => {
        setDaysData(data)
        setLastSync(new Date())
        setLoading(false)
      },
      (err) => {
        const errorMessage = err instanceof Error ? err.message : 'Failed to sync'
        setError(errorMessage)
        console.error('Error in real-time sync:', err)
      }
    )

    return () => unsubscribe()
  }, [])

  // Update activity and sync to Firebase
  const updateActivity = useCallback(
    async (dayNumber: number, activityId: string, updates: Partial<Activity>) => {
      try {
        setError(null)

        // Optimistic update
        setDaysData((prevDays) =>
          prevDays.map((day) =>
            day.day === dayNumber
              ? {
                  ...day,
                  activities: day.activities.map((activity) =>
                    activity.id === activityId ? { ...activity, ...updates } : activity
                  ),
                }
              : day
          )
        )

        // Sync to Firebase
        await firebaseService.updateActivity(dayNumber, activityId, updates)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update activity'
        setError(errorMessage)
      }
    },
    []
  )

  // Delete activity and sync to Firebase
  const deleteActivity = useCallback(
    async (dayNumber: number, activityId: string) => {
      try {
        setError(null)

        // Optimistic update
        setDaysData((prevDays) =>
          prevDays.map((day) =>
            day.day === dayNumber
              ? {
                  ...day,
                  activities: day.activities.filter((activity) => activity.id !== activityId),
                }
              : day
          )
        )

        // Sync to Firebase
        await firebaseService.deleteActivity(dayNumber, activityId)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete activity'
        setError(errorMessage)
      }
    },
    []
  )

  // Add new activity and sync to Firebase
  const addActivity = useCallback(
    async (dayNumber: number, activity: Activity) => {
      try {
        setError(null)

        // Optimistic update
        setDaysData((prevDays) =>
          prevDays.map((day) =>
            day.day === dayNumber
              ? {
                  ...day,
                  activities: [...day.activities, activity],
                }
              : day
          )
        )

        // Sync to Firebase
        await firebaseService.addActivity(dayNumber, activity)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to add activity'
        setError(errorMessage)
      }
    },
    []
  )

  // Update day date and sync to Firebase
  const updateDayDate = useCallback(
    async (dayNumber: number, newDate: string) => {
      try {
        setError(null)

        // Optimistic update
        setDaysData((prevDays) =>
          prevDays.map((day) =>
            day.day === dayNumber ? { ...day, date: newDate } : day
          )
        )

        // Sync to Firebase
        await firebaseService.updateDayDate(dayNumber, newDate)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update day date'
        setError(errorMessage)
      }
    },
    []
  )

  const getDayData = (dayNumber: number) => daysData.find((d) => d.day === dayNumber)

  return {
    daysData,
    loading,
    error,
    lastSync,
    updateActivity,
    deleteActivity,
    addActivity,
    updateDayDate,
    getDayData,
  }
}
