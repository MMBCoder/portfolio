import { chat, chatStreamResponse, errorResponse } from "../_lib/openai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const system = String(body?.system ?? "").slice(0, 8000);
    const user = String(body?.user ?? "").slice(0, 60000);
    if (!user) return Response.json({ error: "user prompt is required" }, { status: 400 });

    const opts = {
      temperature: typeof body?.temperature === "number" ? body.temperature : undefined,
      maxTokens: typeof body?.maxTokens === "number" ? body.maxTokens : 600,
    };

    // streaming mode (M10): NDJSON token deltas; the JSON path below is
    // kept byte-compatible for every non-brain consumer
    if (body?.stream === true) {
      return await chatStreamResponse(system, user, opts);
    }

    const result = await chat(system, user, opts);
    return Response.json(result);
  } catch (e) {
    return errorResponse(e);
  }
}
