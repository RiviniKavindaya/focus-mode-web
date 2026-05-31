import { useState } from 'react'
import StatCard from '../components/dashboard/StatCard'
import TaskItem from '../components/dashboard/TaskItem'
import ActivityChart from '../components/dashboard/ActivityChart'


export default function Dashboard({ darkMode }) {

  const [stats] = useState([
    { label: 'Focus Time Today', value: '4h 23m', change: '+12%' },
    { label: 'Sessions Done', value: '7', change: '+2' },
    { label: 'Streak', value: '14 days', change: 'Best' },
    { label: 'Deep Focus', value: '68%', change: 'Flow' },
  ])

  const [tasks, setTasks] = useState([
    { id: 1, label: 'Design system documentation', progress: 78, tag: 'Design', done: false },
    { id: 2, label: 'API integration review', progress: 45, tag: 'Engineering', done: false },
    { id: 3, label: 'Q4 strategy deck', progress: 100, tag: 'Strategy', done: true },
    { id: 4, label: 'User research synthesis', progress: 30, tag: 'Research', done: false },
  ])

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    )
  }

  return (
    <div className={`min-h-screen px-6 py-10 transition ${
      darkMode ? 'bg-obsidian-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-sm opacity-60">Overview of your productivity</p>
      </div>

      

      {/* STATS */}
      <div className="grid gap-4 mb-10 md:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={i} darkMode={darkMode} stat={s} />
        ))}
      </div>

      {/* MAIN */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* TASKS */}
        <div className="space-y-3 lg:col-span-2">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              darkMode={darkMode}
              onToggle={() => toggleTask(task.id)}
            />
          ))}
        </div>

        {/* ACTIVITY */}
        <ActivityChart darkMode={darkMode} tasks={tasks} />

      </div>
    </div>
  )
}