"use client";

import { useState, useEffect } from "react";
import { Button } from "antd";
import { ScheduleOutlined, CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  shouldShowPromo,
  markDismissed,
} from "../lib/eventPromo";
import {
  markBooked,
  VISIONING_WORKSHOP_EVENT_ID,
} from "./PhysicalEventPromoModal";

type EventPromoBannerProps = {
  eventId: string;
  posterImage: string;
  title: string;
  description?: string;
  bookingUrl: string;
};

export default function EventPromoBanner({
  eventId,
  posterImage,
  title,
  description,
  bookingUrl,
}: EventPromoBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (shouldShowPromo(eventId)) {
      setIsVisible(true);
    }
  }, [eventId]);

  const handleDismiss = () => {
    markDismissed(eventId);
    setIsVisible(false);
  };

  const handleBookSlot = () => {
    markBooked(eventId);
    setIsVisible(false);

    // Navigate to booking URL
    if (bookingUrl.startsWith("http")) {
      window.open(bookingUrl, "_blank", "noopener,noreferrer");
    } else {
      router.push(bookingUrl);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="mb-8 rounded-2xl bg-black/40 border-2 border-[var(--yplus-primary,#d0a328)] p-4 md:p-6 relative">
      {/* Close button */}
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors z-10"
        aria-label="Close"
      >
        <CloseOutlined className="text-lg" />
      </button>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Poster thumbnail */}
        <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0 overflow-hidden rounded-xl border border-white/20">
          <Image
            src={posterImage}
            alt={`${title} poster`}
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            {description && (
              <p className="text-white/80 text-sm mb-4">{description}</p>
            )}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 items-center">
            <Button
              type="primary"
              size="large"
              icon={<ScheduleOutlined />}
              className="!bg-[var(--yplus-primary,#d0a328)] !text-black hover:!opacity-90"
              onClick={handleBookSlot}
            >
              Book a slot
            </Button>
            <button
              onClick={handleDismiss}
              className="text-white/70 underline underline-offset-2 text-sm"
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

