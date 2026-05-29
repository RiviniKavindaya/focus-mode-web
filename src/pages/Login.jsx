import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Login({ darkMode }) {
  const navigate = useNavigate()

  return (
    <div className={`flex items-center justify-center min-h-screen px-6 ${
      darkMode ? 'bg-obsidian-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md p-8 rounded-2xl border backdrop-blur-xl ${
          darkMode
            ? 'bg-white/5 border-white/10'
            : 'bg-white border-slate-200'
        }`}
      >

        {/* Title */}
        <h1 className="mb-2 text-3xl font-bold">Welcome back</h1>
        <p className={`text-sm mb-6 ${
          darkMode ? 'text-white/60' : 'text-slate-500'
        }`}>
          Sign in to continue your focus journey
        </p>

        {/* Google Login */}
        <button
          className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl border font-medium transition ${
            darkMode
              ? 'border-white/10 bg-white/5 hover:bg-white/10'
              : 'border-slate-200 bg-white hover:bg-slate-50'
          }`}
        >
          {/* Google Icon */}
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.1-.1-2.2-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.3 0 10.1-2 13.7-5.2l-6.3-5.2C29.3 35.8 26.8 36 24 36c-5.3 0-9.8-3.5-11.4-8.3l-6.6 5.1C9.4 39.7 16.2 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.5 5.3-6.3 6.8l6.3 5.2C38.9 36.1 44 30.6 44 24c0-1.1-.1-2.2-.4-3.5z"/>
          </svg>

          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs opacity-50">OR</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Email input */}
        <input
          placeholder="Email address"
          className={`w-full p-3 mb-3 rounded-xl border outline-none ${
            darkMode
              ? 'bg-white/5 border-white/10 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          className={`w-full p-3 mb-5 rounded-xl border outline-none ${
            darkMode
              ? 'bg-white/5 border-white/10 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        />

        {/* Login button */}
        <button className="w-full py-3 font-semibold text-white rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-[1.02] transition">
          Sign In
        </button>

        {/* Back */}
        <button
          onClick={() => navigate('/')}
          className="w-full mt-5 text-sm opacity-60 hover:opacity-100"
        >
          ← Back to Home
        </button>

      </motion.div>
    </div>
  )
}