"use client";

import FooterMain from "../components/FooterMain";
import HeaderNav from "../components/HeaderNav";
import SectionWithBg from "../components/SectionWithBg";
import Connect2026Series from "../components/Connect2026Series";
import EventCard from "../components/EventCard";
import EventPromoBanner from "../components/EventPromoBanner";
import { CONNECT_2026 } from "../content/connect2026";
import { PAST_EVENTS } from "../content/events";
import { VISIONING_WORKSHOP_EVENT_ID } from "../components/PhysicalEventPromoModal";

export default function EventsPage() {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const upcomingMonths = CONNECT_2026.map((month) => {
    const events = month.events
      .filter((ev) => {
        const d = new Date(ev.date);
        return !isNaN(d.getTime()) && d >= todayStart;
      })
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

    return { ...month, events };
  }).filter((m) => m.events.length > 0);

  return (
    <>
      <HeaderNav />
      {/* <div className="mx-auto max-w-6xl px-6 py-12 md:py-16"> */}
      <SectionWithBg
        src="/images/events-bg.jpg"   
        alt="Youth+ events background"
        overlay={60}                            
        className="py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl px-6">
          {/* Visioning Workshop Promo Banner */}
          <EventPromoBanner
            eventId={VISIONING_WORKSHOP_EVENT_ID}
            posterImage="/images/visioning_poster.png"
            title="Visioning Workshop"
            description="Join us for an immersive in-person workshop to set your vision for 2026. Transform your aspirations into a clear, actionable vision."
            bookingUrl="https://youthplusafrica.hustlesasa.shop/?product=72677"
          />

          {upcomingMonths.length > 0 ? (
            <Connect2026Series
              months={upcomingMonths}
              title="Upcoming events – 2026 Youth+ Connect Series"
              subtitle="Showing only upcoming sessions from the 2026 Youth+ Connect calendar."
            />
          ) : (
            <div className="mt-10 text-center text-white/90">
              <p className="text-lg font-semibold">No upcoming events right now.</p>
              <p className="mt-1 text-sm text-white/80">
                Check back soon for the next Youth+ Connect sessions.
              </p>
            </div>
          )}
        </div>
      </SectionWithBg>

      {PAST_EVENTS.length > 0 && (
        <SectionWithBg
          src="/images/events-bg.jpg"
          alt="Youth+ past events background"
          overlay={75}
          className="py-12 md:py-16 border-t border-black/40"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div>
              <h2 className="text-2xl font-semibold text-white">Past events</h2>
              <p className="text-white/80 mt-1">
                Highlights from recent Youth+ Connect activities.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PAST_EVENTS.map((e, i) => (
                <EventCard key={`past-${i}-${e.title}`} event={e} />
              ))}
            </div>
          </div>
        </SectionWithBg>
      )}

      <FooterMain />
    </>
  );
}
