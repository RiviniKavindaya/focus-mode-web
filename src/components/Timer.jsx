import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from './Card'

const MODES = {
  focus:      { label: 'Focus',       duration: 25 * 60, color: '#7c6af7', glow: 'rgba(124,106,247,0.3)' },
  shortBreak: { label: 'Short Break', duration: 5 * 60,  color: '#2dd4bf', glow: 'rgba(45,212,191,0.3)' },
  longBreak:  { label: 'Long Break',  duration: 15 * 60, color: '#4f9cf9', glow: 'rgba(79,156,249,0.3)' },
}

const RADIUS = 110
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function Timer({ darkMode }) {
  const [mode, setMode] = useState('focus')
  const [timeLeft, setTimeLeft] = useState(MODES.focus.duration)
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef(null)

  const totalDuration = MODES[mode].duration
  const progress = timeLeft / totalDuration
  const dashOffset = CIRCUMFERENCE * (1 - progress)

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const secs = String(timeLeft % 60).padStart(2, '0')

  const currentMode = MODES[mode]

  const tick = useCallback(() => {
    setTimeLeft((t) => {
      if (t <= 1) {
        setRunning(false)
        setSessions((s) => s + 1)
        return 0
      }
      return t - 1
    })
  }, [])

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running, tick])

  const handleMode = (m) => {
    setMode(m)
    setTimeLeft(MODES[m].duration)
    setRunning(false)
  }

  const handleReset = () => {
    setTimeLeft(MODES[mode].duration)
    setRunning(false)
  }

  const handleToggle = () => {
    if (timeLeft === 0) {
      setTimeLeft(MODES[mode].duration)
      setRunning(true)
    } else {
      setRunning((r) => !r)
    }
  }

  return (
    <section className="relative py-28 px-6">
      {/* Ambient glow behind timer */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="rounded-full"
          style={{ width: 500, height: 500 }}
          animate={{
            background: running
              ? `radial-gradient(circle, ${currentMode.glow} 0%, transparent 70%)`
              : `radial-gradient(circle, rgba(124,106,247,0.06) 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
          transition={{ duration: 1.5 }}
        />
      </div>

      <div className="max-w-2xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <div className="section-label mb-4">Pomodoro</div>
          <h2 className={`font-display font-700 leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Focus Timer
          </h2>
        </motion.div>

        {/* Mode tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`flex gap-1 p-1 rounded-2xl mb-12 mx-auto w-fit ${
            darkMode ? 'bg-white/[0.04] border border-white/[0.07]' : 'bg-slate-100 border border-slate-200'
          }`}
        >
          {Object.entries(MODES).map(([key, val]) => (
            <motion.button
              key={key}
              onClick={() => handleMode(key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-display font-semibold transition-all duration-300 relative ${
                mode === key
                  ? 'text-white'
                  : darkMode ? 'text-white/40 hover:text-white/70' : 'text-slate-500 hover:text-slate-700'
              }`}
              whileTap={{ scale: 0.97 }}
            >
              {mode === key && (
                <motion.div
                  layoutId="modeTab"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: `linear-gradient(135deg, ${val.color}cc, ${val.color}99)` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{val.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Timer ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-12">
            {/* Outer pulse when running */}
            <AnimatePresence>
              {running && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: `2px solid ${currentMode.color}`,
                    margin: '-12px',
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.03, 1] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </AnimatePresence>

            {/* SVG ring */}
            <svg
              width="280"
              height="280"
              viewBox="0 0 280 280"
              className="progress-ring"
            >
              {/* Track */}
              <circle
                cx="140" cy="140" r={RADIUS}
                fill="none"
                stroke={darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}
                strokeWidth="3"
              />

              {/* Progress arc */}
              <motion.circle
                cx="140" cy="140" r={RADIUS}
                fill="none"
                stroke={currentMode.color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                animate={{
                  strokeDashoffset: dashOffset,
                  stroke: currentMode.color,
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  filter: running ? `drop-shadow(0 0 8px ${currentMode.color}80)` : 'none',
                }}
              />

              {/* Tick marks */}
              {Array.from({ length: 60 }, (_, i) => {
                const angle = (i / 60) * 360
                const rad = (angle - 90) * (Math.PI / 180)
                const outerR = RADIUS + 16
                const innerR = i % 5 === 0 ? RADIUS + 9 : RADIUS + 12
                return (
                  <line
                    key={i}
                    x1={140 + Math.cos(rad) * innerR}
                    y1={140 + Math.sin(rad) * innerR}
                    x2={140 + Math.cos(rad) * outerR}
                    y2={140 + Math.sin(rad) * outerR}
                    stroke={darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}
                    strokeWidth={i % 5 === 0 ? 1.5 : 0.8}
                  />
                )
              })}
            </svg>

            {/* Center display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${mins}:${secs}`}
                  initial={{ opacity: 0.6, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`font-mono font-300 leading-none tracking-tight`}
                  style={{
                    fontSize: '4rem',
                    color: running ? currentMode.color : darkMode ? 'white' : '#1e293b',
                    textShadow: running ? `0 0 30px ${currentMode.color}60` : 'none',
                    transition: 'color 0.5s, text-shadow 0.5s',
                  }}
                >
                  {mins}:{secs}
                </motion.div>
              </AnimatePresence>

              <div className={`text-xs font-mono uppercase tracking-widest mt-2 ${
                darkMode ? 'text-white/30' : 'text-slate-400'
              }`}>
                {currentMode.label}
              </div>

              {sessions > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex gap-1 mt-3"
                >
                  {Array.from({ length: Math.min(sessions, 8) }, (_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: currentMode.color }}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Reset */}
            <motion.button
              onClick={handleReset}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                darkMode
                  ? 'bg-white/[0.06] hover:bg-white/[0.1] text-white/50 hover:text-white/80'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M1 4v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.51 15a9 9 0 102.13-9.36L1 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            {/* Play/Pause */}
            <motion.button
              onClick={handleToggle}
              className="w-20 h-20 rounded-2xl flex items-center justify-center font-display font-semibold text-white relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${currentMode.color}, ${currentMode.color}99)`,
                boxShadow: running ? `0 8px 32px ${currentMode.glow}, 0 0 0 1px ${currentMode.color}30` : `0 4px 20px ${currentMode.glow}60`,
              }}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: running
                  ? [`0 8px 32px ${currentMode.glow}, 0 0 0 1px ${currentMode.color}30`,
                     `0 12px 40px ${currentMode.glow}cc, 0 0 0 1px ${currentMode.color}50`,
                     `0 8px 32px ${currentMode.glow}, 0 0 0 1px ${currentMode.color}30`]
                  : `0 4px 20px ${currentMode.glow}60`,
              }}
              transition={running ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
            >
              <AnimatePresence mode="wait">
                {running ? (
                  <motion.svg key="pause" width="22" height="22" viewBox="0 0 24 24" fill="none"
                    initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}
                  >
                    <rect x="6" y="4" width="4" height="16" rx="1" fill="white"/>
                    <rect x="14" y="4" width="4" height="16" rx="1" fill="white"/>
                  </motion.svg>
                ) : (
                  <motion.svg key="play" width="22" height="22" viewBox="0 0 24 24" fill="none"
                    initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}
                  >
                    <path d="M5 3l14 9-14 9V3z" fill="white"/>
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Skip */}
            <motion.button
              onClick={() => { handleMode(mode); setSessions((s) => s + 1) }}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                darkMode
                  ? 'bg-white/[0.06] hover:bg-white/[0.1] text-white/50 hover:text-white/80'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 4l10 8-10 8V4zM19 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>

          {/* Session info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={`mt-10 text-center text-sm ${darkMode ? 'text-white/30' : 'text-slate-400'}`}
          >
            <span className="font-mono">{sessions}</span>
            <span className="mx-1.5">sessions completed today</span>
            {sessions >= 4 && (
              <span className="text-amber-400 ml-1">🔥 On fire!</span>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
