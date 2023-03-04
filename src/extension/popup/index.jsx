import React from "react";
import { createRoot } from "react-dom/client";

import "../../styles/reset.css";
import "../../styles/variables.css";
import "../../styles/global.css";

import { PopupContainer } from "../../containers/popup-container";

createRoot(document.getElementById("popup_root")).render(<PopupContainer />);
