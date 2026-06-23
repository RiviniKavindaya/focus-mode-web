import { useState, useRef, useEffect } from "react";

// Hook
import useTasks from "../hooks/useTasks";

// Components
import TaskOverlay from "../components/dashboard/TaskOverlay";
import TaskSwitchModal from "../components/dashboard/TaskSwitchModal";
import FocusSessionCard from "../components/dashboard/FocusSessionCard";
import ActiveTaskCard from "../components/dashboard/ActiveTaskCard";
import AmbientSoundCard from "../components/dashboard/AmbientSoundCard";
import ProgressCard from "../components/dashboard/ProgressCard";
import TaskQueueCard from "../components/dashboard/TaskQueueCard";
import CompletedTodayCard from "../components/dashboard/CompletedTodayCard";
import DashboardHeader from "../components/dashboard/DashboardHeader";

// Styles
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

  const [timerSecs, setTimerSecs] = useState(0);
  const [totalSecs, setTotalSecs] = useState(0);
  const [running, setRunning] = useState(false);

  const [sound, setSound] = useState("rain");
  const [volume, setVolume] = useState(60);
  const [overlay, setOverlay] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [pendingNewTask, setPendingNewTask] = useState(null);
  const [prevTaskId, setPrevTaskId] = useState(null);

  const intervalRef = useRef(null);

  // Auto-close overlay when active task starts
  useEffect(() => {
    if (activeTask && overlay) {
      setOverlay(false);
    }
    
    // Track if task switched (task ID changed)
    if (activeTask?.id && prevTaskId && activeTask.id !== prevTaskId) {
      // Task was switched - this is expected
    }
    setPrevTaskId(activeTask?.id || null);
  }, [activeTask]);

  // =========================
  // SYNC WITH BACKEND TASK
  // =========================
  useEffect(() => {
    if (activeTask) {
      const sprintDuration = (activeTask.sprint_duration_minutes || 25) * 60;
      setTotalSecs(sprintDuration);
      
      // If current_sprint_seconds is 0 (fresh sprint), start with full duration
      // Otherwise use the current progress
      const timerValue = activeTask.current_sprint_seconds > 0 
        ? activeTask.current_sprint_seconds 
        : sprintDuration;
      
      setTimerSecs(timerValue);
      setRunning(activeTask.status === "active");
    } else {
      setTimerSecs(0);
      setTotalSecs(0);
      setRunning(false);
    }
  }, [activeTask]);

  // =========================
  // TIMER ENGINE
  // =========================
  useEffect(() => {
    if (!running || !activeTask) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimerSecs((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);

          pauseTask(activeTask.id);
          alert("Sprint completed! You can now review and complete the task.");

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [running, activeTask, pauseTask]);

  // =========================
  // SPRINT COUNT (FROM BACKEND)
  // =========================
  const sprintCount = activeTask
    ? Math.ceil(activeTask.estimated_minutes / activeTask.sprint_duration_minutes)
    : 1;

  // =========================
  // PLAY / PAUSE (BACKEND SYNC)
  // =========================
  const handleTogglePlayPause = async () => {
    if (!activeTask) return;

    if (running) {
      setRunning(false);
      await pauseTask(activeTask.id);
    } else {
      setRunning(true);
      await startTask(activeTask.id);
    }
  };

  // =========================
  // START TASK
  // =========================
  const handleStartTask = async (task) => {
    await startTask(task.id);
  };

  // =========================
  // ADD TASK
  // =========================
  const handleAddTask = async (data) => {
    await addTask(data.title, data.estimated_minutes, false);
    setOverlay(false);
  };

  const handleAddAndStart = async (data) => {
    // If there's an active task, show modal instead of browser confirm
    if (activeTask && activeTask.status === "active") {
      setPendingNewTask(data);
      setShowSwitchModal(true);
      return;
    }
    
    // No active task, create and start normally
    await addTask(data.title, data.estimated_minutes, true);
  };

  const handleConfirmTaskSwitch = async () => {
    setShowSwitchModal(false);
    if (pendingNewTask) {
      await addTask(pendingNewTask.title, pendingNewTask.estimated_minutes, true);
      setPendingNewTask(null);
    }
  };

  const handleCancelTaskSwitch = () => {
    setShowSwitchModal(false);
    setPendingNewTask(null);
  };

  // =========================
  // END SESSION (IMPORTANT FIX)
  // =========================
  const handleEndSession = async () => {
    if (!activeTask) return;

    setRunning(false);
    await completeTask(activeTask.id, {
      was_sprint_finished: false,
    });

    await loadTasks();
  };

  // =========================
  // RESET TIMER ONLY
  // =========================
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
        }}
      >
        <DashboardHeader />

        {loading && <p>Loading...</p>}
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
              setRunning={handleTogglePlayPause}
              onReset={handleResetTimer}
            />

            <ActiveTaskCard
              activeTask={activeTask}
              running={running}
              sprintCount={sprintCount}
              setRunning={handleTogglePlayPause}
              onEndSession={handleEndSession}
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

      {showSwitchModal && activeTask && (
        <TaskSwitchModal
          currentTask={activeTask.title}
          newTaskTitle={pendingNewTask?.title || ""}
          onConfirm={handleConfirmTaskSwitch}
          onCancel={handleCancelTaskSwitch}
        />
      )}
    </>
  );
}