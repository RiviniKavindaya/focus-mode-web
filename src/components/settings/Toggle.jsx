import { motion } from 'framer-motion'

export default function Toggle({ enabled, onChange, color, darkMode }) {
  return (
    <motion.button
      onClick={() => onChange(!enabled)}
      className={`w-11 h-6 rounded-full relative transition ${
        enabled ? '' : darkMode ? 'bg-white/10' : 'bg-slate-200'
      }`}
      style={enabled ? { background: color } : {}}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow"
        animate={{ x: enabled ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </motion.button>
  )
}