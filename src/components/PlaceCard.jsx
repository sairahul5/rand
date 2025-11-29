import React from 'react'

export default function PlaceCard({ place }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {place.images && place.images.length > 0 ? (
          <img
            src={place.images[0]}
            alt={place.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-500">No Image</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{place.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{place.city}, {place.state}</p>
        <p className="text-gray-700 text-sm mb-3">{place.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{place.category}</span>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm font-medium">{place.rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
