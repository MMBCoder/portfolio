import { test, expect } from "@playwright/test";
import { mockRagApi, seedPersona } from "./helpers/mockApi";

/**
 * V1 characterization: parameter staleness propagation.
 * Changing chunk size re-chunks locally, marks downstream stages stale,
 * and the re-embed button restores the ingested state.
 */
test("chunk-size change marks pipeline stale; re-embed recovers", async ({ page }) => {
  await seedPersona(page);
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });

  // nudge the chunk-size slider — fires rechunkLocal()
  const slider = page.getByRole("slider", { name: "chunk size" });
  await slider.focus();
  await page.keyboard.press("ArrowRight");

  // stale banner + re-embed affordance appear
  await expect(page.getByText(/re-embed/i).first()).toBeVisible();

  // recover via re-embed (mocked embed API)
  await page.getByRole("button", { name: /re-embed & re-index/i }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });
});
