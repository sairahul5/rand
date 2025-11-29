import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'

export default function Nav() {
  const { user, logout } = useAppContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-lg backdrop-blur-sm bg-white/95 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              Tourism
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/search" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300 relative group">
              Search
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/places" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300 relative group">
              Places
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/guides" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300 relative group">
              Guides
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300 relative group">
              Profile
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {user ? (
              <>
                {user.role === 'tourist' && (
                  <Link to="/tourist" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300 relative group">
                    Dashboard
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )}
                {user.role === 'host' && (
                  <Link to="/host" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300 relative group">
                    Host Dashboard
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )}
                {user.role === 'guide' && (
                  <Link to="/guide" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300 relative group">
                    Guide Dashboard
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300 relative group">
                    Admin
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="btn-primary px-4 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
