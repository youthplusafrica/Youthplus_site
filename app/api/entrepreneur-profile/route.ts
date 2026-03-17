import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../lib/email/send-email";

type FormData = {
  // Personal Information
  fullName: string;
  phoneNumber: string;
  email: string;
  ageRange: string;
  gender?: string;
  location: string;

  // Business Information
  businessName: string;
  sector: string;
  sectorOther?: string;
  yearEstablished?: string;
  businessStage: string;
  businessDescription: string;

  // Traction & Impact
  targetMarket?: string;
  customersServed?: string;
  revenueRange?: string;
  achievements?: string;
  challenges?: string;

  // Founder Background
  educationalBackground?: string;
  relevantExperience?: string;
  partOfPrograms?: string;
  programsList?: string;

  // Support Needs
  supportNeeds?: string[];
  supportOther?: string;
  interestedInFestival?: string;

  // Uploads
  websiteUrl?: string;
  pitchDeckUrl?: string;
  logoOrBrandingUrl?: string;

  // Consent & Verification
  referralSource?: string;
  consentAccurate?: boolean;
  consentContact?: boolean;
};

function formatEmailBody(data: FormData): string {
  const sections: string[] = [];

  sections.push("=== PERSONAL INFORMATION ===");
  sections.push(`Full Name: ${data.fullName}`);
  sections.push(`Phone Number: ${data.phoneNumber}`);
  sections.push(`Email: ${data.email}`);
  sections.push(`Age Range: ${data.ageRange}`);
  if (data.gender) sections.push(`Gender: ${data.gender}`);
  sections.push(`Location: ${data.location}`);

  sections.push("\n=== BUSINESS INFORMATION ===");
  sections.push(`Business/Startup Name: ${data.businessName}`);
  sections.push(`Sector/Industry: ${data.sector}`);
  if (data.sectorOther) sections.push(`Sector Other: ${data.sectorOther}`);
  if (data.yearEstablished) sections.push(`Year Established: ${data.yearEstablished}`);
  sections.push(`Business Stage: ${data.businessStage}`);
  sections.push(`Business Description:\n${data.businessDescription}`);

  if (data.targetMarket || data.customersServed || data.revenueRange || data.achievements || data.challenges) {
    sections.push("\n=== TRACTION & IMPACT ===");
    if (data.targetMarket) sections.push(`Target Market: ${data.targetMarket}`);
    if (data.customersServed) sections.push(`Customers/Clients Served: ${data.customersServed}`);
    if (data.revenueRange) sections.push(`Revenue Range: ${data.revenueRange}`);
    if (data.achievements) sections.push(`Main Achievements:\n${data.achievements}`);
    if (data.challenges) sections.push(`Main Challenges:\n${data.challenges}`);
  }

  if (data.educationalBackground || data.relevantExperience || data.partOfPrograms) {
    sections.push("\n=== FOUNDER BACKGROUND ===");
    if (data.educationalBackground) sections.push(`Educational Background: ${data.educationalBackground}`);
    if (data.relevantExperience) sections.push(`Relevant Experience/Skills:\n${data.relevantExperience}`);
    if (data.partOfPrograms) {
      sections.push(`Part of Incubator/Accelerator: ${data.partOfPrograms}`);
      if (data.programsList) sections.push(`Programs List: ${data.programsList}`);
    }
  }

  if (data.supportNeeds || data.interestedInFestival) {
    sections.push("\n=== SUPPORT NEEDS ===");
    if (data.supportNeeds && data.supportNeeds.length > 0) {
      sections.push(`Support Needs: ${data.supportNeeds.join(", ")}`);
      if (data.supportOther) sections.push(`Support Other: ${data.supportOther}`);
    }
    if (data.interestedInFestival) sections.push(`Interested in Festival 2026: ${data.interestedInFestival}`);
  }

  if (data.websiteUrl || data.pitchDeckUrl || data.logoOrBrandingUrl) {
    sections.push("\n=== LINKS & UPLOADS ===");
    if (data.websiteUrl) sections.push(`Website/Social Media/Portfolio: ${data.websiteUrl}`);
    sections.push(`Pitch deck: ${data.pitchDeckUrl || "Not provided"}`);
    sections.push(`Logo / photos: ${data.logoOrBrandingUrl || "Not provided"}`);
  }

  sections.push("\n=== CONSENT & VERIFICATION ===");
  if (data.referralSource) sections.push(`How did you hear about this form: ${data.referralSource}`);
  sections.push(`Consent - Information is accurate: ${data.consentAccurate ? "Yes" : "No"}`);
  sections.push(`Consent - Allow contact: ${data.consentContact ? "Yes" : "No"}`);

  sections.push("\n---");
  sections.push(`Submitted: ${new Date().toISOString()}`);

  return sections.join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json();

    // Validate required fields
    if (!data.fullName || !data.phoneNumber || !data.email || !data.ageRange || !data.location) {
      return NextResponse.json(
        { success: false, error: "Missing required personal information fields" },
        { status: 400 }
      );
    }

    if (!data.businessName || !data.sector || !data.businessStage || !data.businessDescription) {
      return NextResponse.json(
        { success: false, error: "Missing required business information fields" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("Resend API key not configured. Email would be sent to:", "support@youthplusafrica.com");
      console.log("Form submission data:", JSON.stringify(data, null, 2));

      return NextResponse.json({
        success: true,
        message: "Form submitted successfully (email service not configured - check server logs)",
      });
    }

    const emailBody = formatEmailBody(data);
    const subject = `New Entrepreneur Profile Submission - ${data.fullName} - ${data.businessName}`;

    const emailResult = await sendEmail({
      to: "support@youthplusafrica.com",
      subject,
      text: emailBody,
      replyTo: data.email,
    });
    if (!emailResult.success) {
      throw new Error(emailResult.error || "Failed to send email");
    }

    return NextResponse.json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting entrepreneur profile:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to submit form",
      },
      { status: 500 }
    );
  }
}

