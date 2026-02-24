import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type SurveyData = {
  ageGroup: string;
  gender: string;
  highestEducation: string;
  county: string;
  isYouth18to35: "Yes" | "No";
  nyotaRegistrationStatus: string;

  primaryIndustry: string;
  primaryIndustryOther?: string;
  yearBusinessStarted: string;
  legalStatus: string;

  operatingCostRating: string;
  operatingCostsSince2022: string;
  mostIncreasedCosts: string[];
  easeOfDoingBusinessRating: string;
  mainSourcesOfFinancing: string[];
  financingOther?: string;

  awareOfPolicyChangesSince2022: "Yes" | "No";
  policyChangesSpecify?: string;
  policyImpactRating: string;
  constrainingLawsRegulationsLevies: string;
  urgentPolicyReformRecommendation: string;

  publicParticipationForums: string;
  noParticipationReason?: string;
  noParticipationReasonOther?: string;
  governanceResponsiveness: string;
  youthParticipationCapacityGaps: string[];

  usesDigitalPlatforms: "Yes" | "No";
  digitalPlatformsUsed?: string[];

  website?: string;
};

function validateSurveyData(data: SurveyData): string | null {
  const requiredStrings = [
    data.ageGroup,
    data.gender,
    data.highestEducation,
    data.county,
    data.isYouth18to35,
    data.nyotaRegistrationStatus,
    data.primaryIndustry,
    data.yearBusinessStarted,
    data.legalStatus,
    data.operatingCostRating,
    data.operatingCostsSince2022,
    data.easeOfDoingBusinessRating,
    data.awareOfPolicyChangesSince2022,
    data.policyImpactRating,
    data.constrainingLawsRegulationsLevies,
    data.urgentPolicyReformRecommendation,
    data.publicParticipationForums,
    data.governanceResponsiveness,
    data.usesDigitalPlatforms,
  ];

  if (requiredStrings.some((value) => !value)) {
    return "Missing required fields";
  }

  if (!Array.isArray(data.mostIncreasedCosts) || data.mostIncreasedCosts.length === 0) {
    return "Please select at least one option for increased costs";
  }

  if (!Array.isArray(data.mainSourcesOfFinancing) || data.mainSourcesOfFinancing.length === 0) {
    return "Please select at least one financing source";
  }

  if (
    !Array.isArray(data.youthParticipationCapacityGaps) ||
    data.youthParticipationCapacityGaps.length === 0
  ) {
    return "Please select at least one youth participation capacity gap";
  }

  const validScale = new Set(["1", "2", "3", "4", "5"]);
  if (!validScale.has(data.operatingCostRating)) return "Invalid operating cost rating";
  if (!validScale.has(data.easeOfDoingBusinessRating)) return "Invalid ease of doing business rating";
  if (!validScale.has(data.policyImpactRating)) return "Invalid policy impact rating";

  if (data.primaryIndustry === "Other (Specify)" && !data.primaryIndustryOther) {
    return "Please specify other primary industry";
  }

  if (data.mainSourcesOfFinancing.includes("Other") && !data.financingOther) {
    return "Please specify other financing source";
  }

  if (data.awareOfPolicyChangesSince2022 === "Yes" && !data.policyChangesSpecify) {
    return "Please specify policy changes";
  }

  if (data.publicParticipationForums === "None" && !data.noParticipationReason) {
    return "Please specify why there was no participation";
  }

  if (data.noParticipationReason === "Other" && !data.noParticipationReasonOther) {
    return "Please specify other participation reason";
  }

  if (data.usesDigitalPlatforms === "Yes") {
    if (!Array.isArray(data.digitalPlatformsUsed) || data.digitalPlatformsUsed.length === 0) {
      return "Please select at least one digital platform";
    }
  }

  if (!/^\d+$/.test(data.yearBusinessStarted)) {
    return "Year business started must be a whole number";
  }

  const currentYear = new Date().getFullYear();
  const year = Number(data.yearBusinessStarted);
  if (year < 1900 || year > currentYear) {
    return `Year business started must be between 1900 and ${currentYear}`;
  }

  return null;
}

