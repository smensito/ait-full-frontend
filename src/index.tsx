import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TrainingProvider } from "./context/TrainingProvider";
import { AuthProvider } from "./context/AuthProvider";
import './config/i18next-config';
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <TrainingProvider>
        <App />
      </TrainingProvider>
    </AuthProvider>
  </React.StrictMode>
);
