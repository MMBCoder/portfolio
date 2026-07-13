import { test, expect } from "@playwright/test";
import { mockRagApi, seedPersona } from "./helpers/mockApi";

/**
 * M8: comprehension cluster — Prompt MRI, the context vessel (which
 * shares its packing function with the real prompt stage), the cost
 * meter, and the executive ROI card with visible assumptions.
 */

test("prompt MRI + vessel: budget drag evicts chunks live, and the next prompt matches", async ({ page }) => {
  await seedPersona(page, "engineer");
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });
  await page.getByRole("button", { name: /^try: / }).click();
  await expect(page.locator('button[aria-label*="Evaluation"][aria-label*="done"]')).toBeVisible({ timeout: 60_000 });

  // open the prompt node → MRI donut + vessel
  await page.locator('button[aria-label*="Prompt Builder"], button[aria-label*="Prompt"]').first().click();
  await expect(page.getByRole("img", { name: /Prompt token composition/ })).toBeVisible();
  const vessel = page.getByRole("img", { name: /Context vessel/ });
  await expect(vessel).toBeVisible();
  const keptBefore = await page.locator("[data-vessel-chunk]").count();
  expect(keptBefore).toBeGreaterThan(0);

  // widen the selection (top-K → 8), then starve the budget →
  // the vessel re-flows instantly and shows evictions
  const topK = page.getByRole("slider", { name: "top-K" });
  await topK.focus();
  for (let i = 0; i < 8; i++) await page.keyboard.press("ArrowRight");
  const budget = page.getByRole("slider", { name: "context budget" });
  await budget.fill("500");
  await expect(page.locator("[data-vessel-evicted]").first()).toBeVisible();
  const keptAfter = await page.locator("[data-vessel-chunk]").count();
  expect(keptAfter).toBeGreaterThan(0);   // vessel never empties: rank #1 always fits

  // the REAL prompt respects the same packing: re-ask and compare
  const ask = page.getByPlaceholder(/ask anything about the document/);
  await ask.fill("What travel benefits are included?");
  await ask.press("Enter");
  await expect(page.locator('button[aria-label*="Evaluation"][aria-label*="done"]')).toBeVisible({ timeout: 60_000 });
  await expect(page.getByText(new RegExp(`${keptAfter} chunks in context`))).toBeVisible();
});

test("cost meter shows real spend split; executive ROI card computes from visible assumptions", async ({ page }) => {
  await seedPersona(page, "executive");
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });
  await page.getByRole("button", { name: /^try: / }).click();
  await expect(page.getByText(/^groundedness/).first()).toBeVisible();
  await expect(page.locator('button[aria-label*="Evaluation"][aria-label*="done"]').or(page.getByText(/share of answer backed/))).toBeVisible({ timeout: 60_000 });

  // ROI card: measured cost/question + estimate labels + editable assumptions
  const roiCard = page.getByText("roi projection — estimate, from your assumptions below");
  await expect(roiCard).toBeVisible();
  await expect(page.getByText(/1 question this session/)).toBeVisible({ timeout: 30_000 });

  const monthly = page.locator("[data-roi-monthly]");
  const before = await monthly.textContent();
  await page.getByRole("spinbutton", { name: "questions / month" }).fill("4000");
  await expect(monthly).not.toHaveText(before!);

  // cost meter (metrics tab) shows the split with real numbers
  await page.getByRole("button", { name: "metrics" }).click();
  await expect(page.getByText("cost meter — real API spend")).toBeVisible();
  await expect(page.getByText("↳ embeddings")).toBeVisible();
  await expect(page.getByText("↳ generation")).toBeVisible();
  await expect(page.getByText("today (all sessions)")).toBeVisible();
});
