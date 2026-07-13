import { test, expect } from "@playwright/test";
import { mockRagApi, seedPersona, trackPageErrors } from "./helpers/mockApi";

/**
 * M5: cinematic play — the 14-beat narrated film with Director camera,
 * two-phase registry narration, and a real-numbers finale summary.
 * Uses the fast-dwell flag: same code path, test-sized dwell.
 */

async function seedFastPlay(page: import("@playwright/test").Page) {
  await page.addInitScript(() => window.localStorage.setItem("rag-viz:fast-play", "1"));
}

test("full play run: narration advances through all beats to a finale with real numbers", async ({ page }) => {
  const errors = trackPageErrors(page);
  await seedPersona(page, "student");
  await seedFastPlay(page);
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await page.getByRole("button", { name: "play mode" }).click();

  // beats progress with registry-voiced narration (student = analogy voice)
  await expect(page.getByText(/play mode · \d+\/14/)).toBeVisible({ timeout: 15_000 });
  await expect(page.getByText(/museum's loading dock/).first()).toBeVisible({ timeout: 15_000 });

  // the finale summary lands with measured values
  const finale = page.getByTestId("finale-summary");
  await expect(finale).toBeVisible({ timeout: 90_000 });
  await expect(finale.getByText("where the time went")).toBeVisible();
  await expect(finale.getByText(/faithfulness/)).toBeVisible();
  await expect(finale.getByText(/session cost \$/)).toBeVisible();

  // the bridge from watching to experimenting
  await page.getByRole("button", { name: "explore freely" }).click();
  await expect(finale).toBeHidden();
  await expect(page.getByText("ingested — ask anything")).toBeVisible();

  expect(errors).toEqual([]);
});

test("Esc always exits play mode cleanly", async ({ page }) => {
  await seedPersona(page, "student");
  await seedFastPlay(page);
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await page.getByRole("button", { name: "play mode" }).click();
  await expect(page.getByText(/play mode · \d+\/14/)).toBeVisible({ timeout: 15_000 });

  await page.keyboard.press("Escape");
  await expect(page.getByText(/play mode · \d+\/14/)).toBeHidden();
  // chrome restored: play can start again immediately
  await expect(page.getByRole("button", { name: "play mode" })).toBeEnabled();
});

test("engineer persona hears the technical voice during play", async ({ page }) => {
  await seedPersona(page, "engineer");
  await seedFastPlay(page);
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await page.getByRole("button", { name: "play mode" }).click();
  // technical intro for upload quotes the registry's technical definition
  await expect(page.getByText(/byte-level intake/).first()).toBeVisible({ timeout: 15_000 });
  await page.keyboard.press("Escape");
});
