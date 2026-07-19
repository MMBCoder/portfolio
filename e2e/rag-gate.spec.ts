import { test, expect } from "@playwright/test";
import { mockRagApi } from "./helpers/mockApi";

/**
 * Access gate UX. The API routes are mocked, so this exercises the
 * client unlock flow against mocked gate responses: locked → wrong code
 * → correct code → lab usable.
 */

test("gated lab: overlay blocks until the correct passphrase is entered", async ({ page }) => {
  await mockRagApi(page);
  // override the default open-gate mock: this visitor is gated + locked
  let unlocked = false;
  await page.route("**/api/rag/gate", async route => {
    const body = (route.request().method() === "POST"
      ? route.request().postDataJSON() as { code?: string }
      : {}) as { code?: string };
    if (route.request().method() === "GET") {
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ required: true, unlocked }) });
    }
    if (body.code === "let-me-in") {
      unlocked = true;
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ unlocked: true }) });
    }
    return route.fulfill({ status: 401, contentType: "application/json", body: JSON.stringify({ error: "Incorrect passphrase." }) });
  });
  // seed a persona so only the gate blocks (not the welcome dialog)
  await page.addInitScript(() => {
    window.localStorage.setItem("rag-viz:ui", JSON.stringify({
      v: 1, data: { persona: "student", personaChosen: true, dismissedMoments: [] },
    }));
  });

  await page.goto("/learn/rag");

  const gate = page.getByRole("dialog", { name: "Enter lab passphrase" });
  await expect(gate).toBeVisible({ timeout: 15_000 });

  // wrong passphrase → inline error, still locked
  await gate.getByLabel("Passphrase").fill("wrong");
  await gate.getByRole("button", { name: "unlock the lab" }).click();
  await expect(gate.getByRole("alert")).toHaveText(/Incorrect passphrase/);
  await expect(gate).toBeVisible();

  // correct passphrase → overlay dismisses, the lab is usable
  await gate.getByLabel("Passphrase").fill("let-me-in");
  await gate.getByRole("button", { name: "unlock the lab" }).click();
  await expect(gate).toBeHidden();
  await expect(page.getByRole("button", { name: "load sample" })).toBeEnabled();
});

test("ungated lab: no overlap, works immediately (default open gate)", async ({ page }) => {
  await mockRagApi(page);   // default gate mock reports required:false
  await page.addInitScript(() => {
    window.localStorage.setItem("rag-viz:ui", JSON.stringify({
      v: 1, data: { persona: "student", personaChosen: true, dismissedMoments: [] },
    }));
  });
  await page.goto("/learn/rag");

  await expect(page.getByRole("button", { name: "load sample" })).toBeVisible();
  await expect(page.getByRole("dialog", { name: "Enter lab passphrase" })).toBeHidden();
});
