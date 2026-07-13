import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  test: {
    environment: "node",          // component tests opt into jsdom per-file
    include: ["src/**/*.test.{ts,tsx}"],
    globals: false,
  },
});
