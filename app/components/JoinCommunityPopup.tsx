"use client";

import { useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import {
  JOIN_COMMUNITY_CONTENT,
  POPUP_STORAGE_KEY,
  POPUP_DISMISSAL_DURATION_DAYS,
  JOINED_COMMUNITY_STORAGE_KEY,
} from "../content/joinCommunity";

export default function JoinCommunityPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // First check: if user has already joined the community, never show popup
    const hasJoined = localStorage.getItem(JOINED_COMMUNITY_STORAGE_KEY);
    if (hasJoined === "true") {
      return;
    }

    // Second check: if popup was dismissed recently
    const dismissedData = localStorage.getItem(POPUP_STORAGE_KEY);
    if (dismissedData) {
      const dismissedTime = parseInt(dismissedData, 10);
      const now = Date.now();
      const daysSinceDismissal = (now - dismissedTime) / (1000 * 60 * 60 * 24);

      // If dismissed within the duration, don't show
      if (daysSinceDismissal < POPUP_DISMISSAL_DURATION_DAYS) {
        return;
      }
    }

    // Show popup after a short delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Store dismissal timestamp
    localStorage.setItem(POPUP_STORAGE_KEY, Date.now().toString());
  };

  const handleJoin = () => {
    router.push("/joincommunity");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bottom-auto left-auto md:left-auto md:right-4 z-50 animate-pulse-zoom max-w-sm w-[calc(100%-2rem)] md:w-96 mx-auto md:mx-0">
      <div className="relative rounded-2xl bg-white border-2 border-[var(--yplus-primary,#d0a328)] shadow-2xl p-5 md:p-6">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-black/60 hover:text-black transition-colors"
          aria-label="Close popup"
        >
          <CloseOutlined className="text-lg" />
        </button>

        {/* Content */}
        <div className="pr-6">
          <h3 className="text-xl font-bold text-black mb-2">
            {JOIN_COMMUNITY_CONTENT.headline}
          </h3>
          <p className="text-sm text-black/70 mb-4">
            {JOIN_COMMUNITY_CONTENT.subheadline}
          </p>

          {/* Benefits list */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-black mb-2">
              What you&apos;ll receive:
            </p>
            <ul className="list-disc list-inside text-sm text-black/70 space-y-1">
              {JOIN_COMMUNITY_CONTENT.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleJoin}
            type="primary"
            size="large"
            className="w-full !bg-[var(--yplus-primary,#d0a328)] !text-black hover:!opacity-90 font-semibold"
          >
            {JOIN_COMMUNITY_CONTENT.ctaButton}
          </Button>

          {/* Trust line */}
          <p className="text-xs text-black/60 mt-3 text-center">
            {JOIN_COMMUNITY_CONTENT.trustLine}
          </p>
        </div>
      </div>

      <style jsx>{`
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
      `}</style>
    </div>
  );
}

