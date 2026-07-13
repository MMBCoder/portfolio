import { test, expect } from "@playwright/test";
import { mockRagApi, seedPersona } from "./helpers/mockApi";

/**
 * M7: embedding universe — verified through the DATA VIEW, which is the
 * same derivation the 3D scene renders (a11y parity by construction).
 */

test("ask → retrieved rows in the universe data view match the answer's sources", async ({ page }) => {
  await seedPersona(page, "engineer");
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });
  await page.getByRole("button", { name: /^try: / }).click();
  await expect(page.locator('button[aria-label*="Evaluation"][aria-label*="done"]')).toBeVisible({ timeout: 60_000 });

  // open the embeddings node → universe shell with 3d/data toggle
  await page.locator('button[aria-label*="Embeddings"]').first().click();
  await page.getByRole("button", { name: "data view" }).click();

  const table = page.getByRole("table", { name: "Embedding universe data" });
  await expect(table).toBeVisible();

  // retrieved rows exist, carry similarity, and match the sources panel count
  const retrievedRows = page.locator("[data-universe-row][data-retrieved]");
  const count = await retrievedRows.count();
  expect(count).toBeGreaterThan(0);
  await expect(page.getByText(new RegExp(`^sources · ${count}`, "i"))).toBeVisible();
  await expect(retrievedRows.first().getByText(/%$/).first()).toBeVisible();
  await expect(retrievedRows.first().getByText("retrieved ✓")).toBeVisible();
});

test("universe degrades honestly: data view always available, 3d expandable", async ({ page }) => {
  await seedPersona(page, "student");
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });
  await page.locator('button[aria-label*="Embeddings"]').first().click();

  // both views reachable; expand opens the featured surface and closes cleanly
  await page.getByRole("button", { name: "data view" }).click();
  await expect(page.getByRole("table", { name: "Embedding universe data" })).toBeVisible();
  await page.getByRole("button", { name: "3d", exact: true }).click();
  await page.getByRole("button", { name: "Expand universe" }).click();
  await expect(page.getByRole("button", { name: "Close universe" })).toBeVisible();
  await page.getByRole("button", { name: "Close universe" }).click();
  await expect(page.getByRole("button", { name: "Close universe" })).toBeHidden();

  // student persona sees the analogy caption
  await expect(page.getByText(/map of meaning/).first()).toBeVisible();
});
