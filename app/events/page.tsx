"use client";

import FooterMain from "../components/FooterMain";
import HeaderNav from "../components/HeaderNav";
import SectionWithBg from "../components/SectionWithBg";
import MonthRowLayout from "../components/MonthRowLayout";
import EventCard from "../components/EventCard";
import { CONNECT_2026 } from "../content/connect2026";
import { PAST_EVENTS } from "../content/events";

export default function EventsPage() {
  // Get today's date string in Kenya/EAT timezone (Africa/Nairobi)
  const getTodayEAT = () => {
    const now = new Date();
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "Africa/Nairobi",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);
  };

  const todayEAT = getTodayEAT();

  // Helper to check if an event is upcoming
  const isEventUpcoming = (eventDate: string) => {
    const d = new Date(eventDate);
    if (isNaN(d.getTime())) return false;
    
    const eventDateEAT = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Africa/Nairobi",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(d);
    
    return eventDateEAT >= todayEAT;
  };

  const upcomingMonths = CONNECT_2026.map((month) => {
    // Keep all events, but sort them
    const events = [...month.events].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return { ...month, events };
  }).filter((m) => m.events.length > 0); // Show all months with events (upcoming events will be clickable, past events will be disabled)

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
          {upcomingMonths.length > 0 ? (
            <MonthRowLayout
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
