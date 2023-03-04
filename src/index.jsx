import React from "react";
import { createRoot } from "react-dom/client";

import "./styles/reset.css";
import "./styles/variables.css";
import "./styles/global.css";

import { PopupContainer, STATUS } from "./containers/popup-container";

function DevApp() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      <PopupContainer status={STATUS.SECURE} />
      <PopupContainer status={STATUS.WARN} />
      <PopupContainer status={STATUS.INSECURE} />
    </div>
  );
}

createRoot(document.getElementById("dev_root")).render(<DevApp />);
