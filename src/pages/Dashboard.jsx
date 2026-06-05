import { useState, useEffect, useRef } from "react";

// ── Inline SVG icon helper ────────────────────────────────────────────────────
const Icon = ({ d, size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round"
    strokeLinejoin="round" style={{ flexShrink: 0, ...style }}>
    <path d={d} />
  </svg>
);

const IC = {
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
};

// ── Circular countdown ring ───────────────────────────────────────────────────
function CircularTimer({ seconds, totalSeconds, running }) {
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

// ── Smart Task Creation Overlay ───────────────────────────────────────────────
function TaskOverlay({ onClose, onAddQueue, onAddStart }) {
  const [desc, setDesc] = useState("");
  const [mins, setMins] = useState(45);
  const chips = [15, 30, 45, 60, 90];

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#181c28", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 16, padding: 24, width: 540, maxWidth: "90vw",
        boxShadow: "0 28px 72px rgba(0,0,0,0.65)",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>
          How to Create a Task &amp; Estimate Time:
        </p>

        <input
          autoFocus
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="e.g., Code a specific API endpoint..."
          style={{
            width: "100%", background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
            padding: "10px 14px", color: "#fff", fontSize: 14,
            fontFamily: "'DM Sans', sans-serif", outline: "none",
            marginBottom: 14, boxSizing: "border-box",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {chips.map(c => (
              <button key={c} onClick={() => setMins(c)} style={{
                background: mins === c ? "rgba(45,212,191,0.15)" : "rgba(255,255,255,0.06)",
                border: `1px solid ${mins === c ? "rgba(45,212,191,0.5)" : "rgba(255,255,255,0.1)"}`,
                borderRadius: 20, padding: "5px 15px",
                color: mins === c ? "#2dd4bf" : "rgba(255,255,255,0.55)",
                fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              }}>{c}</button>
            ))}
          </div>

          <div style={{ marginLeft: "auto", display: "flex", flexDirection: "column", gap: 3 }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Total Minutes</span>
            <div style={{
              display: "flex", alignItems: "center",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, overflow: "hidden",
            }}>
              <input type="number" value={mins} onChange={e => setMins(Math.max(5, Number(e.target.value)))}
                style={{
                  width: 60, background: "transparent", border: "none",
                  color: "#fff", fontSize: 16, fontFamily: "'DM Mono', monospace",
                  padding: "7px 10px", outline: "none",
                }} />
              <div style={{ display: "flex", flexDirection: "column", borderLeft: "1px solid rgba(255,255,255,0.08)" }}>
                {[["▲", 5], ["▼", -5]].map(([lbl, d]) => (
                  <button key={lbl} onClick={() => setMins(m => Math.max(5, m + d))} style={{
                    background: "none", border: "none", color: "rgba(255,255,255,0.4)",
                    fontSize: 10, padding: "3px 7px", cursor: "pointer", lineHeight: 1,
                  }}>{lbl}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button disabled={!desc.trim()} onClick={() => { if (desc.trim()) { onAddStart({ label: desc, mins }); onClose(); } }}
            style={{
              flex: 1, background: "linear-gradient(135deg, #2dd4bf, #0694a2)",
              border: "none", borderRadius: 10, color: "#0a1210",
              fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              padding: 11, cursor: desc.trim() ? "pointer" : "not-allowed",
              opacity: desc.trim() ? 1 : 0.4,
            }}>Add and Start Task</button>
          <button disabled={!desc.trim()} onClick={() => { if (desc.trim()) { onAddQueue({ label: desc, mins }); onClose(); } }}
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 10, color: "rgba(255,255,255,0.7)",
              fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
              padding: "11px 18px", cursor: desc.trim() ? "pointer" : "not-allowed",
              opacity: desc.trim() ? 1 : 0.4,
            }}>Add to Queue</button>
        </div>
      </div>
    </div>
  );
}

// ── Constants ─────────────────────────────────────────────────────────────────
const SPRINT = 25 * 60;

const INIT_QUEUE = [
  { id: 1, label: "Design UI for settings page",       mins: 30,  done: false, active: false },
  { id: 2, label: "Write unit tests for new API",      mins: 45,  done: false, active: false },
  { id: 3, label: "Clean up database settings",        mins: 15,  done: false, active: false },
  { id: 4, label: "Implement User Authentication API", mins: 45,  done: false, active: true,
    sessions: "Session #1 (Active)\nSessions #2-4 (Queued)" },
  { id: 5, label: "Refactor Email Service",            mins: 120, done: false, active: false,
    sessions: "Session #1 (Active)\nSessions #2-4 (Queued)" },
];

const COMPLETED = [
  { label: "Review database schema",      time: "9:00 AM – 9:30 AM",    dur: "30m" },
  { label: "Team sync meeting",            time: "10:00 AM – 10:45 AM",  dur: "45m" },
  { label: "Design UI for settings page", time: "10:15 AM – 10:45 AM",  dur: "30m", seg: "Segment 1/1" },
  { label: "Refactor Email Service",      time: "Total Work: 10:00 AM – 12:00 PM", dur: "2h" },
];

const SOUNDS = [
  { id: "none",  label: "None",         icon: "none"  },
  { id: "rain",  label: "Deep Rain",    icon: "rain"  },
  { id: "birds", label: "Forest Birds", icon: "birds" },
  { id: "noise", label: "White Noise",  icon: "noise" },
  { id: "lofi",  label: "Lo-Fi Beats",  icon: "lofi"  },
];

// ── Tiny reusable button styles ───────────────────────────────────────────────
const card = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 16,
  padding: "18px 20px",
};

const sectionTitle = {
  fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 14,
  fontFamily: "'DM Sans', sans-serif",
};

// ── Dashboard (no sidebar) ────────────────────────────────────────────────────
export default function Dashboard({ darkMode }) {
  const [queue, setQueue]       = useState(INIT_QUEUE);
  const [activeTask, setActive] = useState(INIT_QUEUE.find(t => t.active));
  const [timerSecs, setTimer]   = useState(SPRINT);
  const [totalSecs, setTotal]   = useState(SPRINT);
  const [running, setRunning]   = useState(false);
  const [sound, setSound]       = useState("rain");
  const [volume, setVolume]     = useState(62);
  const [overlay, setOverlay]   = useState(false);
  const iv = useRef(null);

  useEffect(() => {
    if (running) {
      iv.current = setInterval(() =>
        setTimer(s => { if (s <= 1) { clearInterval(iv.current); setRunning(false); return 0; } return s - 1; }),
      1000);
    } else clearInterval(iv.current);
    return () => clearInterval(iv.current);
  }, [running]);

  const sprintCount = activeTask ? Math.ceil(activeTask.mins / 25) : 1;

  function startTask(task) {
    setQueue(q => q.map(t => ({ ...t, active: t.id === task.id })));
    setActive(task);
    const s = Math.min(task.mins, 25) * 60;
    setTimer(s); setTotal(s); setRunning(true);
  }

  function addToQueue(data) {
    setQueue(q => [...q, { id: Date.now(), label: data.label, mins: data.mins, done: false, active: false }]);
  }

  function addAndStart(data) {
    const t = { id: Date.now(), label: data.label, mins: data.mins, done: false, active: true };
    setQueue(q => [...q.map(x => ({ ...x, active: false })), t]);
    setActive(t);
    const s = Math.min(data.mins, 25) * 60;
    setTimer(s); setTotal(s); setRunning(true);
  }

  // shared text style
  const T = { fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0" };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
      <style>{`
        .ff-vol::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 0 0 3px rgba(45,212,191,0.45);cursor:pointer}
        .ff-vol{-webkit-appearance:none;height:4px;border-radius:2px;cursor:pointer;outline:none}
        input[type=number]{-moz-appearance:textfield}
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}
        .ff-start-btn:hover{background:rgba(45,212,191,0.22)!important}
        .ff-sound-btn:hover{background:rgba(255,255,255,0.08)!important;color:rgba(255,255,255,0.9)!important}
        .ff-queue-add:hover{border-color:rgba(45,212,191,0.4)!important;color:rgba(255,255,255,0.65)!important}
        .ff-queue-row:hover{background:rgba(255,255,255,0.04)!important}
        .ff-icon-btn:hover{background:rgba(255,255,255,0.1)!important;color:#fff!important}
      `}</style>

      {/* ── Page wrapper ── */}
      <div style={{ ...T, minHeight: "100vh", padding: "20px 24px 32px", boxSizing: "border-box" }}>

        {/* ── Top bar ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>Dashboard</h1>
          <button className="ff-icon-btn" onClick={() => {}} style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8, color: "rgba(255,255,255,0.5)", cursor: "pointer", padding: 7,
            display: "grid", placeItems: "center", transition: "all 0.15s",
          }}>
            <Icon d={IC.refresh} size={15} />
          </button>
        </div>

        {/* ── Main two-column grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 20 }}>

          {/* ═══ LEFT COLUMN ═══ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Current Focus Session */}
            <div style={card}>
              <div style={{ ...sectionTitle, marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Current Focus Session</span>
                <button className="ff-icon-btn" onClick={() => { setRunning(false); setTimer(totalSecs); }} style={{
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
                      {/* Sprint dots */}
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
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8, color: "rgba(255,255,255,0.7)",
                      fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                      padding: "7px 14px", cursor: "pointer",
                    }}>
                      <Icon d={running ? IC.pause : IC.play} size={12} />
                      {running ? "Pause Session" : "Resume Session"}
                    </button>
                    <button onClick={() => setRunning(false)} style={{
                      display: "flex", alignItems: "center", gap: 7,
                      background: "rgba(248,113,113,0.1)",
                      border: "1px solid rgba(248,113,113,0.25)",
                      borderRadius: 8, color: "#fca5a5",
                      fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                      padding: "7px 14px", cursor: "pointer",
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

            {/* Active Task compact card */}
            <div style={card}>
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
                <div style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12, padding: "14px 16px",
                }}>
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
                      borderRadius: 7, color: "rgba(255,255,255,0.7)",
                      fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                      padding: "6px 12px", cursor: "pointer",
                    }}>
                      <Icon d={running ? IC.pause : IC.play} size={11} />
                      {running ? "Pause" : "Resume"}
                    </button>
                    <button onClick={() => setRunning(false)} style={{
                      display: "flex", alignItems: "center", gap: 6,
                      background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.22)",
                      borderRadius: 7, color: "#fca5a5",
                      fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                      padding: "6px 12px", cursor: "pointer",
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

            {/* Ambient Sound */}
            <div style={card}>
              <div style={sectionTitle}>Ambient Sound</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
                {SOUNDS.map(s => (
                  <button key={s.id} className="ff-sound-btn" onClick={() => setSound(s.id)} style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                    background: sound === s.id ? "rgba(45,212,191,0.1)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${sound === s.id ? "rgba(45,212,191,0.45)" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 12, padding: "12px 14px", cursor: "pointer",
                    color: sound === s.id ? "#2dd4bf" : "rgba(255,255,255,0.45)",
                    fontSize: 12, fontFamily: "'DM Sans', sans-serif",
                    minWidth: 72, transition: "all 0.15s",
                  }}>
                    <Icon d={IC[s.icon]} size={18} />
                    <span>{s.label}</span>
                    {sound === s.id && s.id !== "none" && <span style={{ fontSize: 10 }}>⏸</span>}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>Volume</div>
              <input type="range" className="ff-vol" min={0} max={100} value={volume}
                onChange={e => setVolume(Number(e.target.value))}
                style={{
                  width: "100%",
                  background: `linear-gradient(90deg, #2dd4bf ${volume}%, rgba(255,255,255,0.1) ${volume}%)`,
                }} />
            </div>
          </div>

          {/* ═══ RIGHT COLUMN ═══ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Today's Progress */}
            <div>
              <div style={{ ...sectionTitle, marginBottom: 12 }}>Today's Progress</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {/* Focus Time */}
                <div style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12, padding: "14px 16px",
                }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginBottom: 6 }}>Focus Time</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 22, fontWeight: 600, color: "#fff" }}>
                    2h <span style={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }}>15m</span>
                  </div>
                </div>
                {/* Tasks Completed */}
                <div style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12, padding: "14px 16px",
                }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginBottom: 6 }}>Tasks Completed</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 22, fontWeight: 600, color: "#fff" }}>
                    3<span style={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }}>/5</span>
                  </div>
                </div>
                {/* Weekly Goal */}
                <div style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12, padding: "14px 16px",
                }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginBottom: 6 }}>Weekly Goal</div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden", margin: "6px 0 5px" }}>
                    <div style={{ height: "100%", width: "88%", background: "linear-gradient(90deg,#2dd4bf,#0694a2)", borderRadius: 2 }} />
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>2h / 15m</div>
                </div>
              </div>
            </div>

            {/* Task Queue */}
            <div style={card}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={sectionTitle}>Task Queue</span>
                <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", padding: 4 }}>
                  <Icon d={IC.more} size={14} />
                </button>
              </div>

              {/* Add input */}
              <button className="ff-queue-add" onClick={() => setOverlay(true)} style={{
                width: "100%", background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
                padding: "9px 14px", color: "rgba(255,255,255,0.28)",
                fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer", textAlign: "left",
                display: "flex", alignItems: "center", gap: 8,
                marginBottom: 10, transition: "all 0.15s", boxSizing: "border-box",
              }}>
                <Icon d={IC.plus} size={13} /> Add new task...
              </button>

              {/* Queue items */}
              {queue.filter(t => !t.done).map(task => (
                <div key={task.id} className="ff-queue-row" style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  padding: "9px 10px", borderRadius: 10, marginBottom: 2,
                  transition: "background 0.12s",
                }}>
                  {/* Checkbox */}
                  <div onClick={() => setQueue(q => q.map(t => t.id === task.id ? { ...t, done: true } : t))}
                    style={{
                      width: 16, height: 16, borderRadius: 4, flexShrink: 0, marginTop: 1,
                      border: "1.5px solid rgba(255,255,255,0.2)", cursor: "pointer",
                      background: "transparent", display: "grid", placeItems: "center",
                    }} />

                  {/* Label */}
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

                  {/* Right side */}
                  {task.active ? (
                    <span style={{ fontSize: 11, color: "#2dd4bf", fontWeight: 600, flexShrink: 0, marginTop: 2 }}>Active</span>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.28)" }}>| {task.mins}m</span>
                      <button className="ff-start-btn" onClick={() => startTask(task)} style={{
                        display: "flex", alignItems: "center", gap: 5,
                        background: "rgba(45,212,191,0.09)",
                        border: "1px solid rgba(45,212,191,0.25)",
                        borderRadius: 6, color: "#2dd4bf",
                        fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                        padding: "4px 9px", cursor: "pointer", transition: "background 0.15s",
                      }}>
                        <Icon d={IC.play} size={9} /> Start This Task
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Completed Today */}
            <div style={{ ...card, flex: 1 }}>
              <div style={sectionTitle}>Completed Today</div>
              {COMPLETED.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                    background: "rgba(45,212,191,0.12)",
                    border: "1.5px solid #2dd4bf",
                    display: "grid", placeItems: "center",
                  }}>
                    <Icon d={IC.check} size={10} style={{ color: "#2dd4bf" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>{c.label}</span>
                    {c.seg && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.32)", marginLeft: 5 }}>({c.seg})</span>}
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

          </div>
        </div>
      </div>

      {/* Task Overlay */}
      {overlay && (
        <TaskOverlay
          onClose={() => setOverlay(false)}
          onAddQueue={addToQueue}
          onAddStart={addAndStart}
        />
      )}
    </>
  );
}
