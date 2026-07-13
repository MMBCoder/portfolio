import { test, expect } from "@playwright/test";
import { mockRagApi, seedPersona } from "./helpers/mockApi";

/**
 * V1 characterization: Play Mode transport controls.
 * (Does not wait for a full narrated run — verifies the overlay contract.)
 */
test("play mode: overlay, pause/resume, speed cycle, exit", async ({ page }) => {
  await seedPersona(page);
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await page.getByRole("button", { name: "play mode" }).click();

  // overlay with progress and narration
  await expect(page.getByText(/play mode ·/)).toBeVisible({ timeout: 15_000 });

  // pause → resume
  await page.getByRole("button", { name: "Pause" }).click();
  await expect(page.getByRole("button", { name: "Resume" })).toBeVisible();
  await page.getByRole("button", { name: "Resume" }).click();
  await expect(page.getByRole("button", { name: "Pause" })).toBeVisible();

  // speed cycles 1× → 2×
  await page.getByRole("button", { name: "Playback speed" }).click();
  await expect(page.getByRole("button", { name: "Playback speed" })).toHaveText(/2×/);

  // exit cleanly; controls become usable again
  await page.getByRole("button", { name: "Exit play mode" }).click();
  await expect(page.getByText(/play mode ·/)).toBeHidden();
  await expect(page.getByRole("button", { name: "load sample" })).toBeEnabled();
});
