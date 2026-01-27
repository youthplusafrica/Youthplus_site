"use client";

import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type PurchaseRequestModalProps = {
  open: boolean;
  onClose: () => void;
  product: Product | null;
};

export default function PurchaseRequestModal({
  open,
  onClose,
  product,
}: PurchaseRequestModalProps) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: {
    name?: string;
    email: string;
    phone: string;
  }) => {
    if (!product) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/purchase-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: product.id,
          itemName: product.name,
          price: product.price,
          customerName: values.name || "",
          customerEmail: values.email,
          customerPhone: values.phone,
        }),
      });

      const data = await response.json();

      if (data.success) {
        message.success("Purchase request submitted successfully! We'll contact you soon.");
        form.resetFields();
        onClose();
      } else {
        message.error(data.error || "Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting purchase request:", error);
      message.error("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={800}
      title={
        <div className="text-lg font-semibold">Make a Purchase Request</div>
      }
    >
      {product && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Product Image - Full preview */}
          <div className="relative h-64 md:h-80 w-full rounded-lg border border-black/10 bg-gray-50 overflow-hidden flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width:768px) 100vw, 400px"
              className="object-contain object-center p-4"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-black mb-2">{product.name}</h3>
            <p className="text-2xl font-bold text-[var(--yplus-primary,#d0a328)]">
              {product.price.toLocaleString("en-KE", {
                style: "currency",
                currency: "KES",
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        <Form.Item
          name="name"
          label="Your name (optional)"
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Enter your name"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined />}
            type="email"
            placeholder="Enter your email address"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input
            size="large"
            prefix={<PhoneOutlined />}
            placeholder="Enter your phone number"
          />
        </Form.Item>

        <div className="mt-6 flex gap-3">
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className="flex-1 !bg-[var(--yplus-primary,#d0a328)] !text-black hover:!opacity-90"
            loading={submitting}
          >
            Submit Request
          </Button>
          <Button size="large" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
