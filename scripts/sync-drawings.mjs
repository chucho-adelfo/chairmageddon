import { readdir, mkdir, copyFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(projectRoot, "drawings");
const publicRoot = path.join(projectRoot, "public", "assets", "drawings");
const manifestPath = path.join(projectRoot, "src", "config", "drawingManifest.json");
const imageExtension = /\.(jpe?g|png|webp)$/i;
const manifest = [];

for (const folderEntry of await readdir(sourceRoot, { withFileTypes: true })) {
  if (!folderEntry.isDirectory()) continue;
  const folder = folderEntry.name;
  const safeFolder = folder.replaceAll(":", "-");
  const sourceFolder = path.join(sourceRoot, folder);
  const publicFolder = path.join(publicRoot, safeFolder);
  await mkdir(publicFolder, { recursive: true });

  for (const fileEntry of await readdir(sourceFolder, { withFileTypes: true })) {
    if (!fileEntry.isFile() || !imageExtension.test(fileEntry.name)) continue;
    const fileName = fileEntry.name;
    await copyFile(path.join(sourceFolder, fileName), path.join(publicFolder, fileName));
    manifest.push({
      folder,
      fileName,
      src: `/assets/drawings/${safeFolder}/${encodeURIComponent(fileName)}`,
    });
  }
}

manifest.sort((a, b) =>
  a.folder.localeCompare(b.folder) || a.fileName.localeCompare(b.fileName, undefined, { numeric: true }),
);
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Synced ${manifest.length} drawings from ${new Set(manifest.map((work) => work.folder)).size} folders.`);
