import { NextRequest, NextResponse } from "next/server";
import { GIVE_TO_GAIN_WEBINAR } from "../../content/giveToGainWebinar";
import { sendEmail } from "../../../lib/email/send-email";

const ROLE_OPTIONS = new Set([
  "Student",
  "Early-career professional",
  "Mid-career professional",
  "Entrepreneur / Founder",
  "Creative / Freelancer",
  "Other",
]);

const CAREER_STAGE_OPTIONS = new Set([
  "Exploring career opportunities",
  "Building my career in my field",
  "Transitioning into leadership roles",
  "Running or growing a business",
  "Pivoting to a new career path",
]);

const INTEREST_OPTIONS = new Set([
  "Leadership development",
  "Economic empowerment / financial growth",
  "Career growth strategies",
  "Entrepreneurship and income streams",
  "Learning from experienced women leaders",
  "Networking and community",
]);

const KEY_DISCUSSION_OPTIONS = new Set([
  "Reframing leadership and defining success",
  "Economic empowerment and building income",
  "Leadership without burnout and building influence",
  "Navigating ambition, life transitions, and balance",
  "Practical steps to grow professionally and financially",
]);

const FUTURE_INTEREST_OPTIONS = new Set(["Yes", "Maybe", "No"]);

type WebinarRegistrationData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  currentRole: string;
  currentRoleOther?: string;
  careerStage: string;
  interestInWebinar: string[];
  keyDiscussionPillar: string;
  questionsForFacilitators?: string;
  futureInterest: "Yes" | "Maybe" | "No";
  website?: string;
};

function sanitizeText(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
}

function sanitizeOptionalText(value: unknown): string | undefined {
  const sanitized = sanitizeText(value);
  return sanitized || undefined;
}

function sanitizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => sanitizeText(item))
    .filter(Boolean)
    .slice(0, 10);
}

function sanitizeData(raw: unknown): WebinarRegistrationData {
  const data = typeof raw === "object" && raw !== null ? raw : {};
  const source = data as Record<string, unknown>;

  return {
    fullName: sanitizeText(source.fullName),
    email: sanitizeText(source.email).toLowerCase(),
    phoneNumber: sanitizeText(source.phoneNumber),
    currentRole: sanitizeText(source.currentRole),
    currentRoleOther: sanitizeOptionalText(source.currentRoleOther),
    careerStage: sanitizeText(source.careerStage),
    interestInWebinar: sanitizeStringArray(source.interestInWebinar),
    keyDiscussionPillar: sanitizeText(source.keyDiscussionPillar),
    questionsForFacilitators: sanitizeOptionalText(source.questionsForFacilitators),
    futureInterest: sanitizeText(source.futureInterest) as WebinarRegistrationData["futureInterest"],
    website: sanitizeOptionalText(source.website),
  };
}

