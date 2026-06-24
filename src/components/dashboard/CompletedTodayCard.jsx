import { Icon, IC } from "./Icons";
import { cardStyles, sectionTitleStyles } from "../../styles/dashboardStyles";

export default function CompletedTodayCard({ completedList }) {
  return (
    <div style={{ ...cardStyles, flex: 1 }}>
      <div style={sectionTitleStyles}>Completed Today</div>
      {completedList.map((c, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 1,
            background: "rgba(45,212,191,0.12)", border: "1.5px solid #2dd4bf",
            display: "grid", placeItems: "center",
          }}>
            <Icon d={IC.check} size={10} style={{ color: "#2dd4bf" }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>{c.label}</span>
           
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap", flexShrink: 0 }}>
            {c.time} ({c.dur})
          </div>
        </div>
      ))}
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", marginTop: 4, lineHeight: 1.6 }}>
        Total completed focus time: 2h 15m + 1h work on current task<br />
        (not shown yet in stats)
      </div>
    </div>
  );
}