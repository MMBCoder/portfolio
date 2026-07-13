import { test, expect } from "@playwright/test";
import { mockRagApi, seedPersona, trackPageErrors } from "./helpers/mockApi";

/**
 * M10: inside GPT's brain — the honest generation theater. The badge is
 * visible in every state; replay reproduces the recorded stream with
 * zero network; the generate stage itself now streams (mocked NDJSON).
 */

test("streamed generation completes the pipeline; brain shows all five acts with the badge", async ({ page }) => {
  const errors = trackPageErrors(page);
  await seedPersona(page, "engineer");
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });
  await page.getByRole("button", { name: /^try: / }).click();
  // the STREAMED answer lands and the pipeline finishes exactly like V1
  await expect(page.locator('button[aria-label*="Evaluation"][aria-label*="done"]')).toBeVisible({ timeout: 60_000 });
  await expect(page.getByText(/lounge access and travel insurance/)).toBeVisible();

  // enter the brain from the generate node
  await page.locator('button[aria-label*="GPT-5 mini"]').first().click();
  await page.getByRole("button", { name: /inside gpt's brain/ }).click();
  const dialog = page.getByRole("dialog", { name: "Inside GPT's brain" });
  await expect(dialog).toBeVisible();

  // the honesty badge is present from act 1 and stays through every act
  for (let i = 0; i < 5; i++) {
    await expect(dialog.locator("[data-simulation-badge]")).toBeVisible();
    if (i === 2) {
      // act 3: replay the recorded stream without any network call
      let generateCalls = 0;
      page.on("request", r => { if (r.url().includes("/api/rag/generate")) generateCalls++; });
      await dialog.getByRole("button", { name: /replay the recorded stream/ }).click();
      await expect(dialog.getByText(/lounge access/)).toBeVisible({ timeout: 15_000 });
      expect(generateCalls).toBe(0);
      // engineer persona sees measured stream telemetry
      await expect(dialog.locator("[data-brain-stats]")).toBeVisible();
    }
    if (i === 3) {
      // act 4: citations in first-appearance order
      await expect(dialog.getByText(/#1 cited → \[\d+\]/)).toBeVisible();
    }
    if (i === 4) {
      // act 5: assembly with judge tags, including the unsupported one
      await expect(dialog.getByText("(unsupported)")).toBeVisible();
    }
    if (i < 4) await dialog.getByRole("button", { name: "Next act" }).click();
  }

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  expect(errors).toEqual([]);
});
