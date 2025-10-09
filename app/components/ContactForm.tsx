"use client";

import { Form, Input, Button, message } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";

type Values = {
  name: string;
  email: string;
  subject?: string;
  message: string;
  website?: string; // honeypot
};

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const mailTo = useMemo(() => "support@youthplusafrica.com", []);

  const onFinish = async (values: Values) => {
    if (values.website) return; // honeypot filled -> ignore
    setSubmitting(true);
    try {
      const subject = encodeURIComponent(values.subject || "Website contact");
      const body = encodeURIComponent(
        `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`
      );
      // open user’s email client
      window.location.href = `mailto:${mailTo}?subject=${subject}&body=${body}`;
      message.success("Opening your email app…");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-7">
      <h2 className="text-2xl font-bold">Contact</h2>
      <p className="text-black/70 mt-1">
        Send us a message and we’ll get back to you.
      </p>

      <Form layout="vertical" onFinish={onFinish} className="mt-5">
        <Form.Item
          name="name"
          label="Your name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input size="large" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input size="large" prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item name="subject" label="Subject">
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="message"
          label="Message"
          rules={[{ required: true, message: "Please enter a message" }]}
        >
          <Input.TextArea rows={6} />
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
        >
          Send email
        </Button>
      </Form>
    </div>
  );
}
