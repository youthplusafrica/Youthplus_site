"use client";

import EventCard from "../components/EventCard";
import FooterMain from "../components/FooterMain";
import HeaderNav from "../components/HeaderNav";
import SectionWithBg from "../components/SectionWithBg";
import { PAST_EVENTS, UPCOMING_EVENTS } from "../content/events";

export default function EventsPage() {
  return (
    <>
      <HeaderNav />
      {/* <div className="mx-auto max-w-6xl px-6 py-12 md:py-16"> */}
      <SectionWithBg
        src="/images/events-bg.jpg"   
        alt="Youth+ events background"
        overlay={60}                            
        className="py-12 md:py-16 h-[80vh]"
      >
        {/* Upcoming */}
        {UPCOMING_EVENTS.length > 0 && (
          <>
            <div>
              <h1 className="text-3xl font-bold text-white">Upcoming events</h1>
              <p className="text-white/80 mt-1">
                Discover what’s coming up across Youth+ Africa.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {UPCOMING_EVENTS.map((e, i) => (
                <EventCard key={`up-${i}-${e.title}`} event={e} />
              ))}
            </div>
          </>
        )}

        {/* Past */}
        {PAST_EVENTS.length > 0 && (
          <>
            <div className="mt-14">
              <h2 className="text-2xl font-semibold text-white">Past events</h2>
              <p className="text-white/80 mt-1">
                Highlights from recent activities.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PAST_EVENTS.map((e, i) => (
                <EventCard key={`past-${i}-${e.title}`} event={e} />
              ))}
            </div>
          </>
        )}

        {/* If both empty */}
        {UPCOMING_EVENTS.length === 0 && PAST_EVENTS.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-white text-4xl font-bold">No events to show right now.</p>
          </div>
        )}
      {/* </div> */}
      </SectionWithBg>

      <FooterMain />
    </>
  );
}
