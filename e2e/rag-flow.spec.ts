import { test, expect } from "@playwright/test";
import { mockRagApi, seedPersona, trackPageErrors } from "./helpers/mockApi";

/**
 * M3: living data flow — measured SVG edges + typed packets bound to
 * real artifact counts, with a static reduced-motion variant.
 */

test("packets flow during ingestion and are fully cleaned up after", async ({ page }) => {
  const errors = trackPageErrors(page);
  await seedPersona(page);
  await mockRagApi(page);
  await page.goto("/learn/rag");

  // measured edges exist for all 13 stage transitions
  await expect(page.locator("[data-edge]")).toHaveCount(13, { timeout: 15_000 });

  await page.getByRole("button", { name: "load sample" }).click();

  // at least one packet burst crosses an edge while stages hand over
  await page.waitForSelector("[data-packet]", { state: "attached", timeout: 30_000 });

  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });
  // strict lifecycle: every packet element is removed once flights finish
  await expect(page.locator("[data-packet]")).toHaveCount(0, { timeout: 5_000 });

  expect(errors).toEqual([]);
});

test("reduced motion: no packets — static edge highlights carry the meaning", async ({ page }) => {
  await seedPersona(page);
  await mockRagApi(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/learn/rag");

  await expect(page.locator("[data-edge]")).toHaveCount(13, { timeout: 15_000 });
  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });

  // the pipeline ran to completion without a single packet spawn
  await expect(page.locator("[data-packet]")).toHaveCount(0);
});

test("mobile vertical layout still draws every edge", async ({ page }) => {
  await seedPersona(page);
  await mockRagApi(page);
  await page.setViewportSize({ width: 420, height: 900 });
  await page.goto("/learn/rag");

  await expect(page.locator("[data-edge]")).toHaveCount(13, { timeout: 15_000 });
});
