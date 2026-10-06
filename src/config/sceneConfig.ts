import type { SceneConfig } from "../types/site";

export const sceneConfig: SceneConfig = {
  backgroundAsset: "assets/backgrounds/infernal-room-v2.png",
  aspectRatio: "4 / 3",
  objects: [],
  hotspots: [
    {
      id: "about-chair",
      label: "About",
      route: "/about",
      position: { x: 2, y: 47, width: 20, height: 35 },
      labelPosition: "right",
      description: "The person behind this room.",
    },
    {
      id: "research-desk",
      label: "Research",
      route: "/research",
      position: { x: 41, y: 22, width: 18, height: 20 },
      labelPosition: "bottom",
      description: "Projects, questions, and experiments.",
    },
    {
      id: "art-flame",
      label: "Art",
      route: "/art",
      position: { x: 12, y: 8, width: 16, height: 26 },
      labelPosition: "right",
      description: "Images from the fire.",
    },
    {
      id: "writing-table",
      label: "Writing",
      route: "/writing",
      position: { x: 38, y: 52, width: 24, height: 22 },
      labelPosition: "top",
      description: "Notes and stories from the room.",
    },
    {
      id: "links-chair",
      label: "Links",
      route: "/links",
      position: { x: 77, y: 41, width: 20, height: 35 },
      labelPosition: "left",
      description: "Other doors worth opening.",
    },
  ],
};
