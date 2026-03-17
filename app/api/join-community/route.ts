import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../lib/email/send-email";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
};

function formatEmailBody(data: FormData): string {
  const sections: string[] = [];

  sections.push("=== JOIN COMMUNITY FORM SUBMISSION ===");
  sections.push(`Full Name: ${data.fullName}`);
  sections.push(`Email: ${data.email}`);
  sections.push(`Phone Number: ${data.phone}`);
  sections.push("\n---");
  sections.push(`Submitted: ${new Date().toISOString()}`);

  return sections.join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json();

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("Resend API key not configured. Email would be sent to:", "joan@youthplusafrica.com");
      console.log("Join Community form submission data:", JSON.stringify(data, null, 2));

      return NextResponse.json({
        success: true,
        message: "Form submitted successfully (email service not configured - check server logs)",
      });
    }

    const emailBody = formatEmailBody(data);
    const subject = `New Join Community Submission - ${data.fullName}`;

    const emailResult = await sendEmail({
      to: "joan@youthplusafrica.com",
      subject,
      text: emailBody,
      replyTo: data.email,
    });
    if (!emailResult.success) {
      throw new Error(emailResult.error || "Failed to send email");
    }

    return NextResponse.json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting join community form:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to submit form",
      },
      { status: 500 }
    );
  }
}

