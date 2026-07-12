import { errorResponse, openaiJson } from "../_lib/openai";

export const runtime = "nodejs";

interface EmbedResponse {
  data: { index: number; embedding: number[] }[];
  usage: { total_tokens: number };
}

const MAX_TEXTS = 200;
const MAX_CHARS = 6000;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const texts: unknown = body?.texts;
    if (!Array.isArray(texts) || texts.length === 0) {
      return Response.json({ error: "texts must be a non-empty array" }, { status: 400 });
    }
    if (texts.length > MAX_TEXTS) {
      return Response.json({ error: `too many texts (max ${MAX_TEXTS})` }, { status: 400 });
    }
    const clean = texts.map(t => String(t).slice(0, MAX_CHARS));

    const data = await openaiJson<EmbedResponse>("/embeddings", {
      model: "text-embedding-3-small",
      input: clean,
    });

    const vectors = data.data
      .sort((a, b) => a.index - b.index)
      .map(d => d.embedding.map(x => Math.round(x * 1e5) / 1e5));

    return Response.json({ vectors, tokens: data.usage?.total_tokens ?? 0 });
  } catch (e) {
    return errorResponse(e);
  }
}
