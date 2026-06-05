import React from "react";

export default function CircularTimer({ seconds, totalSeconds, running }) {
  const R = 88, C = 2 * Math.PI * R;
  const pct = totalSeconds > 0 ? seconds / totalSeconds : 1;
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  
  return (
    <div style={{ position: "relative", width: 210, height: 210, flexShrink: 0 }}>
      <svg viewBox="0 0 210 210" width="210" height="210">
        <circle cx="105" cy="105" r={R} fill="none"
          stroke="rgba(255,255,255,0.07)" strokeWidth="9" />
        <circle cx="105" cy="105" r={R} fill="none"
          stroke="#2dd4bf" strokeWidth="9"
          strokeDasharray={`${C * pct} ${C}`}
          strokeDashoffset={C * 0.25}
          strokeLinecap="round"
          style={{ transition: running ? "stroke-dasharray 1s linear" : "none" }} />
        <circle cx="105" cy={105 - R} r="5" fill="#2dd4bf" />
      </svg>
      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'DM Mono', monospace",
        fontSize: 44, fontWeight: 500, color: "#fff", letterSpacing: -2,
      }}>{mm}:{ss}</span>
    </div>
  );
}