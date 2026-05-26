import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from './Card'

const tasks = [
  { id: 1, label: 'Design system documentation', progress: 78, tag: 'Design', done: false },
  { id: 2, label: 'API integration review', progress: 45, tag: 'Engineering', done: false },
  { id: 3, label: 'Q4 strategy deck', progress: 100, tag: 'Strategy', done: true },
  { id: 4, label: 'User research synthesis', progress: 30, tag: 'Research', done: false },
]

const tagColors = {
  Design: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  Engineering: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  Strategy: 'text-teal-400 bg-teal-400/10 border-teal-400/20',
  Research: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
}

const stats = [
  {
    label: 'Focus Time Today',
    value: '4h 23m',
    change: '+12%',
    positive: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    color: 'text-aurora-blue',
    bg: 'bg-aurora-blue/10',
  },
  {
    label: 'Sessions Done',
    value: '7',
    change: '+2 vs yesterday',
    positive: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    label: 'Streak',
    value: '14 days',
    change: 'Personal best!',
    positive: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
  },
  {
    label: 'Deep Focus',
    value: '68%',
    change: 'Flow state index',
    positive: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M2 12C2 12 5 5 12 5s10 7 10 7-3 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    color: 'text-aurora-indigo',
    bg: 'bg-aurora-indigo/10',
  },
]

const weekData = [65, 80, 45, 90, 70, 55, 88]
const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function Dashboard({ darkMode }) {
  const [completedIds, setCompletedIds] = useState([3])

  const toggleTask = (id) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section className={`relative py-28 px-6 ${darkMode ? '' : ''}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="section-label mb-4">Dashboard</div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className={`font-display font-700 leading-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`} style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Today's Overview
            </h2>
            <div className={`text-sm font-mono ${darkMode ? 'text-white/35' : 'text-slate-400'}`}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <Card darkMode={darkMode} className="p-5 group relative overflow-hidden">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className={`font-display font-700 text-2xl mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-xs font-medium mb-1.5 ${darkMode ? 'text-white/45' : 'text-slate-500'}`}>
                  {stat.label}
                </div>
                <div className={`text-xs font-mono ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.change}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main content row */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Tasks panel */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Card darkMode={darkMode} hover={false} className="p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`font-display font-600 text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Focus Tasks
                </h3>
                <span className={`text-xs font-mono px-2.5 py-1 rounded-lg ${
                  darkMode ? 'bg-white/[0.06] text-white/40' : 'bg-slate-100 text-slate-500'
                }`}>
                  {completedIds.length}/{tasks.length} done
                </span>
              </div>

              <div className="space-y-3">
                {tasks.map((task, i) => {
                  const isDone = completedIds.includes(task.id)
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      onClick={() => toggleTask(task.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 group ${
                        darkMode
                          ? isDone ? 'bg-white/[0.025]' : 'bg-white/[0.04] hover:bg-white/[0.07]'
                          : isDone ? 'bg-slate-50' : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      {/* Checkbox */}
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isDone
                          ? 'bg-emerald-500 border-emerald-500'
                          : darkMode ? 'border-white/20 group-hover:border-white/40' : 'border-slate-300 group-hover:border-slate-400'
                      }`}>
                        {isDone && (
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`text-sm font-medium truncate transition-all ${
                            isDone
                              ? darkMode ? 'line-through text-white/30' : 'line-through text-slate-400'
                              : darkMode ? 'text-white/80' : 'text-slate-700'
                          }`}>
                            {task.label}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-md border shrink-0 font-mono ${tagColors[task.tag]}`}>
                            {task.tag}
                          </span>
                        </div>
                        {/* Progress bar */}
                        <div className={`h-1 rounded-full overflow-hidden ${darkMode ? 'bg-white/[0.07]' : 'bg-slate-200'}`}>
                          <motion.div
                            className={`h-full rounded-full ${isDone ? 'bg-emerald-500' : 'bg-gradient-to-r from-aurora-blue to-aurora-indigo'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${isDone ? 100 : task.progress}%` }}
                            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 + i * 0.1 }}
                          />
                        </div>
                      </div>

                      <span className={`text-xs font-mono shrink-0 ${darkMode ? 'text-white/30' : 'text-slate-400'}`}>
                        {isDone ? '100' : task.progress}%
                      </span>
                    </motion.div>
                  )
                })}
              </div>

              {/* Overall progress */}
              <div className={`mt-6 pt-5 border-t ${darkMode ? 'border-white/[0.06]' : 'border-slate-100'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono uppercase tracking-wider ${darkMode ? 'text-white/35' : 'text-slate-400'}`}>
                    Overall Progress
                  </span>
                  <span className={`text-xs font-mono font-medium ${darkMode ? 'text-white/60' : 'text-slate-600'}`}>
                    {Math.round((completedIds.length / tasks.length) * 100)}%
                  </span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-white/[0.06]' : 'bg-slate-100'}`}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #4f9cf9, #7c6af7, #a855f7)' }}
                    animate={{ width: `${(completedIds.length / tasks.length) * 100}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Weekly activity */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card darkMode={darkMode} hover={false} className="p-6 h-full">
              <h3 className={`font-display font-600 text-lg mb-1.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Weekly Activity
              </h3>
              <p className={`text-xs font-mono mb-6 ${darkMode ? 'text-white/35' : 'text-slate-400'}`}>
                Hours in deep focus per day
              </p>

              {/* Bar chart */}
              <div className="flex items-end gap-2 h-32 mb-3">
                {weekData.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      className="w-full rounded-lg relative overflow-hidden"
                      style={{ height: `${val}%` }}
                      initial={{ scaleY: 0, originY: 1 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.4 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: i === 6
                            ? 'linear-gradient(180deg, #7c6af7, #4f9cf9)'
                            : darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
                        }}
                      />
                      {i === 6 && (
                        <div className="absolute inset-0 shimmer-bg rounded-lg" />
                      )}
                    </motion.div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                {days.map((d, i) => (
                  <div key={i} className={`flex-1 text-center text-xs font-mono ${
                    i === 6
                      ? 'text-aurora-indigo font-medium'
                      : darkMode ? 'text-white/25' : 'text-slate-400'
                  }`}>
                    {d}
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className={`mt-6 pt-5 border-t ${darkMode ? 'border-white/[0.06]' : 'border-slate-100'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-xs font-mono uppercase tracking-wider mb-1 ${darkMode ? 'text-white/35' : 'text-slate-400'}`}>
                      This week
                    </div>
                    <div className={`font-display font-700 text-2xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      24.5h
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-mono uppercase tracking-wider mb-1 ${darkMode ? 'text-white/35' : 'text-slate-400'}`}>
                      vs last week
                    </div>
                    <div className="font-display font-700 text-2xl text-emerald-400">
                      +18%
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
