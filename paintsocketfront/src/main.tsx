import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ContextProviders from "./context/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ContextProviders>
    <App />
  </ContextProviders>
);
