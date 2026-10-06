import InteractiveScene from "../components/InteractiveScene";
import { artScene } from "../config/scenes/artScene";

export default function ArtHubPage() {
  return <InteractiveScene config={artScene} />;
}
