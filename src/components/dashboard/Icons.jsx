import React from "react";

export const Icon = ({ d, size = 16, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, ...style }}
  >
    <path d={d} />
  </svg>
);

export const IC = {
  clock:   "M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z M12 6v6l4 2",
  play:    "M5 3l14 9-14 9V3z",
  pause:   "M6 4h4v16H6z M14 4h4v16h-4z",
  check:   "M20 6L9 17l-5-5",
  plus:    "M12 5v14M5 12h14",
  more:    "M12 5h.01M12 12h.01M12 19h.01",
  refresh: "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0 1 14.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
  rain:    "M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25 M8 19v1m4-2v2m4-1v1",
  birds:   "M23 7l-7 5 7 5V7z M1 7l7 5-7 5V7z M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z",
  noise:   "M9 18V5l12-2v13 M6 15H3a3 3 0 0 0 0 6h1a3 3 0 0 0 3-3v-4z M18 13h-3a3 3 0 0 0 0 6h1a3 3 0 0 0 3-3v-4z",
  lofi:    "M3 18v-6a9 9 0 0 1 18 0v6 M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z",
  none:    "M1 1l22 22 M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6 M17 16H7a4 4 0 0 1-1.94-7.5",
  alert:   "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05l-8.47-14.14a2 2 0 0 0-3.42 0l-1-1.68z M12 9v6 M12 19h.01",
};