import { motion } from 'framer-motion'

export default function BackgroundBlobs({ darkMode }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Primary blue orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '600px',
          height: '600px',
          top: '-15%',
          left: '-10%',
          background: darkMode
            ? 'radial-gradient(circle, rgba(79,156,249,0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(79,156,249,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, 30, -20, 10, 0],
          y: [0, -40, 20, -10, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Violet orb center-right */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '500px',
          height: '500px',
          top: '20%',
          right: '-5%',
          background: darkMode
            ? 'radial-gradient(circle, rgba(124,106,247,0.11) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(124,106,247,0.07) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, -40, 20, -15, 0],
          y: [0, 30, -50, 20, 0],
          scale: [1, 0.9, 1.15, 0.95, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Teal orb bottom */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '400px',
          height: '400px',
          bottom: '5%',
          left: '30%',
          background: darkMode
            ? 'radial-gradient(circle, rgba(45,212,191,0.09) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(45,212,191,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 50, -30, 20, 0],
          y: [0, -20, 40, -15, 0],
          scale: [1, 1.2, 0.85, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}
