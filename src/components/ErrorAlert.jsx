import { motion } from 'framer-motion'

export default function ErrorAlert({ message }) {
  if (!message) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 px-4 py-3 mt-4 text-sm text-red-400 border rounded-xl border-red-500/20 bg-red-500/10 backdrop-blur-md"
    >
      {/* icon */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 9v4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 17h.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M10.29 3.86l-8.3 14.42A2 2 0 0 0 3.7 21h16.6a2 2 0 0 0 1.7-3.72L13.71 3.86a2 2 0 0 0-3.42 0z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      <span>{message}</span>
    </motion.div>
  )
}