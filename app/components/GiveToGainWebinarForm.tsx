"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { App, Alert, Button, Checkbox, Form, Input, Modal, Radio, Select, Tag } from "antd";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import {
  GIVE_TO_GAIN_WEBINAR,
  GIVE_TO_GAIN_WEBINAR_STORAGE_KEY,
} from "../content/giveToGainWebinar";

const CURRENT_ROLE_OPTIONS = [
  "Student",
  "Early-career professional",
  "Mid-career professional",
  "Entrepreneur / Founder",
  "Creative / Freelancer",
  "Other",
] as const;

const CAREER_STAGE_OPTIONS = [
  "Exploring career opportunities",
  "Building my career in my field",
  "Transitioning into leadership roles",
  "Running or growing a business",
  "Pivoting to a new career path",
] as const;

const INTEREST_OPTIONS = [
  "Leadership development",
  "Economic empowerment / financial growth",
  "Career growth strategies",
  "Entrepreneurship and income streams",
  "Learning from experienced women leaders",
  "Networking and community",
] as const;

const KEY_DISCUSSION_OPTIONS = [
  "Reframing leadership and defining success",
  "Economic empowerment and building income",
  "Leadership without burnout and building influence",
  "Navigating ambition, life transitions, and balance",
  "Practical steps to grow professionally and financially",
] as const;

type FormValues = {
  fullName: string;
  email: string;
  phoneNumber: string;
  currentRole: (typeof CURRENT_ROLE_OPTIONS)[number];
  currentRoleOther?: string;
  careerStage: (typeof CAREER_STAGE_OPTIONS)[number];
  interestInWebinar: string[];
  keyDiscussionPillar: (typeof KEY_DISCUSSION_OPTIONS)[number];
  questionsForFacilitators?: string;
  futureInterest: "Yes" | "Maybe" | "No";
  website?: string;
};

