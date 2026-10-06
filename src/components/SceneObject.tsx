import type { SceneObjectConfig } from "../types/site";
import { assetPath } from "../utils/assetPath";

type SceneObjectProps = {
  object: SceneObjectConfig;
};

export default function SceneObject({ object }: SceneObjectProps) {
  const classNames = [
    "scene-object",
    object.className,
    object.animation && object.animation !== "none"
      ? `scene-object--${object.animation}`
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <img
      className={classNames}
      src={assetPath(object.asset)}
      alt={object.alt}
      style={{
        left: `${object.position.x}%`,
        top: `${object.position.y}%`,
        width: `${object.position.width}%`,
        height: `${object.position.height}%`,
        zIndex: object.zIndex ?? 1,
      }}
      draggable={false}
    />
  );
}
