import React, { useState } from 'react'
import { useAppContext } from '../context/useAppContext'
import HomestayCard from '../components/HomestayCard'

export default function Host() {
  const { user, homestays, addHomestay, updateHomestay, deleteHomestay } = useAppContext()
  const [showForm, setShowForm] = useState(false)
  const [editingHomestay, setEditingHomestay] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    city: '',
    state: '',
    price: '',
    description: '',
    amenities: '',
    images: ''
  })

  if (!user || user.role !== 'host') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please login as a host to access this page.</p>
          <a href="/auth" className="bg-blue-600 text-white px-4 py-2 rounded">
            Login
          </a>
        </div>
      </div>
    )
  }

  const myHomestays = homestays.filter(h => h.hostId === user.id)

  const handleSubmit = (e) => {
    e.preventDefault()
    const homestayData = {
      ...formData,
      price: parseInt(formData.price),
      amenities: formData.amenities.split(',').map(a => a.trim()),
      images: formData.images ? formData.images.split(',').map(i => i.trim()) : ['/api/placeholder/300/200'],
      hostId: user.id,
      rating: 0,
      availability: true
    }

    if (editingHomestay) {
      updateHomestay(editingHomestay.id, homestayData)
      setEditingHomestay(null)
    } else {
      addHomestay(homestayData)
    }

    setFormData({
      title: '',
      city: '',
      state: '',
      price: '',
      description: '',
      amenities: '',
      images: ''
    })
    setShowForm(false)
  }

  const handleEdit = (homestay) => {
    setEditingHomestay(homestay)
    setFormData({
      title: homestay.title,
      city: homestay.city,
      state: homestay.state,
      price: homestay.price.toString(),
      description: homestay.description,
      amenities: homestay.amenities.join(', '),
      images: homestay.images.join(', ')
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this homestay?')) {
      deleteHomestay(id)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Host Dashboard</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Add New Homestay'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingHomestay ? 'Edit Homestay' : 'Add New Homestay'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
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
                  Price per night
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
                Amenities (comma separated)
              </label>
              <input
                type="text"
                value={formData.amenities}
                onChange={(e) => setFormData({...formData, amenities: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="WiFi, Kitchen, Parking"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URLs (comma separated)
              </label>
              <input
                type="text"
                value={formData.images}
                onChange={(e) => setFormData({...formData, images: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editingHomestay ? 'Update' : 'Add'} Homestay
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingHomestay(null)
                  setFormData({
                    title: '',
                    city: '',
                    state: '',
                    price: '',
                    description: '',
                    amenities: '',
                    images: ''
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myHomestays.map(homestay => (
          <div key={homestay.id} className="bg-white rounded-lg shadow overflow-hidden">
            <HomestayCard h={homestay} />
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(homestay)}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(homestay.id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {myHomestays.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">You haven't added any homestays yet.</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Your First Homestay
          </button>
        </div>
      )}
    </div>
  )
}
