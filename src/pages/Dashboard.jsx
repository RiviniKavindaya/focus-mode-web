import { useState, useRef, useEffect } from "react";

// Hook
import useTasks from "../hooks/useTasks";

// Components
import TaskOverlay from "../components/dashboard/TaskOverlay";
import FocusSessionCard from "../components/dashboard/FocusSessionCard";
import ActiveTaskCard from "../components/dashboard/ActiveTaskCard";
import AmbientSoundCard from "../components/dashboard/AmbientSoundCard";
import ProgressCard from "../components/dashboard/ProgressCard";
import TaskQueueCard from "../components/dashboard/TaskQueueCard";
import CompletedTodayCard from "../components/dashboard/CompletedTodayCard";
import DashboardHeader from "../components/dashboard/DashboardHeader";

// Constants & Styles
import { SPRINT } from "../constants/dashboardConstants";
import { globalStyles } from "../styles/dashboardStyles";

export default function Dashboard() {
  const {
    queue,
    completedToday,
    activeTask,
    loading,
    error,
    loadTasks,
    addTask,
    startTask,
    pauseTask,
    completeTask,
  } = useTasks();

  const [timerSecs, setTimerSecs] = useState(SPRINT);
  const [totalSecs, setTotalSecs] = useState(SPRINT);
  const [running, setRunning] = useState(false);

  const [sound, setSound] = useState("rain");
  const [volume, setVolume] = useState(60);
  const [overlay, setOverlay] = useState(false);

  const intervalRef = useRef(null);

  // TIMER LOGIC
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimerSecs((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  const sprintCount = activeTask ? Math.ceil(activeTask.estimated_minutes / 25) : 1;

  // START TASK (API)
  const handleStartTask = async (task) => {
    await startTask(task.id);

    const seconds = Math.min(task.estimated_minutes, 25) * 60;
    setTimerSecs(seconds);
    setTotalSecs(seconds);
    setRunning(true);
  };

  // ADD TASK (API)
  const handleAddTask = async (data) => {
    await addTask(data.title, data.estimated_minutes, false);
    await loadTasks();
  };

  // ADD + START TASK
  const handleAddAndStart = async (data) => {
    await addTask(data.title, data.estimated_minutes, true);
    await loadTasks();

    const refreshed = await useTasks().loadTasks;
    // optional: reload ensures activeTask is updated from backend
  };

  const handleResetTimer = () => {
    setRunning(false);
    setTimerSecs(totalSecs);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <style>{globalStyles}</style>

      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "#e2e8f0",
          minHeight: "100vh",
          padding: "20px 24px 32px",
          boxSizing: "border-box",
        }}
      >
        <DashboardHeader />

        {loading && <p>Loading tasks...</p>}
        {error && <p style={{ color: "red" }}>{error.message}</p>}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 20 }}>
          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <FocusSessionCard
              activeTask={activeTask}
              timerSecs={timerSecs}
              totalSecs={totalSecs}
              running={running}
              sprintCount={sprintCount}
              setRunning={setRunning}
              onReset={handleResetTimer}
            />

            <ActiveTaskCard
              activeTask={activeTask}
              running={running}
              sprintCount={sprintCount}
              setRunning={setRunning}
            />

            <AmbientSoundCard
              sound={sound}
              setSound={setSound}
              volume={volume}
              setVolume={setVolume}
            />
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <ProgressCard />

            <TaskQueueCard
              queue={queue}
              startTask={handleStartTask}
              onAddClick={() => setOverlay(true)}
            />

            <CompletedTodayCard completedList={completedToday} />
          </div>
        </div>
      </div>

      {overlay && (
        <TaskOverlay
          onClose={() => setOverlay(false)}
          onAddQueue={handleAddTask}
          onAddStart={handleAddAndStart}
        />
      )}
    </>
  );
}