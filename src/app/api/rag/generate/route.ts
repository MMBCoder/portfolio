import { chat, errorResponse } from "../_lib/openai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const system = String(body?.system ?? "").slice(0, 8000);
    const user = String(body?.user ?? "").slice(0, 60000);
    if (!user) return Response.json({ error: "user prompt is required" }, { status: 400 });

    const result = await chat(system, user, {
      temperature: typeof body?.temperature === "number" ? body.temperature : undefined,
      maxTokens: typeof body?.maxTokens === "number" ? body.maxTokens : 600,
    });

    return Response.json(result);
  } catch (e) {
    return errorResponse(e);
  }
}
