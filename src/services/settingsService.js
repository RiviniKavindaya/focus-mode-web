// src/services/settingsService.js
import api from "../lib/api";

export const settingsService = {
  getSettings() {
    return api.get("/settings");
  },

  saveSettings(payload) {
    return api.post("/settings", payload);
  },

  resetSettings() {
    return api.post("/settings/reset");
  },
};