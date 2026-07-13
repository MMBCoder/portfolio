import { test, expect } from "@playwright/test";
import { mockRagApi, trackPageErrors, seedPersona } from "./helpers/mockApi";

/**
 * V1 characterization: the full sample-document journey.
 * Ingest → ask → grounded answer with citations → sources → export available.
 */
test("sample document: ingest, ask, grounded answer", async ({ page }) => {
  const errors = trackPageErrors(page);
  await seedPersona(page);
  await mockRagApi(page);

  await page.goto("/learn/rag");
  await expect(page.getByRole("heading", { name: /rag pipeline/i })).toBeVisible();

  // ── ingestion ──
  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });

  // all 7 ingestion stages report done
  for (const stage of ["Upload", "Parsing", "Cleaning", "Chunking", "Tokenization", "Embeddings", "Vector Index"]) {
    await expect(page.locator(`button[aria-label*="${stage}"][aria-label*="done"]`).first()).toBeVisible();
  }

  // ── query ──
  await page.getByRole("button", { name: /^try: / }).click();
  await expect(page.locator('button[aria-label*="Evaluation"][aria-label*="done"]')).toBeVisible({ timeout: 60_000 });

  // grounded answer with citation markers and sources column
  await expect(page.getByText(/lounge access and travel insurance/)).toBeVisible();
  await expect(page.getByText("grounded answer — hover to trace sources")).toBeVisible();
  await expect(page.getByText(/^sources ·/i)).toBeVisible();
  await expect(page.getByText(/chunk \d+ · page \d+/i).first()).toBeVisible();

  // export appears once a session exists
  await expect(page.getByRole("button", { name: "Export session as JSON" })).toBeVisible();

  expect(errors).toEqual([]);
});

test("node inspector opens per stage and survives switching", async ({ page }) => {
  await seedPersona(page);
  await mockRagApi(page);
  await page.goto("/learn/rag");
  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });

  // open chunking view, then switch views — the Rules-of-Hooks regression guard
  const errors = trackPageErrors(page);
  await page.locator('button[aria-label*="Chunking"]').first().click();
  await expect(page.getByText("node inspector").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "chunking." })).toBeVisible();

  await page.locator('button[aria-label*="Embeddings"]').first().click();
  await expect(page.getByRole("heading", { name: "embeddings." })).toBeVisible();

  await page.locator('button[aria-label*="Vector Index"]').first().click();
  await expect(page.getByRole("heading", { name: "vector index." })).toBeVisible();

  // during the AnimatePresence crossfade two asides briefly coexist — target the live one
  await page.getByRole("button", { name: "Close inspector" }).last().click();
  await expect(page.getByText("node inspector").first()).toBeHidden();
  expect(errors).toEqual([]);
});
