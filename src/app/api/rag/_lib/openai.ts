/* Server-only OpenAI helper shared by the RAG API routes.
   The key lives in .env.local / Vercel env vars and never reaches the client. */

const BASE = "https://api.openai.com/v1";

export class OpenAIError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function requireKey(): string {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new OpenAIError(503, "OPENAI_API_KEY is not configured on the server.");
  return key;
}

export async function openaiJson<T>(path: string, body: unknown): Promise<T> {
  const key = requireKey();
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const j = await res.json();
      detail = j?.error?.message ?? detail;
    } catch { /* keep statusText */ }
    throw new OpenAIError(res.status, detail);
  }
  return res.json() as Promise<T>;
}

interface ChatUsage { prompt_tokens: number; completion_tokens: number; }
interface ChatResponse {
  choices: { message: { content: string | null } }[];
  usage?: ChatUsage;
}

export interface GenerateResult {
  text: string;
  promptTokens: number;
  completionTokens: number;
}

/** Chat call to gpt-5-mini with graceful fallback for unsupported params. */
export async function chat(
  system: string,
  user: string,
  opts: { temperature?: number; maxTokens?: number; jsonMode?: boolean } = {},
): Promise<GenerateResult> {
  const base: Record<string, unknown> = {
    model: "gpt-5-mini",
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    max_completion_tokens: Math.min(Math.max(opts.maxTokens ?? 600, 64), 4000),
    reasoning_effort: "minimal",
  };
  if (opts.jsonMode) base.response_format = { type: "json_object" };
  if (opts.temperature !== undefined && opts.temperature !== 1) base.temperature = opts.temperature;

  let data: ChatResponse;
  try {
    data = await openaiJson<ChatResponse>("/chat/completions", base);
  } catch (e) {
    if (!(e instanceof OpenAIError) || e.status !== 400) throw e;
    // gpt-5 reasoning models reject temperature ≠ 1. Drop ONLY temperature
    // first — keeping reasoning_effort: "minimal" is what avoids a slow
    // default-effort "thinking" phase. Drop reasoning_effort only if a
    // second 400 proves the model won't accept it at all.
    if ("temperature" in base) {
      delete base.temperature;
      try {
        data = await openaiJson<ChatResponse>("/chat/completions", base);
        return unpack(data);
      } catch (e2) {
        if (!(e2 instanceof OpenAIError) || e2.status !== 400) throw e2;
      }
    }
    delete base.reasoning_effort;
    data = await openaiJson<ChatResponse>("/chat/completions", base);
  }
  return unpack(data);
}

function unpack(data: ChatResponse): GenerateResult {

  return {
    text: data.choices?.[0]?.message?.content ?? "",
    promptTokens: data.usage?.prompt_tokens ?? 0,
    completionTokens: data.usage?.completion_tokens ?? 0,
  };
}

/* ── streaming (M10) ─────────────────────────────────────────────────
   Token deltas re-framed as NDJSON over a ReadableStream (Vercel node
   runtime friendly). Frames:
     {"delta":"…"}                        — a token chunk, in model order
     {"done":true,"promptTokens":n,"completionTokens":n}
     {"error":"…"}                        — terminal failure mid-stream */

export async function chatStreamResponse(
  system: string,
  user: string,
  opts: { temperature?: number; maxTokens?: number } = {},
): Promise<Response> {
  const key = requireKey();
  const base: Record<string, unknown> = {
    model: "gpt-5-mini",
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    max_completion_tokens: Math.min(Math.max(opts.maxTokens ?? 600, 64), 4000),
    reasoning_effort: "minimal",
    stream: true,
    stream_options: { include_usage: true },
  };
  if (opts.temperature !== undefined && opts.temperature !== 1) base.temperature = opts.temperature;

  const call = (body: Record<string, unknown>) =>
    fetch(`${BASE}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify(body),
    });

  let upstream = await call(base);
  // Two-stage fallback (same rationale as chat()): drop temperature first so
  // reasoning_effort: "minimal" survives — it's what keeps generation fast.
  if (upstream.status === 400 && "temperature" in base) {
    delete base.temperature;
    upstream = await call(base);
  }
  if (upstream.status === 400) {
    delete base.reasoning_effort;
    upstream = await call(base);
  }
  if (!upstream.ok || !upstream.body) {
    let detail = upstream.statusText;
    try { detail = (await upstream.json())?.error?.message ?? detail; } catch { /* keep */ }
    throw new OpenAIError(upstream.status, detail);
  }

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let promptTokens = 0;
  let completionTokens = 0;
  let sseBuffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const { value, done } = await reader.read();
        if (done) {
          controller.enqueue(encoder.encode(JSON.stringify({ done: true, promptTokens, completionTokens }) + "\n"));
          controller.close();
          return;
        }
        sseBuffer += decoder.decode(value, { stream: true });
        const lines = sseBuffer.split("\n");
        sseBuffer = lines.pop() ?? "";
        for (const line of lines) {
          const data = line.replace(/^data:\s*/, "").trim();
          if (!data || data === "[DONE]") continue;
          try {
            const j = JSON.parse(data);
            const delta: string | undefined = j?.choices?.[0]?.delta?.content;
            if (delta) controller.enqueue(encoder.encode(JSON.stringify({ delta }) + "\n"));
            if (j?.usage) {
              promptTokens = j.usage.prompt_tokens ?? 0;
              completionTokens = j.usage.completion_tokens ?? 0;
            }
          } catch { /* partial upstream frame — ignored, buffered lines are complete */ }
        }
      } catch (e) {
        controller.enqueue(encoder.encode(JSON.stringify({ error: e instanceof Error ? e.message : "stream failed" }) + "\n"));
        controller.close();
      }
    },
    cancel() {
      void reader.cancel();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}

export function errorResponse(e: unknown): Response {
  const status = e instanceof OpenAIError ? e.status : 500;
  const message = e instanceof Error ? e.message : "Unknown server error";
  console.error("[rag-api]", status, message);
  return Response.json({ error: message }, { status: status >= 400 && status < 600 ? status : 500 });
}
