import { test, expect } from "@playwright/test";
import { mockRagApi, seedPersona, trackPageErrors } from "./helpers/mockApi";

/**
 * M1: persona system — five lenses over one component tree.
 */

test("first visit: welcome dialog picks a persona and persists it", async ({ page }) => {
  const errors = trackPageErrors(page);
  await mockRagApi(page);        // no seedPersona — we WANT the welcome
  await page.goto("/learn/rag");

  // welcome appears after hydration
  const dialog = page.getByRole("dialog", { name: "Choose how to explore" });
  await expect(dialog).toBeVisible({ timeout: 15_000 });
  await dialog.getByRole("button", { name: /AI Engineer/ }).click();
  await expect(dialog).toBeHidden();

  // header switcher reflects the choice
  await expect(page.getByRole("button", { name: /Viewing as AI Engineer/ })).toBeVisible();

  // persists across reload — no welcome the second time
  await page.reload();
  await expect(page.getByRole("button", { name: /Viewing as AI Engineer/ })).toBeVisible({ timeout: 15_000 });
  await expect(page.getByRole("dialog", { name: "Choose how to explore" })).toBeHidden();

  expect(errors).toEqual([]);
});

test("engineer persona: inspector gains a live raw-JSON artifact tab", async ({ page }) => {
  await seedPersona(page, "engineer");
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });

  await page.locator('button[aria-label*="Chunking"]').first().click();
  await expect(page.getByRole("button", { name: "raw json" })).toBeVisible();
  await page.getByRole("button", { name: "raw json" }).click();

  // real artifact fields from the live store
  await expect(page.getByText(/"overlapChars"/).first()).toBeVisible();
  await expect(page.getByText(/live artifact — real pipeline data/)).toBeVisible();
});

test("student persona: no raw tab; concept card opens with analogy voice", async ({ page }) => {
  await seedPersona(page, "student");
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });

  await page.locator('button[aria-label*="Chunking"]').first().click();
  await expect(page.getByRole("button", { name: "raw json" })).toBeHidden();

  // concept trigger on the chunk-size param label
  await page.getByRole("button", { name: "Explain: Chunking" }).first().click();
  await expect(page.getByRole("dialog", { name: "Chunking" })).toBeVisible();
  await expect(page.getByText(/index cards/).first()).toBeVisible();   // student analogy leads
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Chunking" })).toBeHidden();
});

test("executive persona: outcome strip leads, pipeline collapses but can expand", async ({ page }) => {
  await seedPersona(page, "executive");
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await expect(page.getByText("business outcomes — measured live")).toBeVisible({ timeout: 15_000 });
  await expect(page.getByText(/groundedness/i).first()).toBeVisible();

  // pipeline starts collapsed for executives…
  const toggle = page.getByRole("button", { name: /how it works — the 14-step pipeline/ });
  await expect(toggle).toBeVisible();
  await expect(page.getByText("① Ingestion — document → vector index")).toBeHidden();

  // …but is one click away (soft collapse, never hidden)
  await toggle.click();
  await expect(page.getByText("① Ingestion — document → vector index")).toBeVisible();
});

test("switching persona re-lenses the same state instantly", async ({ page }) => {
  await seedPersona(page, "student");
  await mockRagApi(page);
  await page.goto("/learn/rag");
  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });

  await page.getByRole("button", { name: /Viewing as Student/ }).click();
  await page.getByRole("button", { name: /Executive/ }).click();

  // same ingested document, new lens — outcome strip appears without reload
  await expect(page.getByText("business outcomes — measured live")).toBeVisible();
  await expect(page.getByText("ingested — ask anything")).toBeVisible();
});
