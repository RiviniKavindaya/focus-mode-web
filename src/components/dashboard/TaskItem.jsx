export default function TaskItem({ task, darkMode, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`p-4 rounded-xl cursor-pointer border transition ${
        darkMode
          ? task.done ? 'bg-white/5 border-white/10' : 'bg-white/10 hover:bg-white/15 border-white/10'
          : task.done ? 'bg-slate-100 border-slate-200' : 'bg-white hover:bg-slate-50 border-slate-200'
      }`}
    >

      {/* top row */}
      <div className="flex justify-between">
        <p className={task.done ? 'line-through opacity-50' : ''}>
          {task.label}
        </p>

        <span className="text-xs opacity-50">
          {task.tag}
        </span>
      </div>

      {/* progress */}
      <div className="w-full h-1 mt-3 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
        <div
          className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ width: `${task.progress}%` }}
        />
      </div>
    </div>
  )
}