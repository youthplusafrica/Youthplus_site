"use client";

import { Modal, Button, Tag } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { FESTIVAL_TIERS, Tier } from "@/public/shared/interfaces";

export default function SponsorshipModal({
  open,
  onClose,
  email = "partnerships@youthplusafrica.com",
}: {
  open: boolean;
  onClose: () => void;
  email?: string;
}) {
  const mailtoForTier = (tier: Tier) => {
    const subject = `Youth+ Festival Sponsorship — ${tier.name}`;
    const body = [
      `Hello Youth+ Africa team,`,
      ``,
      `I’m interested in the ${tier.name} package (${tier.price}).`,
      `Please share next steps and a sponsorship agreement.`,
      ``,
      `Company:`,
      `Contact name:`,
      `Phone:`,
      ``,
      `Thanks,`,
    ].join("\n");
    return `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={880}
      title={
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-lg font-semibold leading-tight">
              Youth+ Festival — Sponsorship Packages
            </div>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6">
        {FESTIVAL_TIERS.map((t) => (
          <div
            key={t.key}
            className={`rounded-2xl border p-5 ${
              t.featured ? "border-black/20 shadow-sm" : "border-black/10"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-xl font-semibold">{t.name}</h4>
              <div className="text-right">
                {t.featured && <Tag color="gold">Most Visible</Tag>}
                <div className="text-base font-medium">{t.price}</div>
              </div>
            </div>

            <ul className="mt-3 list-disc space-y-1 pl-5 text-black/80">
              {t.perks.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>

            <div className="mt-4">
              <a href={mailtoForTier(t)}>
                <Button
                  type="primary"
                  icon={<MailOutlined />}
                  className="!bg-[var(--yplus-primary,#ead61f)] !text-black hover:!opacity-90"
                >
                  Enquire about {t.name}
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-black/10 p-4">
        <div className="text-sm text-black/70">
          Prefer a custom package or in-kind support?{" "}
          <a
            href={`mailto:${email}?subject=${encodeURIComponent(
              "Youth+ Festival — Custom sponsorship"
            )}`}
            className="underline"
          >
            Email us
          </a>{" "}
          and we’ll tailor something for you.
        </div>
      </div>
    </Modal>
  );
}
