"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  markBooked as markBookedUtil,
  markDismissed,
} from "../lib/eventPromo";

// Re-export event ID for convenience (from shared config)
export { FUTURE_OF_WORK_EVENT_ID } from "../content/eventPromoConfig";

// Re-export markBooked for use in EventDetailsModal and EventPromoBanner
export const markBooked = markBookedUtil;

type PhysicalEventPromoModalProps = {
  eventId: string;
  posterImage: string;
  title: string;
  description?: string;
  bookingUrl: string;
  onDismiss?: () => void;
};

export default function PhysicalEventPromoModal({
  eventId,
  posterImage,
  title,
  description,
  bookingUrl,
  onDismiss,
}: PhysicalEventPromoModalProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    // Only check once per component mount to avoid re-opening after dismiss
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    // Always show the popup - no appearance limits
    // Show popup after a short delay for better UX
    const timer = setTimeout(() => {
      setOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [eventId]);

  const handleDismiss = () => {
    markDismissed(eventId);
    setOpen(false);
    onDismiss?.();
  };

  const handleBookSlot = () => {
    markBookedUtil(eventId);
    setOpen(false);
    
    // Navigate to booking URL
    if (bookingUrl.startsWith("http")) {
      window.open(bookingUrl, "_blank", "noopener,noreferrer");
    } else {
      router.push(bookingUrl);
    }
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed top-4 right-4 bottom-auto left-auto md:left-auto md:right-4 z-50 animate-pulse-zoom max-w-sm w-[calc(100%-2rem)] md:w-96 mx-auto md:mx-0">
        <div className="relative rounded-2xl bg-white border-2 border-[var(--yplus-primary,#d0a328)] shadow-2xl p-5 md:p-6">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-black/60 hover:text-black transition-colors z-10"
            aria-label="Close popup"
          >
            <CloseOutlined className="text-lg" />
          </button>

          {/* Content */}
          <div className="pr-6">
            {/* Poster image */}
            <div className="relative w-full overflow-hidden rounded-xl border border-black/10 mb-4">
              <Image
                src={posterImage}
                alt={`${title} poster`}
                width={1440}
                height={1440}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            {/* Title */}
            {title && (
              <h3 className="text-xl font-bold text-black mb-2">
                {title}
              </h3>
            )}

            {/* Description */}
            {description && (
              <p className="text-sm text-black/70 mb-4">
                {description}
              </p>
            )}

            {/* CTA Button */}
            <div className="event-promo-cta-wrapper">
              <Button
                type="primary"
                size="large"
                className="event-promo-cta-button w-full !bg-[var(--yplus-primary,#d0a328)] !text-black hover:!opacity-90 !h-14 !text-lg !font-bold !shadow-lg !border-none"
                onClick={handleBookSlot}
              >
                Grab a Ticket
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse-zoom {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        .animate-pulse-zoom {
          animation: pulse-zoom 2s ease-in-out infinite;
        }

        .event-promo-cta-wrapper {
          position: relative;
        }

        .event-promo-cta-wrapper::before {
          content: "" !important;
          position: absolute !important;
          top: -3px !important;
          left: -3px !important;
          right: -3px !important;
          bottom: -3px !important;
          border-radius: 8px !important;
          background: linear-gradient(
            45deg,
            var(--yplus-primary, #ead61f),
            #ffd700,
            #ffed4e,
            var(--yplus-primary, #ead61f)
          ) !important;
          background-size: 200% 200% !important;
          animation: glow-pulse 2s ease-in-out infinite, gradient-shift 3s ease infinite !important;
          z-index: -1 !important;
          opacity: 0.6 !important;
          filter: blur(6px) !important;
        }

        .event-promo-cta-button,
        .event-promo-cta-button.ant-btn {
          animation: pulse-glow 2s ease-in-out infinite !important;
          position: relative !important;
          transition: all 0.3s ease !important;
        }

        .event-promo-cta-wrapper:hover .event-promo-cta-button,
        .event-promo-cta-button:hover,
        .event-promo-cta-button.ant-btn:hover {
          animation: none !important;
          transform: scale(1.05) !important;
          box-shadow: 0 0 30px 12px rgba(234, 214, 31, 0.8),
            0 8px 24px rgba(234, 214, 31, 0.5) !important;
        }

        @keyframes pulse-glow {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(234, 214, 31, 0.7),
              0 4px 16px rgba(234, 214, 31, 0.4);
          }
          50% {
            transform: scale(1.03);
            box-shadow: 0 0 25px 10px rgba(234, 214, 31, 0.7),
              0 6px 24px rgba(234, 214, 31, 0.5);
          }
        }

        @keyframes glow-pulse {
          0%,
          100% {
            opacity: 0.5;
            filter: blur(6px);
          }
          50% {
            opacity: 0.9;
            filter: blur(10px);
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
}

