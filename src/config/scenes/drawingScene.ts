import type { InteractiveSceneConfig, SceneHotspot } from "../../types/scene";

// Each hotspot corresponds to one folder in drawings/. Positions are percentages
// of the original Moonlit Owls image and can be adjusted with D debug mode.
export const drawingCategories: (SceneHotspot & { folder: string })[] = [
  { id: "people", label: "People", folder: "people", route: "/art/drawing/people", x: 9, y: 36, width: 19, height: 24, hoverEffect: "glow" },
  { id: "gesture", label: "Gesture", folder: "gesture", route: "/art/drawing/gesture", x: 8, y: 60, width: 22, height: 32, hoverEffect: "glow" },
  { id: "portrait-study", label: "Portrait: Study", folder: "portrait:study", route: "/art/drawing/portrait-study", x: 43, y: 41, width: 14, height: 14, hoverEffect: "glow" },
  { id: "ethyl-and-braxton", label: "Ethyl and Braxton", folder: "ethyl-and-braxton", route: "/art/drawing/ethyl-and-braxton", x: 43, y: 55, width: 15, height: 15, hoverEffect: "glow" },
  { id: "character", label: "Character", folder: "character", route: "/art/drawing/character", x: 62, y: 26, width: 20, height: 27, hoverEffect: "glow" },
  { id: "places-scenes", label: "Places: Scenes", folder: "places:scenes", route: "/art/drawing/places-scenes", x: 61, y: 54, width: 23, height: 40, hoverEffect: "glow" },
  { id: "sillustration", label: "Sillustration", folder: "sillustration", route: "/art/drawing/sillustration", x: 82, y: 47, width: 17, height: 20, hoverEffect: "glow" },
  { id: "thumbnails", label: "Thumbnails", folder: "thumbnails", route: "/art/drawing/thumbnails", x: 81, y: 67, width: 18, height: 23, hoverEffect: "glow" },
  { id: "dogfight", label: "Dogfight", folder: "dogfight", route: "/art/drawing/dogfight", x: 1, y: 14, width: 18, height: 21, hoverEffect: "glow" },
];

export const drawingScene: InteractiveSceneConfig = {
  id: "drawing-room",
  background: "/assets/scenes/drawing-room/moonlit-owls-background.png",
  fit: "contain",
  imageWidth: 1448,
  imageHeight: 1086,
  imageAlt: "Four owls perched among chairs beneath a bright moon in a pixel art landscape.",
  hotspots: [
    ...drawingCategories,
    {
      id: "art",
      label: "Return to the art room",
      route: "/art",
      x: 34,
      y: 7,
      width: 12,
      height: 15,
      shape: "ellipse",
      hoverEffect: "glow",
    },
  ],
};
