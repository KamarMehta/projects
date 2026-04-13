import React from 'react'
import './TabNav.css'

interface TabNavProps {
  activeTab: string
  onTabChange: (tab: any) => void
}

export const TabNav: React.FC<TabNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: '📋 Overview' },
    { id: 'day1', label: '📅 Thursday - July 2' },
    { id: 'day2', label: '📅 Friday - July 3' },
    { id: 'day3', label: '📅 Saturday - July 4' },
    { id: 'dining', label: '🍽️ Dining Options' },
    { id: 'shopping', label: '🛒 Shopping' },
  ]

  return (
    <nav className="nav-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
