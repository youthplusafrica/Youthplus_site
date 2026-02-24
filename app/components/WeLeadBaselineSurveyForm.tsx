"use client";

import { useState } from "react";
import { App, Alert, Button, Checkbox, Form, Input, Radio, Select } from "antd";

const COUNTIES = [
  "Nairobi",
  "Kakamega",
  "Mombasa",
  "Uasin Gishu",
  "Kisumu",
  "Kiambu",
  "Kitui",
  "Garissa",
] as const;

const AGE_GROUP_OPTIONS = ["18–24", "25–29", "30–35", "36–45", "Above 45"] as const;
const GENDER_OPTIONS = ["Male", "Female", "Prefer not to say"] as const;
const EDUCATION_OPTIONS = ["Primary", "Secondary", "TVET", "University", "Postgraduate"] as const;
const NYOTA_OPTIONS = ["Yes", "No", "In the process"] as const;
const PRIMARY_INDUSTRY_OPTIONS = [
  "Retail/Wholesale",
  "Manufacturing",
  "Agriculture",
  "Hospitality",
  "ICT/Digital Services",
  "Transport/Logistics",
  "Creative Industry",
  "Other (Specify)",
] as const;
const LEGAL_STATUS_OPTIONS = [
  "Sole Proprietorship",
  "Partnership",
  "Limited Company",
  "Cooperative",
  "Informal/Unregistered",
] as const;
const OPERATING_COSTS_SINCE_2022_OPTIONS = [
  "Increased significantly",
  "Increased slightly",
  "Remained the same",
  "Decreased",
] as const;
const MOST_INCREASED_COSTS_OPTIONS = [
  "Rent",
  "Utilities",
  "Taxes/Levies",
  "Licensing Fees",
  "Raw Materials",
  "Transport/Fuel",
  "Labor",
] as const;
const MAIN_SOURCES_OF_FINANCING_OPTIONS = [
  "Personal savings",
  "Bank loan",
  "SACCO",
  "Digital lending apps",
  "Government funds",
  "Chamas",
  "Other",
] as const;
const PUBLIC_PARTICIPATION_FORUMS_OPTIONS = ["National", "County", "Both", "None"] as const;
const NO_PARTICIPATION_REASON_OPTIONS = [
  "Not aware",
  "No invitation",
  "Lack of time",
  "Not meaningful",
  "Other",
] as const;
const GOVERNANCE_RESPONSIVENESS_OPTIONS = [
  "Not responsive",
  "Slightly responsive",
  "Moderately responsive",
  "Highly responsive",
] as const;
const YOUTH_PARTICIPATION_CAPACITY_GAPS_OPTIONS = [
  "Policy literacy",
  "Advocacy skills",
  "Information access",
  "Financial resources",
  "Organization/Networks",
] as const;
const DIGITAL_PLATFORMS_USED_OPTIONS = [
  "WhatsApp Business",
  "Facebook",
  "Instagram",
  "TikTok",
  "Website",
  "E-commerce platforms",
  "Digital payment systems",
] as const;

type FormValues = {
  ageGroup: (typeof AGE_GROUP_OPTIONS)[number];
  gender: (typeof GENDER_OPTIONS)[number];
  highestEducation: (typeof EDUCATION_OPTIONS)[number];
  county: (typeof COUNTIES)[number];
  isYouth18to35: "Yes" | "No";
  nyotaRegistrationStatus: (typeof NYOTA_OPTIONS)[number];

  primaryIndustry: (typeof PRIMARY_INDUSTRY_OPTIONS)[number];
  primaryIndustryOther?: string;
  yearBusinessStarted: string;
  legalStatus: (typeof LEGAL_STATUS_OPTIONS)[number];

  operatingCostRating: "1" | "2" | "3" | "4" | "5";
  operatingCostsSince2022: (typeof OPERATING_COSTS_SINCE_2022_OPTIONS)[number];
  mostIncreasedCosts: string[];
  easeOfDoingBusinessRating: "1" | "2" | "3" | "4" | "5";
  mainSourcesOfFinancing: string[];
  financingOther?: string;

  awareOfPolicyChangesSince2022: "Yes" | "No";
  policyChangesSpecify?: string;
  policyImpactRating: "1" | "2" | "3" | "4" | "5";
  constrainingLawsRegulationsLevies: string;
  urgentPolicyReformRecommendation: string;

  publicParticipationForums: (typeof PUBLIC_PARTICIPATION_FORUMS_OPTIONS)[number];
  noParticipationReason?: (typeof NO_PARTICIPATION_REASON_OPTIONS)[number];
  noParticipationReasonOther?: string;
  governanceResponsiveness: (typeof GOVERNANCE_RESPONSIVENESS_OPTIONS)[number];
  youthParticipationCapacityGaps: string[];

  usesDigitalPlatforms: "Yes" | "No";
  digitalPlatformsUsed?: string[];

  website?: string;
};

