import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { HashRouter as Router } from "react-router-dom";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
