import { chat, errorResponse } from "../_lib/openai";

export const runtime = "nodejs";

const SYSTEM = `You are a strict RAG evaluation judge. Given a question, the retrieved context, and the generated answer, score the exchange.
Return STRICT JSON only:
{"faithfulness":<0-100>,"answerRelevance":<0-100>,"contextPrecision":<0-100>,"contextRecall":<0-100>,"hallucinationRisk":<0-100>,"verdict":"<one sentence>"}
Definitions:
- faithfulness: every claim in the answer is supported by the context.
- answerRelevance: the answer actually addresses the question.
- contextPrecision: fraction of retrieved context that was relevant.
- contextRecall: whether the context contained everything needed.
- hallucinationRisk: likelihood the answer contains unsupported claims (higher = worse).`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const question = String(body?.question ?? "").slice(0, 2000);
    const context = String(body?.context ?? "").slice(0, 24000);
    const answer = String(body?.answer ?? "").slice(0, 8000);
    if (!question || !answer) {
      return Response.json({ error: "question and answer are required" }, { status: 400 });
    }

    const user = `Question:\n${question}\n\nRetrieved context:\n${context}\n\nGenerated answer:\n${answer}`;
    const result = await chat(SYSTEM, user, { maxTokens: 400, jsonMode: true });

    let scores: Record<string, number | string> | null = null;
    try {
      const parsed = JSON.parse(result.text);
      const num = (x: unknown) => Math.min(100, Math.max(0, Math.round(Number(x)) || 0));
      scores = {
        faithfulness: num(parsed.faithfulness),
        answerRelevance: num(parsed.answerRelevance),
        contextPrecision: num(parsed.contextPrecision),
        contextRecall: num(parsed.contextRecall),
        hallucinationRisk: num(parsed.hallucinationRisk),
        verdict: String(parsed.verdict ?? "").slice(0, 300),
      };
    } catch {
      // malformed judge output — surface as evaluation failure
    }

    if (!scores) return Response.json({ error: "judge returned malformed output" }, { status: 502 });

    return Response.json({
      scores,
      promptTokens: result.promptTokens,
      completionTokens: result.completionTokens,
    });
  } catch (e) {
    return errorResponse(e);
  }
}
