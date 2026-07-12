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
    // gpt-5 models reject some sampling params — retry without the extras once
    if (e instanceof OpenAIError && e.status === 400) {
      delete base.temperature;
      delete base.reasoning_effort;
      data = await openaiJson<ChatResponse>("/chat/completions", base);
    } else {
      throw e;
    }
  }

  return {
    text: data.choices?.[0]?.message?.content ?? "",
    promptTokens: data.usage?.prompt_tokens ?? 0,
    completionTokens: data.usage?.completion_tokens ?? 0,
  };
}

export function errorResponse(e: unknown): Response {
  const status = e instanceof OpenAIError ? e.status : 500;
  const message = e instanceof Error ? e.message : "Unknown server error";
  console.error("[rag-api]", status, message);
  return Response.json({ error: message }, { status: status >= 400 && status < 600 ? status : 500 });
}
