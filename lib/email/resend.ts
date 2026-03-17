import { Resend } from "resend";

let cachedApiKey: string | null = null;
let cachedClient: Resend | null = null;

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim() || "";
  if (!apiKey) return null;

  if (!cachedClient || cachedApiKey !== apiKey) {
    cachedApiKey = apiKey;
    cachedClient = new Resend(apiKey);
  }

  return cachedClient;
}
