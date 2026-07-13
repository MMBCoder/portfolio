import { test, expect } from "@playwright/test";
import { mockRagApi, seedPersona, trackPageErrors } from "./helpers/mockApi";

/**
 * M9: trust cluster — per-sentence verdict tints (never color-only),
 * the hallucination radar, and the detective's five-step backward walk
 * with an evidence hunt for unsupported claims.
 */

async function askSample(page: import("@playwright/test").Page) {
  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });
  await page.getByRole("button", { name: /^try: / }).click();
  await expect(page.locator('button[aria-label*="Evaluation"][aria-label*="done"]')).toBeVisible({ timeout: 60_000 });
}

test("sentences carry judge tints with non-color markers; radar renders real scores", async ({ page }) => {
  const errors = trackPageErrors(page);
  await seedPersona(page, "student");
  await mockRagApi(page);
  await page.goto("/learn/rag");
  await askSample(page);

  // two supported sentences + the deliberately uncited one, marked beyond color
  await expect(page.locator('[data-support="supported"]')).toHaveCount(2);
  const unsupported = page.locator('[data-support="unsupported"]');
  await expect(unsupported).toHaveCount(1);
  await expect(unsupported.getByLabel("unsupported claim")).toBeVisible();   // the ⚠ glyph

  // radar in the evaluation node, risk axis inverted and labelled
  await page.locator('button[aria-label*="Evaluation"]').first().click();
  await expect(page.getByRole("img", { name: /Evaluation radar/ })).toBeVisible();
  await expect(page.getByText(/safety \(100−risk\) 93/)).toBeVisible();
  await expect(page.getByText(/LLM judgment, not ground truth/).first()).toBeVisible();

  expect(errors).toEqual([]);
});

test("detective walks a supported claim to its source page", async ({ page }) => {
  await seedPersona(page, "engineer");
  await mockRagApi(page);
  await page.goto("/learn/rag");
  await askSample(page);

  await page.locator('[data-support="supported"]').first().click();
  const dialog = page.getByRole("dialog", { name: "Evidence detective" });
  await expect(dialog).toBeVisible();

  // step 1: the claim, judged
  await expect(dialog.getByText(/judge: supported by the document/)).toBeVisible();
  // step 2: the evidence with real retrieval scores
  await dialog.getByRole("button", { name: "Next step" }).click();
  await expect(dialog.locator("[data-detective-evidence]").first()).toBeVisible();
  await expect(dialog.getByText(/sim \d+%/).first()).toBeVisible();
  // step 3: placement inside the prompt
  await dialog.getByRole("button", { name: "Next step" }).click();
  await expect(dialog.getByText(/slot \d+ of \d+ in the context block/).first()).toBeVisible();
  // step 4: the scores that chose it
  await dialog.getByRole("button", { name: "Next step" }).click();
  await expect(dialog.getByText("semantic").first()).toBeVisible();
  // step 5: back to the page
  await dialog.getByRole("button", { name: "Next step" }).click();
  await expect(dialog.locator("[data-detective-source]")).toBeVisible();
  await dialog.getByRole("button", { name: "case closed" }).click();
  await expect(dialog).toBeHidden();
});

test("unsupported claim: evidence hunt embeds the sentence and diagnoses the failure", async ({ page }) => {
  await seedPersona(page, "engineer");
  await mockRagApi(page);
  await page.goto("/learn/rag");
  await askSample(page);

  await page.locator('[data-support="unsupported"]').click();
  const dialog = page.getByRole("dialog", { name: "Evidence detective" });
  await expect(dialog.getByText(/judge: unsupported/)).toBeVisible();

  // the evidence step offers the hunt instead of citations
  await dialog.getByRole("button", { name: "Next step" }).click();
  await dialog.getByRole("button", { name: /find nearest evidence/ }).click();
  await expect(dialog.locator("[data-nearest-evidence]").first()).toBeVisible({ timeout: 15_000 });
  await expect(dialog.getByText(/sim \d+%/).first()).toBeVisible();
  // a diagnosis sentence quoting real numbers appears
  await expect(dialog.getByText(/threshold|top-K|overclaimed/).first()).toBeVisible();
});
