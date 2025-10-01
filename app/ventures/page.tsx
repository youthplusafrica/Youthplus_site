"use client";

import EventCard from "../components/EventCard";
import FooterMain from "../components/FooterMain";
import HeaderNav from "../components/HeaderNav";
import SectionWithBg from "../components/SectionWithBg";
import { VENTURES } from "../content/ventures";

// helper: filter to last 365 days (keeps your original event order)
function isWithinLastYear(dateStr: string): boolean {
  const [y, m, d] = (dateStr || "").split("-").map(Number);
  const dt = new Date(y || 0, (m || 1) - 1, d || 1);
  if (isNaN(dt.getTime())) return false;
  const now = new Date();
  const oneYearAgo = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate()
  );
  return dt >= oneYearAgo;
}

export default function VenturesPage() {
  return (
    <>
      <HeaderNav />

      <SectionWithBg
        src="/images/ventures-bg-2.jpeg"
        alt="Youth+ events background"
        overlay={60}
        className="py-12 md:py-16"
      >
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">Ventures</h1>
          <p className="text-white/80 mt-1">
            Explore our ventures and see highlights from the past year.
          </p>
        </header>

        {VENTURES.map((v) => {
          const recent = v.events.filter((e) => isWithinLastYear(e.date));
          return (
            <section key={v.id} id={v.id} className="scroll-mt-24">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{v.name}</h2>
                  {v.blurb && <p className="text-black/70 mt-1 text-white/80">{v.blurb}</p>}
                </div>
                <div className="hidden md:block h-1 w-36 bg-[var(--yplus-primary,#ead61f)] rounded-full" />
              </div>

              {recent.length === 0 ? (
                <p className="mt-5 text-white/80">
                  No events in the last 12 months. Check back soon.
                </p>
              ) : (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recent.map((e, i) => (
                    <EventCard key={`${v.id}-${i}-${e.title}`} event={e} />
                  ))}
                </div>
              )}

              <div className="mt-8 h-px bg-black/10" />
            </section>
          );
        })}
      </SectionWithBg>

      <FooterMain />
    </>
  );
}
