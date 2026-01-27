// components/EventDetailsModal.tsx
"use client";

import { Modal, Button, Space } from "antd";
import {
  PictureOutlined,
  YoutubeFilled,
  EnvironmentOutlined,
  CalendarOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import type { EventItem } from "./EventCard";
import { markBooked, VISIONING_WORKSHOP_EVENT_ID } from "./PhysicalEventPromoModal";

export default function EventDetailsModal({
  open,
  onClose,
  event,
}: {
  open: boolean;
  onClose: () => void;
  event: EventItem | null;
}) {
  if (!event) return null;

  const poster = event.imageSrc; // ← reuse the card image
  const posterAlt = `${event.title} poster`; // simple alt fallback
  const link = event.link;

  // Check if event is past
  const isEventPast = () => {
    const eventDate = new Date(event.date);
    if (isNaN(eventDate.getTime())) return false;
    
    const todayEAT = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Africa/Nairobi",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
    
    const eventDateEAT = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Africa/Nairobi",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(eventDate);
    
    return eventDateEAT < todayEAT;
  };

  const isPast = isEventPast();

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={720}
      title={
        <div className="flex flex-col gap-2">
          <div className="text-lg font-semibold leading-tight">
            {event.title}
          </div>
          <div className="text-black/70 text-sm flex flex-wrap gap-4">
            <span className="flex items-center gap-1">
              <CalendarOutlined /> {event.date}
            </span>
            <span className="flex items-center gap-1">
              <EnvironmentOutlined /> {event.location}
            </span>
          </div>
        </div>
      }
      styles={{ body: { paddingTop: 8 } }}
    >
      {/* Top actions (links) */}
      {(event.galleryUrl || event.youtubeUrl) && (
        <div className="mb-4">
          <Space wrap>
            {event.galleryUrl && (
              <Button
                icon={<PictureOutlined />}
                href={event.galleryUrl}
                target="_blank"
                rel="noreferrer"
              >
                View photo gallery
              </Button>
            )}
            {event.youtubeUrl && (
              <Button
                type="primary"
                icon={<YoutubeFilled />}
                href={event.youtubeUrl}
                target="_blank"
                rel="noreferrer"
              >
                Watch on YouTube
              </Button>
            )}
          </Space>
        </div>
      )}

      {/* Poster (full view) */}
      {poster && (
        <div className="mb-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-black/10 bg-black/2">
            <Image
              src={poster}
              alt={posterAlt}
              width={1280}
              height={720}
              sizes="(max-width: 768px) 100vw, 680px"
              className="w-full h-auto object-contain"
            />
          </div>
          {event.hasFutureEvents && link && !isPast && (
            <div className="mt-2 flex items-center justify-between text-sm">
              <a
                href={link}
                target={link.startsWith("http") ? "_blank" : undefined}
                rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => {
                  // Mark as booked if this is the Visioning Workshop event
                  if (event.title === "Visioning Workshop") {
                    markBooked(VISIONING_WORKSHOP_EVENT_ID);
                  }
                }}
                className="inline-flex items-center gap-1 text-[var(--yplus-primary,#d0a328)] border border-[var(--yplus-primary,#d0a328)] rounded-full px-3 py-1 cursor-pointer hover:bg-[var(--yplus-primary,#d0a328)] hover:text-black transition-colors"
              >
                <ScheduleOutlined /> Book a slot
              </a>
            </div>
          )}
        </div>
      )}

      {/* Details */}
      {event.details ? (
        <div className="prose max-w-none">
          <p className="text-black/85">{event.details}</p>
        </div>
      ) : event.description ? (
        <p className="text-black/85">{event.description}</p>
      ) : (
        <p className="text-black/60">More details coming soon.</p>
      )}
    </Modal>
  );
}
