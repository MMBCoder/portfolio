import { defineConfig } from "@playwright/test";

const PORT = 3200;

export default defineConfig({
  testDir: "e2e",
  timeout: 120_000,
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    viewport: { width: 1440, height: 900 },
    trace: "retain-on-failure",
  },
  webServer: {
    // Turbopack crashes on this machine — webpack only.
    command: `npx next dev --webpack -p ${PORT}`,
    url: `http://localhost:${PORT}/learn/rag`,
    reuseExistingServer: true,
    timeout: 240_000,
  },
});
