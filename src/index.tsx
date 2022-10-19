import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TrainingProvider } from "./context/TrainingProvider";
import { AuthProvider } from "./context/AuthProvider";
import './config/i18next-config';
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TrainingProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </TrainingProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
