import { motion } from 'framer-motion'

function Toggle({ enabled, onChange, color = '#7c6af7', darkMode }) {
  return (
    <motion.button
      onClick={() => onChange(!enabled)}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
        enabled ? '' : darkMode ? 'bg-white/10' : 'bg-slate-200'
      }`}
      style={enabled ? { background: color } : {}}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md"
        animate={{ x: enabled ? 24 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      />
    </motion.button>
  )
}

function IntensityBtn({ label, desc, active, onClick, color, darkMode }) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex-1 p-4 rounded-2xl border text-left transition-all duration-200 ${
        active
          ? darkMode
            ? 'border-aurora-indigo/50 bg-aurora-indigo/10'
            : 'border-blue-300 bg-blue-50'
          : darkMode
            ? 'border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06]'
            : 'border-slate-200 bg-white hover:bg-slate-50'
      }`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`w-2 h-2 rounded-full mb-3 ${active ? '' : 'opacity-30'}`}
        style={{ background: active ? color : '#888' }} />
      <div className={`font-display font-600 text-sm mb-0.5 ${
        active
          ? darkMode ? 'text-white' : 'text-slate-900'
          : darkMode ? 'text-white/50' : 'text-slate-500'
      }`}>
        {label}
      </div>
      <div className={`text-xs ${active ? darkMode ? 'text-white/50' : 'text-slate-500' : darkMode ? 'text-white/25' : 'text-slate-400'}`}>
        {desc}
      </div>
    </motion.button>
  )
}

const INTENSITIES = [
  { key: 'light', label: 'Light', desc: '15 min sessions', color: '#2dd4bf' },
  { key: 'deep',  label: 'Deep',  desc: '25 min sessions', color: '#7c6af7' },
  { key: 'ultra', label: 'Ultra', desc: '50 min sessions', color: '#ef4444' },
]

export default function Settings({
  darkMode, setDarkMode,
  soundEnabled, setSoundEnabled,
  focusIntensity, setFocusIntensity,
}) {
  const settings = [
    {
      group: 'Appearance',
      items: [
        {
          label: 'Dark Mode',
          desc: 'Easier on the eyes for late-night sessions',
          value: darkMode,
          onChange: setDarkMode,
          color: '#7c6af7',
        },
      ],
    },
    {
      group: 'Audio',
      items: [
        {
          label: 'Ambient Sound',
          desc: 'Soft background noise to boost focus',
          value: soundEnabled,
          onChange: setSoundEnabled,
          color: '#4f9cf9',
        },
        {
          label: 'Timer Notifications',
          desc: 'Audio chime when a session ends',
          value: true,
          onChange: () => {},
          color: '#4f9cf9',
        },
      ],
    },
    {
      group: 'Session',
      items: [
        {
          label: 'Auto-start Breaks',
          desc: 'Automatically begin break timer after focus',
          value: false,
          onChange: () => {},
          color: '#2dd4bf',
        },
        {
          label: 'Long Break Reminder',
          desc: 'Prompt after every 4 focus sessions',
          value: true,
          onChange: () => {},
          color: '#2dd4bf',
        },
      ],
    },
  ]

  return (
    <section className="relative py-28 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="section-label mb-4">Preferences</div>
          <h2 className={`font-display font-700 leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Settings
          </h2>
        </motion.div>

        <div className="space-y-8">
          {/* Focus Intensity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`rounded-2xl border p-6 ${
              darkMode ? 'bg-white/[0.03] border-white/[0.07]' : 'bg-white border-slate-100'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`font-display font-600 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Focus Intensity
              </span>
            </div>
            <p className={`text-sm mb-5 ${darkMode ? 'text-white/35' : 'text-slate-400'}`}>
              Choose the session length that matches your energy level
            </p>
            <div className="flex gap-3">
              {INTENSITIES.map((item) => (
                <IntensityBtn
                  key={item.key}
                  label={item.label}
                  desc={item.desc}
                  color={item.color}
                  active={focusIntensity === item.key}
                  onClick={() => setFocusIntensity(item.key)}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </motion.div>

          {/* Toggle groups */}
          {settings.map((group, gi) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.07 }}
              className={`rounded-2xl border overflow-hidden ${
                darkMode ? 'bg-white/[0.03] border-white/[0.07]' : 'bg-white border-slate-100'
              }`}
            >
              <div className={`px-6 py-4 border-b ${darkMode ? 'border-white/[0.05]' : 'border-slate-50'}`}>
                <span className="section-label">{group.group}</span>
              </div>

              <div className="divide-y divide-white/[0.04]">
                {group.items.map((item, ii) => (
                  <motion.div
                    key={item.label}
                    className={`flex items-center justify-between px-6 py-5 transition-all ${
                      darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/50'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: ii * 0.05 }}
                  >
                    <div>
                      <div className={`font-display font-500 text-sm mb-0.5 ${darkMode ? 'text-white/80' : 'text-slate-800'}`}>
                        {item.label}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-white/30' : 'text-slate-400'}`}>
                        {item.desc}
                      </div>
                    </div>
                    <Toggle
                      enabled={item.value}
                      onChange={item.onChange}
                      color={item.color}
                      darkMode={darkMode}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Reset button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center pt-2"
          >
            <motion.button
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-display font-medium border transition-all ${
                darkMode
                  ? 'border-white/[0.08] text-white/30 hover:text-white/60 hover:border-white/[0.15]'
                  : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300'
              }`}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M1 4v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3.51 15a9 9 0 102.13-9.36L1 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Reset to defaults
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
