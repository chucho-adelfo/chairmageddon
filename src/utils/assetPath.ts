export function assetPath(path: string): string {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/${cleanPath}`;
}
