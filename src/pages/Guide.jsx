import React, { useState } from 'react'
import { useAppContext } from '../context/useAppContext'
import GuideCard from '../components/GuideCard'

export default function Guide() {
  const { user, guides, addGuide, updateGuide, deleteGuide, addPlace } = useAppContext()
  const [showForm, setShowForm] = useState(false)
  const [editingGuide, setEditingGuide] = useState(null)
  const [showPlaceForm, setShowPlaceForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    price: '',
    languages: '',
    specialties: '',
    description: '',
    contact: ''
  })
  const [placeFormData, setPlaceFormData] = useState({
    name: '',
    city: '',
    state: '',
    category: '',
    description: '',
    lat: '',
    lng: ''
  })

  if (!user || user.role !== 'guide') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please login as a guide to access this page.</p>
          <a href="/auth" className="bg-blue-600 text-white px-4 py-2 rounded">
            Login
          </a>
        </div>
      </div>
    )
  }

  const myGuide = guides.find(g => g.guideId === user.id)

  const handleSubmit = (e) => {
    e.preventDefault()
    const guideData = {
      ...formData,
      price: parseInt(formData.price),
      languages: formData.languages.split(',').map(l => l.trim()),
      specialties: formData.specialties.split(',').map(s => s.trim()),
      guideId: user.id,
      rating: myGuide?.rating || 0,
      availability: true
    }

    if (editingGuide) {
      updateGuide(editingGuide.id, guideData)
      setEditingGuide(null)
    } else {
      addGuide(guideData)
    }

    setFormData({
      name: '',
      city: '',
      state: '',
      price: '',
      languages: '',
      specialties: '',
      description: '',
      contact: ''
    })
    setShowForm(false)
  }

  const handleEdit = (guide) => {
    setEditingGuide(guide)
    setFormData({
      name: guide.name,
      city: guide.city,
      state: guide.state,
      price: guide.price.toString(),
      languages: guide.languages.join(', '),
      specialties: guide.specialties.join(', '),
      description: guide.description,
      contact: guide.contact
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete your guide profile?')) {
      deleteGuide(id)
    }
  }

  const handlePlaceSubmit = (e) => {
    e.preventDefault()
    const placeData = {
      ...placeFormData,
      lat: parseFloat(placeFormData.lat),
      lng: parseFloat(placeFormData.lng),
      rating: 0,
      images: []
    }

    addPlace(placeData)
    setPlaceFormData({
      name: '',
      city: '',
      state: '',
      category: '',
      description: '',
      lat: '',
      lng: ''
    })
    setShowPlaceForm(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Guide Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowPlaceForm(!showPlaceForm)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add New Place
          </button>
          {!myGuide && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create Guide Profile
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingGuide ? 'Edit Guide Profile' : 'Create Guide Profile'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price per day
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Languages (comma separated)
              </label>
              <input
                type="text"
                value={formData.languages}
                onChange={(e) => setFormData({...formData, languages: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="English, Hindi, Marathi"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialties (comma separated)
              </label>
              <input
                type="text"
                value={formData.specialties}
                onChange={(e) => setFormData({...formData, specialties: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Historical Sites, Food, Culture"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="+91-9876543210"
                required
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editingGuide ? 'Update' : 'Create'} Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingGuide(null)
                  setFormData({
                    name: '',
                    city: '',
                    state: '',
                    price: '',
                    languages: '',
                    specialties: '',
                    description: '',
                    contact: ''
                  })
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showPlaceForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Place</h2>
          <form onSubmit={handlePlaceSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Place Name
                </label>
                <input
                  type="text"
                  value={placeFormData.name}
                  onChange={(e) => setPlaceFormData({...placeFormData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={placeFormData.city}
                  onChange={(e) => setPlaceFormData({...placeFormData, city: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={placeFormData.state}
                  onChange={(e) => setPlaceFormData({...placeFormData, state: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={placeFormData.category}
                  onChange={(e) => setPlaceFormData({...placeFormData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Historical">Historical</option>
                  <option value="Religious">Religious</option>
                  <option value="Beach">Beach</option>
                  <option value="Nature">Nature</option>
                  <option value="Cultural">Cultural</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={placeFormData.lat}
                  onChange={(e) => setPlaceFormData({...placeFormData, lat: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={placeFormData.lng}
                  onChange={(e) => setPlaceFormData({...placeFormData, lng: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={placeFormData.description}
                onChange={(e) => setPlaceFormData({...placeFormData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                required
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add Place
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPlaceForm(false)
                  setPlaceFormData({
                    name: '',
                    city: '',
                    state: '',
                    category: '',
                    description: '',
                    lat: '',
                    lng: ''
                  })
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {myGuide ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <GuideCard guide={myGuide} />
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(myGuide)}
                className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
              >
                Edit Profile
              </button>
              <button
                onClick={() => handleDelete(myGuide.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
              >
                Delete Profile
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Guide Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Rating:</span>
                <span className="font-semibold">{myGuide.rating} ★</span>
              </div>
              <div className="flex justify-between">
                <span>Price per day:</span>
                <span className="font-semibold">₹{myGuide.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Languages:</span>
                <span className="font-semibold">{myGuide.languages.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Specialties:</span>
                <span className="font-semibold">{myGuide.specialties.length}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">You haven't created a guide profile yet.</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Your Guide Profile
          </button>
        </div>
      )}
    </div>
  )
}
