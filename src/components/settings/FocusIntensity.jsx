import { motion } from 'framer-motion'

const OPTIONS = [
  { key: 'light', label: 'Light', desc: '15 min', color: '#2dd4bf' },
  { key: 'deep', label: 'Deep', desc: '25 min', color: '#7c6af7' },
  { key: 'ultra', label: 'Ultra', desc: '50 min', color: '#ef4444' },
]

export default function FocusIntensity({
  darkMode,
  focusIntensity,
  setFocusIntensity
}) {
  return (
    <div className={`p-6 rounded-2xl border ${
      darkMode
        ? 'bg-white/[0.03] border-white/[0.07]'
        : 'bg-white border-slate-100'
    }`}>

      <h2 className="mb-1 font-semibold">Focus Intensity</h2>
      <p className="mb-4 text-xs opacity-50">
        Choose your session duration style
      </p>

      <div className="flex gap-3">
        {OPTIONS.map(opt => (
          <motion.button
            key={opt.key}
            onClick={() => setFocusIntensity(opt.key)}
            className={`flex-1 p-4 rounded-xl border text-left ${
              focusIntensity === opt.key
                ? darkMode
                  ? 'bg-white/10 border-white/20'
                  : 'bg-slate-100 border-slate-300'
                : darkMode
                  ? 'bg-white/[0.03] border-white/10'
                  : 'bg-white border-slate-200'
            }`}
            whileHover={{ y: -2 }}
          >
            <div
              className="w-2 h-2 mb-2 rounded-full"
              style={{ background: opt.color }}
            />
            <p className="text-sm font-medium">{opt.label}</p>
            <p className="text-xs opacity-50">{opt.desc}</p>
          </motion.button>
        ))}
      </div>
    </div>
  )
}