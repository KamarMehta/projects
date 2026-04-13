import React from 'react'
import { CommentsSection } from '../CommentsSection'
import './Shopping.css'

interface Store {
  name: string
  icon: string
  location: string
  distance: string
  phone?: string
  hours?: string
  highlights: string[]
  bestFor: string[]
  color: string
}

const stores: Store[] = [
  {
    name: 'Walmart Supercenter - Leitchfield',
    icon: '🏪',
    location: '100 Walmart Plaza, Leitchfield, KY 42754',
    distance: '18 miles from property (25-30 min)',
    phone: '(270) 259-5000',
    hours: 'Typically 6 AM - 11 PM Daily',
    highlights: [
      'Largest selection of groceries',
      'Great prices on bulk items',
      'Pharmacy, household goods, entertainment',
      'Full range of vegetarian products & Indian spices',
      'Easy parking & family-friendly',
    ],
    bestFor: ['#1 Recommended Choice', 'One-stop shop for everything'],
    color: '#66bb6a',
  },
  {
    name: 'Sam\'s Club',
    icon: '💳',
    location: 'Elizabethtown, KY',
    distance: '~35-40minutes drive',
    highlights: [
      'Bulk buying of spices & staples',
      'Large quantities at better prices',
      'Family-sized portions',
      'Wine, drinks, & beverages',
      'Quality meat (for non-vegetarians)',
    ],
    bestFor: ['If you have membership', 'Bulk buying enthusiasts'],
    color: '#42a5f5',
  },
  {
    name: 'Costco Wholesale',
    icon: '🏷️',
    location: 'Bowling Green, KY',
    distance: '~50-60 minutes drive',
    highlights: [
      'Organic & premium produce',
      'High-quality spices in bulk',
      'Wine & alcohol selections',
      'Health & wellness products',
      'Premium quality offerings',
    ],
    bestFor: ['Premium bulk buyers', 'If membership is available'],
    color: '#ab47bc',
  },
]

const shoppingList = {
  grains: ['Basmati rice (2-3 bags)', 'All-purpose flour', 'Dried lentils (moong, masoor, urad)', 'Chickpeas (canned & dry)'],
  dairy: ['Paneer (cottage cheese) - 2-3 containers', 'Yogurt (large quantities)', 'Milk (for chai & cooking)', 'Ghee (clarified butter)'],
  spices: ['Ground cumin', 'Ground coriander', 'Garam masala', 'Turmeric powder', 'Chili powder', 'Asafoetida (hing)', 'Fenugreek leaves'],
  vegetables: ['Onions (5 lbs)', 'Tomatoes (2-3 lbs)', 'Fresh spinach/greens', 'Cauliflower', 'Potatoes', 'Bell peppers', 'Carrots'],
  aromatics: ['Fresh ginger (1 jar)', 'Garlic (1 large container)', 'Green chilies (fresh)', 'Cilantro/coriander leaves'],
  other: ['Tea bags & chai masala', 'Coffee', 'Cookies & chips', 'Ice cream', 'Fruits', 'Dog food & treats', 'Medications & first aid'],
}

export const Shopping: React.FC = () => {
  return (
    <div className="tab-content">
      <h2 className="section-title">🛒 Grocery Shopping & Supplies</h2>

      {stores.map((store, index) => (
        <div key={index} className="store-card" style={{ borderLeftColor: store.color }}>
          <div className="store-name">{store.icon} {store.name}</div>
          <div className="store-info">
            <p>
              <strong>Location:</strong> {store.location}
            </p>
            <p>
              <strong>Distance:</strong> {store.distance}
            </p>
            {store.phone && (
              <p>
                <strong>Phone:</strong> {store.phone}
              </p>
            )}
            {store.hours && (
              <p>
                <strong>Hours:</strong> {store.hours}
              </p>
            )}
          </div>
          <div className="store-highlights">
            <strong>✓ Why You Should Go:</strong>
            <ul>
              {store.highlights.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="store-best-for">
            <strong>Best For:</strong> {store.bestFor.join(', ')}
          </div>
        </div>
      ))}

      <h2 className="section-title" style={{ marginTop: '40px' }}>
        📋 Shopping List
      </h2>
      <div className="shopping-list-box">
        <div className="list-section">
          <h4>Essential Grains & Staples:</h4>
          <ul>
            {shoppingList.grains.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="list-section">
          <h4>Spices (Indian Aisle):</h4>
          <ul>
            {shoppingList.spices.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="list-section">
          <h4>Fresh Vegetables:</h4>
          <ul>
            {shoppingList.vegetables.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="list-section">
          <h4>Aromatics & Dairy:</h4>
          <ul>
            {shoppingList.aromatics.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
            {shoppingList.dairy.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="list-section">
          <h4>Snacks & Other Items:</h4>
          <ul>
            {shoppingList.other.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="section-title" style={{ marginTop: '40px' }}>
        🗓️ Shopping Timeline Recommendations
      </h2>
      <div className="timeline-box">
        <div className="timeline-option">
          <h4>Option 1: Shop on Arrival (July 2, 4-6 PM)</h4>
          <ul>
            <li>Quick stop on way to property</li>
            <li>Get basics for 3 days</li>
            <li>30-minute detour from main route</li>
          </ul>
          <p className="pros">Pros: Energetic, fresh items</p>
          <p className="cons">Cons: Might be exhausted from travel</p>
        </div>
        <div className="timeline-option">
          <h4>Option 2: Shop Before Caves (July 3, 7:30-8:30 AM)</h4>
          <ul>
            <li>Early morning quick shop</li>
            <li>Before Historic Cave tour</li>
            <li>On the way to/from caves</li>
          </ul>
          <p className="pros">Pros: Flexible timing</p>
          <p className="cons">Cons: Time pressure</p>
        </div>
        <div className="timeline-option recommended">
          <h4>⭐Option 3: Mixed Approach (RECOMMENDED!)</h4>
          <ul>
            <li>Small shop July 2 (basics & staples)</li>
            <li>Larger run July 3 morning (fresh items)</li>
            <li>Best of both worlds</li>
          </ul>
          <p className="pros">Pros: Flexible, fresh, organized</p>
          <p className="cons">Cons: Two trips</p>
        </div>
      </div>

      <CommentsSection sectionId="shopping" title="Shopping Tips & Local Store Recommendations" />
    </div>
  )
}
