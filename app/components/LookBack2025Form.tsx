"use client";

import { Form, Input, Select, Button, Alert, App } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";

type FormValues = {
  fullName: string;
  occupation: string;
  email: string;
  telephone: string;
  hoped2025: string;
  hope2026: string;
  website?: string; // honeypot
};

const OCCUPATION_OPTIONS = [
  { value: "Student", label: "Student" },
  { value: "Business Owner", label: "Business Owner" },
  { value: "Employed", label: "Employed" },
  { value: "Looking for Opportunities", label: "Looking for Opportunities" },
];

const STORAGE_KEY = "youthplus_2025lookback_submitted";

type SubmissionData = {
  submitted: boolean;
  fullName: string;
  email: string;
  submittedAt: string;
};

function LookBack2025FormContent() {
  const { message } = App.useApp();
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const [alreadySubmitted, setAlreadySubmitted] = useState<SubmissionData | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const data: SubmissionData = JSON.parse(stored);
          if (data.submitted) {
            setAlreadySubmitted(data);
            setShowSuccess(true);
          }
        } catch {
          // Invalid JSON, ignore
        }
      }
    }
  }, []);

  const onFinish = async (values: FormValues) => {
    if (values.website) return; // honeypot filled -> ignore

    setSubmitting(true);
    try {
      const response = await fetch("/api/2025lookback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: values.fullName,
          occupation: values.occupation,
          email: values.email,
          telephone: values.telephone,
          hoped2025: values.hoped2025,
          hope2026: values.hope2026,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit form");
      }

      // Store submission in localStorage
      if (typeof window !== "undefined") {
        const submissionData: SubmissionData = {
          submitted: true,
          fullName: values.fullName,
          email: values.email,
          submittedAt: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(submissionData));
        setAlreadySubmitted(submissionData);
      }

      setShowSuccess(true);
      message.success("Thank you for sharing your goals with us!");
      form.resetFields();
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
      <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-7">
        <Alert
          message="Thank You!"
          description={
            <div>
              <p className="mb-2">
                We&apos;ve received your 2025 Look Back submission, <strong>{alreadySubmitted.fullName}</strong>!
              </p>
              <p className="text-sm text-black/70">
                Our team will reach out shortly with confirmation of the details for the session. See you soon.
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
    <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-7">
      <h2 className="text-2xl font-bold">2025 Look Back & 2026 Vision</h2>
      <p className="text-black/70 mt-1">
        Share your reflections on 2025 and your aspirations for 2026.
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="mt-5"
        disabled={showSuccess}
      >
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input size="large" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          name="occupation"
          label="Occupation"
          rules={[{ required: true, message: "Please select your occupation" }]}
        >
          <Select size="large" options={OCCUPATION_OPTIONS} />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail Address"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input size="large" prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          name="telephone"
          label="Telephone Number"
          rules={[{ required: true, message: "Please enter your telephone number" }]}
        >
          <Input size="large" prefix={<PhoneOutlined />} />
        </Form.Item>

        <Form.Item
          name="hoped2025"
          label="What's One Thing You Hoped To Achieve in 2025"
          rules={[
            { required: true, message: "Please share what you hoped to achieve in 2025" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="hope2026"
          label="What's One Thing You Hope to Achieve in 2026"
          rules={[
            { required: true, message: "Please share what you hope to achieve in 2026" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        {/* Honeypot (hidden) */}
        <Form.Item name="website" className="hidden">
          <input type="text" tabIndex={-1} autoComplete="off" />
        </Form.Item>

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="!bg-[var(--yplus-primary,#d0a328)] !text-black hover:!opacity-90"
          loading={submitting}
          disabled={showSuccess}
        >
          Reserve My Slot
        </Button>
      </Form>
    </div>
  );
}

export default function LookBack2025Form() {
  return (
    <App>
      <LookBack2025FormContent />
    </App>
  );
}

