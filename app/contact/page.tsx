"use client";

import ContactForm from "../components/ContactForm";
import FooterMain from "../components/FooterMain";
import HeaderNav from "../components/HeaderNav";
import MapEmbed from "../components/MapEmbed";

export default function ContactPage() {
  return (
    <>
      <HeaderNav />
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 items-start gap-8">
          <MapEmbed />
          <ContactForm />
        </div>
      </section>
      <FooterMain />
    </>
  );
}
