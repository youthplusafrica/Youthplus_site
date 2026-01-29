"use client";

import { useState } from "react";
import type { ConnectMonth } from "../content/connect2026";
import EventDetailsModal from "./EventDetailsModal";
import type { EventItem } from "./EventCard";

type Props = {
  months: ConnectMonth[];
  title?: string;
  subtitle?: string;
};

export default function MonthRowLayout({
  months,
  title = "2026 Youth+ Connect Series",
  subtitle = "Month-by-month series with IG Lives, Webinars and Physical events.",
}: Props) {
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);

  if (!months.length) return null;

  const eventTypes: Array<"IG Live" | "Webinar" | "On-site"> = [
    "IG Live",
    "Webinar",
    "On-site",
  ];

  // Get today's date string in Kenya/EAT timezone
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

  // Check if an event is past
  const isEventPast = (eventDate: string) => {
    const d = new Date(eventDate);
    if (isNaN(d.getTime())) return false;
    
    const eventDateEAT = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Africa/Nairobi",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(d);
    
    return eventDateEAT < todayEAT;
  };

  const getEventByType = (
    month: ConnectMonth,
    type: "IG Live" | "Webinar" | "On-site"
  ) => {
    return month.events.find((ev) => ev.type === type);
  };

  const handleEventClick = (
    event: EventItem & { type: "IG Live" | "Webinar" | "On-site" },
    month: ConnectMonth
  ) => {
    setActiveEvent({
      ...event,
      description: `${month.monthName} – ${month.theme}${
        month.partners ? ` | Partners: ${month.partners}` : ""
      }`,
    });
  };

  return (
    <>
      <div className="mt-10 md:mt-12">
        <h2 className="text-xl md:text-2xl font-semibold text-white">{title}</h2>
        <p className="text-white/80 mt-0.5 text-sm md:text-base">{subtitle}</p>
      </div>

      <div className="mt-6 space-y-2.5 md:space-y-3">
        {months.map((month) => (
          <div
            key={month.month}
            className="rounded-lg bg-black/30 border border-white/15 p-2.5 md:p-3"
          >
            {/* Desktop/Tablet Layout: Month on left, events on right */}
            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-3 md:gap-4">
              {/* Left: Month Info */}
              <div className="lg:border-r lg:border-white/20 lg:pr-4">
                <h3 className="text-base md:text-lg font-semibold text-white leading-tight line-clamp-2">
                  {month.monthName}
                </h3>
                <p className="mt-0.5 text-xs md:text-sm text-white/90 leading-tight line-clamp-2">
                  {month.theme}
                </p>
                {month.partners && (
                  <p className="mt-1.5 text-xs text-white/70 line-clamp-2">
                    <span className="font-medium">Facilitators:</span>{" "}
                    {month.partners}
                  </p>
                )}
              </div>

              {/* Right: Event Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-2.5">
                {eventTypes.map((type) => {
                  const event = getEventByType(month, type);
                  const hasEvent = !!event;
                  const isPast = hasEvent && event ? isEventPast(event.date) : false;
                  const isClickable = hasEvent; // All events are now clickable, including past ones

                  return (
                    <div
                      key={type}
                      className={`rounded-md border p-2 md:p-2.5 transition-colors min-h-[70px] flex flex-col relative ${
                        !hasEvent
                          ? "border-white/10 bg-white/3 opacity-60"
                          : isPast
                          ? "border-white/20 bg-white/5 opacity-70 cursor-pointer hover:border-[var(--yplus-primary,#d0a328)] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--yplus-primary,#d0a328)] focus:ring-offset-2 focus:ring-offset-black/30"
                          : "border-white/20 bg-white/5 cursor-pointer hover:border-[var(--yplus-primary,#d0a328)] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--yplus-primary,#d0a328)] focus:ring-offset-2 focus:ring-offset-black/30"
                      }`}
                      onClick={() => {
                        if (isClickable && event) {
                          handleEventClick(event, month);
                        }
                      }}
                      role={isClickable ? "button" : undefined}
                      tabIndex={isClickable ? 0 : undefined}
                      onKeyDown={(e) => {
                        if (isClickable && event && (e.key === "Enter" || e.key === " ")) {
                          e.preventDefault();
                          handleEventClick(event, month);
                        }
                      }}
                    >
                      <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wide text-[var(--yplus-primary,#d0a328)] mb-1.5">
                        {type}
                      </p>
                      {hasEvent && event ? (
                        <>
                          {isPast && (
                            <span className="absolute top-1.5 right-1.5 text-[9px] text-white/40 font-medium uppercase tracking-wide">
                              Past
                            </span>
                          )}
                          <p className="text-xs md:text-sm font-semibold text-white leading-tight line-clamp-2 flex-1">
                            {event.title}
                          </p>
                          <p className="mt-1 text-[10px] md:text-xs text-white/80">
                            {(() => {
                              // Support multiple dates (dates array) or single date (date)
                              const datesToFormat = event.dates && event.dates.length > 0
                                ? event.dates
                                : [event.date];
                              
                              return datesToFormat
                                .map((dateStr) => {
                                  const d = new Date(dateStr);
                                  return isNaN(d.getTime())
                                    ? dateStr
                                    : new Intl.DateTimeFormat(undefined, {
                                        year: "numeric",
                                        month: "short",
                                        day: "2-digit",
                                      }).format(d);
                                })
                                .join(" & ");
                            })()}
                          </p>
                        </>
                      ) : (
                        <p className="text-[10px] md:text-xs text-white/50 italic">
                          Coming soon
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <EventDetailsModal
        open={!!activeEvent}
        onClose={() => setActiveEvent(null)}
        event={activeEvent}
      />
    </>
  );
}

