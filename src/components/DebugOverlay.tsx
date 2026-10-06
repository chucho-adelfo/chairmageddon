import type { HotspotConfig } from "../types/site";

type DebugOverlayProps = {
  hotspots: HotspotConfig[];
  pointer: {
    x: number;
    y: number;
  };
};

export default function DebugOverlay({ hotspots, pointer }: DebugOverlayProps) {
  return (
    <div className="debug-overlay">
      {hotspots.map((hotspot) => (
        <div
          className="debug-box"
          key={hotspot.id}
          style={{
            left: `${hotspot.position.x}%`,
            top: `${hotspot.position.y}%`,
            width: `${hotspot.position.width}%`,
            height: `${hotspot.position.height}%`,
          }}
        >
          {hotspot.id}
        </div>
      ))}
      <div className="debug-readout">
        x: {pointer.x.toFixed(1)}% / y: {pointer.y.toFixed(1)}%
      </div>
    </div>
  );
}
