import { useState } from 'react'
import { motion } from 'framer-motion'
import SettingsSection from '../components/settings/SettingsSection'
import FocusIntensity from '../components/settings/FocusIntensity'
import ResetButton from '../components/settings/ResetButton'

export default function Settings({ darkMode }) {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [autoBreaks, setAutoBreaks] = useState(true)
  const [longBreakReminder, setLongBreakReminder] = useState(true)
  const [focusIntensity, setFocusIntensity] = useState('deep')

  return (
    <div className={`min-h-screen px-6 py-10 ${
      darkMode ? 'bg-obsidian-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-sm opacity-60">Customize your focus experience</p>
      </motion.div>

      {/* Focus Intensity */}
      <FocusIntensity
        darkMode={darkMode}
        focusIntensity={focusIntensity}
        setFocusIntensity={setFocusIntensity}
      />

      {/* Toggles */}
      <div className="mt-8 space-y-6">

        <SettingsSection
          darkMode={darkMode}
          title="Audio"
          items={[
            {
              label: 'Ambient Sound',
              desc: 'Soft background noise for focus',
              value: soundEnabled,
              onChange: setSoundEnabled,
              color: '#4f9cf9'
            },
            {
              label: 'Timer Notifications',
              desc: 'Alert when session ends',
              value: notificationsEnabled,
              onChange: setNotificationsEnabled,
              color: '#7c6af7'
            }
          ]}
        />

        <SettingsSection
          darkMode={darkMode}
          title="Session"
          items={[
            {
              label: 'Auto-start Breaks',
              desc: 'Start break automatically after focus',
              value: autoBreaks,
              onChange: setAutoBreaks,
              color: '#2dd4bf'
            },
            {
              label: 'Long Break Reminder',
              desc: 'Reminder after 4 sessions',
              value: longBreakReminder,
              onChange: setLongBreakReminder,
              color: '#f59e0b'
            }
          ]}
        />

      </div>

      {/* Reset */}
      <ResetButton darkMode={darkMode} />
    </div>
  )
}