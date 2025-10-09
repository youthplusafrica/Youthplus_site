"use client";

import FooterMain from "../components/FooterMain";
import HeaderNav from "../components/HeaderNav";
import SectionWithBg from "../components/SectionWithBg";


export default function ShopPage() {
  return (
    <>
      <HeaderNav />

      {/* Full-bleed or sticky hero bg—use either: */}
      {/* Cover mode (simple full section background) */}
      <SectionWithBg
        src="/images/shop.jpg" 
        overlay={55}
        className="py-24 md:py-32"
      >
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Youth+ Shop
          </h1>
          <p className="mt-3 text-white/85 text-lg">
            Coming soon
          </p>
          <div
            className="mx-auto mt-8 h-1 w-40 rounded-full"
            style={{ background: "var(--yplus-primary,#d0a328)" }}
            aria-hidden="true"
          />
        </div>
      </SectionWithBg>

      <FooterMain />
    </>
  );
}
