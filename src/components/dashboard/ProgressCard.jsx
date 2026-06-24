import { sectionTitleStyles } from "../../styles/dashboardStyles";
import useProgress from "../../hooks/useProgress";

export default function ProgressCard() {
  const { progress, loading } = useProgress();
  console.log(progress);

  const formatMinutes = (mins) => {
    if (mins == null) return { h: 0, m: 0 };
    const h = Math.floor(mins / 60);
    const m = Math.round(mins % 60);
    return { h, m };
  };

  const today  = formatMinutes(progress?.focus_minutes_today);
  const weekly = formatMinutes(progress?.focus_minutes_week);
  const target = formatMinutes(progress?.weekly_target_minutes);

  const completedToday = progress?.tasks_completed_today ?? 0;
  const createdToday   = progress?.tasks_created_today   ?? 0;
  const weeklyPct      = progress?.weekly_progress_pct   ?? 0;

  return (
    <div>
      <div style={{ ...sectionTitleStyles, marginBottom: 12 }}>Today's Progress</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>

        {/* Focus Time */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginBottom: 6 }}>Focus Time</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 22, fontWeight: 600, color: "#fff" }}>
            {loading ? "—" : `${today.h}h`}{" "}
            <span style={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }}>
              {loading ? "" : `${today.m}m`}
            </span>
          </div>
        </div>

        {/* Tasks Completed */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginBottom: 6 }}>Tasks Completed</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 22, fontWeight: 600, color: "#fff" }}>
            {loading ? "—" : completedToday}
            <span style={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }}>
              {loading ? "" : `/${createdToday}`}
            </span>
          </div>
        </div>

        {/* Weekly Goal */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginBottom: 6 }}>Weekly Goal</div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden", margin: "6px 0 5px" }}>
            <div style={{ height: "100%", width: `${weeklyPct}%`, background: "linear-gradient(90deg,#2dd4bf,#0694a2)", borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
            {loading ? "—" : `${weekly.h}h ${weekly.m}m / ${target.h}h ${target.m}m`}
          </div>
        </div>

      </div>
    </div>
  );
}