function formatEmailBody(data: SurveyData): string {
  const sections: string[] = [];
  const submittedAt = new Date().toISOString();

  sections.push("=== WE LEAD PROGRAM - BASELINE SURVEY ===");
  sections.push(`Submitted: ${submittedAt}`);

  sections.push("\n=== PROFILE ===");
  sections.push(`Age Group: ${data.ageGroup}`);
  sections.push(`Gender: ${data.gender}`);
  sections.push(`Highest Education: ${data.highestEducation}`);
  sections.push(`County: ${data.county}`);
  sections.push(`Are you a youth (18–35 years)?: ${data.isYouth18to35}`);
  sections.push(`Registered under NYOTA Program: ${data.nyotaRegistrationStatus}`);

  sections.push("\n=== BUSINESS PROFILE ===");
  sections.push(`Primary Industry: ${data.primaryIndustry}`);
  if (data.primaryIndustryOther) sections.push(`Primary Industry (Other): ${data.primaryIndustryOther}`);
  sections.push(`Year Business Started: ${data.yearBusinessStarted}`);
  sections.push(`Legal Status: ${data.legalStatus}`);

  sections.push("\n=== COST & EASE OF DOING BUSINESS ===");
  sections.push(`Operating Cost Rating (1-5): ${data.operatingCostRating}`);
  sections.push(`Operating Costs Since 2022: ${data.operatingCostsSince2022}`);
  sections.push(`Most Increased Costs: ${data.mostIncreasedCosts.join(", ")}`);
  sections.push(`Ease of Doing Business Rating (1-5): ${data.easeOfDoingBusinessRating}`);
  sections.push(`Main Sources of Financing: ${data.mainSourcesOfFinancing.join(", ")}`);
  if (data.financingOther) sections.push(`Main Sources of Financing (Other): ${data.financingOther}`);

  sections.push("\n=== POLICY & LEGAL FRAMEWORK ===");
  sections.push(`Aware of Policy Changes Since 2022: ${data.awareOfPolicyChangesSince2022}`);
  if (data.policyChangesSpecify) sections.push(`Policy Changes Specify:\n${data.policyChangesSpecify}`);
  sections.push(`Policy Impact Rating (1-5): ${data.policyImpactRating}`);
  sections.push(`Constraining Laws/Regulations/Levies:\n${data.constrainingLawsRegulationsLevies}`);
  sections.push(`Urgent Policy Reform Recommendation:\n${data.urgentPolicyReformRecommendation}`);

  sections.push("\n=== YOUTH PARTICIPATION & GOVERNANCE ===");
  sections.push(`Public Participation Forums: ${data.publicParticipationForums}`);
  if (data.noParticipationReason) sections.push(`No Participation Reason: ${data.noParticipationReason}`);
  if (data.noParticipationReasonOther) {
    sections.push(`No Participation Reason (Other): ${data.noParticipationReasonOther}`);
  }
  sections.push(`Governance Responsiveness: ${data.governanceResponsiveness}`);
  sections.push(`Youth Participation Capacity Gaps: ${data.youthParticipationCapacityGaps.join(", ")}`);

  sections.push("\n=== DIGITALIZATION & TECHNOLOGY ===");
  sections.push(`Uses Digital Platforms: ${data.usesDigitalPlatforms}`);
  if (data.digitalPlatformsUsed && data.digitalPlatformsUsed.length > 0) {
    sections.push(`Digital Platforms Used: ${data.digitalPlatformsUsed.join(", ")}`);
  }

  return sections.join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const data: SurveyData = await request.json();

    // Honeypot guard: treat bot submissions as no-op success.
    if (data.website) {
      return NextResponse.json({ success: true, message: "Submitted" });
    }

    const validationError = validateSurveyData(data);
    if (validationError) {
      return NextResponse.json({ success: false, error: validationError }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP credentials not configured. Email would be sent to:", "tele@youthplusafrica.com");
      console.log("We Lead baseline survey submission data:", JSON.stringify(data, null, 2));
      return NextResponse.json({
        success: true,
        message: "Survey submitted successfully (SMTP not configured - check server logs)",
      });
    }

    const emailBody = formatEmailBody(data);
    const subject = `New We Lead Baseline Survey Submission - ${data.county}`;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "tele@youthplusafrica.com",
      subject,
      text: emailBody,
    });

    return NextResponse.json({ success: true, message: "Survey submitted successfully" });
  } catch (error) {
    console.error("Error submitting We Lead baseline survey:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to submit survey",
      },
      { status: 500 }
    );
  }
}
