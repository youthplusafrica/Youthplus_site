"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Drawer, Button } from "antd";
import type { MenuProps } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { VENTURES } from "../content/ventures";

const NAV = {
  HOME: "/home",
  EVENTS: "/events",
  VENTURES: "/ventures",
  ABOUT: "/about",
  PARTNERWITHUS: "/partner-with-us",
  CONTACT: "/contact",
  SHOP: "/shop",
} as const;

export default function HeaderNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const selectedKey = useMemo(() => {
    if (pathname === NAV.HOME) return NAV.HOME;
    if (pathname.startsWith(NAV.EVENTS)) return NAV.EVENTS;
    if (pathname.startsWith(NAV.ABOUT)) return NAV.ABOUT;
    if (pathname.startsWith(NAV.CONTACT)) return NAV.CONTACT;
    if (pathname.startsWith(NAV.PARTNERWITHUS)) return NAV.PARTNERWITHUS;
    if (pathname.startsWith(NAV.VENTURES)) return NAV.VENTURES;
    if (pathname.startsWith(NAV.SHOP)) return NAV.SHOP;
    return "";
  }, [pathname]);

  const desktopItems: MenuProps["items"] = [
    { key: NAV.HOME, label: <Link href={NAV.HOME}>Home</Link> },
    { key: NAV.EVENTS, label: <Link href={NAV.EVENTS}>Events</Link> },
    {
      key: NAV.VENTURES,
      label: <Link href={NAV.VENTURES}>Ventures</Link>,
      children: VENTURES.map((v) => ({
        key: `${NAV.VENTURES}#${v.id}`,
        label: <Link href={`/ventures#${v.id}`}>{v.name}</Link>,
      })),
    },
    {
      key: NAV.ABOUT,
      label: <Link href={NAV.ABOUT}>About Us</Link>,
      children: [
        {
          key: `${NAV.ABOUT}#team`,
          label: <Link href="/about#team">Team</Link>,
        },
        {
          key: `${NAV.ABOUT}#careers`,
          label: <Link href="/about#careers">Careers</Link>,
        },
      ],
    },
    {
      key: NAV.PARTNERWITHUS,
      label: <Link href={NAV.PARTNERWITHUS}>Partner with us</Link>,
    },
    { key: NAV.CONTACT, label: <Link href={NAV.CONTACT}>Contact</Link> },
    { key: NAV.SHOP, label: <Link href={NAV.SHOP}>Shop</Link> },
  ];

  const mobileMenu = (
    <nav className="px-4 py-3">
      <ul className="flex flex-col text-lg">
        <li className="py-2">
          <Link href={NAV.HOME} onClick={() => setOpen(false)}>
            Home
          </Link>
        </li>
        <li className="py-2">
          <Link href={NAV.EVENTS} onClick={() => setOpen(false)}>
            Events
          </Link>
        </li>
        <li className="py-2">
          <Link href={NAV.VENTURES} onClick={() => setOpen(false)}>
            Ventures
          </Link>
          <ul className="mt-1 ml-3 text-base">
            {VENTURES.map((v) => (
              <li className="py-1" key={v.id}>
                <Link href={`/ventures#${v.id}`} onClick={() => setOpen(false)}>
                  {v.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li className="py-2">
          <Link href={NAV.ABOUT} onClick={() => setOpen(false)}>
            About Us
          </Link>
          <ul className="mt-1 ml-3 text-base">
            <li className="py-1">
              <Link href="/about#team" onClick={() => setOpen(false)}>
                Team
              </Link>
            </li>
            <li className="py-1">
              <Link href="/about#careers" onClick={() => setOpen(false)}>
                Careers
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href={NAV.PARTNERWITHUS} onClick={() => setOpen(false)}>
            Partner with us
          </Link>
        </li>
        <li className="py-2">
          <Link href={NAV.CONTACT} onClick={() => setOpen(false)}>
            Contact
          </Link>
        </li>
        <li className="py-2">
          <Link href={NAV.SHOP} onClick={() => setOpen(false)}>
            Shop
          </Link>
        </li>
      </ul>
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur border-b border-black/10">
      <div className="container w-full px-6">
        <div className="flex items-center justify-between gap-4 py-4">
          <Link
            href="/home"
            className="flex items-center gap-2"
            aria-label="Youth+ Africa – Home"
          >
            <Image
              src="/images/youth-plus-logo.png"
              alt="Youth+ Africa"
              width={150}
              height={150}
              className="rounded-sm"
              priority
            />
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex flex-1 min-w-0 justify-end">
            <Menu
              mode="horizontal"
              selectedKeys={[selectedKey]}
              items={desktopItems}
              className="border-0"
              style={{ justifyContent: "flex-end" }}
              rootClassName="yplus-menu"
              disabledOverflow
            />
          </div>

          {/* Mobile trigger */}
          <div className="md:hidden">
            <Button
              type="text"
              aria-label="Open menu"
              icon={<MenuOutlined style={{ fontSize: 20 }} />}
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </div>

      <Drawer
        title={
          <div className="flex items-center gap-2">
            <Image
              src="/images/youth-plus-logo.png"
              alt="Youth+ Africa"
              width={100}
              height={100}
              className="rounded-sm"
            />
          </div>
        }
        placement="right"
        closeIcon={<CloseOutlined />}
        onClose={() => setOpen(false)}
        open={open}
        styles={{
          body: { padding: 0 },
          header: { borderBottom: "1px solid rgba(0,0,0,.06)" },
          footer: { borderTop: "1px solid rgba(0,0,0,.06)" },
        }}
      >
        {mobileMenu}
      </Drawer>

      <div
        className="h-1 w-full bg-[var(--yplus-primary,#ead61f)]"
        aria-hidden="true"
      />
    </header>
  );
}
