import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const quotes = [
  {
    text: "The ability to focus is the ability to choose what matters and ruthlessly ignore everything else.",
    author: "Cal Newport",
    role: "Author, Deep Work",
  },
  {
    text: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar",
    role: "Motivational Speaker",
  },
  {
    text: "Clarity is the counterpart of deep focus. When you have both, you become unstoppable.",
    author: "Ali Abdaal",
    role: "Productivity Expert",
  },
  {
    text: "The secret of getting ahead is getting started. The secret of getting started is breaking your overwhelming tasks into small, manageable ones.",
    author: "Mark Twain",
    role: "Author",
  },
  {
    text: "Deep work is the ability to focus without distraction on a cognitively demanding task.",
    author: "Cal Newport",
    role: "Computer Science Professor",
  },
  {
    text: "Every moment of focused effort compounds. The work you do in silence will speak for itself.",
    author: "Zenith",
    role: "Daily Reminder",
  },
]

const principles = [
  { icon: '⚡', label: 'Single Tasking', desc: 'One task at a time. Total immersion.' },
  { icon: '🌊', label: 'Flow State', desc: 'Find your rhythm and ride the wave.' },
  { icon: '🎯', label: 'Intentionality', desc: 'Every session has a clear purpose.' },
  { icon: '🌱', label: 'Compound Growth', desc: 'Small daily wins create big results.' },
]

export default function Motivation({ darkMode }) {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setQuoteIndex((i) => (i + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToQuote = (i) => {
    setDirection(i > quoteIndex ? 1 : -1)
    setQuoteIndex(i)
  }

  const quote = quotes[quoteIndex]

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir * 40, filter: 'blur(4px)' }),
    center: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: (dir) => ({ opacity: 0, x: dir * -40, filter: 'blur(4px)' }),
  }

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* Background decorative element */}
      <div className={`absolute inset-0 ${darkMode ? 'opacity-30' : 'opacity-20'}`}
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(124,106,247,0.08), transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="section-label mb-4">Motivation</div>
          <h2 className={`font-display font-700 leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Stay Inspired
          </h2>
        </motion.div>

        {/* Quote carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`relative rounded-3xl p-10 sm:p-16 mb-16 overflow-hidden border ${
            darkMode
              ? 'bg-white/[0.03] border-white/[0.07]'
              : 'bg-white border-slate-100 shadow-sm'
          }`}
        >
          {/* Quote mark */}
          <div className="absolute top-8 left-10 font-display text-8xl leading-none opacity-10 select-none"
            style={{ color: '#7c6af7' }}>
            "
          </div>

          {/* Quote progress bar */}
          <div className={`absolute top-0 left-0 h-0.5 rounded-t-3xl transition-all duration-[5000ms] ease-linear ${''}`}
            style={{
              width: `${((quoteIndex + 1) / quotes.length) * 100}%`,
              background: 'linear-gradient(90deg, #4f9cf9, #7c6af7)',
            }}
          />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={quoteIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <blockquote
                className={`font-display font-400 leading-relaxed mb-8 ${darkMode ? 'text-white/85' : 'text-slate-800'}`}
                style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)' }}
              >
                {quote.text}
              </blockquote>

              <div className="flex flex-col items-center gap-1">
                <span className={`font-display font-600 ${darkMode ? 'text-white/70' : 'text-slate-700'}`}>
                  — {quote.author}
                </span>
                <span className={`text-sm font-mono ${darkMode ? 'text-white/30' : 'text-slate-400'}`}>
                  {quote.role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {quotes.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => goToQuote(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === quoteIndex ? 24 : 6,
                  height: 6,
                  background: i === quoteIndex
                    ? 'linear-gradient(90deg, #4f9cf9, #7c6af7)'
                    : darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Principles grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {principles.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className={`p-5 sm:p-6 rounded-2xl border text-center transition-all duration-300 cursor-default ${
                darkMode
                  ? 'bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12]'
                  : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="text-3xl mb-3">{p.icon}</div>
              <div className={`font-display font-600 text-sm mb-1.5 ${darkMode ? 'text-white/80' : 'text-slate-800'}`}>
                {p.label}
              </div>
              <div className={`text-xs leading-relaxed ${darkMode ? 'text-white/35' : 'text-slate-500'}`}>
                {p.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
