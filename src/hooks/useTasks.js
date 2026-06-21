import { useState, useEffect } from "react";
import { taskService } from "../services/taskService";

export default function useTasks() {
  const [queue, setQueue] = useState([]);
  const [completedToday, setCompletedToday] = useState([]);
  const [activeTask, setActiveTask] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);

      const { data } = await taskService.getTasks();

      setQueue(data.queue);
      setCompletedToday(data.completed_today);

      const active = data.queue.find(
        (task) => task.status === "active"
      );

      setActiveTask(active || null);

      setError(null);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (
    title,
    estimatedMinutes,
    startNow = false
  ) => {
    await taskService.createTask({
      title,
      estimated_minutes: estimatedMinutes,
      start_now: startNow,
    });

    await loadTasks();
  };

  const startTask = async (taskId) => {
    await taskService.startTask(taskId);
    await loadTasks();
  };

  const pauseTask = async (taskId) => {
    await taskService.pauseTask(taskId);
    await loadTasks();
  };

  const completeTask = async (
    taskId,
    actualMinutes = 0
  ) => {
    await taskService.completeTask(
      taskId,
      actualMinutes
    );

    await loadTasks();
  };

  const deleteTask = async (taskId) => {
    await taskService.deleteTask(taskId);
    await loadTasks();
  };

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
  };
}