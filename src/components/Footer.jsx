import { motion } from 'framer-motion'

const links = {
  Product: ['Features', 'Timer', 'Dashboard', 'Analytics'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Support: ['Documentation', 'Status', 'Contact', 'Privacy'],
}

export default function Footer({ darkMode }) {
  return (
    <footer className={`relative border-t ${
      darkMode ? 'border-white/[0.06]' : 'border-slate-100'
    }`}>
      {/* Top fade */}
      <div className={`absolute top-0 left-0 right-0 h-px ${
        darkMode
          ? 'bg-gradient-to-r from-transparent via-aurora-indigo/30 to-transparent'
          : 'bg-gradient-to-r from-transparent via-slate-200 to-transparent'
      }`} />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <motion.div
              className="flex items-center gap-2.5 mb-4"
              whileHover={{ x: 2 }}
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #4f9cf9, #7c6af7)' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="3" fill="white"/>
                  <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1" strokeOpacity="0.4"/>
                </svg>
              </div>
              <span className={`font-display font-700 text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Zenith
              </span>
            </motion.div>
            <p className={`text-sm leading-relaxed mb-5 max-w-xs ${darkMode ? 'text-white/35' : 'text-slate-400'}`}>
              Your personal focus companion. Built for deep work, designed for the modern mind.
            </p>

            {/* Social links */}
            <div className="flex gap-2">
              {['twitter', 'github', 'linkedin'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono transition-all ${
                    darkMode
                      ? 'bg-white/[0.06] text-white/40 hover:bg-white/[0.1] hover:text-white/70'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                  }`}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social[0].toUpperCase()}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div className="section-label mb-4">{category}</div>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      className={`text-sm transition-all duration-200 ${
                        darkMode
                          ? 'text-white/35 hover:text-white/70'
                          : 'text-slate-400 hover:text-slate-700'
                      }`}
                      whileHover={{ x: 3 }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t ${
          darkMode ? 'border-white/[0.05]' : 'border-slate-100'
        }`}>
          <p className={`text-xs font-mono ${darkMode ? 'text-white/20' : 'text-slate-400'}`}>
            © {new Date().getFullYear()} Zenith. Crafted with focus and intention.
          </p>

          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className={`text-xs font-mono ${darkMode ? 'text-white/20' : 'text-slate-400'}`}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
