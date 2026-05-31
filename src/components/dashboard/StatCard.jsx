export default function StatCard({ stat, darkMode }) {
  return (
    <div className={`p-5 rounded-xl border transition ${
      darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
    }`}>

      <p className="text-sm opacity-60">{stat.label}</p>

      <h2 className="mt-1 text-2xl font-bold">{stat.value}</h2>

      <span className="text-xs opacity-60">
        {stat.change}
      </span>
    </div>
  )
}