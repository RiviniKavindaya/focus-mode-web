import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const rotatingWords = ['Smarter.', 'Deeper.', 'Better.', 'Freely.']

export default function Hero({ darkMode }) {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length)
    }, 2400)
    return () => clearInterval(interval)
  }, [])

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[400, 600, 800, 1000].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border"
            style={{
              width: size,
              height: size,
              borderColor: darkMode ? `rgba(124,106,247,${0.06 - i * 0.012})` : `rgba(124,106,247,${0.05 - i * 0.01})`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 1.2, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* Hero badge */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono font-medium border ${
          darkMode
            ? 'bg-aurora-blue/10 border-aurora-blue/20 text-aurora-blue'
            : 'bg-blue-50 border-blue-100 text-blue-600'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-aurora-blue animate-pulse" />
          Your personal focus companion
        </div>
      </motion.div>

      {/* Main headline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-5xl mx-auto"
      >
        <motion.h1
          variants={itemVariants}
          className={`font-display font-800 leading-[0.95] tracking-tight mb-4 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}
          style={{ fontSize: 'clamp(3.2rem, 9vw, 8rem)' }}
        >
          Focus better.
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 mb-8"
          style={{ fontSize: 'clamp(3.2rem, 9vw, 8rem)' }}
        >
          <span className={`font-display font-800 leading-[0.95] tracking-tight ${
            darkMode ? 'text-white/30' : 'text-slate-300'
          }`}>
            Achieve
          </span>
          <div className="relative h-[1em] overflow-hidden" style={{ minWidth: '4ch' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[wordIndex]}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 gradient-text font-display font-800 leading-[0.95] tracking-tight whitespace-nowrap"
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className={`text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-12 font-light ${
            darkMode ? 'text-white/45' : 'text-slate-500'
          }`}
        >
          A minimal, distraction-free workspace with Pomodoro timer, focus tracking,
          and motivational tools — designed to help you enter deep flow states.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => scrollTo('#timer')}
            className="btn-primary group"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="flex items-center gap-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Start Focus Mode
            </span>
          </motion.button>

          <motion.button
            onClick={() => scrollTo('#dashboard')}
            className={`flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-display font-semibold border transition-all duration-300 ${
              darkMode
                ? 'border-white/[0.1] text-white/70 hover:text-white hover:border-white/20 hover:bg-white/[0.04]'
                : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50'
            }`}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            View Dashboard
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-60">
              <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mt-20 flex flex-wrap items-center justify-center gap-8 sm:gap-16"
      >
        {[
          { value: '12,400+', label: 'Focus sessions' },
          { value: '94%', label: 'Productivity boost' },
          { value: '2.8×', label: 'More output' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className={`font-display font-700 text-2xl mb-0.5 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {stat.value}
            </div>
            <div className={`text-xs font-mono uppercase tracking-widest ${
              darkMode ? 'text-white/35' : 'text-slate-400'
            }`}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <span className={`text-xs font-mono tracking-widest uppercase ${
          darkMode ? 'text-white/25' : 'text-slate-400'
        }`}>scroll</span>
        <motion.div
          className={`w-px h-8 ${darkMode ? 'bg-gradient-to-b from-white/20 to-transparent' : 'bg-gradient-to-b from-slate-300 to-transparent'}`}
          animate={{ scaleY: [0, 1, 0], y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
