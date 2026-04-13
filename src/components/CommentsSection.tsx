import React, { useState, useEffect } from 'react'
import './CommentsSection.css'

interface Comment {
  id: number
  name: string
  text: string
  timestamp: string
}

interface CommentsSectionProps {
  sectionId: string
  title?: string
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ sectionId, title = 'Comments & Notes' }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')

  // Load comments from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(`comments-${sectionId}`)
    if (stored) {
      setComments(JSON.parse(stored))
    }
  }, [sectionId])

  // Save comments to localStorage
  const saveComments = (updatedComments: Comment[]) => {
    setComments(updatedComments)
    localStorage.setItem(`comments-${sectionId}`, JSON.stringify(updatedComments))
  }

  const handleAddComment = () => {
    if (!name.trim() || !comment.trim()) {
      alert('Please enter both a name and a comment!')
      return
    }

    const newComment: Comment = {
      id: Date.now(),
      name,
      text: comment,
      timestamp: new Date().toLocaleString(),
    }

    saveComments([...comments, newComment])
    setName('')
    setComment('')
  }

  const handleDeleteComment = (id: number) => {
    saveComments(comments.filter(c => c.id !== id))
  }

  return (
    <div className="comments-section">
      <h4>💬 {title}</h4>
      
      <div className="comment-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="comment-input"
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment or note..."
          className="comment-textarea"
        />
      </div>
      <button className="comment-btn" onClick={handleAddComment}>
        Post Comment
      </button>

      <div className="comment-list">
        {comments.length === 0 ? (
          <div className="empty-message">No comments yet. Be the first to add one!</div>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="comment-item">
              <div className="comment-author">{c.name}</div>
              <div className="comment-text">{c.text}</div>
              <div className="comment-time">{c.timestamp}</div>
              <button 
                className="delete-comment"
                onClick={() => handleDeleteComment(c.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
