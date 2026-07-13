import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mockRagApi, seedPersona } from "./helpers/mockApi";

/**
 * M13 hardening: axe audit across the main modes. Serious/critical
 * violations fail the build; the scan runs on REAL post-run state.
 */

const seriousOrWorse = (results: Awaited<ReturnType<AxeBuilder["analyze"]>>) =>
  results.violations.filter(v => v.impact === "serious" || v.impact === "critical");

async function scan(page: import("@playwright/test").Page, scope?: string) {
  let builder = new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]);
  // the site's global nav/footer are outside this feature's scope
  builder = scope ? builder.include(scope) : builder.exclude("nav").exclude("footer");
  return builder.analyze();
}

const describeViolations = (results: Awaited<ReturnType<AxeBuilder["analyze"]>>) =>
  seriousOrWorse(results).map(v =>
    `${v.id} (${v.impact}): ${v.nodes.slice(0, 4).map(n => n.target.join(" ")).join(" | ")}`);

test("explore mode (with data + inspector) has no serious a11y violations", async ({ page }) => {
  await seedPersona(page, "student");
  await mockRagApi(page);
  await page.goto("/learn/rag");
  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });
  await page.getByRole("button", { name: /^try: / }).click();
  await expect(page.locator('button[aria-label*="Evaluation"][aria-label*="done"]')).toBeVisible({ timeout: 60_000 });
  await page.locator('button[aria-label*="Chunking"]').first().click();

  const results = await scan(page);
  expect(describeViolations(results)).toEqual([]);
});

test("brain overlay and detective dialog have no serious a11y violations", async ({ page }) => {
  await seedPersona(page, "engineer");
  await mockRagApi(page);
  await page.goto("/learn/rag");
  await page.getByRole("button", { name: "load sample" }).click();
  await expect(page.getByText("ingested — ask anything")).toBeVisible({ timeout: 30_000 });
  await page.getByRole("button", { name: /^try: / }).click();
  await expect(page.locator('button[aria-label*="Evaluation"][aria-label*="done"]')).toBeVisible({ timeout: 60_000 });

  await page.locator('[data-support="supported"]').first().click();
  await expect(page.getByRole("dialog", { name: "Evidence detective" })).toBeVisible();
  await page.waitForTimeout(450);   // let the entrance opacity animation settle before compositing
  const detective = await scan(page, '[role="dialog"]');
  expect(describeViolations(detective)).toEqual([]);
  await page.keyboard.press("Escape");

  await page.locator('button[aria-label*="GPT-5 mini"]').first().click();
  await page.getByRole("button", { name: /inside gpt's brain/ }).click();
  await expect(page.getByRole("dialog", { name: "Inside GPT's brain" })).toBeVisible();
  await page.waitForTimeout(450);
  const brain = await scan(page, '[role="dialog"]');
  expect(describeViolations(brain)).toEqual([]);
});

test("presentation shell (cinema dark) passes the contrast audit", async ({ page }) => {
  await seedPersona(page, "engineer");
  await page.addInitScript(() => window.localStorage.setItem("rag-viz:fast-play", "1"));
  await mockRagApi(page);
  await page.goto("/learn/rag");
  await page.getByRole("button", { name: "Enter presentation mode" }).click();
  await expect(page.locator("[data-presentation-shell]")).toBeVisible();
  await expect(page.locator("[data-presentation-narration]")).not.toHaveText("Rolling…", { timeout: 20_000 });

  const results = await scan(page, "[data-presentation-shell]");
  expect(describeViolations(results)).toEqual([]);
});
