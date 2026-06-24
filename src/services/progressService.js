import api from "../lib/api";

export const progressService = {
  getProgress() {
    return api.get("/progress");
  },
};