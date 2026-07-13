import { test, expect } from "@playwright/test";
import { mockRagApi, seedPersona, trackPageErrors } from "./helpers/mockApi";

/**
 * M4: replay timeline — scrubbing projects history; the live pipeline
 * is never rewound; params always edit live state.
 */

test("scrub back: artifacts disappear, return-to-live restores them", async ({ page }) => {
  const errors = trackPageErrors(page);
  await seedPersona(page);
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });
  await page.getByRole("button", { name: /^try: / }).click();
  await expect(page.locator('button[aria-label*="Evaluation"][aria-label*="done"]')).toBeVisible({ timeout: 60_000 });
  await expect(page.getByText("grounded answer — hover to trace sources")).toBeVisible();

  // the dock shows the query run's blocks with real durations
  const dock = page.getByTestId("timeline-dock");
  await expect(dock).toBeVisible();
  await expect(dock.locator('button[aria-label^="Scrub to"]')).toHaveCount(7);

  // scrub to before the query ran → the answer vanishes from every view
  const slider = page.getByRole("slider", { name: "Scrub pipeline history" });
  const min = await slider.getAttribute("min");
  await slider.fill(min!);
  await expect(page.getByText(/before the query run started/)).toBeVisible();
  await expect(page.getByText("grounded answer — hover to trace sources")).toBeHidden();

  // live store untouched: return to live restores everything instantly
  await page.getByRole("button", { name: "return to live" }).click();
  await expect(page.getByText("grounded answer — hover to trace sources")).toBeVisible();

  expect(errors).toEqual([]);
});

test("scrubbing during an in-flight run banners and keeps the pipeline running", async ({ page }) => {
  await seedPersona(page);
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await page.getByRole("button", { name: "load sample" }).click();
  // as soon as the first stage lands, scrub back while the rest still runs
  const slider = page.getByRole("slider", { name: "Scrub pipeline history" });
  await expect(slider).toBeVisible({ timeout: 15_000 });
  const min = await slider.getAttribute("min");
  await slider.fill(min!);

  await expect(page.getByText("viewing history — the pipeline is still running live")).toBeVisible();

  // the run finishes anyway — scrubbing never pauses the real pipeline
  await page.getByRole("button", { name: "return to live" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });
});
