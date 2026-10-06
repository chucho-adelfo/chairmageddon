export type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SceneAnimation = "none" | "float" | "flicker" | "pulse";

export type SceneObjectConfig = {
  id: string;
  asset: string;
  alt: string;
  position: Position;
  zIndex?: number;
  className?: string;
  animation?: SceneAnimation;
};

export type LabelPosition = "top" | "bottom" | "left" | "right" | "center";

export type HotspotConfig = {
  id: string;
  label: string;
  route: string;
  position: Position;
  labelPosition?: LabelPosition;
  disabled?: boolean;
  description: string;
  thumbnailAsset?: string;
};

export type SceneConfig = {
  backgroundAsset: string;
  aspectRatio: string;
  objects: SceneObjectConfig[];
  hotspots: HotspotConfig[];
};

export type SiteConfig = {
  siteTitle: string;
  topPrompt: string;
  defaultHudLabel: string;
  defaultHudDescription: string;
  hudHint: string;
  hudStatus: string;
};
