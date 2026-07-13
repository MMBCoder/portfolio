import { test, expect } from "@playwright/test";
import { mockRagApi, seedPersona } from "./helpers/mockApi";

/**
 * M13: presentation shell — the presenter persona lands directly in the
 * fullscreen show; hotkeys drive it; the kiosk loop survives restarts.
 */

async function seedFastPlay(page: import("@playwright/test").Page) {
  await page.addInitScript(() => window.localStorage.setItem("rag-viz:fast-play", "1"));
}

test("presenter persona lands in the show: narration, speaker notes, hotkeys", async ({ page }) => {
  await seedPersona(page, "presenter");
  await seedFastPlay(page);
  await mockRagApi(page);
  await page.goto("/learn/rag");

  // the shell auto-opens and the film starts
  const shell = page.locator("[data-presentation-shell]");
  await expect(shell).toBeVisible({ timeout: 15_000 });
  await expect(shell.locator("[data-presentation-narration]")).not.toHaveText("Rolling…", { timeout: 20_000 });

  // presenter persona sees the speaker-notes rail with registry copy
  await expect(shell.locator("[data-speaker-notes]")).toBeVisible();
  await expect(shell.getByText("war story")).toBeVisible();

  // hotkeys: space pauses, ↑ cycles speed, S toggles sound (legend reflects all)
  await page.keyboard.press(" ");
  await expect(shell.getByRole("button", { name: "Resume" })).toBeVisible();
  await page.keyboard.press(" ");
  await page.keyboard.press("ArrowUp");
  await expect(shell.getByText(/speed 2×/)).toBeVisible();
  await page.keyboard.press("s");
  await expect(shell.getByText(/sound on/)).toBeVisible();
  await page.keyboard.press("s");

  // Esc exits cleanly back to the explore surface
  await page.keyboard.press("Escape");
  await expect(shell).toBeHidden();
  await expect(page.getByRole("button", { name: "Enter presentation mode" })).toBeVisible();
});

test("kiosk loop: finale auto-restarts with rotating questions, twice", async ({ page }) => {
  await seedPersona(page, "engineer");   // any persona can present
  await seedFastPlay(page);
  await mockRagApi(page);
  await page.goto("/learn/rag");

  await page.getByRole("button", { name: "Enter presentation mode" }).click();
  const shell = page.locator("[data-presentation-shell]");
  await expect(shell).toBeVisible();
  await page.keyboard.press("k");
  await expect(shell.getByText(/kiosk loop/)).toBeVisible();

  // cycle 1 reaches the finale…
  await expect(shell.getByTestId("finale-summary")).toBeVisible({ timeout: 90_000 });
  // …and the loop restarts on its own (narration returns without any input)
  await expect(shell.getByTestId("finale-summary")).toBeHidden({ timeout: 30_000 });
  await expect(shell.locator("[data-presentation-narration]")).toBeVisible();

  // cycle 2 also completes and restarts — the loop is stable
  await expect(shell.getByTestId("finale-summary")).toBeVisible({ timeout: 90_000 });
  await expect(shell.getByTestId("finale-summary")).toBeHidden({ timeout: 30_000 });

  await page.keyboard.press("Escape");
  await expect(shell).toBeHidden();
});
