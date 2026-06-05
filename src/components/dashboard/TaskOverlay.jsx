import React, { useState } from "react";

export default function TaskOverlay({ onClose, onAddQueue, onAddStart }) {
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