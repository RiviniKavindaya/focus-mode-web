export const SPRINT = 25 * 60;

export const INIT_QUEUE = [
  { id: 1, label: "Design UI for settings page", mins: 30, done: false, active: false },
  { id: 2, label: "Write unit tests for new API", mins: 45, done: false, active: false },
  { id: 3, label: "Clean up database settings", mins: 15, done: false, active: false },
  { id: 4, label: "Implement User Authentication API", mins: 45, done: false, active: true, sessions: "Session #1 (Active)\nSessions #2-4 (Queued)" },
  { id: 5, label: "Refactor Email Service", mins: 120, done: false, active: false, sessions: "Session #1 (Active)\nSessions #2-4 (Queued)" },
];

export const COMPLETED = [
  { label: "Review database schema", time: "9:00 AM – 9:30 AM", dur: "30m" },
  { label: "Team sync meeting", time: "10:00 AM – 10:45 AM", dur: "45m" },
  { label: "Design UI for settings page", time: "10:15 AM – 10:45 AM", dur: "30m", seg: "Segment 1/1" },
  { label: "Refactor Email Service", time: "Total Work: 10:00 AM – 12:00 PM", dur: "2h" },
];

export const SOUNDS = [
  { id: "none",  label: "None",         icon: "none"  },
  { id: "rain",  label: "Deep Rain",    icon: "rain"  },
  { id: "birds", label: "Forest Birds", icon: "birds" },
  { id: "noise", label: "White Noise",  icon: "noise" },
  { id: "lofi",  label: "Lo-Fi Beats",  icon: "lofi"  },
];