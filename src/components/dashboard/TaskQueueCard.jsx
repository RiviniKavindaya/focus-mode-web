import { Icon, IC } from "./Icons";
import { cardStyles, sectionTitleStyles } from "../../styles/dashboardStyles";

export default function TaskQueueCard({ queue, setQueue, startTask, onAddClick }) {
  return (
    <div style={cardStyles}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={sectionTitleStyles}>Task Queue</span>
        <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", padding: 4 }}>
          <Icon d={IC.more} size={14} />
        </button>
      </div>

      <button className="ff-queue-add" onClick={onAddClick} style={{
        width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10, padding: "9px 14px", color: "rgba(255,255,255,0.28)", fontSize: 13,
        cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 8,
        marginBottom: 10, transition: "all 0.15s", boxSizing: "border-box", fontFamily: "inherit"
      }}>
        <Icon d={IC.plus} size={13} /> Add new task...
      </button>

      {queue.filter(t => !t.done).map(task => (
        <div key={task.id} className="ff-queue-row" style={{
          display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 10px",
          borderRadius: 10, marginBottom: 2, transition: "background 0.12s",
        }}>
          <div onClick={() => setQueue(q => q.map(t => t.id === task.id ? { ...t, done: true } : t))}
            style={{
              width: 16, height: 16, borderRadius: 4, flexShrink: 0, marginTop: 1,
              border: "1.5px solid rgba(255,255,255,0.2)", cursor: "pointer",
              background: "transparent", display: "grid", placeItems: "center",
            }} />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 13, color: task.active ? "rgba(255,255,255,0.32)" : "rgba(255,255,255,0.8)",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>{task.label}</div>
            {task.sessions && task.active && (
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", marginTop: 2, lineHeight: 1.5 }}>
                {task.sessions}
              </div>
            )}
          </div>

          {task.active ? (
            <span style={{ fontSize: 11, color: "#2dd4bf", fontWeight: 600, flexShrink: 0, marginTop: 2 }}>Active</span>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.28)" }}>| {task.mins}m</span>
              <button className="ff-start-btn" onClick={() => startTask(task)} style={{
                display: "flex", alignItems: "center", gap: 5, background: "rgba(45,212,191,0.09)",
                border: "1px solid rgba(45,212,191,0.25)", borderRadius: 6, color: "#2dd4bf",
                fontSize: 11, fontWeight: 500, padding: "4px 9px", cursor: "pointer",
                transition: "background 0.15s", fontFamily: "inherit"
              }}>
                <Icon d={IC.play} size={9} /> Start This Task
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}