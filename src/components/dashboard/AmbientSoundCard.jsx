import { useEffect } from "react";
import { Icon, IC } from "./Icons";
import { SOUNDS } from "../../constants/dashboardConstants";
import { cardStyles, sectionTitleStyles } from "../../styles/dashboardStyles";
import { soundService } from "../../lib/soundService";

export default function AmbientSoundCard({ sound, setSound, volume, setVolume }) {
  // Play sound when selected
  useEffect(() => {
    if (sound === "none") {
      soundService.stopAll();
    } else {
      soundService.play(sound);
    }
  }, [sound]);

  // Update volume when changed
  useEffect(() => {
    soundService.setVolume(sound, volume);
  }, [volume, sound]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      soundService.stopAll();
    };
  }, []);

  return (
    <div style={cardStyles}>
      <div style={sectionTitleStyles}>Ambient Sound</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
        {SOUNDS.map(s => (
          <button key={s.id} className="ff-sound-btn" onClick={() => setSound(s.id)} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            background: sound === s.id ? "rgba(45,212,191,0.1)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${sound === s.id ? "rgba(45,212,191,0.45)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: 12, padding: "12px 14px", cursor: "pointer",
            color: sound === s.id ? "#2dd4bf" : "rgba(255,255,255,0.45)",
            fontSize: 12, minWidth: 72, transition: "all 0.15s", fontFamily: "inherit"
          }}>
            <Icon d={IC[s.icon]} size={18} />
            <span>{s.label}</span>
            {sound === s.id && s.id !== "none" && <span style={{ fontSize: 10 }}>🔊</span>}
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
  );
}