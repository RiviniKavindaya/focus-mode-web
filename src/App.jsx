import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import BackgroundBlobs from './components/BackgroundBlobs'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Settings from './pages/Settings'
import AppLayout from './components/layout/AppLayout'
import AuthCallback from './pages/AuthCallback'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [focusIntensity, setFocusIntensity] = useState('deep')
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    document.documentElement.classList.toggle('light', !darkMode)
  }, [darkMode])

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`relative min-h-screen ${
            darkMode ? 'bg-obsidian-950 text-white' : 'bg-slate-50 text-slate-900'
          }`}
        >
          {/* Background */}
          <BackgroundBlobs darkMode={darkMode} />

          <div className="relative z-10">
            <main>
              <Routes>

                {/* HOME */}
                <Route
                  path="/"
                  element={
                    <Home
                      darkMode={darkMode}
                      setDarkMode={setDarkMode}
                      soundEnabled={soundEnabled}
                      setSoundEnabled={setSoundEnabled}
                      focusIntensity={focusIntensity}
                      setFocusIntensity={setFocusIntensity}
                      activeSection={activeSection}
                      setActiveSection={setActiveSection}
                    />
                  }
                />

                {/* LOGIN */}
                <Route
                  path="/login"
                  element={<Login darkMode={darkMode} />}
                />
                {/* AUTH CALLBACK */}
                <Route
                  path="/auth/callback"
                  element={<AuthCallback />}
                />
                {/* DASHBOARD */}
                <Route
                  path="/dashboard"
                  element={
                    <AppLayout darkMode={darkMode}>
                      <Dashboard darkMode={darkMode} />
                    </AppLayout>
                  }
                />
                {/* REGISTER */}
                <Route
                  path="/register"
                  element={<Register darkMode={darkMode} />}
                />
                
                {/* SETTINGS */}
                <Route
                  path="/settings"
                  element={
                    <AppLayout darkMode={darkMode}>
                      <Settings darkMode={darkMode} />
                    </AppLayout>
                  }
                />

              </Routes>
            </main>
          </div>
        </motion.div>
      </AnimatePresence>
    </BrowserRouter>
  )
}