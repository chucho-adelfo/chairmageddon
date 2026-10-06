import { type MouseEvent, useEffect, useState } from "react";
import type { HotspotConfig, SceneConfig } from "../types/site";
import { assetPath } from "../utils/assetPath";
import SceneObject from "./SceneObject";
import NavigationHotspot from "./NavigationHotspot";
import TopPrompt from "./TopPrompt";
import Hud from "./Hud";
import DebugOverlay from "./DebugOverlay";

type SceneProps = {
  config: SceneConfig;
  topPrompt: string;
};

export default function Scene({ config, topPrompt }: SceneProps) {
  const [selectedHotspot, setSelectedHotspot] =
    useState<HotspotConfig | null>(null);
  const [debugMode, setDebugMode] = useState(false);
  const [debugPointer, setDebugPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === "d" &&
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLTextAreaElement)
      ) {
        setDebugMode((current) => !current);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const updateDebugPointer = (event: MouseEvent<HTMLDivElement>) => {
    if (!debugMode) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setDebugPointer({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  };

  return (
    <div
      className="scene"
      onMouseMove={updateDebugPointer}
      style={{ backgroundImage: `url("${assetPath(config.backgroundAsset)}")` }}
    >
      <TopPrompt text={topPrompt} />
      <div className="scene-object-layer" aria-hidden="true">
        {config.objects.map((object) => (
          <SceneObject key={object.id} object={object} />
        ))}
      </div>
      <div className="scene-fire-layer" aria-hidden="true">
        <span className="scene-fire scene-fire--left" />
        <span className="scene-fire scene-fire--upper" />
        <span className="scene-fire scene-fire--table" />
        <span className="scene-fire scene-fire--right" />
      </div>
      <div className="scene-hotspot-layer" aria-label="Room navigation">
        {config.hotspots.map((hotspot) => (
          <NavigationHotspot
            debugMode={debugMode}
            hotspot={hotspot}
            key={hotspot.id}
            onClear={() => setSelectedHotspot(null)}
            onSelect={setSelectedHotspot}
            selected={selectedHotspot?.id === hotspot.id}
          />
        ))}
      </div>
      {debugMode ? (
        <DebugOverlay hotspots={config.hotspots} pointer={debugPointer} />
      ) : null}
      <Hud selectedHotspot={selectedHotspot} />
      <div className="screen-effects" aria-hidden="true" />
    </div>
  );
}
