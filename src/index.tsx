import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TrainingProvider } from "./context/TrainingProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <TrainingProvider>
      <App />
    </TrainingProvider>
  </React.StrictMode>
);
