import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../../lib/api'

export default function AppSidebar({ darkMode, onClose }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await api.post('/logout')

      localStorage.removeItem('token')
      localStorage.removeItem('user')

      navigate('/login')
    } catch (err) {
      console.log('Logout error:', err)

      // fallback logout even if API fails
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/login')
    }
  }

  const Item = ({ to, label, icon }) => {
    const active = location.pathname === to

    return (
      <Link to={to} onClick={onClose}>
        <motion.div
          whileHover={{ x: 3 }}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
            active
              ? darkMode
                ? 'bg-white/10 text-white'
                : 'bg-slate-200 text-slate-900'
              : darkMode
                ? 'text-white/60 hover:text-white hover:bg-white/5'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span className="text-lg">{icon}</span>
          {label}
        </motion.div>
      </Link>
    )
  }

  return (
    <div
      className={`w-64 h-screen flex flex-col border-r p-5 ${
        darkMode
          ? 'border-white/10 bg-obsidian-950 text-white'
          : 'border-slate-200 bg-white text-slate-900'
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold">FocusApp</h1>
          <p className="text-xs opacity-50">Productivity dashboard</p>
        </div>

        {/* Close button (mobile only) */}
        <button
          onClick={onClose}
          className="text-xl opacity-60 lg:hidden"
        >
          ✕
        </button>
      </div>

      {/* NAV LINKS */}
      <div className="flex-1 space-y-2">
        <Item to="/dashboard" label="Dashboard" icon="📊" />
        <Item to="/settings" label="Settings" icon="⚙️" />
      </div>

      {/* LOGOUT */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleLogout}
        className={`mt-6 w-full px-4 py-3 rounded-xl text-sm font-medium transition ${
          darkMode
            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
            : 'bg-red-50 text-red-500 hover:bg-red-100'
        }`}
      >
        🚪 Logout
      </motion.button>
    </div>
  )
}