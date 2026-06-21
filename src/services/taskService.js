import api from "../lib/api";

export const taskService = {
  getTasks() {
    return api.get("/tasks");
  },

  createTask(payload) {
    return api.post("/tasks", payload);
  },

  startTask(taskId) {
    return api.post(`/tasks/${taskId}/start`);
  },

  pauseTask(taskId) {
    return api.post(`/tasks/${taskId}/pause`);
  },

  completeTask(taskId, actualMinutes = 0) {
    return api.post(`/tasks/${taskId}/complete`, {
      actual_minutes: actualMinutes,
    });
  },

  deleteTask(taskId) {
    return api.delete(`/tasks/${taskId}`);
  },
};