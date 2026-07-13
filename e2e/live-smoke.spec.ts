import { test, expect } from "@playwright/test";

/**
 * Live smoke test — real OpenAI calls, real cost (~$0.002).
 * Run explicitly with:  RAG_LIVE=1 npx playwright test live-smoke
 * Requires OPENAI_API_KEY in .env.local. Never runs in normal suites.
 */
test.skip(!process.env.RAG_LIVE, "set RAG_LIVE=1 to run the live OpenAI smoke test");

test("live: sample ingest and question produce an evaluated grounded answer", async ({ page }) => {
  test.setTimeout(300_000);
  await page.goto("/learn/rag");

  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 120_000 });

  await page.getByRole("button", { name: /^try: / }).click();
  await expect(page.locator('button[aria-label*="Evaluation"][aria-label*="done"]'))
    .toBeVisible({ timeout: 240_000 });

  await expect(page.getByText(/grounded answer/i)).toBeVisible();
  await expect(page.getByText(/^sources ·/i)).toBeVisible();
});
