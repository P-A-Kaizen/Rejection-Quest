import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// src/main.js or src/main.ts
import "@fontsource/raleway"; // Raleway font
import "@fontsource/roboto"; // Roboto font

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);