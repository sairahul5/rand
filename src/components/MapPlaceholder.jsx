import React from 'react'

export default function MapPlaceholder({ location }) {
  return (
    <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-2">🗺️</div>
        <p className="text-gray-600">Map View</p>
        {location && <p className="text-sm text-gray-500">{location}</p>}
        <p className="text-xs text-gray-400 mt-2">Interactive map integration coming soon</p>
      </div>
    </div>
  )
}
