"use client";

import { useState } from "react";
import { CONNECT_2026, ConnectMonth } from "../content/connect2026";
import EventDetailsModal from "./EventDetailsModal";
import type { EventItem } from "./EventCard";

type Props = {
  months?: ConnectMonth[];
  title?: string;
  subtitle?: string;
  initialLoad?: number;
  loadMoreCount?: number;
};

export default function Connect2026Series({
  months = CONNECT_2026,
  title = "2026 Youth+ Connect Series",
  subtitle = "Month-by-month series with IG Lives, Webinars and Physical events.",
  initialLoad = 2,
  loadMoreCount = 3,
}: Props) {
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(initialLoad);

  if (!months.length) return null;

  const visibleMonths = months.slice(0, visibleCount);
  const hasMore = visibleCount < months.length;

  return (
    <>
      <div className="mt-14">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="text-white/80 mt-1">{subtitle}</p>
      </div>

      <div className="mt-8 space-y-10">
        {visibleMonths.map((month) => (
          <section
            key={month.month}
            className="rounded-2xl bg-black/30 border border-white/15 p-5 md:p-6"
          >
            <header className="mb-4">
              <h3 className="text-xl font-semibold text-white">
                {month.monthName} – {month.theme}
              </h3>
              {month.partners && (
                <p className="mt-1 text-sm text-white/80">
                  <span className="font-medium">Facilitators:</span>{" "}
                  {month.partners}
                </p>
              )}
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {month.events.map((ev, idx) => (
                <div
                  key={`${month.month}-${idx}-${ev.title}`}
                  className="rounded-xl border border-white/20 bg-white/5 p-4 cursor-pointer hover:border-[var(--yplus-primary,#d0a328)] hover:bg-white/10 transition-colors"
                  onClick={() =>
                    setActiveEvent({
                      ...ev,
                      description: `${month.monthName} – ${month.theme}${
                        month.partners ? ` | Partners: ${month.partners}` : ""
                      }`,
                    })
                  }
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--yplus-primary,#d0a328)]">
                    {ev.type}
                  </p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {ev.title}
                  </p>
                  <p className="mt-1 text-sm text-white/80">
                    {new Intl.DateTimeFormat(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(ev.date))}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + loadMoreCount)}
            className="px-6 py-3 rounded-full border-2 border-[var(--yplus-primary,#d0a328)] text-[var(--yplus-primary,#d0a328)] font-semibold hover:bg-[var(--yplus-primary,#d0a328)] hover:text-black transition-colors"
          >
            See more
          </button>
        </div>
      )}

      <EventDetailsModal
        open={!!activeEvent}
        onClose={() => setActiveEvent(null)}
        event={activeEvent}
      />
    </>
  );
}


