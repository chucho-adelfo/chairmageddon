import InteractiveScene from "../components/InteractiveScene";
import { homeScene } from "../config/scenes/homeScene";

export default function HomePage() {
  return <InteractiveScene config={homeScene} />;
}
