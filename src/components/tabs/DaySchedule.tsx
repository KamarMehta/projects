import React, { useState } from 'react'
import type { Activity, DayInfo } from '../../App'
import { CommentsSection } from '../CommentsSection'
import { ActivityEditor } from '../ActivityEditor'
import './DaySchedule.css'

interface DayScheduleProps {
  dayData: DayInfo
  onUpdateActivity: (activityId: string, updates: Partial<Activity>) => void
  onDeleteActivity: (activityId: string) => void
  onAddActivity: (activity: Activity) => void
  onUpdateDate: (newDate: string) => void
}

export const DaySchedule: React.FC<DayScheduleProps> = ({
  dayData,
  onUpdateActivity,
  onDeleteActivity,
  onAddActivity,
  onUpdateDate,
}) => {
  const [editingActivityId, setEditingActivityId] = useState<string | null>(null)
  const [isEditingDate, setIsEditingDate] = useState(false)
  const [editingDate, setEditingDate] = useState(dayData.date)
  const [isAddingActivity, setIsAddingActivity] = useState(false)
  const [newActivityData, setNewActivityData] = useState({
    time: '',
    title: '',
    description: '',
  })

  const handleSaveDate = () => {
    onUpdateDate(editingDate)
    setIsEditingDate(false)
  }

  const handleAddActivity = () => {
    if (newActivityData.time && newActivityData.title) {
      const newActivity: Activity = {
        id: `day${dayData.day}-${Date.now()}`,
        time: newActivityData.time,
        title: newActivityData.title,
        description: newActivityData.description,
        tags: [],
      }
      onAddActivity(newActivity)
      setNewActivityData({ time: '', title: '', description: '' })
      setIsAddingActivity(false)
    }
  }

  const headerSubtitle =
    dayData.day === 1
      ? 'Arrival & Welcome'
      : dayData.day === 2
        ? 'Cave Adventures & Lake Fun'
        : 'Frozen Niagara & Checkout'

  return (
    <div className="tab-content">
      <div className="day-schedule">
        <div className="day-header-section">
          <div className="day-header">
            🌅 {editingDate}, 2026 - {headerSubtitle}
          </div>
          <button
            className="btn-edit-date"
            onClick={() => setIsEditingDate(!isEditingDate)}
            title="Edit date"
          >
            ✏️
          </button>
        </div>

        {isEditingDate && (
          <div className="date-editor">
            <input
              type="text"
              value={editingDate}
              onChange={(e) => setEditingDate(e.target.value)}
              placeholder="e.g., Thursday, July 2"
            />
            <button className="btn-save-date" onClick={handleSaveDate}>
              ✓ Save
            </button>
            <button className="btn-cancel-date" onClick={() => setIsEditingDate(false)}>
              ✕ Cancel
            </button>
          </div>
        )}

        {dayData.activities.map((activity) => (
          <div
            key={activity.id}
            className="activity"
            style={{ borderLeftColor: activity.title.includes('Checkout') ? '#ff6b6b' : undefined }}
          >
            <ActivityEditor
              activity={activity}
              isEditing={editingActivityId === activity.id}
              onSave={(updates) => {
                onUpdateActivity(activity.id, updates)
                setEditingActivityId(null)
              }}
              onDelete={() => {
                onDeleteActivity(activity.id)
                setEditingActivityId(null)
              }}
              onCancel={() => setEditingActivityId(null)}
            />
            {editingActivityId !== activity.id && (
              <button
                className="btn-edit-activity"
                onClick={() => setEditingActivityId(activity.id)}
                title="Edit activity"
              >
                ✏️
              </button>
            )}
          </div>
        ))}

        {isAddingActivity && (
          <div className="new-activity-form">
            <h4>➕ Add New Event</h4>
            <div className="form-field">
              <label>Time</label>
              <input
                type="text"
                value={newActivityData.time}
                onChange={(e) => setNewActivityData({ ...newActivityData, time: e.target.value })}
                placeholder="e.g., 3:00 PM - 5:00 PM"
              />
            </div>
            <div className="form-field">
              <label>Title</label>
              <input
                type="text"
                value={newActivityData.title}
                onChange={(e) => setNewActivityData({ ...newActivityData, title: e.target.value })}
                placeholder="Event title"
              />
            </div>
            <div className="form-field">
              <label>Description</label>
              <textarea
                value={newActivityData.description}
                onChange={(e) =>
                  setNewActivityData({ ...newActivityData, description: e.target.value })
                }
                placeholder="Event description"
                rows={3}
              />
            </div>
            <div className="form-actions">
              <button className="btn-create" onClick={handleAddActivity}>
                ✓ Create Event
              </button>
              <button className="btn-cancel" onClick={() => setIsAddingActivity(false)}>
                ✕ Cancel
              </button>
            </div>
          </div>
        )}

        <button
          className="btn-add-activity"
          onClick={() => setIsAddingActivity(!isAddingActivity)}
        >
          {isAddingActivity ? '✕ Close' : '➕ Add New Event'}
        </button>
      </div>

      <CommentsSection sectionId={`day${dayData.day}`} title={`Comments & Updates for Day ${dayData.day}`} />
    </div>
  )
}
