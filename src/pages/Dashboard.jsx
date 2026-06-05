import { useState, useEffect, useRef } from "react";


// Sub-components
import TaskOverlay from "../components/dashboard/TaskOverlay";
import FocusSessionCard from "../components/dashboard/FocusSessionCard";
import ActiveTaskCard from "../components/dashboard/ActiveTaskCard";
import AmbientSoundCard from "../components/dashboard/AmbientSoundCard";
import ProgressCard from "../components/dashboard/ProgressCard";
import TaskQueueCard from "../components/dashboard/TaskQueueCard";
import CompletedTodayCard from "../components/dashboard/CompletedTodayCard";
import DashboardHeader from "../components/dashboard/DashboardHeader";

// Constants & Styles
import { INIT_QUEUE, COMPLETED, SPRINT } from "../constants/dashboardConstants";
import { globalStyles } from "../styles/dashboardStyles";

export default function Dashboard({ darkMode }) {
  const [queue, setQueue] = useState(INIT_QUEUE);
  const [activeTask, setActive] = useState(INIT_QUEUE.find((t) => t.active));
  const [timerSecs, setTimer] = useState(SPRINT);
  const [totalSecs, setTotal] = useState(SPRINT);
  const [running, setRunning] = useState(false);
  const [sound, setSound] = useState("rain");
  const [volume, setVolume] = useState(62);
  const [overlay, setOverlay] = useState(false);
  const iv = useRef(null);

  useEffect(() => {
    if (running) {
      iv.current = setInterval(() => {
        setTimer((s) => {
          if (s <= 1) {
            clearInterval(iv.current);
            setRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else clearInterval(iv.current);
    return () => clearInterval(iv.current);
  }, [running]);

  const sprintCount = activeTask ? Math.ceil(activeTask.mins / 25) : 1;

  function startTask(task) {
    setQueue((q) => q.map((t) => ({ ...t, active: t.id === task.id })));
    setActive(task);
    const s = Math.min(task.mins, 25) * 60;
    setTimer(s);
    setTotal(s);
    setRunning(true);
  }

  function addToQueue(data) {
    setQueue((q) => [
      ...q,
      { id: Date.now(), label: data.label, mins: data.mins, done: false, active: false },
    ]);
  }

  function addAndStart(data) {
    const t = { id: Date.now(), label: data.label, mins: data.mins, done: false, active: true };
    setQueue((q) => [...q.map((x) => ({ ...x, active: false })), t]);
    setActive(t);
    const s = Math.min(data.mins, 25) * 60;
    setTimer(s);
    setTotal(s);
    setRunning(true);
  }

  function handleResetTimer() {
    setRunning(false);
    setTimer(totalSecs);
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{globalStyles}</style>

      <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0", minHeight: "100vh", padding: "20px 24px 32px", boxSizing: "border-box" }}>
        
        <DashboardHeader />

        {/* Main Grid Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 20 }}>
          
          {/* LEFT COLUMN */}
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

          {/* RIGHT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <ProgressCard />
            <TaskQueueCard 
              queue={queue}
              setQueue={setQueue}
              startTask={startTask}
              onAddClick={() => setOverlay(true)}
            />
            <CompletedTodayCard completedList={COMPLETED} />
          </div>

        </div>
      </div>

      {overlay && (
        <TaskOverlay
          onClose={() => setOverlay(false)}
          onAddQueue={addToQueue}
          onAddStart={addAndStart}
        />
      )}
    </>
  );
}