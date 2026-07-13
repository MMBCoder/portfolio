import { test, expect } from "@playwright/test";
import { mockRagApi, seedPersona } from "./helpers/mockApi";

/**
 * M12: experimentation cluster — pin/compare A/B with embed-reuse cost
 * honesty, hypothesis-first lab presets, and the coach's one-click fixes.
 */

async function ingestAndAsk(page: import("@playwright/test").Page) {
  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });
  await page.getByRole("button", { name: /^try: / }).click();
  await expect(page.locator('button[aria-label*="Evaluation"][aria-label*="done"]')).toBeVisible({ timeout: 60_000 });
}

test("A/B: pin → change top-K → run B → measured diff with $0 embed reuse", async ({ page }) => {
  await seedPersona(page, "engineer");
  await mockRagApi(page);
  await page.goto("/learn/rag");
  await ingestAndAsk(page);

  // pin the run as A
  await page.getByRole("button", { name: "a/b playground" }).click();
  await page.getByRole("button", { name: "pin this run as A" }).click();
  await expect(page.getByText(/A pinned/)).toBeVisible();

  // change a non-chunking dial → param-diff chip + embed re-use at $0
  await page.getByRole("button", { name: "parameters" }).click();
  const topK = page.getByRole("slider", { name: "top-K" });
  await topK.focus();
  for (let i = 0; i < 8; i++) await page.keyboard.press("ArrowRight");
  await page.getByRole("button", { name: "a/b playground" }).click();
  await expect(page.locator('[data-param-diff="topK"]')).toBeVisible();
  await expect(page.getByText(/re-uses A's embeddings: \$0\.0000/)).toBeVisible();

  // run B with the same question → the measured verdict appears
  await page.locator("[data-run-b]").click();
  await expect(page.locator("[data-diff-view]")).toBeVisible({ timeout: 60_000 });
  await expect(page.getByText(/Changed between A and B: topK/)).toBeVisible();
  await expect(page.getByText("answer A")).toBeVisible();
  await expect(page.getByText("answer B")).toBeVisible();
});

test("lab: hypothesis-first preset runs end-to-end and lands in the A/B verdict", async ({ page }) => {
  await seedPersona(page, "engineer");
  await mockRagApi(page);
  await page.goto("/learn/rag");
  await ingestAndAsk(page);

  await page.getByRole("button", { name: "ai lab" }).click();
  await page.locator('[data-lab-preset="top-k-1"]').click();
  // the prediction is stated BEFORE the run
  await expect(page.getByText("hypothesis — predict before you run")).toBeVisible();
  await expect(page.getByText(/Everything rides on one chunk/)).toBeVisible();

  await page.locator("[data-lab-run]").click();
  // verdict lands in the playground tab automatically
  await expect(page.locator("[data-diff-view]")).toBeVisible({ timeout: 60_000 });
  await expect(page.getByText(/Changed between A and B: topK/)).toBeVisible();
});

test("coach: suggestions quote real numbers, apply in one click, and stop nagging", async ({ page }) => {
  await seedPersona(page, "student");
  await mockRagApi(page);
  await page.goto("/learn/rag");
  await ingestAndAsk(page);

  // force an addressable condition: re-ranking off with plenty of candidates
  // (keyboard toggle — a mouse click could land on the concept trigger inside)
  const rerank = page.getByRole("switch", { name: /re-ranking/i });
  if (await rerank.getAttribute("aria-checked") === "true") {
    await rerank.focus();
    await rerank.press(" ");
  }
  await expect(rerank).toHaveAttribute("aria-checked", "false");
  await page.getByPlaceholder(/ask anything about the document/).fill("What is the annual fee?");
  await page.getByPlaceholder(/ask anything about the document/).press("Enter");
  await expect(page.locator('button[aria-label*="Evaluation"][aria-label*="done"]')).toBeVisible({ timeout: 60_000 });

  const badge = page.locator("[data-coach-badge]");
  await expect(badge).toBeVisible();
  await badge.click();
  const insight = page.locator('[data-coach-insight="rerank-off"]');
  await expect(insight).toBeVisible();
  await expect(insight.getByText(/candidates competed with re-ranking off/)).toBeVisible();

  // one-click apply → the condition is gone → the insight disappears
  await page.locator('[data-coach-apply="rerank-off"]').click();
  await expect(insight).toBeHidden();
  await expect(rerank).toHaveAttribute("aria-checked", "true");
});
