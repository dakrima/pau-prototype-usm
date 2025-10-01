import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApplicationsProvider } from "@/context/ApplicationsContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApplicationsProvider>
      <App />
    </ApplicationsProvider>
  </React.StrictMode>
);