"use client";

import { useState } from "react";
import { Form, Input, Button, message, Result } from "antd";
import { CheckCircleOutlined, UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import HeaderNav from "../components/HeaderNav";
import FooterMain from "../components/FooterMain";
import SectionWithBg from "../components/SectionWithBg";
import { JOIN_COMMUNITY_CONTENT, JOINED_COMMUNITY_STORAGE_KEY } from "../content/joinCommunity";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  website?: string; // honeypot
};

export default function JoinCommunityPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onFinish = async (values: FormValues) => {
    if (values.website) return; // honeypot filled -> ignore

    setSubmitting(true);
    try {
      const response = await fetch("/api/join-community", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      // Mark as joined in localStorage (permanent - popup won't show again)
      localStorage.setItem(JOINED_COMMUNITY_STORAGE_KEY, "true");
      
      // Show success state
      setSubmitted(true);
      message.success("Welcome to the Youth+ Africa Community! 🎉");
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <HeaderNav />
      <SectionWithBg
        src="/images/events-bg.jpg"
        alt="Join Youth+ Community"
        overlay={60}
        className="py-12 md:py-16"
      >
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {JOIN_COMMUNITY_CONTENT.headline}
            </h1>
            <p className="text-white/80 text-lg">
              {JOIN_COMMUNITY_CONTENT.subheadline}
            </p>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 md:p-8">
              <Result
                status="success"
                icon={<CheckCircleOutlined className="!text-[var(--yplus-primary,#d0a328)]" />}
                title={
                  <span className="text-white text-2xl font-bold">
                    Welcome to the Youth+ Africa Community!
                  </span>
                }
                subTitle={
                  <span className="text-white/90">
                    Thank you for joining! We&apos;ll keep you updated on Connect Series events, 
                    opportunities, and community initiatives.
                  </span>
                }
                extra={[
                  <Button
                    key="home"
                    type="primary"
                    href="/home"
                    className="!bg-[var(--yplus-primary,#d0a328)] !text-black hover:!opacity-90"
                  >
                    Return to Home
                  </Button>,
                ]}
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 md:p-8">
              {/* Benefits */}
              <div className="mb-6">
                <p className="text-white font-semibold mb-3">
                  What you&apos;ll receive:
                </p>
                <ul className="list-disc list-inside text-white/90 space-y-2">
                  {JOIN_COMMUNITY_CONTENT.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>

              {/* Form */}
              <Form
                layout="vertical"
                onFinish={onFinish}
                className="mt-6"
                size="large"
              >
                <Form.Item
                  name="fullName"
                  label={
                    <span className="text-white">
                      {JOIN_COMMUNITY_CONTENT.formFields.fullName}
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter your full name" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    className="bg-white/90"
                    placeholder="Enter your full name"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label={
                    <span className="text-white">
                      {JOIN_COMMUNITY_CONTENT.formFields.email}
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Enter a valid email address" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    type="email"
                    className="bg-white/90"
                    placeholder="Enter your email address"
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label={
                    <span className="text-white">
                      {JOIN_COMMUNITY_CONTENT.formFields.phone}
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter your phone number" },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined />}
                    className="bg-white/90"
                    placeholder="Enter your phone number"
                  />
                </Form.Item>

                {/* Honeypot (hidden) */}
                <Form.Item name="website" className="hidden">
                  <input type="text" tabIndex={-1} autoComplete="off" />
                </Form.Item>

                <Form.Item className="mt-6">
                  <Button
                    htmlType="submit"
                    type="primary"
                    size="large"
                    className="w-full !bg-[var(--yplus-primary,#d0a328)] !text-black hover:!opacity-90 font-semibold"
                    loading={submitting}
                  >
                    {JOIN_COMMUNITY_CONTENT.ctaButton}
                  </Button>
                </Form.Item>

                {/* Trust line */}
                <p className="text-xs text-white/70 text-center mt-4">
                  {JOIN_COMMUNITY_CONTENT.trustLine}
                </p>
              </Form>
            </div>
          )}
        </div>
      </SectionWithBg>
      <FooterMain />
    </>
  );
}

