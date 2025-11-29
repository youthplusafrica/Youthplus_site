"use client";

import Image from "next/image";
import LookBack2025Form from "../components/LookBack2025Form";
import FooterMain from "../components/FooterMain";
import HeaderNav from "../components/HeaderNav";

export default function LookBack2025Page() {
  return (
    <>
      <HeaderNav />
      <section className="relative min-h-screen overflow-x-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/youth+fest.jpg"
            alt="2025 Look Back background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/75" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
            <div className="mb-10 md:mb-12">
              <div className="relative inline-block mb-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  2025 Look Back & 2026 Vision
                </h1>
                <span
                  className="absolute left-0 -bottom-1 h-2 w-32 md:w-40"
                  style={{ background: "var(--yplus-primary,#d0a328)" }}
                  aria-hidden="true"
                />
              </div>
              <p className="text-lg md:text-xl text-black/70 leading-relaxed max-w-2xl">
                As we reflect on the year that was and look forward to the year ahead,
                we&apos;d love to hear about your journey. Share what you hoped to achieve
                in 2025 and what you&apos;re aiming for in 2026.
              </p>
            </div>

            {/* Form */}
            <div className="relative py-8 md:py-12">
              <LookBack2025Form />
            </div>
          </div>
        </div>
        {/* Brand accent bar at bottom */}
        <div className="h-1 w-full bg-[var(--yplus-primary,#d0a328)]" aria-hidden="true" />
      </section>
      <FooterMain />
    </>
  );
}

