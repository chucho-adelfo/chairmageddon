import { copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
await copyFile(path.join(projectRoot, "dist", "index.html"), path.join(projectRoot, "dist", "404.html"));
