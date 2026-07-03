import type { Portfolio } from "@/lib/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:8000";

export interface GenerateResponse {
  portfolio: Portfolio;
  source: "openai" | "gemini" | "heuristic";
}

/** Upload a resume and get back the generated portfolio. */
export async function generatePortfolio(file: File): Promise<GenerateResponse> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_URL}/api/generate`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    let detail = "Something went wrong generating your portfolio.";
    try {
      const body = await res.json();
      if (typeof body?.detail === "string") detail = body.detail;
    } catch {
      /* non-JSON error body — keep the default message */
    }
    throw new Error(detail);
  }

  return (await res.json()) as GenerateResponse;
}
