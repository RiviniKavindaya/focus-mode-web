import { Icon, IC } from "./Icons";

export default function TaskSwitchModal({
  currentTask,
  newTaskTitle,
  onConfirm,
  onCancel,
}) {
  return (
    <div
      onClick={onCancel}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#181c28",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          padding: 32,
          maxWidth: 420,
          width: "90vw",
          boxShadow: "0 28px 72px rgba(0,0,0,0.65)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* HEADER WITH ICON */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "rgba(248,113,113,0.15)",
              border: "1px solid rgba(248,113,113,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon d={IC.alert} size={20} style={{ color: "#fca5a5" }} />
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#fff", margin: 0 }}>
            Switch Task?
          </h2>
        </div>

        {/* MESSAGE */}
        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.7)",
            marginBottom: 20,
            lineHeight: 1.6,
          }}
        >
          You're currently working on{" "}
          <span style={{ fontWeight: 600, color: "#2dd4bf" }}>"{currentTask}"</span>. 
          <br />
          <br />
          Starting <span style={{ fontWeight: 600, color: "#2dd4bf" }}>"{newTaskTitle}"</span> will:
        </p>

        {/* STEPS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "rgba(45,212,191,0.15)",
                border: "1px solid rgba(45,212,191,0.3)",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 1,
              }}
            >
              <span style={{ fontSize: 10, color: "#2dd4bf", fontWeight: 600 }}>✓</span>
            </div>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
              Pause and save the current task session
            </span>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "rgba(45,212,191,0.15)",
                border: "1px solid rgba(45,212,191,0.3)",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 1,
              }}
            >
              <span style={{ fontSize: 10, color: "#2dd4bf", fontWeight: 600 }}>✓</span>
            </div>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
              Start a fresh timer for the new task
            </span>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "rgba(45,212,191,0.15)",
                border: "1px solid rgba(45,212,191,0.3)",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 1,
              }}
            >
              <span style={{ fontSize: 10, color: "#2dd4bf", fontWeight: 600 }}>✓</span>
            </div>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
              Reset the focus timer to full duration
            </span>
          </div>
        </div>

        {/* BUTTONS */}
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              color: "rgba(255,255,255,0.7)",
              fontSize: 14,
              fontWeight: 600,
              padding: "11px 16px",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.06)";
            }}
          >
            Keep Working
          </button>

          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              background: "linear-gradient(135deg, #2dd4bf, #0694a2)",
              border: "none",
              borderRadius: 10,
              color: "#0a1210",
              fontSize: 14,
              fontWeight: 700,
              padding: "11px 16px",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = "1";
            }}
          >
            Switch Task
          </button>
        </div>
      </div>
    </div>
  );
}
