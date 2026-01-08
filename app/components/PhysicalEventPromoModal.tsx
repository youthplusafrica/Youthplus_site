"use client";

import { useEffect, useState, useRef } from "react";
import { Modal, Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  getPromoState,
  markBooked as markBookedUtil,
  markDismissed,
  shouldShowPromo,
} from "../lib/eventPromo";

// Event ID constant - must match the event being promoted
export const VISIONING_WORKSHOP_EVENT_ID = "visioning-workshop-2026-01-16";

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

    // Check if promo should be shown
    if (shouldShowPromo(eventId)) {
      setOpen(true);
    }
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

  // Handle ESC key and click outside
  const handleCancel = () => {
    handleDismiss();
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={handleCancel}
        footer={null}
        width={720}
        styles={{ 
          body: { paddingTop: 8, paddingBottom: 0 }
        }}
        maskClosable={true}
        getContainer={() => document.body}
        zIndex={1000}
        styles={{
          mask: {
            position: 'fixed',
            inset: 0,
            height: '100vh',
            width: '100vw',
          },
          body: { paddingTop: 8, paddingBottom: 0 }
        }}
        wrapClassName="event-promo-modal-wrapper"
      >
        <div className="flex flex-col">
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

          {/* CTA Button at bottom */}
          <div className="pt-4 border-t border-black/10">
            <Button
              type="primary"
              size="large"
              className="event-promo-cta-button !bg-[var(--yplus-primary,#ead61f)] !text-black hover:!opacity-90 !h-14 !text-lg !font-bold !shadow-lg !border-none"
              onClick={handleBookSlot}
              block
            >
              Book a slot
            </Button>
          </div>
        </div>
      </Modal>

      <style jsx global>{`
        /* Ensure modal wrapper covers full viewport - scoped to this modal only */
        .event-promo-modal-wrapper.ant-modal-wrap {
          position: fixed !important;
          inset: 0 !important;
          height: 100vh !important;
          width: 100vw !important;
          top: 0 !important;
          left: 0 !important;
          z-index: 1000 !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        /* Ensure modal mask covers full viewport from top */
        .event-promo-modal-wrapper .ant-modal-mask {
          position: fixed !important;
          inset: 0 !important;
          height: 100vh !important;
          width: 100vw !important;
          top: 0 !important;
          left: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        .event-promo-cta-button {
          animation: pulse-glow 2s ease-in-out infinite;
          position: relative;
          transition: all 0.3s ease;
        }

        .event-promo-cta-button:hover {
          animation: none;
          transform: scale(1.05);
          box-shadow: 0 0 30px 12px rgba(234, 214, 31, 0.8),
            0 8px 24px rgba(234, 214, 31, 0.5) !important;
        }

        .event-promo-cta-button::before {
          content: "";
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border-radius: 8px;
          background: linear-gradient(
            45deg,
            var(--yplus-primary, #ead61f),
            #ffd700,
            #ffed4e,
            var(--yplus-primary, #ead61f)
          );
          background-size: 200% 200%;
          animation: glow-pulse 2s ease-in-out infinite, gradient-shift 3s ease infinite;
          z-index: -1;
          opacity: 0.6;
          filter: blur(6px);
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

