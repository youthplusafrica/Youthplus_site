"use client";

import HeaderNav from "../components/HeaderNav";
import FooterMain from "../components/FooterMain";

export default function CallForSpeakersPage() {
  // Original short link from you:
  const externalForm = "https://forms.gle/q7MQuh9LNcVsYKWs9";

  return (
    <>
      <HeaderNav />
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <header>
          <h1 className="text-3xl font-bold">Youth+ Festival 2026 — Call for Speakers</h1>
          <p className="text-black/70 mt-2">
            Fill out the form below. If the form doesn’t load, use the direct link.
          </p>
        </header>

        {/* Embed (works for most Google Forms). If the short link doesn’t embed,
           users can use the button just below. */}
        <div className="mt-6 rounded-2xl border border-black/10 overflow-hidden bg-white">
          <div className="aspect-[4/5] w-full">
            <iframe
              src={externalForm}
              title="Call for Speakers — Youth+ Festival 2026"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>

        <a
          href={externalForm}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-4 text-[var(--yplus-primary,#ead61f)] underline underline-offset-2"
        >
          Open the form in a new tab →
        </a>
      </main>
      <FooterMain />
    </>
  );
}
