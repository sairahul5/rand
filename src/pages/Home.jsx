import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'
import HomestayCard from '../components/HomestayCard'
import GuideCard from '../components/GuideCard'

export default function Home() {
  const { homestays, places, guides } = useAppContext()

  const featuredHomestays = homestays.slice(0, 3)
  const featuredGuides = guides.slice(0, 2)
  const popularPlaces = places.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg hero-pattern text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">
           Explore India
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Find amazing homestays, connect with local guides, and explore incredible places across India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/search"
              className="btn-primary text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Start Exploring
            </Link>
            <Link
              to="/auth"
              className="btn-outline bg-white bg-opacity-10 backdrop-blur-sm text-white border-white border-2 px-10 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Join Now
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Popular Places */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Places</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularPlaces.map(place => {
              // Define glow colors based on place
              const getGlowColor = (placeId) => {
                switch (placeId) {
                  case 1: // Taj Mahal - white glow
                    return '0 0 20px rgba(255, 255, 255, 0.6)';
                  case 2: // Golden Temple - gold glow
                    return '0 0 20px rgba(255, 215, 0, 0.6)';
                  case 3: // Marina Beach - blue glow
                    return '0 0 20px rgba(0, 191, 255, 0.6)';
                  default:
                    return '0 0 20px rgba(255, 255, 255, 0.6)';
                }
              };

              return (
                <div
                  key={place.id}
                  className="card card-hover animate-slide-up"
                  style={{
                    boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), ${getGlowColor(place.id)}`,
                    transition: 'box-shadow 0.3s ease-in-out'
                  }}
                >
                  <img
                    src={place.images[0] || "/api/placeholder/400/250"}
                    alt={place.name}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{place.name}</h3>
                    <p className="text-gray-600 mb-2">{place.city}, {place.state}</p>
                    <div className="flex items-center mb-3">
                      <span className="text-yellow-500 text-lg">★</span>
                      <span className="ml-1 font-medium">{place.rating}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{place.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Homestays */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Homestays</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredHomestays.map(homestay => (
              <div key={homestay.id} className="animate-slide-up">
                <HomestayCard h={homestay} />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/search"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Homestays
            </Link>
          </div>
        </div>
      </section>

      {/* Local Guides */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Local Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredGuides.map(guide => (
              <div key={guide.id} className="animate-slide-up">
                <GuideCard guide={guide} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="gradient-bg text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-shadow">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">Join thousands of travelers exploring India</p>
          <Link
            to="/auth"
            className="btn-primary text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}
