export const cardStyles = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 16,
  padding: "18px 20px",
};

export const sectionTitleStyles = {
  fontSize: 15,
  fontWeight: 700,
  color: "#fff",
  marginBottom: 14,
  fontFamily: "'DM Sans', sans-serif",
};

export const globalStyles = `
  .ff-vol::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 0 0 3px rgba(45,212,191,0.45);cursor:pointer}
  .ff-vol{-webkit-appearance:none;height:4px;border-radius:2px;cursor:pointer;outline:none}
  input[type=number]{-moz-appearance:textfield}
  input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}
  .ff-start-btn:hover{background:rgba(45,212,191,0.22)!important}
  .ff-sound-btn:hover{background:rgba(255,255,255,0.08)!important;color:rgba(255,255,255,0.9)!important}
  .ff-queue-add:hover{border-color:rgba(45,212,191,0.4)!important;color:rgba(255,255,255,0.65)!important}
  .ff-queue-row:hover{background:rgba(255,255,255,0.04)!important}
  .ff-icon-btn:hover{background:rgba(255,255,255,0.1)!important;color:#fff!important}
`;