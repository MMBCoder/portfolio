import { test, expect } from "@playwright/test";
import { mockRagApi, seedPersona, trackPageErrors } from "./helpers/mockApi";

/**
 * M2: learning journey — progressive disclosure driven by REAL actions.
 * Chapter completion is event-detected from the store; nothing here
 * clicks a "next" button, because none exists.
 */

test("first visit: welcome → student → chapters complete only via real actions → persists", async ({ page }) => {
  const errors = trackPageErrors(page);
  await mockRagApi(page);           // no seeds — full first-visit flow
  await page.goto("/learn/rag");

  // persona welcome → student starts the journey
  const dialog = page.getByRole("dialog", { name: "Choose how to explore" });
  await expect(dialog).toBeVisible({ timeout: 15_000 });
  await dialog.getByRole("button", { name: /^Student/ }).click();

  // chapter 1 chip + card, and the dock is soft-gated behind chapter 5
  await expect(page.getByRole("button", { name: /chapter 1 of 8: Ingest a document/ })).toBeVisible();
  const card = page.getByRole("region", { name: /Learning journey/ });
  await expect(card).toBeVisible();
  await expect(card.getByText(/Everything begins with a document/)).toBeVisible();
  await expect(page.getByText(/unlocks in chapter 5 — tune a parameter and re-ask/)).toBeVisible();

  // real action #1: ingest → chapter 2 becomes current
  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });
  await expect(page.getByRole("button", { name: /chapter 2 of 8: Ask your first question/ })).toBeVisible();

  // real action #2: ask (dismiss the card first so nothing overlaps the ask bar)
  await page.getByRole("button", { name: "Dismiss chapter card" }).click();
  await page.getByRole("button", { name: /^try: / }).click();
  await expect(page.locator('button[aria-label*="Evaluation"][aria-label*="done"]')).toBeVisible({ timeout: 60_000 });
  await expect(page.getByRole("button", { name: /chapter 3 of 8: Open a pipeline node/ })).toBeVisible();

  // real action #3: open a node → chapter 4 (trace an answer)
  await page.locator('button[aria-label*="Chunking"]').first().click();
  await expect(page.getByRole("button", { name: /chapter 4 of 8: Trace an answer/ })).toBeVisible();

  // real action #4: the detective walk to the source → chapter 5, dock unlocks
  await page.getByRole("button", { name: "Dismiss chapter card" }).click();
  await page.getByRole("button", { name: "trace this answer" }).click();
  const detective = page.getByRole("dialog", { name: "Evidence detective" });
  await expect(detective).toBeVisible();
  for (let i = 0; i < 4; i++) await detective.getByRole("button", { name: "Next step" }).click();
  await detective.getByRole("button", { name: "case closed" }).click();
  await expect(page.getByRole("button", { name: /chapter 5 of 8: Tune a parameter/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "parameters" })).toBeVisible();

  // progress survives a reload
  await page.reload();
  await expect(page.getByRole("button", { name: /chapter 5 of 8: Tune a parameter/ })).toBeVisible({ timeout: 15_000 });

  expect(errors).toEqual([]);
});

test("soft gate: the folded dock opens early via 'open now' — nothing is ever locked", async ({ page }) => {
  await seedPersona(page, "student", "on");
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await expect(page.getByText(/unlocks in chapter 5/)).toBeVisible({ timeout: 15_000 });
  await expect(page.getByRole("button", { name: "parameters" })).toBeHidden();

  await page.getByRole("button", { name: /or open now/ }).click();
  await expect(page.getByRole("button", { name: "parameters" })).toBeVisible();
});

test("engineer persona defaults journey-off: no chip, dock immediately available", async ({ page }) => {
  // seed ONLY the persona — the journey must be off by the engineer's default
  await page.addInitScript(() => {
    window.localStorage.setItem("rag-viz:ui", JSON.stringify({
      v: 1, data: { persona: "engineer", personaChosen: true, dismissedMoments: [] },
    }));
  });
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await expect(page.getByRole("button", { name: /Viewing as AI Engineer/ })).toBeVisible({ timeout: 15_000 });
  await expect(page.getByRole("button", { name: /Learning journey/ })).toBeHidden();
  await expect(page.getByRole("button", { name: "parameters" })).toBeVisible();
});

test("journey is fully ignorable: dismiss card, reopen from chip, turn off entirely", async ({ page }) => {
  await seedPersona(page, "student", "on");
  await mockRagApi(page);
  await page.goto("/learn/rag");

  const card = page.getByRole("region", { name: /Learning journey/ });
  await expect(card).toBeVisible({ timeout: 15_000 });

  // dismiss → card gone, chip stays
  await page.getByRole("button", { name: "Dismiss chapter card" }).click();
  await expect(card).toBeHidden();
  const chip = page.getByRole("button", { name: /chapter 1 of 8/ });
  await expect(chip).toBeVisible();

  // chip reopens the card
  await chip.click();
  await expect(card).toBeVisible();

  // turn off journey → chip disappears, dock un-gates
  await card.getByRole("button", { name: "turn off journey" }).click();
  await expect(chip).toBeHidden();
  await expect(page.getByRole("button", { name: "parameters" })).toBeVisible();
});
