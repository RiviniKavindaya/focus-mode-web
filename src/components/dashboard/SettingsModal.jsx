import useSettings from '../../hooks/useSettings';

export default function SettingsModal({ onClose }) {
  const {
    settings,
    updateSetting,
    saveSettings,
    loading,
    saving,
    message,
  } = useSettings();

  const handleSave = async () => {
    await saveSettings();
    // auto-close after success message like original
    setTimeout(() => onClose(), 1500);
  };

  if (loading) {
    return (
      <div
        onClick={onClose}
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
        <div style={{ color: "#2dd4bf" }}>Loading settings...</div>
      </div>
    );
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#181c28",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          padding: 32,
          maxWidth: 600,
          width: "100%",
          maxHeight: "85vh",
          overflow: "auto",
          boxShadow: "0 28px 72px rgba(0,0,0,0.65)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#fff", margin: 0 }}>Settings</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              fontSize: 24,
              padding: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* SETTINGS SECTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

          {/* SPRINT & BREAK DURATIONS */}
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: "#2dd4bf", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>
              Focus Session
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <SettingInput
                label="Sprint Duration"
                value={settings.preferred_sprint_duration}
                onChange={(val) => updateSetting("preferred_sprint_duration", val)}
                min={5} max={60} unit="min"
              />
              <SettingInput
                label="Short Break"
                value={settings.short_break_duration}
                onChange={(val) => updateSetting("short_break_duration", val)}
                min={1} max={30} unit="min"
              />
              <SettingInput
                label="Long Break"
                value={settings.long_break_duration}
                onChange={(val) => updateSetting("long_break_duration", val)}
                min={5} max={60} unit="min"
              />
              <SettingInput
                label="Sprints Before Long Break"
                value={settings.sprints_before_long_break}
                onChange={(val) => updateSetting("sprints_before_long_break", val)}
                min={2} max={10} unit=""
              />
            </div>
          </div>

          {/* DAILY & WEEKLY TARGETS */}
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: "#2dd4bf", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>
              Daily Goals
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <SettingInput
                label="Daily Target"
                value={settings.daily_target_minutes}
                onChange={(val) => updateSetting("daily_target_minutes", val)}
                min={30} max={480} unit="min"
              />
              <SettingInput
                label="Weekly Target"
                value={settings.weekly_target_minutes}
                onChange={(val) => updateSetting("weekly_target_minutes", val)}
                min={100} max={2400} unit="min"
              />
            </div>
          </div>

          {/* AUDIO SETTINGS */}
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: "#2dd4bf", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>
              Audio
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <SettingInput
                label="Default Ambient Sound"
                value={settings.default_ambient_sound}
                onChange={(val) => updateSetting("default_ambient_sound", val)}
                type="select"
                options={["none", "rain", "birds", "noise", "lofi"]}
              />
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <label style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Default Volume</label>
                  <span style={{ fontSize: 12, color: "#2dd4bf", fontWeight: 600 }}>{settings.default_ambient_volume}%</span>
                </div>
                <input
                  type="range"
                  min={0} max={100}
                  value={settings.default_ambient_volume}
                  onChange={(e) => updateSetting("default_ambient_volume", Number(e.target.value))}
                  style={{
                    width: "100%",
                    background: `linear-gradient(90deg, #2dd4bf ${settings.default_ambient_volume}%, rgba(255,255,255,0.1) ${settings.default_ambient_volume}%)`,
                  }}
                />
              </div>
              <SettingToggle
                label="Sound Effects"
                value={settings.sound_effects_enabled}
                onChange={(val) => updateSetting("sound_effects_enabled", val)}
              />
            </div>
          </div>

          {/* THEME */}
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: "#2dd4bf", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>
              Appearance
            </h3>
            <SettingInput
              label="Theme"
              value={settings.theme}
              onChange={(val) => updateSetting("theme", val)}
              type="select"
              options={["dark", "light"]}
            />
          </div>
        </div>

        {/* STATUS MESSAGE */}
        {message && (
          <div style={{
            marginTop: 20,
            padding: "10px 14px",
            background: message.includes("✓") ? "rgba(45,212,191,0.1)" : "rgba(248,113,113,0.1)",
            border: `1px solid ${message.includes("✓") ? "rgba(45,212,191,0.3)" : "rgba(248,113,113,0.3)"}`,
            borderRadius: 8,
            color: message.includes("✓") ? "#2dd4bf" : "#fca5a5",
            fontSize: 12,
            textAlign: "center",
          }}>
            {message}
          </div>
        )}

        {/* BUTTONS */}
        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <button
            onClick={onClose}
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
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              flex: 1,
              background: saving ? "rgba(45,212,191,0.3)" : "linear-gradient(135deg, #2dd4bf, #0694a2)",
              border: "none",
              borderRadius: 10,
              color: "#0a1210",
              fontSize: 14,
              fontWeight: 700,
              padding: "11px 16px",
              cursor: saving ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── helper components unchanged ────────────────────────────────────────────

function SettingInput({ label, value, onChange, min, max, unit, type = "number", options = [] }) {
  if (type === "select") {
    return (
      <div>
        <label style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", display: "block", marginBottom: 8 }}>
          {label}
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            color: "#fff",
            padding: "10px 12px",
            fontSize: 13,
            fontFamily: "inherit",
            cursor: "pointer",
          }}
        >
          {options.map(opt => (
            <option key={opt} value={opt} style={{ background: "#181c28", color: "#fff" }}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      <label style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", display: "block", marginBottom: 8 }}>
        {label}
      </label>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min} max={max}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            color: "#fff",
            padding: "10px 12px",
            fontSize: 13,
            fontFamily: "inherit",
          }}
        />
        {unit && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", minWidth: 30 }}>{unit}</span>}
      </div>
    </div>
  );
}

function SettingToggle({ label, value, onChange }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <label style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{label}</label>
      <button
        onClick={() => onChange(!value)}
        style={{
          width: 48, height: 28, borderRadius: 14,
          background: value ? "linear-gradient(135deg, #2dd4bf, #0694a2)" : "rgba(255,255,255,0.1)",
          border: "none", cursor: "pointer", position: "relative",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{
          width: 24, height: 24, borderRadius: 12, background: "#fff",
          position: "absolute", top: 2, left: value ? 22 : 2,
          transition: "left 0.3s ease",
        }} />
      </button>
    </div>
  );
}