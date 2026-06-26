import { useState, useEffect } from "react";
import { taskService } from "../services/taskService";

export default function useTasks() {
  const [queue, setQueue] = useState([]);
  const [completedToday, setCompletedToday] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // FETCH & STATE MAPPER
  const loadTasks = async () => {
    try {
      setLoading(true);
      const { data } = await taskService.getTasks();

      setQueue(data.queue);
      
      // Transform completed tasks for proper UI display
      const formattedCompleted = data.completed_today.map(task => {
        const completedDate = new Date(task.completed_at);
        const timeStr = completedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        return {
          ...task,
          label: task.title,
          seg: task.completed_sprints,
          time: timeStr,
          dur: `${Math.round(task.actual_minutes)}m`,
        };
      });
      setCompletedToday(formattedCompleted);

      // Extract the singular active running task instance from the queue array
      const active = data.queue.find((task) => task.status === "active");
      setActiveTask(active || null);
      
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // ADD TASK
  const addTask = async (title, estimatedMinutes, startNow = false) => {
    await taskService.createTask({
      title,
      estimated_minutes: estimatedMinutes,
      start_now: startNow,
    });
    await loadTasks();
  };

  // START / RESUME TASK
  const startTask = async (taskId) => {
    await taskService.startTask(taskId);
    await loadTasks();
  };

  // PAUSE TASK
  const pauseTask = async (taskId) => {
    await taskService.pauseTask(taskId);
    await loadTasks();
  };

  // COMPLETE / RECORD SPRINT TASK
  const completeTask = async (taskId, payload = { was_sprint_finished: false }) => {
    await taskService.completeTask(taskId, payload);
    await loadTasks();
  };

  // DELETE TASK
  const deleteTask = async (taskId) => {
    await taskService.deleteTask(taskId);
    await loadTasks();
  };

  // COMPLETE ONE SPRINT (NOT FULL TASK)
  const completeSprint = async (taskId) => {
    await taskService.completeSprint(taskId);
    await loadTasks();
  };

  

  // INITIAL LOAD RUNNER
  useEffect(() => {
    loadTasks();
  }, []);

  return {
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
    deleteTask,
    completeSprint,
  };
}