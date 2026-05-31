import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../lib/api'
import ErrorAlert from '../components/ErrorAlert'

export default function Register({ darkMode }) {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async () => {
    setLoading(true)
    setError('')

    // basic frontend validation
    if (password !== passwordConfirm) {
      setError("Passwords don't match")
      setLoading(false)
      return
    }

    try {
      const res = await api.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirm
      })

      localStorage.setItem('token', res.data.access_token)
      localStorage.setItem('user', JSON.stringify(res.data.user))

      navigate('/dashboard')

    } catch (err) {
      console.log('REGISTER ERROR:', err)

      if (err.response) {
        setError(err.response.data?.message || 'Registration failed')
      } else if (err.request) {
        setError('Server not responding. Try again later.')
      } else {
        setError('Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`flex items-center justify-center min-h-screen px-6 ${
      darkMode ? 'bg-obsidian-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>

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
        <h1 className="mb-2 text-3xl font-bold">Create account</h1>
        <p className={`text-sm mb-6 ${
          darkMode ? 'text-white/60' : 'text-slate-500'
        }`}>
          Start your focus journey today
        </p>

        {/* Name */}
        <input
          placeholder="Full name"
          className={`w-full p-3 mb-3 rounded-xl border outline-none ${
            darkMode
              ? 'bg-white/5 border-white/10 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          placeholder="Email address"
          className={`w-full p-3 mb-3 rounded-xl border outline-none ${
            darkMode
              ? 'bg-white/5 border-white/10 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className={`w-full p-3 mb-3 rounded-xl border outline-none ${
            darkMode
              ? 'bg-white/5 border-white/10 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm password"
          className={`w-full p-3 mb-5 rounded-xl border outline-none ${
            darkMode
              ? 'bg-white/5 border-white/10 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full py-3 font-semibold text-white rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-[1.02] transition disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        {/* Error */}
        <ErrorAlert message={error} />

        {/* Back */}
        <button
          onClick={() => navigate('/login')}
          className="w-full mt-5 text-sm opacity-60 hover:opacity-100"
        >
          ← Back to Login
        </button>

      </motion.div>
    </div>
  )
}