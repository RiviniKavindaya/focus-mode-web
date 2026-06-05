import { sectionTitleStyles } from "../../styles/dashboardStyles";

export default function ProgressCard() {
  return (
    <div>
      <div style={{ ...sectionTitleStyles, marginBottom: 12 }}>Today's Progress</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        
        {/* Focus Time */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginBottom: 6 }}>Focus Time</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 22, fontWeight: 600, color: "#fff" }}>
            2h <span style={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }}>15m</span>
          </div>
        </div>

        {/* Tasks Completed */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginBottom: 6 }}>Tasks Completed</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 22, fontWeight: 600, color: "#fff" }}>
            3<span style={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }}>/5</span>
          </div>
        </div>

        {/* Weekly Goal */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginBottom: 6 }}>Weekly Goal</div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden", margin: "6px 0 5px" }}>
            <div style={{ height: "100%", width: "88%", background: "linear-gradient(90deg,#2dd4bf,#0694a2)", borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>2h / 15m</div>
        </div>

      </div>
    </div>
  );
}