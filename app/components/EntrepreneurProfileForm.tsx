"use client";

import { Form, Input, Select, Button, Checkbox, Alert, App } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { uploadToCloudinary } from "../../lib/cloudinary";

const STORAGE_KEY = "youthplus_entrepreneur_profile_submitted";

type FormValues = {
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
  consentAccurate: boolean;
  consentContact: boolean;
  website?: string; // honeypot
};

const AGE_RANGE_OPTIONS = [
  { value: "18–24", label: "18–24" },
  { value: "25–29", label: "25–29" },
  { value: "30–35", label: "30–35" },
  { value: "36+", label: "36+" },
];

const GENDER_OPTIONS = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Non-binary", label: "Non-binary" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

const SECTOR_OPTIONS = [
  { value: "Agriculture", label: "Agriculture" },
  { value: "E-commerce", label: "E-commerce" },
  { value: "Tech / Innovation", label: "Tech / Innovation" },
  { value: "Creative Economy", label: "Creative Economy" },
  { value: "Climate & Sustainability", label: "Climate & Sustainability" },
  { value: "Health", label: "Health" },
  { value: "Education", label: "Education" },
  { value: "Beauty & Wellness", label: "Beauty & Wellness" },
  { value: "Food & Beverage", label: "Food & Beverage" },
  { value: "Finance / Fintech", label: "Finance / Fintech" },
  { value: "Other", label: "Other (Specify)" },
];

const BUSINESS_STAGE_OPTIONS = [
  { value: "Idea Stage", label: "Idea Stage" },
  { value: "Early Stage (0–1 years)", label: "Early Stage (0–1 years)" },
  { value: "Growth Stage (1–3 years)", label: "Growth Stage (1–3 years)" },
  { value: "Scaling (3+ years)", label: "Scaling (3+ years)" },
];

const REVENUE_RANGE_OPTIONS = [
  { value: "0–10,000 KES", label: "0–10,000 KES" },
  { value: "10,000–50,000 KES", label: "10,000–50,000 KES" },
  { value: "50,000–200,000 KES", label: "50,000–200,000 KES" },
  { value: "200,000–500,000 KES", label: "200,000–500,000 KES" },
  { value: "500,000+", label: "500,000+" },
];

const SUPPORT_NEEDS_OPTIONS = [
  { value: "Funding", label: "Funding" },
  { value: "Mentorship", label: "Mentorship" },
  { value: "Training & capacity building", label: "Training & capacity building" },
  { value: "Market linkages", label: "Market linkages" },
  { value: "Visibility / Marketing", label: "Visibility / Marketing" },
  { value: "Technical expertise", label: "Technical expertise" },
  { value: "Access to investors", label: "Access to investors" },
  { value: "Other", label: "Other" },
];

const FESTIVAL_INTEREST_OPTIONS = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
  { value: "Maybe", label: "Maybe" },
];

const REFERRAL_SOURCE_OPTIONS = [
  { value: "Youth Plus Team", label: "Youth Plus Team" },
  { value: "Social media", label: "Social media" },
  { value: "Friend / Referral", label: "Friend / Referral" },
  { value: "University", label: "University" },
  { value: "Event", label: "Event" },
  { value: "Other", label: "Other" },
];

