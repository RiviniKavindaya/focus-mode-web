const weekData = [65, 80, 45, 90, 70, 55, 88]
const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function ActivityChart({ darkMode }) {

  return (
    <div className={`p-6 rounded-xl border ${
      darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
    }`}>

      <h2 className="mb-4 text-lg font-semibold">Activity</h2>

      {/* bars */}
      <div className="flex items-end h-32 gap-2 mb-4">
        {weekData.map((val, i) => (
          <div key={i} className="flex-1">
            <div
              className="rounded bg-gradient-to-t from-blue-500 to-purple-500"
              style={{ height: `${val}%` }}
            />
          </div>
        ))}
      </div>

      {/* labels */}
      <div className="flex justify-between text-xs opacity-60">
        {days.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      {/* summary */}
      <div className="mt-5 space-y-1 text-sm opacity-70">
        <p>🔥 7-day streak active</p>
        <p>⚡ Strong focus consistency</p>
      </div>

    </div>
  )
}