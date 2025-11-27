import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type FormData = {
  fullName: string;
  occupation: string;
  email: string;
  telephone: string;
  hoped2025: string;
  hope2026: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: FormData = await request.json();

    // Validate required fields
    if (
      !body.fullName ||
      !body.occupation ||
      !body.email ||
      !body.telephone ||
      !body.hoped2025 ||
      !body.hope2026
    ) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Get SMTP configuration from environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpSecure = process.env.SMTP_SECURE === "true";
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM;
    const toEmail = process.env.LOOKBACK_2025_TO_EMAIL;

    // Log SMTP config (without password) for debugging
    console.log("2025 Look Back SMTP config:", {
      host: smtpHost,
      port: smtpPort,
      secure: process.env.SMTP_SECURE,
      user: smtpUser,
      from: smtpFrom,
      to: toEmail,
    });

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !smtpFrom || !toEmail) {
      console.error("2025 Look Back: Missing SMTP configuration", {
        hasHost: !!smtpHost,
        hasPort: !!smtpPort,
        hasUser: !!smtpUser,
        hasPass: !!smtpPass,
        hasFrom: !!smtpFrom,
        hasTo: !!toEmail,
      });
      return NextResponse.json(
        { success: false, error: "Email configuration is missing" },
        { status: 500 }
      );
    }

    // Create transporter with connection options
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 10000, // 10 seconds
      socketTimeout: 10000, // 10 seconds
      greetingTimeout: 10000, // 10 seconds
      // For port 465 with secure: true, ensure proper TLS handling
      tls: {
        // Do not reject unauthorized certificates by default
        // Only set to false if certificate issues occur
        rejectUnauthorized: false,
      },
    });

    // Email subject
    const subject = `${body.fullName} - 2025 LOOK BACK`;

    // Email body (plain text)
    const emailBody = `Full Name: ${body.fullName}
Occupation: ${body.occupation}
E-mail Address: ${body.email}
Telephone Number: ${body.telephone}

What's One Thing You Hoped To Achieve in 2025:
${body.hoped2025}

What's One Thing You Hope to Achieve in 2026:
${body.hope2026}`;

    // Send email
    const mailOptions = {
      from: smtpFrom,
      to: toEmail,
      replyTo: body.email,
      subject: subject,
      text: emailBody,
    };

    console.log("2025 Look Back: Sending email", {
      from: smtpFrom,
      to: toEmail,
      replyTo: body.email,
      subject: subject,
    });

    // Verify connection before sending (optional, helps catch connection issues early)
    try {
      await transporter.verify();
      console.log("2025 Look Back: SMTP connection verified");
    } catch (verifyError: any) {
      console.error("2025 Look Back: SMTP verification failed:", {
        message: verifyError?.message,
        code: verifyError?.code,
      });
      // Continue anyway - some servers don't support verify
    }

    await transporter.sendMail(mailOptions);

    console.log("2025 Look Back: Email sent successfully");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    // Detailed error logging
    console.error("Error sending 2025 Look Back email:", {
      message: error?.message,
      code: error?.code,
      response: error?.response,
      command: error?.command,
      responseCode: error?.responseCode,
      errno: error?.errno,
      syscall: error?.syscall,
      hostname: error?.hostname,
      stack: error?.stack,
    });
    return NextResponse.json(
      { success: false, error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}

