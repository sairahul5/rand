import React from 'react'
import { Link } from 'react-router-dom'

export default function HomestayCard({ h }) {
  return (
    <div className="card card-hover group">
      <div className="relative overflow-hidden">
        <img
          src={h.images[0] || "/api/placeholder/300/200"}
          alt={h.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-full">
          <div className="flex items-center">
            <span className="text-yellow-500 text-sm">★</span>
            <span className="ml-1 text-gray-800 font-medium text-sm">{h.rating}</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">{h.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{h.city}, {h.state}</p>
        <p className="text-2xl font-bold text-primary-600 mb-3">₹{h.price}<span className="text-sm font-normal text-gray-600">/night</span></p>
        <div className="flex flex-wrap gap-2 mb-4">
          {h.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
              {amenity}
            </span>
          ))}
        </div>
        <Link
          to={`/homestay/${h.id}`}
          className="btn-primary w-full text-center py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
