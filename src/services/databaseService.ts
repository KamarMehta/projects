import type { Activity, DayInfo } from '../App'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

class DatabaseService {
  // Fetch all activities for all days
  async getAllActivities(): Promise<DayInfo[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/activities`)
      const data: ApiResponse<DayInfo[]> = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch activities')
      }

      return data.data || []
    } catch (error) {
      console.error('Error fetching all activities:', error)
      throw error
    }
  }

  // Fetch activities for a specific day
  async getDayActivities(dayNumber: number): Promise<DayInfo | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/activities/day/${dayNumber}`)
      const data: ApiResponse<DayInfo> = await response.json()

      if (!data.success) {
        throw new Error(data.error || `Failed to fetch day ${dayNumber} activities`)
      }

      return data.data || null
    } catch (error) {
      console.error(`Error fetching day ${dayNumber} activities:`, error)
      throw error
    }
  }

  // Add a new activity
  async addActivity(dayNumber: number, activity: Activity): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/activities/day/${dayNumber}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activity }),
      })

      const data: ApiResponse<void> = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to add activity')
      }
    } catch (error) {
      console.error('Error adding activity:', error)
      throw error
    }
  }

  // Update an activity
  async updateActivity(
    dayNumber: number,
    activityId: string,
    updates: Partial<Activity>
  ): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/activities/day/${dayNumber}/${activityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      const data: ApiResponse<void> = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to update activity')
      }
    } catch (error) {
      console.error('Error updating activity:', error)
      throw error
    }
  }

  // Delete an activity
  async deleteActivity(dayNumber: number, activityId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/activities/day/${dayNumber}/${activityId}`, {
        method: 'DELETE',
      })

      const data: ApiResponse<void> = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to delete activity')
      }
    } catch (error) {
      console.error('Error deleting activity:', error)
      throw error
    }
  }

  // Update day date
  async updateDayDate(dayNumber: number, date: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/day/${dayNumber}/date`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date }),
      })

      const data: ApiResponse<void> = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to update day date')
      }
    } catch (error) {
      console.error('Error updating day date:', error)
      throw error
    }
  }
}

export default new DatabaseService()
