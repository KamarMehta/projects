import React from 'react'
import { CommentsSection } from '../CommentsSection'
import './Overview.css'

export const Overview: React.FC = () => {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="tab-content">
      <h2 className="section-title">🎯 Trip Overview & Highlights</h2>

      <div className="highlights">
        <div className="highlight-card">
          <div className="highlight-icon">🕳️</div>
          <h3>Historic Cave Tour</h3>
          <p>Explore the world's longest cave system with ranger-led historic tours</p>
        </div>
        <div className="highlight-card">
          <div className="highlight-icon">❄️</div>
          <h3>Frozen Niagara Tour</h3>
          <p>Marvel at stunning cave formations and frozen-like limestone waterfalls</p>
        </div>
        <div className="highlight-card">
          <div className="highlight-icon">🎮</div>
          <h3>Property Fun</h3>
          <p>Karaoke, arcade games, ping pong, air hockey, hot tub & firepit</p>
        </div>
        <div className="highlight-card">
          <div className="highlight-icon">🌊</div>
          <h3>Lake Activities</h3>
          <p>Boating, fishing, and waterfront dining at Wax Marina (5 minutes away)</p>
        </div>
        <div className="highlight-card">
          <div className="highlight-icon">🎉</div>
          <h3>Family Time</h3>
          <p>Game nights, couple timeouts, and bonding moments for all</p>
        </div>
        <div className="highlight-card">
          <div className="highlight-icon">🥗</div>
          <h3>Vegetarian Dining</h3>
          <p>Specially curated vegetarian-friendly restaurant recommendations</p>
        </div>
      </div>

      <h2 className="section-title">📍 What's Nearby</h2>
      <div className="nearby-box">
        <ul>
          <li>✓ <strong>Mammoth Cave National Park</strong> - 16.3 miles (Historic & Frozen Niagara tours)</li>
          <li>✓ <strong>Nolin Lake State Park</strong> - 15 miles (hiking & scenic views)</li>
          <li>✓ <strong>Hidden River Cave</strong> - 29 miles (alternative cave tour experience)</li>
          <li>✓ <strong>Wax Marina</strong> - 5 miles (boating, fishing, lakeside dining)</li>
          <li>✓ <strong>Amish Community & Detweiler's General Store</strong> - 15 minutes</li>
          <li>✓ <strong>Leitchfield</strong> - 18 miles (shopping, restaurants, local culture)</li>
          <li>✓ <strong>Kentucky Down Under Adventure Zoo</strong> - 27 miles (family fun)</li>
          <li>✓ <strong>Abraham Lincoln Birthplace</strong> - 31.9 miles (historic landmark)</li>
        </ul>
      </div>

      <button className="print-btn" onClick={handlePrint}>
        🖨️ Print This Itinerary
      </button>

      <CommentsSection sectionId="overview" title="General Comments & Notes" />
    </div>
  )
}
