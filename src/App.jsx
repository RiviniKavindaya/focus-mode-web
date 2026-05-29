import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import Timer from './components/Timer'
import Motivation from './components/Motivation'
import Settings from './components/Settings'
import Footer from './components/Footer'
import BackgroundBlobs from './components/BackgroundBlobs'

import Login from './pages/Login'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [focusIntensity, setFocusIntensity] = useState('deep')
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    document.documentElement.classList.toggle('light', !darkMode)

    if (darkMode) {
      document.body.style.background = '#040407'
    } else {
      document.body.style.background = '#f8fafc'
    }
  }, [darkMode])

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`relative min-h-screen transition-colors duration-700 ${
            darkMode ? 'bg-obsidian-950 text-white' : 'bg-slate-50 text-slate-900'
          }`}
        >
          {/* Ambient background */}
          <BackgroundBlobs darkMode={darkMode} />

          {/* Noise texture overlay */}
          <div
            className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* CONTENT */}
          <div className="relative z-10">
           

            <main>
              <Routes>

                {/* HOME PAGE */}
                <Route
                  path="/"
                  element={
                    <>
                    <section id="navigation">
                      <Navbar
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                      />
                    </section>
                      <section id="hero">
                        <Hero darkMode={darkMode} />
                      </section>

                      <section id="dashboard">
                        <Dashboard darkMode={darkMode} />
                      </section>

                      <section id="timer">
                        <Timer darkMode={darkMode} />
                      </section>

                      <section id="motivation">
                        <Motivation darkMode={darkMode} />
                      </section>

                      <section id="settings">
                        <Settings
                          darkMode={darkMode}
                          setDarkMode={setDarkMode}
                          soundEnabled={soundEnabled}
                          setSoundEnabled={setSoundEnabled}
                          focusIntensity={focusIntensity}
                          setFocusIntensity={setFocusIntensity}
                        />
                      </section>

                      <Footer darkMode={darkMode} />
                    </>
                  }
                />

                {/* LOGIN PAGE */}
                <Route
                  path="/login"
                  element={<Login darkMode={darkMode} />}
                />

              </Routes>
            </main>
          </div>
        </motion.div>
      </AnimatePresence>
    </BrowserRouter>
  )
}