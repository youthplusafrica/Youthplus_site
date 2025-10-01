"use client";

import { Modal, Button, Tag } from "antd";
import { MailOutlined } from "@ant-design/icons";

type Tier = {
  key: string;
  name: string;
  price: string;
  perks: string[];
  featured?: boolean;
};

const FESTIVAL_TIERS: Tier[] = [
  {
    key: "platinum",
    name: "Platinum (Title Sponsor)",
    price: "$50,000",
    featured: true,
    perks: [
      "Exclusive branding as the Platinum (Title) Sponsor of Youth+ Festival",
      "Prime logo placement across all festival marketing (banners, brochures, website, social)",
      "Keynote speaking slot during the Opening Ceremony (senior executive/CEO)",
      "Private networking session with top entrepreneurs, investors, and influencers",
      "Featured mention in all press releases and media coverage",
      "Premium exhibition space",
      "15 VIP passes",
      "Special recognition award on stage",
    ],
  },
  {
    key: "gold",
    name: "Gold",
    price: "$35,000",
    perks: [
      "Prominent branding on festival marketing, website, and social",
      "Panel participation for a senior executive",
      "Access to networking sessions",
      "Mention in press releases and media coverage",
      "Standard exhibition space",
      "10 VIP passes",
      "Recognition during the event",
    ],
  },
  {
    key: "silver",
    name: "Silver",
    price: "$25,000",
    perks: [
      "Branding on selected festival marketing and website",
      "Panel participation opportunity",
      "Access to networking sessions",
      "Mention in selected press releases",
      "Exhibition space",
      "3 VIP passes",
    ],
  },
  {
    key: "bronze",
    name: "Bronze",
    price: "$10,000",
    perks: [
      "Logo on festival website and selected materials",
      "Participation in event activities",
      "Access to networking sessions",
      "Mention in event communications",
      "Exhibition space",
      "5 VIP passes",
    ],
  },
  {
    key: "panel",
    name: "Panel Partner",
    price: "$5,000",
    perks: [
      "Logo on website and selected materials",
      "Panel participation for a senior executive",
      "Access to networking sessions",
      "Mention in event communications",
      "Exhibition space",
      "2 VIP passes",
    ],
  },
  {
    key: "village",
    name: "Village Partner",
    price: "$1,500",
    perks: [
      "Logo on website and selected materials",
      "Branding of selected villages (up to 3) at entrances and inside",
      "Access to networking sessions",
      "Mention in event communications",
      "Exhibition space",
      "2 VIP passes",
    ],
  },
  {
    key: "community",
    name: "Community Partner",
    price: "$1,500",
    perks: [
      "50 tickets for your community",
      "Exhibition space",
      "Logo on promotional materials as Community Partner",
    ],
  },
];

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
