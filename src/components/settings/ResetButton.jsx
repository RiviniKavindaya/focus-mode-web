import { motion } from 'framer-motion'

export default function ResetButton({ darkMode }) {
  return (
    <div className="flex justify-center mt-10">
      <motion.button
        className={`px-5 py-2 text-sm rounded-xl border ${
          darkMode
            ? 'border-white/10 text-white/40 hover:text-white/70'
            : 'border-slate-200 text-slate-500 hover:text-slate-700'
        }`}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97 }}
      >
        Reset to defaults
      </motion.button>
    </div>
  )
}