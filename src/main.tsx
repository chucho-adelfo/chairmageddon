import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/reset.css";
import "./styles/global.css";
import "./styles/scene.css";
import "./styles/hud.css";
import "./styles/art.css";
import "./styles/drawing-archive.css";
import "./styles/interactive-scene.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
