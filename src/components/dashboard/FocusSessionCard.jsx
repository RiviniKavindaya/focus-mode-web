import CircularTimer from "./CircularTimer";
import { Icon, IC } from "./Icons";
import { cardStyles, sectionTitleStyles } from "../../styles/dashboardStyles";

export default function FocusSessionCard({ activeTask, timerSecs, totalSecs, running, sprintCount, setRunning, onReset }) {
  return (
    <div style={cardStyles}>
      <div style={{ ...sectionTitleStyles, marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>Current Focus Session</span>
        <button className="ff-icon-btn" onClick={onReset} style={{
          background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 7,
          color: "rgba(255,255,255,0.4)", cursor: "pointer", padding: 6,
          display: "grid", placeItems: "center", transition: "all 0.15s",
        }}>
          <Icon d={IC.refresh} size={14} />
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <CircularTimer seconds={timerSecs} totalSeconds={totalSecs} running={running} />

        <div style={{ flex: 1 }}>
          {activeTask ? (
            <>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", marginBottom: 8 }}>
                Active Focus Target: <span style={{ color: "rgba(255,255,255,0.62)" }}>Explicit time estimator</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 4 }}>
                {activeTask.label}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", marginBottom: 14 }}>
                Estimate Target: <span style={{ color: "rgba(255,255,255,0.6)" }}>{activeTask.mins} min</span>
                {" "}| Session Progress: #1 of {sprintCount} (25m sprints)
              </div>
              <div style={{ display: "flex", gap: 7, marginBottom: 16 }}>
                {Array.from({ length: Math.min(sprintCount, 5) }).map((_, i) => (
                  <div key={i} style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: i === 0 ? "#2dd4bf" : "rgba(255,255,255,0.15)",
                  }} />
                ))}
              </div>
            </>
          ) : (
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
              No active task — select one from the queue →
            </div>
          )}

          <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
            <button onClick={() => setRunning(r => !r)} style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8, color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500,
              padding: "7px 14px", cursor: "pointer", fontFamily: "inherit"
            }}>
              <Icon d={running ? IC.pause : IC.play} size={12} />
              {running ? "Pause Session" : "Resume Session"}
            </button>
            <button onClick={() => setRunning(false)} style={{
              display: "flex", alignItems: "center", gap: 7,
              background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)",
              borderRadius: 8, color: "#fca5a5", fontSize: 13, fontWeight: 500,
              padding: "7px 14px", cursor: "pointer", fontFamily: "inherit"
            }}>
              <div style={{ width: 9, height: 9, background: "#f87171", borderRadius: 2 }} />
              Stop and Record Session
            </button>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", marginTop: 7 }}>
            Explicitly records to show recording of time-range
          </div>
        </div>
      </div>
    </div>
  );
}