function WeLeadBaselineSurveyFormContent() {
  const { message } = App.useApp();
  const [form] = Form.useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const primaryIndustry = Form.useWatch("primaryIndustry", form);
  const mainSourcesOfFinancing = Form.useWatch("mainSourcesOfFinancing", form) || [];
  const awareOfPolicyChangesSince2022 = Form.useWatch("awareOfPolicyChangesSince2022", form);
  const publicParticipationForums = Form.useWatch("publicParticipationForums", form);
  const noParticipationReason = Form.useWatch("noParticipationReason", form);
  const usesDigitalPlatforms = Form.useWatch("usesDigitalPlatforms", form);

  const onFinish = async (values: FormValues) => {
    if (values.website) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/we-lead-baseline-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit survey");
      }

      form.resetFields();
      setSubmitted(true);
      message.success("Survey submitted successfully. Thank you!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";
      message.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  if (submitted) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <Alert
          type="success"
          showIcon
          message="Submission received"
          description="Thank you for completing the We Lead Program – Baseline Survey."
        />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">We Lead Program – Baseline Survey</h2>
        <p className="text-black/70 text-base md:text-lg">
          This baseline survey collects information on small businesses and youth entrepreneurs
          across selected counties to help inform policy recommendations and program interventions.
        </p>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish} className="mt-2" size="large">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-black/10">Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="ageGroup"
              label="Age group"
              className="md:col-span-2"
              rules={[{ required: true, message: "Please select your age group" }]}
            >
              <Radio.Group options={AGE_GROUP_OPTIONS.map((value) => ({ label: value, value }))} />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              className="md:col-span-2"
              rules={[{ required: true, message: "Please select your gender" }]}
            >
              <Radio.Group options={GENDER_OPTIONS.map((value) => ({ label: value, value }))} />
            </Form.Item>

            <Form.Item
              name="highestEducation"
              label="Highest education level"
              rules={[{ required: true, message: "Please select your education level" }]}
            >
              <Select
                options={EDUCATION_OPTIONS.map((value) => ({ label: value, value }))}
                placeholder="Select education level"
              />
            </Form.Item>

            <Form.Item
              name="county"
              label="County"
              rules={[{ required: true, message: "Please select your county" }]}
            >
              <Select options={COUNTIES.map((value) => ({ label: value, value }))} placeholder="Select county" />
            </Form.Item>

            <Form.Item
              name="isYouth18to35"
              label="Are you a youth (18–35 years)?"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Radio.Group options={[{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }]} />
            </Form.Item>

            <Form.Item
              name="nyotaRegistrationStatus"
              label="Are you registered under the NYOTA Program?"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Select
                options={NYOTA_OPTIONS.map((value) => ({ label: value, value }))}
                placeholder="Select registration status"
              />
            </Form.Item>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-black/10">Business Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="primaryIndustry"
              label="Primary industry"
              rules={[{ required: true, message: "Please select your primary industry" }]}
            >
              <Select
                options={PRIMARY_INDUSTRY_OPTIONS.map((value) => ({ label: value, value }))}
                placeholder="Select primary industry"
              />
            </Form.Item>

            {primaryIndustry === "Other (Specify)" && (
              <Form.Item
                name="primaryIndustryOther"
                label="Please specify"
                rules={[
                  {
                    required: true,
                    message: "Please specify your primary industry",
                    validator: (_, value) => {
                      if (primaryIndustry === "Other (Specify)" && !value) {
                        return Promise.reject(new Error("Please specify your primary industry"));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="Enter industry" />
              </Form.Item>
            )}

            <Form.Item
              name="yearBusinessStarted"
              label="Year business started"
              rules={[
                { required: true, message: "Please enter the year business started" },
                {
                  validator: (_, value: string) => {
                    if (!value) return Promise.resolve();
                    if (!/^\d+$/.test(value)) {
                      return Promise.reject(new Error("Year must be a whole number"));
                    }
                    const year = Number(value);
                    if (year < 1900 || year > currentYear) {
                      return Promise.reject(new Error(`Enter a year between 1900 and ${currentYear}`));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input inputMode="numeric" placeholder={`e.g. ${currentYear - 2}`} />
            </Form.Item>

            <Form.Item
              name="legalStatus"
              label="Legal status"
              rules={[{ required: true, message: "Please select legal status" }]}
            >
              <Select
                options={LEGAL_STATUS_OPTIONS.map((value) => ({ label: value, value }))}
                placeholder="Select legal status"
              />
            </Form.Item>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-black/10">
            Cost & Ease of Doing Business
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="operatingCostRating"
              label="On a scale of 1 (Very Low) to 5 (Very High), how would you rate the overall cost of operating your business?"
              className="md:col-span-2"
              rules={[{ required: true, message: "Please rate the operating cost" }]}
            >
              <Radio.Group options={["1", "2", "3", "4", "5"].map((value) => ({ label: value, value }))} />
            </Form.Item>

            <Form.Item
              name="operatingCostsSince2022"
              label="Since 2022, have operating costs..."
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Select
                options={OPERATING_COSTS_SINCE_2022_OPTIONS.map((value) => ({ label: value, value }))}
                placeholder="Select one"
              />
            </Form.Item>

            <Form.Item
              name="easeOfDoingBusinessRating"
              label="Rate the ease of doing business in your county (1 = Very Difficult, 5 = Very Easy)"
              rules={[{ required: true, message: "Please rate ease of doing business" }]}
            >
              <Radio.Group options={["1", "2", "3", "4", "5"].map((value) => ({ label: value, value }))} />
            </Form.Item>

            <Form.Item
              name="mostIncreasedCosts"
              label="Which costs have increased most?"
              className="md:col-span-2"
              rules={[{ type: "array", required: true, min: 1, message: "Select at least one option" }]}
            >
              <Checkbox.Group options={MOST_INCREASED_COSTS_OPTIONS.map((value) => ({ label: value, value }))} />
            </Form.Item>

            <Form.Item
              name="mainSourcesOfFinancing"
              label="Main sources of financing"
              className="md:col-span-2"
              rules={[{ type: "array", required: true, min: 1, message: "Select at least one option" }]}
            >
              <Checkbox.Group
                options={MAIN_SOURCES_OF_FINANCING_OPTIONS.map((value) => ({ label: value, value }))}
              />
            </Form.Item>

            {mainSourcesOfFinancing.includes("Other") && (
              <Form.Item
                name="financingOther"
                label="Please specify other source of financing"
                className="md:col-span-2"
                rules={[
                  {
                    required: true,
                    message: "Please specify other financing source",
                    validator: (_, value) => {
                      if (mainSourcesOfFinancing.includes("Other") && !value) {
                        return Promise.reject(new Error("Please specify other financing source"));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="Enter financing source" />
              </Form.Item>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-black/10">Policy & Legal Framework</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="awareOfPolicyChangesSince2022"
              label="Are you aware of any national or county policy changes since 2022 that have affected your business?"
              className="md:col-span-2"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Radio.Group options={[{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }]} />
            </Form.Item>

            {awareOfPolicyChangesSince2022 === "Yes" && (
              <Form.Item
                name="policyChangesSpecify"
                label="If yes, specify"
                className="md:col-span-2"
                rules={[
                  {
                    required: true,
                    message: "Please specify the policy changes",
                    validator: (_, value) => {
                      if (awareOfPolicyChangesSince2022 === "Yes" && !value) {
                        return Promise.reject(new Error("Please specify the policy changes"));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            )}

            <Form.Item
              name="policyImpactRating"
              label="Rate the overall impact of recent policy changes (1 = Very Negative, 5 = Very Positive)"
              className="md:col-span-2"
              rules={[{ required: true, message: "Please rate the policy impact" }]}
            >
              <Radio.Group options={["1", "2", "3", "4", "5"].map((value) => ({ label: value, value }))} />
            </Form.Item>

            <Form.Item
              name="constrainingLawsRegulationsLevies"
              label="What specific laws, regulations, or levies constrain your business?"
              className="md:col-span-2"
              rules={[{ required: true, message: "Please provide your response" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="urgentPolicyReformRecommendation"
              label="What urgent policy reform would you recommend?"
              className="md:col-span-2"
              rules={[{ required: true, message: "Please provide your recommendation" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-black/10">
            Youth Participation & Governance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="publicParticipationForums"
              label="Have you participated in public participation forums?"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Select
                options={PUBLIC_PARTICIPATION_FORUMS_OPTIONS.map((value) => ({ label: value, value }))}
                placeholder="Select one"
              />
            </Form.Item>

            {publicParticipationForums === "None" && (
              <Form.Item
                name="noParticipationReason"
                label="If No, why not?"
                rules={[
                  {
                    required: true,
                    message: "Please select a reason",
                    validator: (_, value) => {
                      if (publicParticipationForums === "None" && !value) {
                        return Promise.reject(new Error("Please select a reason"));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Select
                  options={NO_PARTICIPATION_REASON_OPTIONS.map((value) => ({ label: value, value }))}
                  placeholder="Select reason"
                />
              </Form.Item>
            )}

            {publicParticipationForums === "None" && noParticipationReason === "Other" && (
              <Form.Item
                name="noParticipationReasonOther"
                label="Please specify other reason"
                className="md:col-span-2"
                rules={[
                  {
                    required: true,
                    message: "Please specify other reason",
                    validator: (_, value) => {
                      if (
                        publicParticipationForums === "None" &&
                        noParticipationReason === "Other" &&
                        !value
                      ) {
                        return Promise.reject(new Error("Please specify other reason"));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="Enter reason" />
              </Form.Item>
            )}

            <Form.Item
              name="governanceResponsiveness"
              label="Are county governance structures responsive to youth-run businesses?"
              className="md:col-span-2"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Select
                options={GOVERNANCE_RESPONSIVENESS_OPTIONS.map((value) => ({ label: value, value }))}
                placeholder="Select one"
              />
            </Form.Item>

            <Form.Item
              name="youthParticipationCapacityGaps"
              label="What capacity gaps limit youth participation?"
              className="md:col-span-2"
              rules={[{ type: "array", required: true, min: 1, message: "Select at least one option" }]}
            >
              <Checkbox.Group
                options={YOUTH_PARTICIPATION_CAPACITY_GAPS_OPTIONS.map((value) => ({ label: value, value }))}
              />
            </Form.Item>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-black/10">
            Digitalization & Technology
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="usesDigitalPlatforms"
              label="Does your business use digital platforms?"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Radio.Group options={[{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }]} />
            </Form.Item>

            {usesDigitalPlatforms === "Yes" && (
              <Form.Item
                name="digitalPlatformsUsed"
                label="Which platforms do you use?"
                className="md:col-span-2"
                rules={[
                  {
                    type: "array",
                    required: true,
                    min: 1,
                    message: "Select at least one platform",
                    validator: (_, value) => {
                      if (usesDigitalPlatforms === "Yes" && (!value || value.length === 0)) {
                        return Promise.reject(new Error("Select at least one platform"));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Checkbox.Group
                  options={DIGITAL_PLATFORMS_USED_OPTIONS.map((platform) => ({
                    label: platform,
                    value: platform,
                  }))}
                />
              </Form.Item>
            )}
          </div>
        </div>

        <Form.Item name="website" className="hidden">
          <input type="text" tabIndex={-1} autoComplete="off" />
        </Form.Item>

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="!bg-[var(--yplus-primary,#d0a328)] !text-black hover:!opacity-90 hover:!scale-105 transition-transform duration-200 !font-semibold !h-12 !text-base"
          loading={submitting}
          block
        >
          Submit Baseline Survey
        </Button>
      </Form>
    </div>
  );
}

export default function WeLeadBaselineSurveyForm() {
  return (
    <App>
      <WeLeadBaselineSurveyFormContent />
    </App>
  );
}
