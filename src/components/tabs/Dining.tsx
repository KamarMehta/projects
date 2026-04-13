import React from 'react'
import { CommentsSection } from '../CommentsSection'
import './Dining.css'

interface Restaurant {
  name: string
  icon: string
  location: string
  distance: string
  cuisine: string
  hours: string
  phone?: string
  specialty: string[]
  bestFor: string
}

const restaurants: Restaurant[] = [
  {
    name: 'The Reclaimed Goods',
    icon: '🥗',
    location: 'Leitchfield, KY',
    distance: '18 miles from property (~25 min drive)',
    cuisine: 'Farm-to-table, locally sourced',
    hours: 'Call ahead - seasonal variations',
    specialty: [
      'Excellent vegetarian options',
      'Fresh local vegetables',
      'Gluten-free available',
      'Family-friendly atmosphere',
    ],
    bestFor: 'Couples, family lunch, special occasions',
  },
  {
    name: 'Log Cabin Restaurant',
    icon: '🌾',
    location: 'Park City, KY',
    distance: '20 miles from property',
    cuisine: 'Southern comfort food with healthy options',
    hours: 'Typically 11 AM - 9 PM',
    specialty: [
      'Vegetable-based sides (beans, greens, veggies)',
      'Grilled cheese & veggie sandwiches',
      'Large portions',
      'Kid-friendly menu',
      'Very family-oriented',
      'Convenient cave-side location',
    ],
    bestFor: 'Family meals, after-cave lunches',
  },
  {
    name: 'Buoy\'s Restaurant',
    icon: '🍝',
    location: 'Wax Marina (ONLY 5 MINUTES from property!)',
    distance: '~20 miles from caves',
    cuisine: 'Contemporary American with waterfront views',
    hours: 'Call ahead - (270) 433-5555',
    phone: '(270) 433-5555',
    specialty: [
      'Beautiful lake views',
      'Fresh salad options',
      'Vegetable-based pasta dishes',
      'Great cocktails & mocktails',
      'Perfect for couples\' romantic dinner',
      'CLOSEST to your property!',
      'Great sunset dining',
      'Can boat there if you rent boats!',
    ],
    bestFor: 'Couples\' dinner, family celebration, waterfront experience',
  },
  {
    name: 'Local Pizzeria Options',
    icon: '🍕',
    location: 'Leitchfield & surrounding areas',
    distance: 'Varies',
    cuisine: 'Italian, Pizza',
    hours: 'Typically dinner time',
    specialty: [
      'Easy vegetarian pizza options',
      'Family-friendly',
      'Quick service',
      'Kids love pizza!',
    ],
    bestFor: 'Quick dinners, family casual meals',
  },
]

export const Dining: React.FC = () => {
  return (
    <div className="tab-content">
      <h2 className="section-title">🍽️ Vegetarian-Friendly Dining Options</h2>

      {restaurants.map((restaurant, index) => (
        <div key={index} className="restaurant-card">
          <div className="restaurant-name">{restaurant.icon} {restaurant.name}</div>
          <div className="restaurant-info">
            <div>
              <p>
                <strong>Location:</strong> {restaurant.location}
              </p>
              <p>
                <strong>Distance:</strong> {restaurant.distance}
              </p>
            </div>
            <div>
              <p>
                <strong>Cuisine:</strong> {restaurant.cuisine}
              </p>
              <p>
                <strong>Hours:</strong> {restaurant.hours}
              </p>
              {restaurant.phone && (
                <p>
                  <strong>Phone:</strong> {restaurant.phone}
                </p>
              )}
            </div>
          </div>
          <div className="restaurant-specialty">
            <strong>✓ Why You Should Go:</strong>
            <ul>
              {restaurant.specialty.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="best-for">
              <strong>Best For:</strong> {restaurant.bestFor}
            </p>
          </div>
        </div>
      ))}

      <h2 className="section-title" style={{ marginTop: '40px' }}>
        🥘 Let's Cook at Home!
      </h2>
      <div className="cooking-box">
        <p>
          <strong>The Meemac Manor property has FULLY EQUIPPED KITCHENS!</strong> Consider preparing authentic
          Punjabi meals together as a family bonding activity:
        </p>
        <ul className="meal-list">
          <li>🍲 <strong>Punjabi Dal Makhani</strong> - creamy lentils (vegetarian favorite)</li>
          <li>🧀 <strong>Paneer Tikka Masala</strong> - cottage cheese in aromatic sauce</li>
          <li>🥬 <strong>Saag Paneer</strong> - spinach and cheese curry</li>
          <li>🍞 <strong>Fresh Roti/Naan</strong> - homemade breads</li>
          <li>🌶️ <strong>Vegetable dishes</strong> - cauliflower, chickpeas, potatoes</li>
          <li>🥗 <strong>Raita & Salads</strong> - yogurt sides</li>
          <li>🍮 <strong>Gulab Jamun or Kheer</strong> - traditional desserts</li>
        </ul>
      </div>

      <CommentsSection sectionId="dining" title="Restaurant Recommendations & Food Comments" />
    </div>
  )
}
