"use client";

import {
  Tabs,
  Form,
  Input,
  Select,
  Button,
  message,
  Divider,
  Alert,
} from "antd";
import {
  UserSwitchOutlined,
  TeamOutlined,
  MailOutlined,
  PhoneOutlined,
  ReadOutlined,
  ScheduleOutlined,
  BankOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { useMemo, useState } from "react";

type BaseValues = {
  fullName: string;
  email: string;
  phone?: string;
  message?: string;
  website?: string; // honeypot
};

type FacilitatorValues = BaseValues & {
  expertise: string[];
  availability?: string;
  portfolioUrl?: string;
};

type VolunteerValues = BaseValues & {
  interests: string[];
  city?: string;
  availability?: string;
};

type MentorValues = BaseValues & {
  mentorAreas: string[];
  experience?: string;
  availability?: string;
  portfolioUrl?: string;
};

const EMAILS = {
  volunteer: "support@youthplusafrica.com",
  facilitator: "freddy@youthplusafrica.com",
  mentor: "freddy@youthplusafrica.com",
  sponsorships: "geoffrey@youthplusafrica.com",
};

export default function PartnerWithUs() {
  const [loading, setLoading] = useState(false);
  // const mailto = useMemo(() => EMAIL, []);

  const sendMail = (
    to: string,
    subject: string,
    bodyLines: Record<string, string | string[] | undefined>
  ) => {
    const body = Object.entries(bodyLines)
      .filter(([, v]) => v !== undefined && v !== "")
      .map(([k, v]) =>
        Array.isArray(v) ? `${k}: ${v.join(", ")}` : `${k}: ${v}`
      )
      .join("\n");

    const url = `mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  const onFacilitator = async (values: FacilitatorValues) => {
    if (values.website) return; // honeypot
    setLoading(true);
    try {
      sendMail(EMAILS.facilitator, "Facilitator/Trainer partnership interest", {
        "Full name": values.fullName,
        Email: values.email,
        Phone: values.phone,
        Expertise: values.expertise,
        Availability: values.availability,
        "Portfolio/LinkedIn": values.portfolioUrl,
        Message: values.message,
      });
      message.success("Opening your email app…");
    } finally {
      setLoading(false);
    }
  };

  const onVolunteer = async (values: VolunteerValues) => {
    if (values.website) return;
    setLoading(true);
    try {
      sendMail(EMAILS.volunteer, "Volunteer partnership interest", {
        "Full name": values.fullName,
        Email: values.email,
        Phone: values.phone,
        City: values.city,
        Interests: values.interests,
        Availability: values.availability,
        Message: values.message,
      });
      message.success("Opening your email app…");
    } finally {
      setLoading(false);
    }
  };

  const onMentor = async (values: MentorValues) => {
    if (values.website) return; // honeypot
    setLoading(true);
    try {
      sendMail(EMAILS.mentor, "Mentor partnership interest", {
        "Full name": values.fullName,
        Email: values.email,
        Phone: values.phone,
        "Mentor areas": values.mentorAreas,
        Experience: values.experience,
        Availability: values.availability,
        "Portfolio/LinkedIn": values.portfolioUrl,
        Message: values.message,
      });
      message.success("Opening your email app…");
    } finally {
      setLoading(false);
    }
  };

  const sponsorHref = (topic: string) => {
    const subject = `Sponsorship inquiry — ${topic}`;
    const body = [
      `Hello Youth+ Africa team,`,
      ``,
      `I’m interested in sponsoring ${topic}. Please share the sponsorship packages and next steps.`,
      ``,
      `Company:`,
      `Contact name:`,
      `Phone:`,
      `Estimated budget:`,
      ``,
      `Thanks,`,
    ].join("\n");

    return `mailto:${EMAILS.sponsorships}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="partner" className="bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Partner with us
            </h2>
            <p className="text-black/70 mt-1">
              Join Youth+ Africa as an individual{" "}
              <strong>Facilitator/Trainer, Mentor</strong> or as a{" "}
              <strong>Volunteer</strong>. Help us grow programs, create
              opportunities, and reach more youth across the continent.
            </p>
          </div>
          <div
            className="hidden md:block h-1 w-36 rounded-full"
            style={{ background: "var(--yplus-primary, #d0a328)" }}
          />
        </header>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Tabs + Forms */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-black/10 bg-white p-4 md:p-6">
              <Tabs
                defaultActiveKey="facilitator"
                items={[
                  {
                    key: "facilitator",
                    label: (
                      <span className="flex items-center gap-2">
                        <UserSwitchOutlined /> Facilitator / Trainer
                      </span>
                    ),
                    children: (
                      <Form layout="vertical" onFinish={onFacilitator}>
                        <Alert
                          type="info"
                          showIcon
                          className="mb-4"
                          message={
                            <span>
                              We’re seeking experienced{" "}
                              <strong>
                                trainers, mentors, and facilitators
                              </strong>{" "}
                              across creative industries, entrepreneurship,
                              media, design, tech, and culture.
                            </span>
                          }
                        />

                        <Form.Item
                          name="fullName"
                          label="Full name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your name",
                            },
                          ]}
                        >
                          <Input size="large" prefix={<ReadOutlined />} />
                        </Form.Item>

                        <Form.Item
                          name="email"
                          label="Email"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your email",
                            },
                            { type: "email" },
                          ]}
                        >
                          <Input size="large" prefix={<MailOutlined />} />
                        </Form.Item>

                        <Form.Item name="phone" label="Phone (optional)">
                          <Input size="large" prefix={<PhoneOutlined />} />
                        </Form.Item>

                        <Form.Item
                          name="expertise"
                          label="Areas of expertise"
                          rules={[
                            {
                              required: true,
                              message: "Select at least one area",
                            },
                          ]}
                        >
                          <Select
                            mode="multiple"
                            size="large"
                            placeholder="e.g., Entrepreneurship, Audio production, Product design…"
                            options={[
                              { value: "Entrepreneurship" },
                              { value: "Creative careers" },
                              { value: "Podcasting / Audio" },
                              { value: "Media & storytelling" },
                              { value: "Product / UI Design" },
                              { value: "Software / No-Code" },
                              { value: "Marketing / Growth" },
                              { value: "Events / Production" },
                              { value: "Policy / Advocacy" },
                            ]}
                          />
                        </Form.Item>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Form.Item name="availability" label="Availability">
                            <Input
                              size="large"
                              prefix={<ScheduleOutlined />}
                              placeholder="e.g., Weekends, 5–10 hrs/week"
                            />
                          </Form.Item>
                          <Form.Item
                            name="portfolioUrl"
                            label="Portfolio / LinkedIn (optional)"
                          >
                            <Input size="large" placeholder="https://…" />
                          </Form.Item>
                        </div>

                        <Form.Item name="message" label="Message">
                          <Input.TextArea
                            rows={5}
                            placeholder="Tell us about your experience and what you’d like to teach or mentor on."
                          />
                        </Form.Item>

                        {/* Honeypot */}
                        <Form.Item name="website" className="hidden">
                          <input type="text" tabIndex={-1} autoComplete="off" />
                        </Form.Item>

                        <Button
                          htmlType="submit"
                          type="primary"
                          size="large"
                          className="!bg-[var(--yplus-primary,#d0a328)] !text-black hover:!opacity-90"
                          loading={loading}
                        >
                          Express interest
                        </Button>
                      </Form>
                    ),
                  },

                  {
                    key: "mentor",
                    label: (
                      <span className="flex items-center gap-2">
                        <SolutionOutlined /> Mentor
                      </span>
                    ),
                    children: (
                      <Form layout="vertical" onFinish={onMentor}>
                        <Alert
                          type="info"
                          showIcon
                          className="mb-4"
                          message={
                            <span>
                              Share time and guidance as a{" "}
                              <strong>mentor</strong>—supporting learners,
                              creators, and founders through check-ins, project
                              feedback, and career advice.
                            </span>
                          }
                        />

                        <Form.Item
                          name="fullName"
                          label="Full name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your name",
                            },
                          ]}
                        >
                          <Input size="large" prefix={<ReadOutlined />} />
                        </Form.Item>

                        <Form.Item
                          name="email"
                          label="Email"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your email",
                            },
                            { type: "email" },
                          ]}
                        >
                          <Input size="large" prefix={<MailOutlined />} />
                        </Form.Item>

                        <Form.Item name="phone" label="Phone (optional)">
                          <Input size="large" prefix={<PhoneOutlined />} />
                        </Form.Item>

                        <Form.Item
                          name="mentorAreas"
                          label="Mentor areas"
                          rules={[
                            {
                              required: true,
                              message: "Select at least one area",
                            },
                          ]}
                        >
                          <Select
                            mode="multiple"
                            size="large"
                            placeholder="e.g., Fundraising, Product, Design, Media, Marketing…"
                            options={[
                              { value: "Entrepreneurship / Fundraising" },
                              { value: "Business Strategy / Operations" },
                              { value: "Product Management" },
                              { value: "Design / UI-UX" },
                              { value: "Engineering / No-Code" },
                              { value: "Content / Media / Podcasting" },
                              { value: "Marketing / Growth" },
                              { value: "Leadership / Careers" },
                            ]}
                          />
                        </Form.Item>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Form.Item
                            name="experience"
                            label="Experience (years)"
                          >
                            <Input size="large" placeholder="e.g., 3–5 years" />
                          </Form.Item>
                          <Form.Item name="availability" label="Availability">
                            <Input
                              size="large"
                              prefix={<ScheduleOutlined />}
                              placeholder="e.g., 2 hrs/week"
                            />
                          </Form.Item>
                        </div>

                        <Form.Item
                          name="portfolioUrl"
                          label="Portfolio / LinkedIn (optional)"
                        >
                          <Input size="large" placeholder="https://…" />
                        </Form.Item>

                        <Form.Item name="message" label="Message">
                          <Input.TextArea
                            rows={5}
                            placeholder="Tell us who you’d like to mentor and how you can help."
                          />
                        </Form.Item>

                        {/* Honeypot */}
                        <Form.Item name="website" className="hidden">
                          <input type="text" tabIndex={-1} autoComplete="off" />
                        </Form.Item>

                        <Button
                          htmlType="submit"
                          type="primary"
                          size="large"
                          className="!bg-[var(--yplus-primary,#d0a328)] !text-black hover:!opacity-90"
                          loading={loading}
                        >
                          Join as a mentor
                        </Button>
                      </Form>
                    ),
                  },

                  {
                    key: "volunteer",
                    label: (
                      <span className="flex items-center gap-2">
                        <TeamOutlined /> Volunteer
                      </span>
                    ),
                    children: (
                      <Form layout="vertical" onFinish={onVolunteer}>
                        <Alert
                          type="info"
                          showIcon
                          className="mb-4"
                          message={
                            <span>
                              Join our <strong>volunteer network</strong> to
                              support events, programs, and community activities
                              across Youth+ Africa.
                            </span>
                          }
                        />

                        <Form.Item
                          name="fullName"
                          label="Full name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your name",
                            },
                          ]}
                        >
                          <Input size="large" prefix={<ReadOutlined />} />
                        </Form.Item>

                        <Form.Item
                          name="email"
                          label="Email"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your email",
                            },
                            { type: "email" },
                          ]}
                        >
                          <Input size="large" prefix={<MailOutlined />} />
                        </Form.Item>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Form.Item name="phone" label="Phone (optional)">
                            <Input size="large" prefix={<PhoneOutlined />} />
                          </Form.Item>
                          <Form.Item name="city" label="City (optional)">
                            <Input size="large" placeholder="e.g., Nairobi" />
                          </Form.Item>
                        </div>

                        <Form.Item
                          name="interests"
                          label="Interests"
                          rules={[
                            {
                              required: true,
                              message: "Select at least one interest",
                            },
                          ]}
                        >
                          <Select
                            mode="multiple"
                            size="large"
                            placeholder="e.g., Events, Content, Community, Admin…"
                            options={[
                              { value: "Events & Logistics" },
                              { value: "Content & Media" },
                              { value: "Community" },
                              { value: "Admin & Ops" },
                              { value: "Design" },
                              { value: "Tech" },
                              { value: "Research" },
                            ]}
                          />
                        </Form.Item>

                        <Form.Item name="availability" label="Availability">
                          <Input
                            size="large"
                            prefix={<ScheduleOutlined />}
                            placeholder="e.g., Weekdays after 5pm"
                          />
                        </Form.Item>

                        <Form.Item name="message" label="Message">
                          <Input.TextArea
                            rows={5}
                            placeholder="Tell us why you want to volunteer and how you’d like to help."
                          />
                        </Form.Item>

                        {/* Honeypot */}
                        <Form.Item name="website" className="hidden">
                          <input type="text" tabIndex={-1} autoComplete="off" />
                        </Form.Item>

                        <Button
                          htmlType="submit"
                          type="primary"
                          size="large"
                          className="!bg-[var(--yplus-primary,#d0a328)] !text-black hover:!opacity-90"
                          loading={loading}
                        >
                          Join as a volunteer
                        </Button>
                      </Form>
                    ),
                  },
                ]}
              />
            </div>
          </div>
          {/* Right: Sponsorship / Partners CTA */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-black/10 bg-white p-5">
              <div className="flex items-center gap-2">
                <BankOutlined className="text-xl" />
                <h3 className="text-lg font-semibold">
                  Partnerships & Sponsorships
                </h3>
              </div>
              <p className="mt-2 text-black/75">
                Want to support Youth+ Africa programs, events, or ventures at
                scale? We partner with brands, institutions, and foundations to
                deliver impact across the continent.
              </p>

              <ul className="mt-3 text-sm text-black/70 list-disc pl-5 space-y-1">
                <li>Program funding & scholarships</li>
                <li>Training & mentorship partnerships</li>
                <li>Events & community sponsorships</li>
                <li>Content & media collaborations</li>
              </ul>

              <Divider className="my-4" />

              <div className="flex flex-col gap-2">
                {/* keep these as mailto for now */}
                <a
                  href={sponsorHref("Connect Series")}
                  className="inline-block"
                >
                  <Button
                    type="primary"
                    size="large"
                    className="!bg-[var(--yplus-primary,#d0a328)] !text-black hover:!opacity-90"
                  >
                    Sponsor Connect Series
                  </Button>
                </a>

                <a href={sponsorHref("Youth+ Radio")} className="inline-block">
                  <Button
                    type="primary"
                    size="large"
                    className="!bg-[var(--yplus-primary,#d0a328)] !text-black hover:!opacity-90"
                  >
                    Sponsor Youth+ Radio
                  </Button>
                </a>

                {/* this one opens the modal */}
                <a
                  href={sponsorHref("Youth+ Festival")}
                  className="inline-block"
                >
                  <Button
                    type="primary"
                    size="large"
                    className="!bg-[var(--yplus-primary,#d0a328)] !text-black hover:!opacity-90"
                  >
                    Sponsor Youth+ Festival
                  </Button>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* brand bar */}
      <div
        className="h-1 w-full bg-[var(--yplus-primary,#d0a328)]"
        aria-hidden="true"
      />
    </section>
  );
}
