"use client";

import LookBack2025Form from "../components/LookBack2025Form";
import FooterMain from "../components/FooterMain";
import HeaderNav from "../components/HeaderNav";

export default function LookBack2025Page() {
  return (
    <>
      <HeaderNav />
      <section className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            2025 Look Back & 2026 Vision
          </h1>
          <p className="text-lg text-black/70">
            As we reflect on the year that was and look forward to the year ahead,
            we&apos;d love to hear about your journey. Share what you hoped to achieve
            in 2025 and what you&apos;re aiming for in 2026.
          </p>
        </div>
        <LookBack2025Form />
      </section>
      <FooterMain />
    </>
  );
}

