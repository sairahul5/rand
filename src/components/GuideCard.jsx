import React from 'react'
import { useAppContext } from '../context/useAppContext'

export default function GuideCard({ guide }) {
  const { bookGuide } = useAppContext()

  return (
    <div className="card card-hover group">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-3xl font-bold text-white">
              {guide.name.charAt(0)}
            </span>
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{guide.name}</h3>
            <p className="text-gray-600">{guide.city}, {guide.state}</p>
          </div>
        </div>

        <div className="flex items-center mb-4 bg-yellow-50 px-3 py-2 rounded-lg">
          <span className="text-yellow-500 text-lg">★</span>
          <span className="ml-2 text-gray-800 font-medium">{guide.rating}</span>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed">{guide.description}</p>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Languages:</p>
          <div className="flex flex-wrap gap-2">
            {guide.languages.map((lang, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
          <div className="flex flex-wrap gap-2">
            {guide.specialties.map((spec, index) => (
              <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {spec}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-2xl font-bold text-primary-600">₹{guide.price}<span className="text-sm font-normal text-gray-600">/day</span></span>
          <button
            onClick={() => bookGuide(guide.id)}
            className="btn-secondary px-6 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Book Guide
          </button>
        </div>
      </div>
    </div>
  )
}
