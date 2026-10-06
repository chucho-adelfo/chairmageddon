import { Link } from "react-router-dom";
import type { HotspotConfig } from "../types/site";

type NavigationHotspotProps = {
  hotspot: HotspotConfig;
  selected: boolean;
  debugMode: boolean;
  onSelect: (hotspot: HotspotConfig) => void;
  onClear: () => void;
};

export default function NavigationHotspot({
  hotspot,
  selected,
  debugMode,
  onSelect,
  onClear,
}: NavigationHotspotProps) {
  const labelPosition = hotspot.labelPosition ?? "top";
  const className = [
    "navigation-hotspot",
    selected ? "navigation-hotspot--selected" : "",
    debugMode ? "navigation-hotspot--debug" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      aria-label={`Open ${hotspot.label}`}
      className={className}
      data-debug-id={hotspot.id}
      onBlur={onClear}
      onFocus={() => onSelect(hotspot)}
      onMouseEnter={() => onSelect(hotspot)}
      onMouseLeave={onClear}
      style={{
        left: `${hotspot.position.x}%`,
        top: `${hotspot.position.y}%`,
        width: `${hotspot.position.width}%`,
        height: `${hotspot.position.height}%`,
      }}
      tabIndex={hotspot.disabled ? -1 : 0}
      to={hotspot.disabled ? "#" : hotspot.route}
    >
      <span className={`hotspot-label hotspot-label--${labelPosition}`}>
        {hotspot.label}
      </span>
    </Link>
  );
}
