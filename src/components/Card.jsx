import { motion } from 'framer-motion'

export default function Card({ children, className = '', darkMode, hover = true, glow = false }) {
  return (
    <motion.div
      className={`rounded-2xl border transition-all duration-500 ${
        darkMode
          ? 'bg-white/[0.035] border-white/[0.07] hover:border-white/[0.12]'
          : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md'
      } ${hover ? 'card-hover' : ''} ${className}`}
      whileHover={hover ? {
        y: -4,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
      } : {}}
    >
      {glow && (
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top, rgba(124,106,247,0.08), transparent 70%)' }}
        />
      )}
      {children}
    </motion.div>
  )
}
