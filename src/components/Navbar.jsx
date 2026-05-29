import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Timer', href: '#timer' },
  { label: 'Motivation', href: '#motivation' },
  { label: 'Settings', href: '#settings' },
]

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

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
        <div className="flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">

          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-xl"
              style={{ background: 'linear-gradient(135deg, #4f9cf9, #7c6af7)' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="3" fill="white"/>
                <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="white" strokeWidth="1.5"/>
              </svg>
            </div>
            <span className={`font-display font-700 text-lg ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Zenith
            </span>
          </motion.a>

          {/* Desktop nav */}
          <div className="items-center hidden gap-1 md:flex">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`px-4 py-2 rounded-xl text-sm font-medium ${
                  darkMode
                    ? 'text-white/60 hover:text-white hover:bg-white/[0.07]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </motion.button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">

            {/*LOGIN BUTTON */}
           <motion.button
              onClick={() => navigate('/login')}
              className={`hidden sm:flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold border transition ${
                darkMode
                  ? 'border-white/20 text-white/80 hover:bg-white/10'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Login Advanced Mode
            </motion.button>

            {/* Dark mode toggle */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                darkMode
                  ? 'bg-white/[0.07] text-white/70'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {darkMode ? '🌙' : '☀️'}
            </motion.button>

            {/* CTA */}
            <motion.button
              onClick={() => scrollTo('#timer')}
              className="hidden sm:flex btn-primary text-sm py-2.5 px-5"
            >
              Start Focusing
            </motion.button>

            {/* Mobile menu */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center w-10 h-10 md:hidden rounded-xl"
            >
              ☰
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed left-0 right-0 z-40 p-4 top-16 md:hidden">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="w-full p-3 text-left rounded-lg"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}