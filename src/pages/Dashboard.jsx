import { useState, useRef, useEffect } from "react";

// =========================
// HOOKS
// =========================
import useTasks from "../hooks/useTasks";
import useSettings from "../hooks/useSettings";

// =========================
// COMPONENTS
// =========================
import TaskOverlay from "../components/dashboard/TaskOverlay";
import TaskSwitchModal from "../components/dashboard/TaskSwitchModal";
import SettingsModal from "../components/dashboard/SettingsModal";
import FocusSessionCard from "../components/dashboard/FocusSessionCard";
import ActiveTaskCard from "../components/dashboard/ActiveTaskCard";
import AmbientSoundCard from "../components/dashboard/AmbientSoundCard";
import ProgressCard from "../components/dashboard/ProgressCard";
import TaskQueueCard from "../components/dashboard/TaskQueueCard";
import CompletedTodayCard from "../components/dashboard/CompletedTodayCard";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import SprintCompleteModal from "../components/dashboard/SprintCompleteModal";

// =========================
// STYLES
// =========================
import { globalStyles } from "../styles/dashboardStyles";

export default function Dashboard() {

  // =========================
  // TASK DATA (BACKEND)
  // =========================
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
    completeSprint,
  } = useTasks();

  // =========================
  // USER SETTINGS
  // =========================
  const { settings, loading: settingsLoading } = useSettings();

  // =========================
  // TIMER STATE (UI ONLY)
  // =========================
  const [timerSecs, setTimerSecs] = useState(0);
  const [totalSecs, setTotalSecs] = useState(0);
  const [running, setRunning] = useState(false);

  // =========================
  // UI STATE
  // =========================
  const [sound, setSound] = useState("none");
  const [volume, setVolume] = useState(60);

  const [overlay, setOverlay] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [showSprintModal, setShowSprintModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [pendingNewTask, setPendingNewTask] = useState(null);
  const [prevTaskId, setPrevTaskId] = useState(null);

  // =========================
  // TIMER REF (AVOID MEMORY LEAKS)
  // =========================
  const intervalRef = useRef(null);

  // =========================================================
  // CLOSE OVERLAY WHEN TASK BECOMES ACTIVE
  // =========================================================
  useEffect(() => {
    if (activeTask && overlay) {
      setOverlay(false);
    }

    setPrevTaskId(activeTask?.id || null);
  }, [activeTask]);

  // =========================================================
  // SYNC ACTIVE TASK WITH TIMER
  // (backend is source of truth)
  // =========================================================
  useEffect(() => {
    if (!activeTask) {
      setTimerSecs(0);
      setTotalSecs(0);
      setRunning(false);
      return;
    }

    const sprintDuration =
      (activeTask.sprint_duration_minutes || 25) * 60;

    setTotalSecs(sprintDuration);

    const current =
      activeTask.current_sprint_seconds > 0
        ? activeTask.current_sprint_seconds
        : sprintDuration;

    setTimerSecs(current);

    setRunning(activeTask.status === "active");
  }, [activeTask?.id]);

  // =========================================================
  // TIMER ENGINE (SAFE + NO DOUBLE EXECUTION)
  // =========================================================
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

          // IMPORTANT: defer backend call safely
          setTimeout(() => {
            handleSprintComplete();
          }, 0);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [running, activeTask]);

  // =========================================================
  // SPRINT COMPLETION HANDLER (CRITICAL FIX)
  // =========================================================
  const handleSprintComplete = async () => {
    if (!activeTask) return;

    try {
      // 1. Tell backend sprint ended
      await completeSprint(activeTask.id);

      // 2. Refresh tasks from backend
      await loadTasks();

      // 3. Open modal AFTER sync
      setShowSprintModal(true);

    } catch (err) {
      console.error("Sprint completion failed:", err);
    }
  };

  // =========================================================
  // MODAL ACTIONS (SPRINT FLOW)
  // =========================================================

  const handleStartNextSprint = async () => {
    setShowSprintModal(false);
    await startTask(activeTask.id);
  };

  const handlePauseAfterSprint = async () => {
    setShowSprintModal(false);
    await pauseTask(activeTask.id);
  };

  const handleCompleteEarly = async () => {
    setShowSprintModal(false);
    await completeTask(activeTask.id, {
      was_sprint_finished: false,
    });
  };

  // =========================================================
  // SETTINGS SYNC
  // =========================================================
  useEffect(() => {
    if (!settingsLoading && settings) {
      setSound(settings.default_ambient_sound ?? "rain");
      setVolume(settings.default_ambient_volume ?? 60);
    }
  }, [settingsLoading, settings]);

  // =========================================================
  // SPRINT COUNT LOGIC
  // =========================================================
  const sprintCount = activeTask
    ? Math.ceil(
        activeTask.estimated_minutes /
          activeTask.sprint_duration_minutes
      )
    : 1;

  // =========================================================
  // PLAY / PAUSE CONTROL
  // =========================================================
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

  // =========================================================
  // TASK ACTIONS (UNCHANGED SAFE LOGIC)
  // =========================================================

  const handleStartTask = async (task) => {
    await startTask(task.id);
  };

  const handleAddTask = async (data) => {
    await addTask(data.title, data.estimated_minutes, false);
    setOverlay(false);
  };

  const handleAddAndStart = async (data) => {
    if (activeTask && activeTask.status === "active") {
      setPendingNewTask(data);
      setShowSwitchModal(true);
      return;
    }

    await addTask(data.title, data.estimated_minutes, true);
  };

  const handleConfirmTaskSwitch = async () => {
    setShowSwitchModal(false);

    if (pendingNewTask) {
      await addTask(
        pendingNewTask.title,
        pendingNewTask.estimated_minutes,
        true
      );
      setPendingNewTask(null);
    }
  };

  const handleCancelTaskSwitch = () => {
    setShowSwitchModal(false);
    setPendingNewTask(null);
  };

  const handleEndSession = async () => {
    if (!activeTask) return;

    setRunning(false);

    await completeTask(activeTask.id, {
      was_sprint_finished: false,
    });

    await loadTasks();
  };

  const handleCompleteTask = async () => {
    if (!activeTask) return;

    setShowSprintModal(false);

    await completeTask(activeTask.id, {
      was_sprint_finished: true,
    });

    await loadTasks();
  };

  const handleResetTimer = () => {
    setRunning(false);
    setTimerSecs(totalSecs);
  };

  // =========================================================
  // UI RENDER
  // =========================================================
  return (
    <>
      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Global styles */}
      <style>{globalStyles}</style>

      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "#e2e8f0",
          minHeight: "100vh",
          padding: "20px 24px",
        }}
      >
        {/* HEADER */}
        <DashboardHeader
          onSettingsClick={() => setShowSettings(true)}
        />

        {/* LOADING / ERROR */}
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error.message}</p>}

        {/* MAIN GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: 20,
          }}
        >
          {/* LEFT SIDE */}
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

          {/* RIGHT SIDE */}
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

      {/* TASK OVERLAY */}
      {overlay && (
        <TaskOverlay
          onClose={() => setOverlay(false)}
          onAddQueue={handleAddTask}
          onAddStart={handleAddAndStart}
        />
      )}

      {/* SWITCH TASK MODAL */}
      {showSwitchModal && activeTask && (
        <TaskSwitchModal
          currentTask={activeTask.title}
          newTaskTitle={pendingNewTask?.title || ""}
          onConfirm={handleConfirmTaskSwitch}
          onCancel={handleCancelTaskSwitch}
        />
      )}

      {/* SPRINT COMPLETE MODAL */}
      {showSprintModal && activeTask && (
        <SprintCompleteModal
          activeTask={activeTask}
          sprintCount={sprintCount}
          onStartNext={handleStartNextSprint}
          onPause={handlePauseAfterSprint}
          onCompleteTask={handleEndSession}
        />
      )}

      {/* SETTINGS MODAL */}
      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </>
  );
}