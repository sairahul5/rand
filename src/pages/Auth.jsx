import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [isAdminLogin, setIsAdminLogin] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'tourist',
    userId: ''
  })
  const [error, setError] = useState('')
  const { login } = useAppContext()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (isAdminLogin) {
      // Admin login with fixed credentials
      if (formData.userId === '8593' && formData.password === '123456') {
        const user = {
          id: Date.now(),
          email: 'admin@turisum.com',
          name: 'Admin',
          role: 'admin'
        }
        login(user)
        navigate('/')
      } else {
        setError('Invalid admin credentials. Please try again.')
        return
      }
    } else {
      // Mock authentication - in real app, this would call an API
      const user = {
        id: Date.now(),
        email: formData.email,
        name: formData.name || formData.email.split('@')[0],
        role: formData.role
      }
      login(user)
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg hero-pattern py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="max-w-md w-full space-y-8 relative z-10 animate-fade-in">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 text-shadow">Turisum</h1>
            <p className="text-white text-opacity-90">Discover India with us</p>
          </div>
          <h2 className="text-3xl font-bold text-white text-shadow">
            {isLogin ? 'Welcome Back' : 'Join Our Community'}
          </h2>
          <p className="mt-2 text-white text-opacity-90">
            {isLogin ? 'Sign in to continue your journey' : 'Create your account to start exploring'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
            <div className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    required={!isLogin}
                    className="appearance-none relative block w-full px-4 py-3 border border-white border-opacity-30 rounded-lg bg-white bg-opacity-20 placeholder-white placeholder-opacity-70 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-white transition-all duration-300 sm:text-sm"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              )}
              {isLogin && (
                <div className="flex items-center">
                  <input
                    id="adminLogin"
                    name="adminLogin"
                    type="checkbox"
                    checked={isAdminLogin}
                    onChange={(e) => setIsAdminLogin(e.target.checked)}
                    className="h-4 w-4 text-white focus:ring-white focus:ring-opacity-50 border-white border-opacity-30 rounded"
                  />
                  <label htmlFor="adminLogin" className="ml-2 block text-sm text-white">
                    Admin Login
                  </label>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  {isAdminLogin ? 'User ID' : 'Email Address'}
                </label>
                <input
                  name={isAdminLogin ? 'userId' : 'email'}
                  type={isAdminLogin ? 'text' : 'email'}
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-white border-opacity-30 rounded-lg bg-white bg-opacity-20 placeholder-white placeholder-opacity-70 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-white transition-all duration-300 sm:text-sm"
                  placeholder={isAdminLogin ? 'Enter your user ID' : 'Enter your email'}
                  value={isAdminLogin ? formData.userId : formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-white border-opacity-30 rounded-lg bg-white bg-opacity-20 placeholder-white placeholder-opacity-70 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-white transition-all duration-300 sm:text-sm"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {error && (
                <div className="text-red-400 text-sm">
                  {error}
                </div>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-white mb-2">Select Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-white border-opacity-30 rounded-lg bg-white bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-white transition-all duration-300 sm:text-sm"
                >
                  <option value="tourist" className="text-gray-900">Tourist</option>
                  <option value="host" className="text-gray-900">Homestay Host</option>
                  <option value="guide" className="text-gray-900">Local Guide</option>
                  <option value="admin" className="text-gray-900">Admin</option>
                </select>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-semibold rounded-xl text-white bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:text-white hover:text-opacity-80 font-medium transition-colors duration-300"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
