import { Icon, IC } from "./Icons";

export default function DashboardHeader() {
  return (
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
  );
}