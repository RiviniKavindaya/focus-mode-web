import Toggle from './Toggle'
import { motion } from 'framer-motion'

export default function SettingsSection({ title, items, darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-2xl border overflow-hidden ${
        darkMode
          ? 'bg-white/[0.03] border-white/[0.07]'
          : 'bg-white border-slate-100'
      }`}
    >
      {/* Header */}
      <div className={`px-6 py-4 border-b ${
        darkMode ? 'border-white/[0.05]' : 'border-slate-100'
      }`}>
        <h3 className="text-sm font-semibold opacity-70">{title}</h3>
      </div>

      {/* Items */}
      <div className="divide-y divide-white/5">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-6 py-5 ${
              darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50'
            }`}
          >
            <div>
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs opacity-50">{item.desc}</p>
            </div>

            <Toggle
              enabled={item.value}
              onChange={item.onChange}
              color={item.color}
              darkMode={darkMode}
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}