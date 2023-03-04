import { useEffect } from "react";
import { PopupContainer } from "../containers/popup-container";

export default function App() {
  useEffect(() => {
    console.log("App loaded");
  }, []);

  return <PopupContainer />;
}
