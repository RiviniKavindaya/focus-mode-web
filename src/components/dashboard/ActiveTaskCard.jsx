import { Icon, IC } from "./Icons";
import { cardStyles } from "../../styles/dashboardStyles";

export default function ActiveTaskCard({ activeTask, running, sprintCount, setRunning }) {
  return (
    <div style={cardStyles}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Active Task</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginLeft: 8 }}>
            Active Focus Target: <span style={{ color: "rgba(255,255,255,0.55)" }}>Explicit time estimator</span>
          </span>
        </div>
        <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", padding: 4 }}>
          <Icon d={IC.more} size={14} />
        </button>
      </div>

      {activeTask ? (
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{activeTask.label}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
              <Icon d={IC.clock} size={13} /> {activeTask.mins} min
            </span>
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 14 }}>
            Estimate Target: {activeTask.mins} min | Session Progress: #1 of {sprintCount} (25m sprints)
          </div>
          <div style={{ display: "flex", gap: 9 }}>
            <button onClick={() => setRunning(r => !r)} style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 7, color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 500,
              padding: "6px 12px", cursor: "pointer", fontFamily: "inherit"
            }}>
              <Icon d={running ? IC.pause : IC.play} size={11} />
              {running ? "Pause" : "Resume"}
            </button>
            <button onClick={() => setRunning(false)} style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.22)",
              borderRadius: 7, color: "#fca5a5", fontSize: 12, fontWeight: 500,
              padding: "6px 12px", cursor: "pointer", fontFamily: "inherit"
            }}>
              <div style={{ width: 8, height: 8, background: "#f87171", borderRadius: 2 }} />
              End Session
            </button>
          </div>
        </div>
      ) : (
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.28)" }}>No active task</div>
      )}
    </div>
  );
}