import { type ReactNode, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GameWindow from "./GameWindow";
import { sceneConfig } from "../config/sceneConfig";

type PageOverlayProps = {
  title: string;
  children: ReactNode;
};

export default function PageOverlay({ title, children }: PageOverlayProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate]);

  return (
    <main className="page-layout">
      <GameWindow aspectRatio={sceneConfig.aspectRatio}>
        <section className="page-overlay" aria-labelledby="page-title">
          <div className="page-overlay__inner">
            <p className="page-overlay__kicker">ROOM FILE</p>
            <h1 id="page-title">{title}</h1>
            <div className="page-overlay__content">{children}</div>
            <Link className="back-link" to="/">
              Back to room
            </Link>
          </div>
        </section>
      </GameWindow>
    </main>
  );
}
