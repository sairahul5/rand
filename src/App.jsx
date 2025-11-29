import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TouristSearch from './pages/TouristSearch'
import GuideSearch from './pages/GuideSearch'
import Places from './pages/Places'
import TouristHome from './pages/TouristHome'
import Host from './pages/Host'
import Guide from './pages/Guide'
import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Nav from './components/Nav'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tourist" element={<TouristHome />} />
            <Route path="/search" element={<TouristSearch />} />
            <Route path="/places" element={<Places />} />
            <Route path="/guides" element={<GuideSearch />} />
            <Route path="/host" element={<Host />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
