import React from "react";

export default function CircularTimer({ seconds, totalSeconds, running }) {
  const R = 88;
  const C = 2 * Math.PI * R; // 552.92
  
  // Calculate running percentage
  const pct = totalSeconds > 0 ? seconds / totalSeconds : 1;
  
  // Calculate text numbers
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  
  // Convert percentage directly to degrees for the tracking node dot
  const currentAngle = (1 - pct) * 360;

  return (
    <div style={{ position: "relative", width: 210, height: 210, flexShrink: 0 }}>
      <svg viewBox="0 0 210 210" width="210" height="210">
        {/* BACKGROUND TRACK */}
        <circle 
          cx="105" 
          cy="105" 
          r={R} 
          fill="none"
          stroke="rgba(255,255,255,0.07)" 
          strokeWidth="9" 
        />
        
        {/* ACTIVE COUNTDOWN ARC */}
        <circle 
          cx="105" 
          cy="105" 
          r={R} 
          fill="none"
          stroke="#2dd4bf" 
          strokeWidth="9"
          strokeDasharray={`${C * pct} ${C}`}
          transform="rotate(-90 105 105)" // Starts the timer stroke cleanly at 12 o'clock
          strokeLinecap="round"
          style={{ 
            transition: running ? "stroke-dasharray 1s linear" : "none" 
          }} 
        />
        
        {/* FOLLOWING TIP DOT */}
        <circle 
          cx="105" 
          cy={105 - R} 
          r="5" 
          fill="#2dd4bf" 
          style={{
            transformOrigin: "105px 105px",
            transform: `rotate(${-currentAngle}deg)`, // Rotates the dot in perfect sync with the arc tip
            transition: running ? "transform 1s linear" : "none"
          }}
        />
      </svg>

      {/* CLOCK TEXT OVERLAY */}
      <span style={{
        position: "absolute", 
        inset: 0,
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        fontFamily: "'DM Mono', monospace",
        fontSize: 44, 
        fontWeight: 500, 
        color: "#fff", 
        letterSpacing: "-2px",
      }}>
        {mm}:{ss}
      </span>
    </div>
  );
}