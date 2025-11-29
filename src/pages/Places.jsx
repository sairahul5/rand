import React, { useCallback, useEffect, useState } from 'react'
import { useAppContext } from '../context/useAppContext'
import PlaceCard from '../components/PlaceCard'
import SearchBar from '../components/SearchBar'
import MapPlaceholder from '../components/MapPlaceholder'

export default function Places() {
  const { places } = useAppContext()
  const [results, setResults] = useState(places)
  const [filters, setFilters] = useState({
    category: '',
    rating: '',
    city: ''
  })

  const handleSearch = useCallback((q) => {
    if (!q) return setResults(places)
    const qq = q.toLowerCase()
    setResults(places.filter(p =>
      p.city.toLowerCase().includes(qq) ||
      p.name.toLowerCase().includes(qq) ||
      p.state.toLowerCase().includes(qq)
    ))
  }, [places])

  const applyFilters = useCallback(() => {
    let filtered = places

    if (filters.category) {
      filtered = filtered.filter(p => p.category.toLowerCase().includes(filters.category.toLowerCase()))
    }
    if (filters.rating) {
      filtered = filtered.filter(p => p.rating >= parseFloat(filters.rating))
    }
    if (filters.city) {
      filtered = filtered.filter(p => p.city.toLowerCase().includes(filters.city.toLowerCase()))
    }

    setResults(filtered)
  }, [places, filters])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const q = params.get('q')
    if (q) handleSearch(q)
  }, [handleSearch])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Places</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={filters.city}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter city"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  <option value="Historical">Historical</option>
                  <option value="Religious">Religious</option>
                  <option value="Beach">Beach</option>
                  <option value="Nature">Nature</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Rating
                </label>
                <select
                  name="rating"
                  value={filters.rating}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Any</option>
                  <option value="3">3+ stars</option>
                  <option value="4">4+ stars</option>
                  <option value="4.5">4.5+ stars</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <SearchBar onSearch={handleSearch} />

          {/* Map */}
          <div className="mb-8">
            <MapPlaceholder />
          </div>

          {/* Results */}
          <div className="mb-4">
            <p className="text-gray-600">{results.length} places found</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {results.map(r => <PlaceCard key={r.id} place={r} />)}
          </div>

          {results.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No places found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
