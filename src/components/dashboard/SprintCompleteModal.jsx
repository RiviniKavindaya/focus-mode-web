export default function SprintCompleteModal({
  activeTask,
  sprintCount,
  onStartNext,
  onPause,
  onCompleteTask,
}) {
  const completedSprints = activeTask?.completed_sprints ?? 0;
  const isLastSprint = completedSprints >= sprintCount;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        
        {/* HEADER */}
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            {isLastSprint ? "🎉 All Sprints Completed" : "🎯 Sprint Completed"}
          </h2>

          <p style={subtitleStyle}>
            {activeTask.title}
          </p>
        </div>

        {/* BODY */}
        <div style={bodyStyle}>
          <div style={progressBox}>
            <div style={progressText}>
              {completedSprints} / {sprintCount}
            </div>
            <div style={progressLabel}>sprints completed</div>
          </div>

          {!isLastSprint && (
            <div style={nextBox}>
              Next Sprint: <b>{completedSprints + 1}</b>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div style={buttonContainer}>
          
          {isLastSprint ? (
            <button style={primaryButton} onClick={onCompleteTask}>
              Complete Task 🎉
            </button>
          ) : (
            <>
              <button style={primaryButton} onClick={onStartNext}>
                Start Next Sprint ▶
              </button>

              <button style={secondaryButton} onClick={onPause}>
                Take a Break ☕
              </button>

              <button style={dangerButton} onClick={onCompleteTask}>
                Finish Task
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.65)",
  backdropFilter: "blur(6px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modalStyle = {
  width: "420px",
  background: "linear-gradient(145deg, #1f2937, #111827)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
  padding: "22px",
  color: "#e5e7eb",
  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  fontFamily: "'DM Sans', sans-serif",
};

const headerStyle = {
  marginBottom: "14px",
};

const titleStyle = {
  fontSize: "18px",
  fontWeight: "700",
  margin: 0,
  color: "#f9fafb",
};

const subtitleStyle = {
  marginTop: "6px",
  fontSize: "13px",
  color: "#9ca3af",
};

const bodyStyle = {
  marginTop: "16px",
  marginBottom: "20px",
};

const progressBox = {
  background: "rgba(255,255,255,0.04)",
  borderRadius: "12px",
  padding: "14px",
  textAlign: "center",
};

const progressText = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#60a5fa",
};

const progressLabel = {
  fontSize: "12px",
  color: "#9ca3af",
  marginTop: "4px",
};

const nextBox = {
  marginTop: "12px",
  fontSize: "13px",
  color: "#d1d5db",
  textAlign: "center",
};

const buttonContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const baseButton = {
  padding: "10px 12px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  fontWeight: "600",
  transition: "0.2s",
};

const primaryButton = {
  ...baseButton,
  background: "#3b82f6",
  color: "white",
};

const secondaryButton = {
  ...baseButton,
  background: "#374151",
  color: "#e5e7eb",
};

const dangerButton = {
  ...baseButton,
  background: "#ef4444",
  color: "white",
};