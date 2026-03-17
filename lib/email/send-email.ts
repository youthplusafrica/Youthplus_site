import { getResendClient } from "./resend";
import type { CreateEmailOptions } from "resend";

type Recipients = string | string[];

export type SendEmailOptions = {
  from?: string;
  to: Recipients;
  cc?: Recipients;
  bcc?: Recipients;
  replyTo?: Recipients;
  subject: string;
  html?: string;
  text?: string;
};

export type SendEmailResult = {
  success: boolean;
  skipped?: boolean;
  id?: string;
  error?: string;
};

function normalizeRecipients(value?: Recipients): string[] | undefined {
  if (!value) return undefined;
  const list = Array.isArray(value) ? value : [value];
  const normalized = list.map((item) => item.trim()).filter(Boolean);
  return normalized.length ? normalized : undefined;
}

export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const resend = getResendClient();
  if (!resend) {
    return {
      success: false,
      skipped: true,
      error: "RESEND_API_KEY is not configured",
    };
  }

  const from = options.from?.trim() || process.env.EMAIL_FROM?.trim();
  if (!from) {
    return {
      success: false,
      skipped: true,
      error: "EMAIL_FROM is not configured",
    };
  }

  const to = normalizeRecipients(options.to);
  if (!to || to.length === 0) {
    return {
      success: false,
      error: "No recipients provided",
    };
  }

  const cc = normalizeRecipients(options.cc);
  const bcc = normalizeRecipients(options.bcc);
  const replyTo = normalizeRecipients(options.replyTo || process.env.EMAIL_REPLY_TO);
  if (!options.text && !options.html) {
    return {
      success: false,
      error: "Either text or html content is required",
    };
  }

  try {
    const payload: CreateEmailOptions = {
      from,
      to,
      subject: options.subject,
      ...(options.text ? { text: options.text } : { html: options.html! }),
    };
    if (options.text && options.html) payload.html = options.html;
    if (cc) payload.cc = cc;
    if (bcc) payload.bcc = bcc;
    if (replyTo) payload.replyTo = replyTo;

    const { data, error } = await resend.emails.send(payload);

    if (error) {
      console.error("Resend API returned an error.", {
        name: error.name,
        message: error.message,
      });
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown email sending error";
    console.error("Failed to send email with Resend.", { message });
    return {
      success: false,
      error: message,
    };
  }
}
