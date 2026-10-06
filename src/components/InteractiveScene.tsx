import { type MouseEvent, type PointerEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { InteractiveSceneConfig, SceneHotspot } from "../types/scene";
import { clampSceneOffset, containGeometry, coverGeometry, type SceneOffset } from "../utils/sceneGeometry";
import { assetPath } from "../utils/assetPath";

type InteractiveSceneProps = {
  config: InteractiveSceneConfig;
  className?: string;
};

type DragState = {
  pointerId: number;
  x: number;
  y: number;
  offset: SceneOffset;
};

export default function InteractiveScene({ config, className = "" }: InteractiveSceneProps) {
  const navigate = useNavigate();
  const sceneRef = useRef<HTMLElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const transitionRef = useRef<number | null>(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [image, setImage] = useState({ width: config.imageWidth, height: config.imageHeight });
  const [pan, setPan] = useState<SceneOffset | null>(null);
  const [debug, setDebug] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [exiting, setExiting] = useState(false);

  const rendered = config.fit === "contain"
    ? containGeometry(viewport, image)
    : coverGeometry(viewport, image);
  const offset = pan
    ? clampSceneOffset(pan, viewport, rendered)
    : rendered.centered;
  const ready = viewport.width > 0 && viewport.height > 0;

  useEffect(() => {
    const element = sceneRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setViewport({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
      setPan(null);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.key.toLowerCase() === "d") {
        setDebug((current) => !current);
        return;
      }
      const step = 80;
      const movement: Record<string, SceneOffset> = {
        ArrowLeft: { x: step, y: 0 },
        ArrowRight: { x: -step, y: 0 },
        ArrowUp: { x: 0, y: step },
        ArrowDown: { x: 0, y: -step },
      };
      if (movement[event.key]) {
        event.preventDefault();
        setPan(clampSceneOffset({
          x: offset.x + movement[event.key].x,
          y: offset.y + movement[event.key].y,
        }, viewport, rendered));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [offset.x, offset.y, rendered.width, rendered.height, viewport]);

  useEffect(() => () => {
    if (transitionRef.current !== null) window.clearTimeout(transitionRef.current);
  }, []);

  const revealHotspot = (hotspot: SceneHotspot) => {
    const left = offset.x + rendered.width * hotspot.x / 100;
    const right = left + rendered.width * hotspot.width / 100;
    const top = offset.y + rendered.height * hotspot.y / 100;
    const bottom = top + rendered.height * hotspot.height / 100;
    const margin = 24;
    const next = { ...offset };
    if (right < margin || left > viewport.width - margin) {
      next.x = viewport.width / 2 - rendered.width * (hotspot.x + hotspot.width / 2) / 100;
    }
    if (bottom < margin || top > viewport.height - margin) {
      next.y = viewport.height / 2 - rendered.height * (hotspot.y + hotspot.height / 2) / 100;
    }
    if (next.x !== offset.x || next.y !== offset.y) {
      setPan(clampSceneOffset(next, viewport, rendered));
    }
  };

  const openHotspot = (event: MouseEvent<HTMLAnchorElement>, route: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (exiting) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      navigate(route);
      return;
    }
    setExiting(true);
    transitionRef.current = window.setTimeout(() => navigate(route), 210);
  };

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.button !== 0 || (event.target instanceof Element && event.target.closest("a"))) return;
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      offset,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    if (debug && ready) {
      setPointer({
        x: ((event.clientX - bounds.left - offset.x) / rendered.width) * 100,
        y: ((event.clientY - bounds.top - offset.y) / rendered.height) * 100,
      });
    }
    if (dragRef.current?.pointerId === event.pointerId) {
      setPan(clampSceneOffset({
        x: dragRef.current.offset.x + event.clientX - dragRef.current.x,
        y: dragRef.current.offset.y + event.clientY - dragRef.current.y,
      }, viewport, rendered));
    }
  };

  const onPointerEnd = (event: PointerEvent<HTMLElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <main
      ref={sceneRef}
      className={`interactive-scene interactive-scene--${config.id} ${className}`}
      aria-label={`${config.id} navigation scene. Press D for debug mode.`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
    >
      <img
        className="interactive-scene__image"
        src={assetPath(config.background)}
        alt={config.imageAlt}
        draggable={false}
        style={ready ? { left: offset.x, top: offset.y, width: rendered.width, height: rendered.height } : undefined}
        onLoad={(event) => {
          const { naturalWidth, naturalHeight } = event.currentTarget;
          setImage({ width: naturalWidth, height: naturalHeight });
        }}
      />
      {ready && (
        <div
          className={`interactive-scene__canvas${debug ? " interactive-scene__canvas--debug" : ""}`}
          style={{ left: offset.x, top: offset.y, width: rendered.width, height: rendered.height }}
        >
          {config.fires?.map((fire) => (
            <span
              className="interactive-scene__fire"
              key={fire.id}
              aria-hidden="true"
              style={{
                left: `${fire.x}%`,
                top: `${fire.y}%`,
                width: `${fire.width}%`,
                animationDelay: `${fire.delay ?? 0}s`,
              }}
            />
          ))}
          {config.hotspots.map((hotspot) => (
            <Link
              key={hotspot.id}
              to={hotspot.route}
              aria-label={hotspot.label}
              className={`interactive-scene__hotspot interactive-scene__hotspot--${hotspot.hoverEffect ?? "glow"}${hotspot.shape === "ellipse" ? " interactive-scene__hotspot--ellipse" : ""}`}
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                width: `${hotspot.width}%`,
                height: `${hotspot.height}%`,
                transform: hotspot.rotation ? `rotate(${hotspot.rotation}deg)` : undefined,
              }}
              onFocus={() => revealHotspot(hotspot)}
              onClick={(event) => openHotspot(event, hotspot.route)}
            >
              <span className="interactive-scene__label">{hotspot.label}</span>
              {debug && (
                <span className="interactive-scene__coordinates" aria-hidden="true">
                  {hotspot.id} · {hotspot.label}<br />
                  x {hotspot.x} y {hotspot.y}<br />
                  w {hotspot.width} h {hotspot.height}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
      {debug && ready && (
        <aside className="interactive-scene__debug" aria-label="Scene debug information">
          <strong>{config.id} / scene coordinates</strong>
          <span>Pointer: {pointer.x.toFixed(1)}%, {pointer.y.toFixed(1)}%</span>
          <span>Image: {Math.round(rendered.width)} × {Math.round(rendered.height)} px</span>
          <span>Bounds: x {Math.round(offset.x)}, y {Math.round(offset.y)}</span>
          <span>Fit: {config.fit ?? "cover"}</span>
          <span>Crop: x {Math.max(0, Math.round(-offset.x))}, y {Math.max(0, Math.round(-offset.y))}</span>
        </aside>
      )}
      <div className={`interactive-scene__fade${exiting ? " interactive-scene__fade--active" : ""}`} aria-hidden="true" />
    </main>
  );
}
