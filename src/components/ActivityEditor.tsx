import React, { useState } from 'react'
import type { Activity } from '../App'
import './ActivityEditor.css'

interface ActivityEditorProps {
  activity: Activity
  isEditing: boolean
  onSave: (updates: Partial<Activity>) => void
  onDelete: () => void
  onCancel: () => void
}

export const ActivityEditor: React.FC<ActivityEditorProps> = ({
  activity,
  isEditing,
  onSave,
  onDelete,
  onCancel,
}) => {
  const [time, setTime] = useState(activity.time)
  const [title, setTitle] = useState(activity.title)
  const [description, setDescription] = useState(activity.description)

  const handleSave = () => {
    onSave({
      time,
      title,
      description,
    })
  }

  if (!isEditing) {
    return (
      <div className="activity-view">
        <div className="activity-time">{activity.time}</div>
        <div className="activity-title">{activity.title}</div>
        <div className="activity-description">{activity.description}</div>
        <div className="activity-tags">
          {activity.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className={`tag ${tag.type}`}>
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="activity-editor">
      <div className="editor-field">
        <label>Time</label>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="e.g., 3:00 PM - 5:00 PM"
        />
      </div>

      <div className="editor-field">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Activity title"
        />
      </div>

      <div className="editor-field">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Activity description"
          rows={4}
        />
      </div>

      <div className="editor-actions">
        <button className="btn-save" onClick={handleSave}>
          ✓ Save
        </button>
        <button className="btn-delete" onClick={onDelete}>
          🗑️ Delete
        </button>
        <button className="btn-cancel" onClick={onCancel}>
          ✕ Cancel
        </button>
      </div>
    </div>
  )
}
