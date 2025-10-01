"use client";

import Link from "next/link";
import {
  InstagramOutlined,
  TwitterOutlined,
  YoutubeFilled,
  LinkedinFilled,
  MailOutlined,
  EnvironmentOutlined,
	XOutlined,
  TikTokOutlined,
} from "@ant-design/icons";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Ventures", href: "/ventures" },
  { label: "About Us", href: "/about" },
  { label: "Partner With Us", href: "/partner-with-us" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://instagram.com/youthplusafrica",
    icon: <InstagramOutlined />,
  },
  {
    label: "X (Twitter)",
    href: "https://twitter.com/YouthPlusAfrica",
    icon: <XOutlined />,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@youthplusafrica",
    icon: <YoutubeFilled />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/youthplusafrica",
    icon: <LinkedinFilled />,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@youthplusafrica",
    icon: <TikTokOutlined />,
  }
];

export default function FooterMain() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      {/* brand bar */}
      <div
        className="h-1 w-full bg-[var(--yplus-primary,#ead61f)]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand + blurb */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-block font-extrabold tracking-tight text-xl"
            >
              Youth+ Africa
            </Link>
            <p className="mt-3 text-white/80 max-w-md">
              Empowering Africa’s youth to build, create, and lead — through
              training, creation, growth, and leadership.
            </p>

            {/* Socials */}
            <ul className="mt-4 flex items-center gap-3">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 bg-white/5 text-white/90 hover:bg-white/10 hover:text-white transition"
                  >
                    <span className="text-lg">{s.icon}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <nav>
            <ul className="mt-3 space-y-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-white/85 hover:text-[var(--yplus-primary,#ead61f)] transition"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
              Contact
            </h3>
            <ul className="mt-3 space-y-2 text-white/85">
              <li className="flex items-start gap-2">
                <MailOutlined className="mt-0.5 text-white/70" />
                <a
                  href="mailto:hello@youthplusafrica.com"
                  className="hover:text-[var(--yplus-primary,#ead61f)] transition"
                >
                  support@youthplusafrica.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <EnvironmentOutlined className="mt-0.5 text-white/70" />
                <span>
                  10th Floor, Riverside Square, Riverside Drive, Nairobi
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* fine print */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-sm text-white/70">
          <p>© {year} Youth+ Africa. All rights reserved.</p>
          <div className="flex gap-4">
            {/* <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