function WebinarFormContent() {
  const { message } = App.useApp();
  const [form] = Form.useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<(typeof GIVE_TO_GAIN_WEBINAR.speakers)[number] | null>(
    null
  );
  const currentRole = Form.useWatch("currentRole", form);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const submitted = localStorage.getItem(GIVE_TO_GAIN_WEBINAR_STORAGE_KEY) === "true";
      setAlreadySubmitted(submitted);
      setShowSuccess(submitted);
    }
  }, []);

  const onFinish = async (values: FormValues) => {
    if (values.website) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/give-to-gain-webinar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit registration");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem(GIVE_TO_GAIN_WEBINAR_STORAGE_KEY, "true");
      }

      setAlreadySubmitted(true);
      setShowSuccess(true);
      form.resetFields();
      message.success("Registration successful. Check your email for confirmation.");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";
      message.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-black/10 bg-white p-5 md:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <Tag className="!mb-3 !border-0 !bg-[var(--yplus-primary,#d0a328)] !text-black !font-semibold">
          {GIVE_TO_GAIN_WEBINAR.theme}
        </Tag>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">{GIVE_TO_GAIN_WEBINAR.title}</h1>
        <p className="text-xl md:text-2xl font-semibold mt-2 text-black/85">{GIVE_TO_GAIN_WEBINAR.questionLine}</p>
        <p className="mt-3 text-black/70 text-base md:text-lg">{GIVE_TO_GAIN_WEBINAR.supportingCopy}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Tag>{GIVE_TO_GAIN_WEBINAR.date}</Tag>
          <Tag>{GIVE_TO_GAIN_WEBINAR.time}</Tag>
          <Tag>{GIVE_TO_GAIN_WEBINAR.format}</Tag>
        </div>
        <p className="mt-4 text-sm text-black/60">
          Webinar access details are shared by email after successful registration.
        </p>
      </section>

      <section id="register-form" className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-8 rounded-2xl border border-black/10 bg-white p-6 md:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <div className="mb-5">
            <h2 className="text-2xl md:text-3xl font-bold">Register for the Webinar</h2>
            <p className="text-black/70 mt-1">
              Complete the form to reserve your spot and receive the webinar details in your email.
            </p>
          </div>

          {showSuccess ? (
            <Alert
              type="success"
              showIcon
              message="Registration received"
              description={
                <div>
                  <p>Thank you for registering. A confirmation email has been sent to your inbox.</p>
                  <p className="mt-2 text-sm text-black/70">
                    Event time: {GIVE_TO_GAIN_WEBINAR.time}
                  </p>
                </div>
              }
            />
          ) : (
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              size="large"
              disabled={alreadySubmitted}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="fullName"
                  label="Full Name"
                  className="md:col-span-2"
                  rules={[{ required: true, message: "Please enter your full name" }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Enter a valid email address" },
                  ]}
                >
                  <Input prefix={<MailOutlined />} type="email" placeholder="Enter your email address" />
                </Form.Item>

                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[{ required: true, message: "Please enter your phone number" }]}
                >
                  <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
                </Form.Item>

                <Form.Item
                  name="currentRole"
                  label="Current Role / Profession"
                  rules={[{ required: true, message: "Please select your current role/profession" }]}
                >
                  <Select
                    options={CURRENT_ROLE_OPTIONS.map((value) => ({ label: value, value }))}
                    placeholder="Select your current role"
                  />
                </Form.Item>

                <Form.Item
                  name="careerStage"
                  label="Career Stage"
                  rules={[{ required: true, message: "Please select your career stage" }]}
                >
                  <Select
                    options={CAREER_STAGE_OPTIONS.map((value) => ({ label: value, value }))}
                    placeholder="Select your career stage"
                  />
                </Form.Item>

                {currentRole === "Other" && (
                  <Form.Item
                    name="currentRoleOther"
                    label="Please specify your role/profession"
                    className="md:col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Please specify your role/profession",
                        validator: (_, value) => {
                          if (currentRole === "Other" && !value) {
                            return Promise.reject(new Error("Please specify your role/profession"));
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input placeholder="Type your role/profession" />
                  </Form.Item>
                )}

                <Form.Item
                  name="interestInWebinar"
                  label="What motivated you to sign up for this webinar?"
                  className="md:col-span-2"
                  rules={[{ type: "array", required: true, min: 1, message: "Select at least one option" }]}
                >
                  <Checkbox.Group
                    options={INTEREST_OPTIONS.map((value) => ({ label: value, value }))}
                  />
                </Form.Item>

                <div className="md:col-span-2 rounded-xl border border-black/10 bg-[#f7f6f2] px-4 py-3">
                  <p className="text-sm font-semibold text-black/80">Speaker Spotlight</p>
                  <p className="text-sm text-black/70 mt-1">{GIVE_TO_GAIN_WEBINAR.speakers[1].spotlight}</p>
                </div>

                <Form.Item
                  name="keyDiscussionPillar"
                  label="Which topic are you most interested in learning about?"
                  className="md:col-span-2"
                  rules={[{ required: true, message: "Please select one topic" }]}
                >
                  <Radio.Group
                    options={KEY_DISCUSSION_OPTIONS.map((value) => ({ label: value, value }))}
                  />
                </Form.Item>

                <Form.Item
                  name="questionsForFacilitators"
                  label="Questions for Facilitators (Optional)"
                  help="If you have a question related to leadership, economic empowerment, career growth, or balancing ambition and life, please share it here. Questions will be addressed during the discussion."
                  className="md:col-span-2"
                >
                  <Input.TextArea rows={4} placeholder="Type your question here" />
                </Form.Item>

                <Form.Item
                  name="futureInterest"
                  label="Would you be interested in future programs on leadership, economic empowerment, and career growth?"
                  className="md:col-span-2"
                  rules={[{ required: true, message: "Please select an option" }]}
                >
                  <Radio.Group options={["Yes", "Maybe", "No"].map((value) => ({ label: value, value }))} />
                </Form.Item>

                <Form.Item name="website" className="hidden">
                  <input type="text" tabIndex={-1} autoComplete="off" />
                </Form.Item>
              </div>

              <Button
                htmlType="submit"
                type="primary"
                size="large"
                block
                loading={submitting}
                disabled={alreadySubmitted}
                className="!mt-2 !bg-[var(--yplus-primary,#d0a328)] !text-black hover:!opacity-90 !font-semibold !h-12 !text-base"
              >
                Submit Registration
              </Button>
            </Form>
          )}
        </div>

        <aside className="xl:col-span-4 space-y-4">
          {GIVE_TO_GAIN_WEBINAR.speakers.map((speaker) => (
            <button
              type="button"
              key={speaker.name}
              onClick={() => setSelectedSpeaker(speaker)}
              className="w-full text-left rounded-2xl border border-black/10 bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:border-[var(--yplus-primary,#d0a328)] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="relative h-16 w-16 flex-shrink-0 rounded-full overflow-hidden">
                  <Image
                    src={speaker.imagePath}
                    alt={`${speaker.name} headshot`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold leading-snug">{speaker.name}</h3>
                  <p className="text-xs text-black/60">{speaker.role}</p>
                </div>
              </div>
              <p className="text-sm text-black/75 mt-3">{speaker.bioExcerpt}</p>
              <p className="text-xs text-[var(--yplus-primary,#b88e1e)] mt-2 font-medium">Click to view</p>
            </button>
          ))}
        </aside>
      </section>

      <Modal
        open={!!selectedSpeaker}
        onCancel={() => setSelectedSpeaker(null)}
        footer={null}
        centered
        width={980}
        title={selectedSpeaker?.name}
      >
        {selectedSpeaker && (
          <div>
            <div className="relative w-full h-[70vh] max-h-[760px] min-h-[420px] rounded-xl overflow-hidden bg-black/5">
              <Image
                src={selectedSpeaker.imagePath}
                alt={`${selectedSpeaker.name} portrait`}
                fill
                sizes="(max-width: 1024px) 92vw, 980px"
                className="object-contain"
              />
            </div>
            <p className="mt-3 text-sm text-black/70">{selectedSpeaker.role}</p>
            <p className="mt-2 text-sm text-black/80">{selectedSpeaker.bioExcerpt}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default function GiveToGainWebinarForm() {
  return (
    <App>
      <WebinarFormContent />
    </App>
  );
}
