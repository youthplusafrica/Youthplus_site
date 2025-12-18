import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    // Configure nodemailer transporter
    // Using environment variables for email configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // If no SMTP credentials are configured, fall back to a simple response
    // In production, you should configure SMTP credentials
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP credentials not configured. Email would be sent to:", "joan@youthplusafrica.com");
      console.log("Join Community form submission data:", JSON.stringify(data, null, 2));
      
      // Return success but log that email wasn't actually sent
      return NextResponse.json({
        success: true,
        message: "Form submitted successfully (SMTP not configured - check server logs)",
      });
    }

    const emailBody = formatEmailBody(data);
    const subject = `New Join Community Submission - ${data.fullName}`;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "joan@youthplusafrica.com",
      subject,
      text: emailBody,
    });

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

