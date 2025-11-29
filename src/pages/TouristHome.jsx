import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'
import HomestayCard from '../components/HomestayCard'
import GuideCard from '../components/GuideCard'
import MapPlaceholder from '../components/MapPlaceholder'

export default function TouristHome() {
  const { homestays, places, guides, user } = useAppContext()

  if (!user || user.role !== 'tourist') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please login as a tourist to access this page.</p>
          <Link to="/auth" className="bg-blue-600 text-white px-4 py-2 rounded">
            Login
          </Link>
        </div>
      </div>
    )
  }

  const recommendedHomestays = homestays.slice(0, 6)
  const nearbyGuides = guides.slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome back, {user.name}!</h1>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link
          to="/search"
          className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <h3 className="text-xl font-semibold mb-2">Search Homestays</h3>
          <p>Find the perfect place to stay</p>
        </Link>
        <Link
          to="/guides"
          className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors"
        >
          <h3 className="text-xl font-semibold mb-2">Book a Guide</h3>
          <p>Connect with local experts</p>
        </Link>
        <div className="bg-purple-600 text-white p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Explore Places</h3>
          <p>Discover amazing destinations</p>
        </div>
      </div>

      {/* Recommended Homestays */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Recommended Homestays</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedHomestays.map(homestay => (
            <HomestayCard key={homestay.id} h={homestay} />
          ))}
        </div>
      </section>

      {/* Nearby Guides */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Nearby Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyGuides.map(guide => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Explore on Map</h2>
        <MapPlaceholder location="Your current location" />
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">No recent activity yet. Start exploring!</p>
        </div>
      </section>
    </div>
  )
}
