// components/EventDetailsModal.tsx
"use client";

import { useState, useEffect } from "react";
import { Modal, Button, Space } from "antd";
import {
  PictureOutlined,
  YoutubeFilled,
  EnvironmentOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import type { EventItem } from "./EventCard";
import { markBooked } from "./PhysicalEventPromoModal";

export default function EventDetailsModal({
  open,
  onClose,
  event,
}: {
  open: boolean;
  onClose: () => void;
  event: EventItem | null;
}) {
  // Support multiple images (imageSrcs) or single image (imageSrc)
  const images = event?.imageSrcs && event.imageSrcs.length > 0 
    ? event.imageSrcs 
    : event?.imageSrc 
      ? [event.imageSrc] 
      : [];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = images[currentImageIndex] || null;
  const posterAlt = event ? `${event.title} poster ${currentImageIndex + 1}` : "";
  const link = event?.link;
  
  const hasMultipleImages = images.length > 1;
  
  // Reset to first image when modal opens or event changes
  useEffect(() => {
    if (open && event) {
      setCurrentImageIndex(0);
    }
  }, [open, event?.title]);
  
  if (!event) return null;
  
  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Check if event is past
  const isEventPast = () => {
    if (!event) return false;
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

      {/* Poster(s) (full view) with switcher if multiple */}
      {currentImage && (
        <div className="mb-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-black/10 bg-black/2 min-h-[200px]">
            <Image
              src={currentImage}
              alt={posterAlt}
              width={1280}
              height={720}
              sizes="(max-width: 768px) 100vw, 680px"
              className="w-full h-auto object-contain"
              priority={currentImageIndex === 0}
            />
            
            {/* Image switcher controls */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors z-10"
                  aria-label="Previous image"
                >
                  <LeftOutlined />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors z-10"
                  aria-label="Next image"
                >
                  <RightOutlined />
                </button>
                
                {/* Image indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        index === currentImageIndex
                          ? "w-6 bg-[var(--yplus-primary,#d0a328)]"
                          : "w-2 bg-white/60 hover:bg-white/80"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          {event.hasFutureEvents && link && !isPast && (
            <div className="mt-2 flex items-center justify-between text-sm">
              <a
                href={link}
                target={link.startsWith("http") ? "_blank" : undefined}
                rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => {
                  // Handle booking tracking if needed
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
