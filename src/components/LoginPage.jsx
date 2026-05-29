import { motion } from 'framer-motion'
import { useState } from 'react'

export default function LoginPage({ darkMode, setIsLoggedIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // simple demo login (no backend)
    if (email && password) {
      setIsLoggedIn(true)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md p-8 rounded-2xl border backdrop-blur-xl ${
          darkMode
            ? 'bg-white/[0.05] border-white/10'
            : 'bg-white border-slate-200'
        }`}
      >
        {/* Title */}
        <h2 className="mb-2 text-2xl font-bold">Welcome Back</h2>
        <p className={`text-sm mb-6 ${darkMode ? 'text-white/60' : 'text-slate-500'}`}>
          Login to continue your focus dashboard
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-3 mb-3 rounded-xl outline-none border ${
            darkMode
              ? 'bg-black/30 border-white/10 text-white'
              : 'bg-white border-slate-200'
          }`}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full p-3 mb-5 rounded-xl outline-none border ${
            darkMode
              ? 'bg-black/30 border-white/10 text-white'
              : 'bg-white border-slate-200'
          }`}
        />

        {/* Login Button */}
        <motion.button
          onClick={handleLogin}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 font-semibold text-white rounded-xl bg-gradient-to-r from-aurora-blue to-aurora-indigo"
        >
          Login
        </motion.button>

        {/* Demo bypass */}
        <button
          onClick={() => setIsLoggedIn(true)}
          className={`w-full mt-3 text-sm ${
            darkMode ? 'text-white/60' : 'text-slate-500'
          }`}
        >
          Continue as Demo User
        </button>
      </motion.div>
    </div>
  )
}