import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Timer', href: '#timer' },
  { label: 'Motivation', href: '#motivation' },
  { label: 'Settings', href: '#settings' },
]

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? darkMode
              ? 'bg-obsidian-950/80 backdrop-blur-xl border-b border-white/[0.06] shadow-xl shadow-black/20'
              : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-lg shadow-slate-200/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #4f9cf9, #7c6af7)' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="3" fill="white"/>
                <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1" strokeOpacity="0.4"/>
              </svg>
            </div>
            <span className={`font-display font-700 text-lg tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Zenith
            </span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  darkMode
                    ? 'text-white/60 hover:text-white hover:bg-white/[0.07]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                {link.label}
              </motion.button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                darkMode
                  ? 'bg-white/[0.07] hover:bg-white/[0.12] text-white/70 hover:text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.svg key="sun" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}
                  >
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </motion.svg>
                ) : (
                  <motion.svg key="moon" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}
                  >
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>

            {/* CTA */}
            <motion.button
              onClick={() => scrollTo('#timer')}
              className="hidden sm:flex items-center gap-2 btn-primary text-sm py-2.5 px-5"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="relative z-10">Start Focusing</span>
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center ${
                darkMode ? 'bg-white/[0.07] text-white' : 'bg-slate-100 text-slate-700'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col gap-1.5 w-5">
                <motion.span
                  className={`block h-0.5 rounded-full ${darkMode ? 'bg-white' : 'bg-slate-700'}`}
                  animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                />
                <motion.span
                  className={`block h-0.5 rounded-full ${darkMode ? 'bg-white' : 'bg-slate-700'}`}
                  animate={{ opacity: menuOpen ? 0 : 1 }}
                />
                <motion.span
                  className={`block h-0.5 rounded-full ${darkMode ? 'bg-white' : 'bg-slate-700'}`}
                  animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-16 left-0 right-0 z-40 p-4 md:hidden ${
              darkMode
                ? 'bg-obsidian-900/95 backdrop-blur-xl border-b border-white/[0.07]'
                : 'bg-white/95 backdrop-blur-xl border-b border-slate-200'
            }`}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium mb-1 transition-all ${
                  darkMode ? 'text-white/70 hover:text-white hover:bg-white/[0.07]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
