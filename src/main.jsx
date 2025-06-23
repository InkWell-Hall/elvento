import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AdContextProvider from "./context/AdContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdContextProvider>
      <App />
    </AdContextProvider>
  </StrictMode>
);
