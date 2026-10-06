import InteractiveScene from "../components/InteractiveScene";
import { drawingScene } from "../config/scenes/drawingScene";

export default function DrawingHubPage() {
  return <InteractiveScene config={drawingScene} />;
}
