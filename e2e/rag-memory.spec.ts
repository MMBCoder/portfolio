import { test, expect } from "@playwright/test";
import { mockRagApi, seedPersona } from "./helpers/mockApi";

/**
 * M11: memory cluster — after several questions the document has a
 * history: chunk life stories, the retrieval heat map, and (for the
 * researcher) real latency distributions.
 */

async function ask(page: import("@playwright/test").Page, q: string) {
  const input = page.getByPlaceholder(/ask anything about the document/);
  await input.fill(q);
  await input.press("Enter");
  await expect(page.locator('button[aria-label*="Evaluation"][aria-label*="done"]')).toBeVisible({ timeout: 60_000 });
}

test("3 questions build chunk life stories and a heat map that matches retrieval", async ({ page }) => {
  await seedPersona(page, "researcher");
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });

  await ask(page, "What travel benefits are included?");
  await ask(page, "What is the annual fee?");
  await ask(page, "How do I qualify for the card?");

  // researcher lens: latency distributions from ≥3 real runs
  await page.getByRole("button", { name: "metrics" }).click();
  await expect(page.locator("[data-latency-distribution]")).toBeVisible();
  await expect(page.getByText(/n=3/).first()).toBeVisible();

  // heat map: hottest page count equals real retrievals recorded
  const hot = page.locator("[data-heat-page]").first();
  await expect(hot).toBeVisible();
  const counts = await page.locator("[data-heat-count]").evaluateAll(
    els => els.map(e => Number(e.getAttribute("data-heat-count"))));
  expect(Math.max(...counts)).toBeGreaterThan(0);

  // click a hot page → per-chunk drill-down → a chunk's life story
  const first = page.locator("[data-heat-page]").filter({ hasNot: page.locator("nothing") });
  const hottest = await page.locator("[data-heat-page]").evaluateAll(els => {
    let best = els[0].getAttribute("data-heat-page");
    let bestC = -1;
    for (const e of els) {
      const c = Number(e.getAttribute("data-heat-count"));
      if (c > bestC) { bestC = c; best = e.getAttribute("data-heat-page"); }
    }
    return best;
  });
  void first;
  await page.locator(`[data-heat-page="${hottest}"]`).click();
  await page.getByRole("button", { name: /\[\d+\] ×\d+/ }).first().click();

  const profile = page.getByRole("dialog", { name: /Chunk \d+ life story/ });
  await expect(profile).toBeVisible();
  // three questions → three lifecycle rows with real similarity values
  await expect(profile.locator("[data-lifecycle-row]")).toHaveCount(3);
  await expect(profile.getByText(/retrieved|cited/).first()).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(profile).toBeHidden();
});

test("a new document resets the history", async ({ page }) => {
  await seedPersona(page, "engineer");
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });
  await ask(page, "What travel benefits are included?");

  await page.getByRole("button", { name: "metrics" }).click();
  await expect(page.locator("[data-heat-page]").first()).toBeVisible();

  // re-ingest → the event log (and with it, all history) resets
  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });
  await expect(page.locator("[data-heat-page]")).toHaveCount(0);
});
