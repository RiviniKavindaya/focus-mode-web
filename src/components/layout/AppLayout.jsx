import { useState } from 'react'
import AppSidebar from './AppSidebar'

export default function AppLayout({ children, darkMode }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        darkMode
          ? 'bg-obsidian-950 text-white'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50
          transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <AppSidebar
          darkMode={darkMode}
          onClose={() => setOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-auto lg:ml-64">
        <div className="p-6">
          {/* Mobile top bar */}
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <button
              onClick={() => setOpen(true)}
              className={`px-3 py-2 rounded-lg ${
                darkMode ? 'bg-white/10' : 'bg-slate-200'
              }`}
            >
              ☰
            </button>

            <h2 className="font-bold">FocusApp</h2>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}