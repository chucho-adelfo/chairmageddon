export type SceneSize = { width: number; height: number };
export type SceneOffset = { x: number; y: number };

export function coverGeometry(viewport: SceneSize, image: SceneSize) {
  const scale = Math.max(viewport.width / image.width, viewport.height / image.height);
  const width = image.width * scale;
  const height = image.height * scale;
  return {
    width,
    height,
    centered: {
      x: (viewport.width - width) / 2,
      y: (viewport.height - height) / 2,
    },
  };
}

export function containGeometry(viewport: SceneSize, image: SceneSize) {
  const scale = Math.min(viewport.width / image.width, viewport.height / image.height);
  const width = image.width * scale;
  const height = image.height * scale;
  return {
    width,
    height,
    centered: {
      x: (viewport.width - width) / 2,
      y: (viewport.height - height) / 2,
    },
  };
}

export function clampSceneOffset(
  offset: SceneOffset,
  viewport: SceneSize,
  rendered: SceneSize,
): SceneOffset {
  const clampAxis = (value: number, viewportSize: number, renderedSize: number) =>
    renderedSize <= viewportSize
      ? (viewportSize - renderedSize) / 2
      : Math.min(0, Math.max(viewportSize - renderedSize, value));
  return {
    x: clampAxis(offset.x, viewport.width, rendered.width),
    y: clampAxis(offset.y, viewport.height, rendered.height),
  };
}
