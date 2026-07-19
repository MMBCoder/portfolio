import type { Page, Route } from "@playwright/test";

/**
 * Deterministic bag-of-words embedding: hashes each word into one of 32
 * dimensions, L2-normalised. Texts sharing words are cosine-similar, so
 * retrieval behaves sensibly without OpenAI (and without cost) in CI.
 */
export function fakeVec(text: string): number[] {
  const v = new Array(32).fill(0);
  for (const w of text.toLowerCase().match(/[a-z0-9]+/g) ?? []) {
    let h = 0;
    for (let i = 0; i < w.length; i++) h = (h * 31 + w.charCodeAt(i)) >>> 0;
    v[h % 32] += 1;
  }
  const n = Math.sqrt(v.reduce((s: number, x: number) => s + x * x, 0)) || 1;
  return v.map((x: number) => x / n);
}

export const MOCK_ANSWER =
  "The Voyager card includes airport lounge access and travel insurance [1]. " +
  "Eligibility criteria are described in the application guide [2]. " +
  "Cardholders also enjoy a dedicated 24/7 concierge service.";   // deliberately uncited → judged unsupported

const json = (route: Route, body: unknown) =>
  route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(body) });

/** Intercept all /api/rag routes with deterministic fixtures. */
export async function mockRagApi(page: Page): Promise<void> {
  // access gate: open by default so existing specs never see the overlay
  await page.route("**/api/rag/gate", async route => {
    if (route.request().method() === "GET") return json(route, { required: false, unlocked: true });
    return json(route, { unlocked: true });
  });

  await page.route("**/api/rag/embed", async route => {
    const { texts } = route.request().postDataJSON() as { texts: string[] };
    await json(route, { vectors: texts.map(fakeVec), tokens: texts.length * 12 });
  });

  await page.route("**/api/rag/rerank", async route => {
    const { candidates } = route.request().postDataJSON() as { candidates: { id: number }[] };
    await json(route, {
      scores: candidates.map((c, i) => ({ id: c.id, score: 92 - i * 7 })),
      promptTokens: 180, completionTokens: 24,
    });
  });

  await page.route("**/api/rag/generate", async route => {
    const { stream } = route.request().postDataJSON() as { stream?: boolean };
    if (stream) {
      // NDJSON frames like the real streaming route — words as deltas
      const frames = MOCK_ANSWER.split(/(?<=\s)/).map(w => JSON.stringify({ delta: w }));
      frames.push(JSON.stringify({ done: true, promptTokens: 640, completionTokens: 42 }));
      await route.fulfill({
        status: 200,
        contentType: "application/x-ndjson; charset=utf-8",
        body: frames.join("\n") + "\n",
      });
      return;
    }
    await json(route, { text: MOCK_ANSWER, promptTokens: 640, completionTokens: 42 });
  });

  await page.route("**/api/rag/evaluate", async route => {
    // per-sentence verdicts mirror the judge's rubric deterministically:
    // sentences carrying a [n] citation are supported by those chunks;
    // uncited sentences are unsupported
    const { sentences = [] } = route.request().postDataJSON() as { sentences?: string[] };
    const sentenceVerdicts = sentences.map(s => {
      const evidence = [...s.matchAll(/\[(\d+)\]/g)].map(m => Number(m[1]));
      return evidence.length
        ? { support: "supported", evidence }
        : { support: "unsupported", evidence: [] };
    });
    await json(route, {
      scores: {
        faithfulness: 95, answerRelevance: 91, contextPrecision: 88,
        contextRecall: 84, hallucinationRisk: 7, verdict: "Well grounded in the retrieved context.",
      },
      sentenceVerdicts: sentenceVerdicts.length ? sentenceVerdicts : null,
      promptTokens: 410, completionTokens: 55,
    });
  });
}

/** Collect uncaught page errors; assert empty at the end of a spec. */
export function trackPageErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", e => errors.push(e.message));
  return errors;
}

/**
 * Pre-seed a chosen persona so the first-visit welcome dialog doesn't
 * appear, and switch the learning journey off so legacy specs exercise
 * the un-guided experience. Specs exercising the welcome or the journey
 * itself skip this (or pass journey: "on").
 */
export async function seedPersona(
  page: Page,
  persona: "student" | "engineer" | "researcher" | "executive" | "presenter" = "student",
  journey: "on" | "off" = "off",
): Promise<void> {
  await page.addInitScript(({ p, j }) => {
    window.localStorage.setItem("rag-viz:ui", JSON.stringify({
      v: 1, data: { persona: p, personaChosen: true, dismissedMoments: [] },
    }));
    window.localStorage.setItem("rag-viz:journey", JSON.stringify({
      v: 1, data: { completed: [], dismissed: [], override: j },
    }));
  }, { p: persona, j: journey });
}
