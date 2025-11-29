import React, { createContext, useState, useEffect, useContext } from 'react'
import { sampleData } from '../data/sampleData'

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [homestays, setHomestays] = useState(sampleData.homestays)
  const [places, setPlaces] = useState(sampleData.places)
  const [guides, setGuides] = useState(sampleData.guides)
  const [reviews, setReviews] = useState(sampleData.reviews)
  const [bookings, setBookings] = useState([])

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) setUser(JSON.parse(savedUser))

    const savedHomestays = localStorage.getItem('homestays')
    if (savedHomestays) setHomestays(JSON.parse(savedHomestays))

    const savedPlaces = localStorage.getItem('places')
    if (savedPlaces) setPlaces(JSON.parse(savedPlaces))

    const savedGuides = localStorage.getItem('guides')
    if (savedGuides) setGuides(JSON.parse(savedGuides))

    const savedReviews = localStorage.getItem('reviews')
    if (savedReviews) setReviews(JSON.parse(savedReviews))

    const savedBookings = localStorage.getItem('bookings')
    if (savedBookings) setBookings(JSON.parse(savedBookings))
  }, [])

  // Save to localStorage when state changes
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    localStorage.setItem('homestays', JSON.stringify(homestays))
  }, [homestays])

  useEffect(() => {
    localStorage.setItem('places', JSON.stringify(places))
  }, [places])

  useEffect(() => {
    localStorage.setItem('guides', JSON.stringify(guides))
  }, [guides])

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews))
  }, [reviews])

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings))
  }, [bookings])

  const login = (userData) => setUser(userData)
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const addHomestay = (homestay) => {
    setHomestays(prev => [...prev, { ...homestay, id: Date.now() }])
  }

  const addPlace = (place) => {
    setPlaces(prev => [...prev, { ...place, id: Date.now() }])
  }

  const updatePlace = (id, updates) => {
    setPlaces(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deletePlace = (id) => {
    setPlaces(prev => prev.filter(p => p.id !== id))
  }

  const updateHomestay = (id, updates) => {
    setHomestays(prev => prev.map(h => h.id === id ? { ...h, ...updates } : h))
  }

  const deleteHomestay = (id) => {
    setHomestays(prev => prev.filter(h => h.id !== id))
  }

  const addGuide = (guide) => {
    setGuides(prev => [...prev, { ...guide, id: Date.now() }])
  }

  const updateGuide = (id, updates) => {
    setGuides(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g))
  }

  const deleteGuide = (id) => {
    setGuides(prev => prev.filter(g => g.id !== id))
  }

  const addReview = (review) => {
    setReviews(prev => [...prev, { ...review, id: Date.now() }])
  }

  const updateReview = (id, updates) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r))
  }

  const deleteReview = (id) => {
    setReviews(prev => prev.filter(r => r.id !== id))
  }

  const bookGuide = (guideId) => {
    const guide = guides.find(g => g.id === guideId)
    if (guide) {
      setBookings(prev => [...prev, { ...guide, bookedAt: new Date().toISOString() }])
      alert(`${guide.name} is booked`)
    }
  }

  const updateUser = (userData) => {
    setUser(userData)
  }

  const value = {
    user,
    homestays,
    places,
    guides,
    reviews,
    bookings,
    login,
    logout,
    addHomestay,
    updateHomestay,
    deleteHomestay,
    addPlace,
    addGuide,
    updateGuide,
    deleteGuide,
    addReview,
    updateReview,
    deleteReview,
    bookGuide,
    updateUser
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