function EntrepreneurProfileFormContent() {
  const { message } = App.useApp();
  const [form] = Form.useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isUploadingPitchDeck, setIsUploadingPitchDeck] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [pitchDeckError, setPitchDeckError] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const sectorValue = Form.useWatch("sector", form);
  const partOfProgramsValue = Form.useWatch("partOfPrograms", form);
  const supportNeedsValue = Form.useWatch("supportNeeds", form) || [];
  const pitchDeckUrl = Form.useWatch("pitchDeckUrl", form);
  const logoOrBrandingUrl = Form.useWatch("logoOrBrandingUrl", form);

  // Check localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "true") {
        setAlreadySubmitted(true);
        setShowSuccess(true);
      }
    }
  }, []);

  const handlePitchDeckUpload = async (file: File) => {
    setIsUploadingPitchDeck(true);
    setPitchDeckError(null);
    try {
      const result = await uploadToCloudinary(file);
      form.setFieldsValue({ pitchDeckUrl: result.secure_url });
      message.success("Pitch deck uploaded successfully");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Upload failed, please try again.";
      setPitchDeckError(errorMessage);
      message.error(errorMessage);
    } finally {
      setIsUploadingPitchDeck(false);
    }
  };

  const handleLogoUpload = async (file: File) => {
    setIsUploadingLogo(true);
    setLogoError(null);
    try {
      const result = await uploadToCloudinary(file);
      form.setFieldsValue({ logoOrBrandingUrl: result.secure_url });
      message.success("Logo/photo uploaded successfully");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Upload failed, please try again.";
      setLogoError(errorMessage);
      message.error(errorMessage);
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const onFinish = async (values: FormValues) => {
    if (values.website) return; // honeypot filled -> ignore

    if (!values.consentAccurate) {
      message.error("Please confirm that the information provided is accurate.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/entrepreneur-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          email: values.email,
          ageRange: values.ageRange,
          gender: values.gender,
          location: values.location,
          businessName: values.businessName,
          sector: values.sector,
          sectorOther: values.sectorOther,
          yearEstablished: values.yearEstablished,
          businessStage: values.businessStage,
          businessDescription: values.businessDescription,
          targetMarket: values.targetMarket,
          customersServed: values.customersServed,
          revenueRange: values.revenueRange,
          achievements: values.achievements,
          challenges: values.challenges,
          educationalBackground: values.educationalBackground,
          relevantExperience: values.relevantExperience,
          partOfPrograms: values.partOfPrograms,
          programsList: values.programsList,
          supportNeeds: values.supportNeeds,
          supportOther: values.supportOther,
          interestedInFestival: values.interestedInFestival,
          websiteUrl: values.websiteUrl,
          pitchDeckUrl: values.pitchDeckUrl,
          logoOrBrandingUrl: values.logoOrBrandingUrl,
          referralSource: values.referralSource,
          consentAccurate: values.consentAccurate,
          consentContact: values.consentContact,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit form");
      }

      // Store submission in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, "true");
        setAlreadySubmitted(true);
      }

      setShowSuccess(true);
      form.resetFields();
      message.success("Thank you for submitting your Entrepreneur Profile!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to submit form. Please try again.";
      message.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (showSuccess && alreadySubmitted) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <Alert
          message="Thank You!"
          description={
            <div>
              <p className="mb-2 text-base">
                Thank you for submitting your Entrepreneur Profile. Our team will review your information and get in touch with you if there are suitable opportunities. Keep an eye on your email and WhatsApp for updates!
              </p>
              <p className="text-sm text-black/70 mt-3">
                You have already submitted your Entrepreneur Profile from this browser. If you need to update your information, please contact us.
              </p>
            </div>
          }
          type="success"
          showIcon
          className="mb-4"
        />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Entrepreneur Profile Submission</h2>
        <p className="text-black/70 text-base md:text-lg">
          Share your entrepreneurial journey and connect with opportunities at Youth Plus Africa.
        </p>
      </div>

      {alreadySubmitted && !showSuccess && (
        <Alert
          message="Already Submitted"
          description="You have already submitted your Entrepreneur Profile from this browser. If you need to update your information, please contact us."
          type="info"
          showIcon
          className="mb-4"
        />
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="mt-2"
        disabled={alreadySubmitted}
      >
        {/* SECTION 1: Personal Information */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-black/10">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[{ required: true, message: "Please enter your full name" }]}
              className="md:col-span-2"
            >
              <Input size="large" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label="Phone Number (WhatsApp preferred)"
              rules={[{ required: true, message: "Please enter your phone number" }]}
            >
              <Input size="large" prefix={<PhoneOutlined />} />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input size="large" prefix={<MailOutlined />} />
            </Form.Item>

            <Form.Item
              name="ageRange"
              label="Age Range"
              rules={[{ required: true, message: "Please select your age range" }]}
            >
              <Select size="large" options={AGE_RANGE_OPTIONS} />
            </Form.Item>

            <Form.Item name="gender" label="Gender">
              <Select size="large" options={GENDER_OPTIONS} placeholder="Select gender" />
            </Form.Item>

            <Form.Item
              name="location"
              label="Location (City / County)"
              rules={[{ required: true, message: "Please enter your location" }]}
              className="md:col-span-2"
            >
              <Input size="large" />
            </Form.Item>
          </div>
        </div>

        {/* SECTION 2: Business Information */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-black/10">
            Business Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="businessName"
              label="Business / Startup Name"
              rules={[{ required: true, message: "Please enter your business name" }]}
              className="md:col-span-2"
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="sector"
              label="Sector / Industry"
              rules={[{ required: true, message: "Please select a sector" }]}
            >
              <Select size="large" options={SECTOR_OPTIONS} />
            </Form.Item>

            {sectorValue === "Other" && (
              <Form.Item
                name="sectorOther"
                label="Please specify"
                rules={[
                  {
                    required: true,
                    message: "Please specify the sector",
                    validator: (_, value) => {
                      if (sectorValue === "Other" && !value) {
                        return Promise.reject(new Error("Please specify the sector"));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            )}

            <Form.Item name="yearEstablished" label="Year Established">
              <Input size="large" placeholder="e.g., 2020" />
            </Form.Item>

            <Form.Item
              name="businessStage"
              label="Business Stage"
              rules={[{ required: true, message: "Please select business stage" }]}
            >
              <Select size="large" options={BUSINESS_STAGE_OPTIONS} />
            </Form.Item>

            <Form.Item
              name="businessDescription"
              label="Short Description of Your Business"
              rules={[{ required: true, message: "Please describe your business" }]}
              className="md:col-span-2"
              help="Explain what you do, who you serve, and how you solve a problem."
            >
              <Input.TextArea rows={5} />
            </Form.Item>
          </div>
        </div>

        {/* SECTION 3: Traction & Impact */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-black/10">
            Traction & Impact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="targetMarket" label="Who is your target market?">
              <Input size="large" />
            </Form.Item>

            <Form.Item name="customersServed" label="How many customers/clients have you served so far?">
              <Input size="large" />
            </Form.Item>

            <Form.Item name="revenueRange" label="Monthly or annual revenue range">
              <Select size="large" options={REVENUE_RANGE_OPTIONS} placeholder="Select range" />
            </Form.Item>

            <Form.Item
              name="achievements"
              label="Main achievements so far"
              help="e.g., clients, awards, milestones, media features, notable partnerships"
              className="md:col-span-2"
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="challenges"
              label="Main challenges you are currently facing"
              className="md:col-span-2"
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </div>
        </div>

        {/* SECTION 4: Founder Background */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-black/10">
            Founder Background
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="educationalBackground" label="Educational Background">
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="partOfPrograms"
              label="Have you been part of any incubator, accelerator, or training programs?"
            >
              <Select
                size="large"
                options={[
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ]}
                placeholder="Select"
              />
            </Form.Item>

            {partOfProgramsValue === "Yes" && (
              <Form.Item
                name="programsList"
                label="Please list the programs"
                rules={[
                  {
                    required: true,
                    message: "Please list the programs",
                    validator: (_, value) => {
                      if (partOfProgramsValue === "Yes" && !value) {
                        return Promise.reject(new Error("Please list the programs"));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
                className="md:col-span-2"
              >
                <Input.TextArea rows={3} />
              </Form.Item>
            )}

            <Form.Item
              name="relevantExperience"
              label="Relevant Experience or Skills"
              className="md:col-span-2"
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </div>
        </div>

        {/* SECTION 5: Support Needs */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-black/10">
            Support Needs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="supportNeeds"
              label="What type of support do you need most right now?"
              className="md:col-span-2"
            >
              <Checkbox.Group options={SUPPORT_NEEDS_OPTIONS} />
            </Form.Item>

            {supportNeedsValue.includes("Other") && (
              <Form.Item
                name="supportOther"
                label="Please specify other support needs"
                rules={[
                  {
                    required: true,
                    message: "Please specify",
                    validator: (_, value) => {
                      if (supportNeedsValue.includes("Other") && !value) {
                        return Promise.reject(new Error("Please specify"));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
                className="md:col-span-2"
              >
                <Input size="large" />
              </Form.Item>
            )}

            <Form.Item
              name="interestedInFestival"
              label="Are you interested in participating in the Youth Plus Festival 2026?"
              className="md:col-span-2"
            >
              <Select size="large" options={FESTIVAL_INTEREST_OPTIONS} placeholder="Select" />
            </Form.Item>
          </div>
        </div>

        {/* SECTION 6: Uploads */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-black/10">
            Uploads (Optional but Recommended)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="pitchDeckUrl"
              label="Upload Your Pitch Deck"
              className="md:col-span-2"
              help={pitchDeckError ? <span className="text-red-500">{pitchDeckError}</span> : undefined}
            >
              <div>
                <input
                  type="file"
                  accept=".pdf,.ppt,.pptx"
                  disabled={isUploadingPitchDeck || alreadySubmitted}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handlePitchDeckUpload(file);
                    }
                  }}
                  className="hidden"
                  id="pitch-deck-upload"
                />
                <label
                  htmlFor="pitch-deck-upload"
                  className={`
                    flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer
                    transition-colors
                    ${isUploadingPitchDeck || alreadySubmitted 
                      ? "border-gray-300 bg-gray-50 cursor-not-allowed" 
                      : "border-gray-300 hover:border-[var(--yplus-primary,#d0a328)] hover:bg-gray-50"
                    }
                  `}
                >
                  <UploadOutlined />
                  <span>
                    {isUploadingPitchDeck 
                      ? "Uploading..." 
                      : pitchDeckUrl 
                        ? "Change Pitch Deck" 
                        : "Select PDF, PPT, or PPTX"
                    }
                  </span>
                </label>
                {pitchDeckUrl && (
                  <div className="mt-2">
                    <a 
                      href={pitchDeckUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--yplus-primary,#d0a328)] hover:underline"
                    >
                      View file
                    </a>
                  </div>
                )}
              </div>
            </Form.Item>

            <Form.Item
              name="logoOrBrandingUrl"
              label="Upload Logo / Product Photos / Branding"
              className="md:col-span-2"
              help={logoError ? <span className="text-red-500">{logoError}</span> : undefined}
            >
              <div>
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp"
                  disabled={isUploadingLogo || alreadySubmitted}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleLogoUpload(file);
                    }
                  }}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className={`
                    flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer
                    transition-colors
                    ${isUploadingLogo || alreadySubmitted 
                      ? "border-gray-300 bg-gray-50 cursor-not-allowed" 
                      : "border-gray-300 hover:border-[var(--yplus-primary,#d0a328)] hover:bg-gray-50"
                    }
                  `}
                >
                  <UploadOutlined />
                  <span>
                    {isUploadingLogo 
                      ? "Uploading..." 
                      : logoOrBrandingUrl 
                        ? "Change Logo/Photo" 
                        : "Select PNG, JPG, or JPEG"
                    }
                  </span>
                </label>
                {logoOrBrandingUrl && (
                  <div className="mt-2">
                    <a 
                      href={logoOrBrandingUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--yplus-primary,#d0a328)] hover:underline"
                    >
                      View file
                    </a>
                  </div>
                )}
              </div>
            </Form.Item>

            <Form.Item
              name="websiteUrl"
              label="Link to Website / Social Media / Portfolio"
              className="md:col-span-2"
              rules={[
                {
                  type: "url",
                  message: "Please enter a valid URL",
                },
              ]}
            >
              <Input size="large" placeholder="https://..." />
            </Form.Item>
          </div>
        </div>

        {/* SECTION 7: Consent & Verification */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-black/10">
            Consent & Verification
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="referralSource"
              label="How did you hear about this form?"
              className="md:col-span-2"
            >
              <Select size="large" options={REFERRAL_SOURCE_OPTIONS} placeholder="Select" />
            </Form.Item>

            <Form.Item
              name="consentAccurate"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Please confirm that the information provided is accurate")),
                },
              ]}
              className="md:col-span-2"
            >
              <Checkbox>
                I confirm that the information provided is accurate.
              </Checkbox>
            </Form.Item>

            <Form.Item
              name="consentContact"
              valuePropName="checked"
              className="md:col-span-2"
            >
              <Checkbox>
                I allow Youth Plus Africa to contact me regarding opportunities, programs, and events.
              </Checkbox>
            </Form.Item>
          </div>
        </div>

        {/* Honeypot (hidden) */}
        <Form.Item name="website" className="hidden">
          <input type="text" tabIndex={-1} autoComplete="off" />
        </Form.Item>

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="!bg-[var(--yplus-primary,#d0a328)] !text-black hover:!opacity-90 hover:!scale-105 transition-transform duration-200 !font-semibold !h-12 !text-base"
          loading={submitting}
          disabled={alreadySubmitted}
          block
        >
          Submit Entrepreneur Profile
        </Button>
      </Form>
    </div>
  );
}

export default function EntrepreneurProfileForm() {
  return (
    <App>
      <EntrepreneurProfileFormContent />
    </App>
  );
}

