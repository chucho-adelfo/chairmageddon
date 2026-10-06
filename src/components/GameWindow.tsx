import type { ReactNode } from "react";

type GameWindowProps = {
  children: ReactNode;
  aspectRatio: string;
};

export default function GameWindow({ children, aspectRatio }: GameWindowProps) {
  return (
    <div className="game-frame" aria-label="Interactive room">
      <div className="game-screen" style={{ aspectRatio }}>
        {children}
      </div>
    </div>
  );
}
