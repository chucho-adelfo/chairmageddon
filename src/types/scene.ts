export type SceneHotspot = {
  id: string;
  label: string;
  route: string;
  x: number;
  y: number;
  width: number;
  height: number;
  shape?: "rect" | "ellipse";
  rotation?: number;
  hoverEffect?: "glow" | "outline" | "pulse" | "none";
};

export type SceneFire = {
  id: string;
  x: number;
  y: number;
  width: number;
  delay?: number;
};

export type InteractiveSceneConfig = {
  id: string;
  background: string;
  fit?: "cover" | "contain";
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  hotspots: SceneHotspot[];
  fires?: SceneFire[];
};
