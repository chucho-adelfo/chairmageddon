import drawingManifest from "./drawingManifest.json";

export type DrawingWork = {
  fileName: string;
  src: string;
};

const byFolder = new Map<string, DrawingWork[]>();

for (const { folder, fileName, src } of drawingManifest) {
  const works = byFolder.get(folder) ?? [];
  works.push({ fileName, src });
  byFolder.set(folder, works);
}

const fileOrder = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
for (const works of byFolder.values()) {
  works.sort((a, b) => fileOrder.compare(a.fileName, b.fileName));
}

export function drawingsInFolder(folder: string): DrawingWork[] {
  return byFolder.get(folder) ?? [];
}