function validateData(data: WebinarRegistrationData): string | null {
  if (!data.fullName || !data.email || !data.phoneNumber) {
    return "Full name, email, and phone number are required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) return "Invalid email format";

  if (data.phoneNumber.length < 7) return "Please provide a valid phone number";

  if (!ROLE_OPTIONS.has(data.currentRole)) return "Invalid role selection";
  if (data.currentRole === "Other" && !data.currentRoleOther) {
    return "Please specify your current role/profession";
  }

  if (!CAREER_STAGE_OPTIONS.has(data.careerStage)) return "Invalid career stage selection";

  if (!Array.isArray(data.interestInWebinar) || data.interestInWebinar.length === 0) {
    return "Please select at least one webinar interest";
  }
  if (data.interestInWebinar.some((item) => !INTEREST_OPTIONS.has(item))) {
    return "Invalid webinar interest selection";
  }

  if (!KEY_DISCUSSION_OPTIONS.has(data.keyDiscussionPillar)) {
    return "Invalid key discussion selection";
  }

  if (!FUTURE_INTEREST_OPTIONS.has(data.futureInterest)) {
    return "Invalid future interest selection";
  }

  return null;
}

function formatInternalEmailBody(data: WebinarRegistrationData): string {
  const sections: string[] = [];

  sections.push("=== GIVE TO GAIN WEBINAR REGISTRATION ===");
  sections.push(`Event: ${GIVE_TO_GAIN_WEBINAR.title}`);
  sections.push(`Theme: ${GIVE_TO_GAIN_WEBINAR.theme}`);
  sections.push(`Date: ${GIVE_TO_GAIN_WEBINAR.date}`);
  sections.push(`Time: ${GIVE_TO_GAIN_WEBINAR.time}`);
  sections.push(`Format: ${GIVE_TO_GAIN_WEBINAR.format}`);
  sections.push(`Submitted: ${new Date().toISOString()}`);

  sections.push("\n=== REGISTRANT DETAILS ===");
  sections.push(`Full Name: ${data.fullName}`);
  sections.push(`Email Address: ${data.email}`);
  sections.push(`Phone Number: ${data.phoneNumber}`);
  sections.push(`Current Role / Profession: ${data.currentRole}`);
  if (data.currentRoleOther) sections.push(`Current Role (Other): ${data.currentRoleOther}`);
  sections.push(`Career Stage: ${data.careerStage}`);
  sections.push(`Interest in Webinar: ${data.interestInWebinar.join(", ")}`);
  sections.push(`Key Discussion Pillar: ${data.keyDiscussionPillar}`);
  sections.push(`Future Program Interest: ${data.futureInterest}`);
  sections.push(
    `Questions for Facilitators: ${data.questionsForFacilitators || "No question submitted"}`
  );

  return sections.join("\n");
}

function formatConfirmationEmailBody(data: WebinarRegistrationData): string {
  const lines: string[] = [];

  lines.push(`Hello ${data.fullName},`);
  lines.push("");
  lines.push("Thank you for registering for the Youth Plus Africa webinar.");
  lines.push("");
  lines.push(`${GIVE_TO_GAIN_WEBINAR.title}`);
  lines.push(`${GIVE_TO_GAIN_WEBINAR.theme}`);
  lines.push(`${GIVE_TO_GAIN_WEBINAR.questionLine}`);
  lines.push(`Date: ${GIVE_TO_GAIN_WEBINAR.date}`);
  lines.push(`Time: ${GIVE_TO_GAIN_WEBINAR.time}`);
  lines.push(`Format: ${GIVE_TO_GAIN_WEBINAR.format}`);
  lines.push("");
  if (GIVE_TO_GAIN_WEBINAR.webinarLink) {
    lines.push(`Webinar Link: ${GIVE_TO_GAIN_WEBINAR.webinarLink}`);
  } else {
    lines.push("Webinar Link: We will share the access link with you shortly.");
  }
  lines.push("");
  lines.push(
    "If you shared a question for the facilitators, it may be addressed during the session."
  );
  lines.push("");
  lines.push("Warm regards,");
  lines.push("Youth Plus Africa");

  return lines.join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatConfirmationEmailHtml(data: WebinarRegistrationData, logoUrl: string): string {
  const fullName = escapeHtml(data.fullName);
  const title = escapeHtml(GIVE_TO_GAIN_WEBINAR.title);
  const theme = escapeHtml(GIVE_TO_GAIN_WEBINAR.theme);
  const questionLine = escapeHtml(GIVE_TO_GAIN_WEBINAR.questionLine);
  const date = escapeHtml(GIVE_TO_GAIN_WEBINAR.date);
  const time = escapeHtml(GIVE_TO_GAIN_WEBINAR.time);
  const format = escapeHtml(GIVE_TO_GAIN_WEBINAR.format);
  const webinarLink = GIVE_TO_GAIN_WEBINAR.webinarLink;

  const questionAck = data.questionsForFacilitators
    ? `<p style="margin:0 0 14px;color:#1f2937;font-size:14px;line-height:1.6;">Thank you for submitting a question. It may be addressed during the session.</p>`
    : "";

  const linkBlock = webinarLink
    ? `<div style="margin:18px 0 12px;">
         <a href="${escapeHtml(webinarLink)}" target="_blank" rel="noreferrer" style="display:inline-block;background:#d0a328;color:#111827;text-decoration:none;font-weight:600;padding:12px 18px;border-radius:10px;font-size:14px;">
           Add to Calendar
         </a>
       </div>
       <p style="margin:0 0 14px;color:#4b5563;font-size:12px;line-height:1.5;">If the button does not open, copy this link:<br>${escapeHtml(webinarLink)}</p>`
    : `<p style="margin:0 0 14px;color:#1f2937;font-size:14px;line-height:1.6;">We will share the webinar access link with you shortly.</p>`;

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f5f6f8;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f6f8;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
            <tr>
              <td align="center" style="padding:18px 22px 6px;">
                <img src="${escapeHtml(logoUrl)}" alt="Youth Plus Africa" width="150" style="display:block;height:auto;max-width:100%;border:0;outline:none;text-decoration:none;margin:0 auto;">
              </td>
            </tr>
            <tr>
              <td style="padding:24px 22px;">
                <h1 style="margin:0 0 8px;color:#111827;font-size:22px;line-height:1.3;">You are registered!</h1>
                <p style="margin:0 0 16px;color:#374151;font-size:14px;line-height:1.6;">
                  Hello ${fullName}, thank you for registering for our upcoming webinar.
                </p>
                <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;padding:14px 14px 10px;margin:0 0 16px;">
                  <p style="margin:0 0 6px;color:#111827;font-size:17px;font-weight:700;line-height:1.4;">${title}</p>
                  <p style="margin:0 0 4px;color:#1f2937;font-size:14px;line-height:1.5;"><strong>${theme}</strong></p>
                  <p style="margin:0 0 10px;color:#4b5563;font-size:14px;line-height:1.5;">${questionLine}</p>
                  <p style="margin:0;color:#111827;font-size:13px;line-height:1.6;">
                    <strong>Date:</strong> ${date}<br>
                    <strong>Time:</strong> ${time}<br>
                    <strong>Format:</strong> ${format}
                  </p>
                </div>
                ${linkBlock}
                ${questionAck}
                <p style="margin:0;color:#1f2937;font-size:14px;line-height:1.6;">Warm regards,<br><strong>Youth Plus Africa</strong></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const appBaseUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || new URL(request.url).origin;
    const logoUrl = `${appBaseUrl}/images/youth-plus-logo.png`;

    const rawData = await request.json();
    const data = sanitizeData(rawData);

    // Honeypot guard: treat bot submissions as no-op success.
    if (data.website) {
      return NextResponse.json({ success: true, message: "Submitted" });
    }

    const validationError = validateData(data);
    if (validationError) {
      return NextResponse.json({ success: false, error: validationError }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn(
        "Resend API key not configured. Emails would be sent to:",
        GIVE_TO_GAIN_WEBINAR.notificationEmail,
        "and",
        data.email
      );
      console.log("Give to Gain webinar registration data:", JSON.stringify(data, null, 2));

      return NextResponse.json({
        success: true,
        message: "Registration submitted successfully (email service not configured - check server logs)",
      });
    }

    const internalEmailResult = await sendEmail({
      to: GIVE_TO_GAIN_WEBINAR.notificationEmail,
      subject: `New Give to Gain Webinar Registration - ${data.fullName}`,
      text: formatInternalEmailBody(data),
      replyTo: data.email,
    });
    if (!internalEmailResult.success) {
      throw new Error(internalEmailResult.error || "Failed to send internal notification email");
    }

    const confirmationEmailResult = await sendEmail({
      to: data.email,
      subject: `You're registered: ${GIVE_TO_GAIN_WEBINAR.title}`,
      text: formatConfirmationEmailBody(data),
      html: formatConfirmationEmailHtml(data, logoUrl),
    });
    if (!confirmationEmailResult.success) {
      throw new Error(confirmationEmailResult.error || "Failed to send confirmation email");
    }

    return NextResponse.json({
      success: true,
      message: "Registration submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting Give to Gain webinar registration:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to submit registration",
      },
      { status: 500 }
    );
  }
}
