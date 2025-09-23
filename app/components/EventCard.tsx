"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import EventDetailsModal from "./EventDetailsModal";

export type EventItem = {
  title: string;
  date: string; // ISO string e.g. "2025-11-12"
  location: string;
  imageSrc?: string; // /images/events/...
  description?: string;
  link?: string; // external or internal URL
  details?: string;
  galleryUrl?: string;
  youtubeUrl?: string;
	hasFutureEvents?: boolean;
};

export default function EventCard({ event }: { event: EventItem }) {
	const evt = { ...event, hasFutureEvents: event.hasFutureEvents ?? true };
  const [open, setOpen] = useState(false);

  const d = new Date(event.date);
  const dateStr = isNaN(d.getTime())
    ? event.date
    : new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(d);

  const CardInner = (
    <>
      <article className="group rounded-2xl overflow-hidden border border-black/10 bg-white hover:shadow-lg transition">
        <div className="relative h-44 md:h-52 overflow-hidden">
          <div className="absolute inset-0 bg-black/5" />
          {event.imageSrc ? (
            <Image
              src={event.imageSrc}
              alt={event.title}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-[1.03] transition-transform"
            />
          ) : null}
          {/* brand bar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ background: "var(--yplus-primary,#ead61f)" }}
            aria-hidden="true"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p className="text-black/70">
            {dateStr} • {event.location}
          </p>
          {event.description && (
            <p className="mt-2 text-black/80 clamp-3">
              {event.description}
            </p>
          )}
          <button
            onClick={() => setOpen(true)}
            className="mt-3 inline-block text-[var(--yplus-primary,#ead61f)] underline-offset-2 hover:opacity-80"
          >
            View details →
          </button>
        </div>
      </article>

			<EventDetailsModal open={open} onClose={() => setOpen(false)} event={evt} />
    </>
  );

  return event.link ? (
    <Link
      href={event.link}
      target={event.link.startsWith("http") ? "_blank" : undefined}
    >
      {CardInner}
    </Link>
  ) : (
    CardInner
  );
}
