import type { HotspotConfig } from "../types/site";
import { siteConfig } from "../config/siteConfig";
import { assetPath } from "../utils/assetPath";

type HudProps = {
  selectedHotspot: HotspotConfig | null;
};

export default function Hud({ selectedHotspot }: HudProps) {
  const label = selectedHotspot?.label ?? siteConfig.defaultHudLabel;
  const description =
    selectedHotspot?.description ?? siteConfig.defaultHudDescription;
  const thumbnail = selectedHotspot?.thumbnailAsset;

  return (
    <aside className="hud" aria-live="polite">
      <div className="hud-thumbnail" aria-hidden="true">
        {thumbnail ? <img src={assetPath(thumbnail)} alt="" /> : <span />}
      </div>
      <div className="hud-copy">
        <p className="hud-label">{label}</p>
        <p className="hud-description">{description}</p>
      </div>
      <div className="hud-meta">
        <p>{siteConfig.hudHint}</p>
        <p>{siteConfig.hudStatus}</p>
      </div>
    </aside>
  );
}
