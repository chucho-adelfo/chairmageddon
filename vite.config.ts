import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

declare const process: { env: Record<string, string | undefined> };

const [owner, repository] = process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const isAccountSite = repository?.toLowerCase() === `${owner?.toLowerCase()}.github.io`;
const base = process.env.SITE_BASE_PATH ?? (repository && !isAccountSite ? `/${repository}/` : "/");

export default defineConfig({
  plugins: [react()],
  base,
});
